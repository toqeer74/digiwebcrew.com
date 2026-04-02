"use server";

import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { revalidatePath } from "next/cache";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { ChatSession } from "@/lib/models/chat";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getLeads(filters: {
  query?: string;
  status?: string;
  tier?: string;
  page?: number;
} = {}) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  const { query, status, tier, page = 1 } = filters;
  const limit = 20;
  const skip = (page - 1) * limit;

  const mongoQuery: any = {};

  if (query) {
    mongoQuery.$or = [
      { fullName: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
      { company: { $regex: query, $options: "i" } },
    ];
  }

  if (status && status !== "ALL") {
    mongoQuery.status = status;
  }

  if (tier && tier !== "ALL") {
    mongoQuery.leadTier = tier;
  }

  const [leads, total] = await Promise.all([
    Lead.find(mongoQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Lead.countDocuments(mongoQuery),
  ]);

  return {
    leads: JSON.parse(JSON.stringify(leads)),
    total,
    pages: Math.ceil(total / limit),
  };
}

export async function getLeadById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const lead = await Lead.findById(id).lean();
  return JSON.parse(JSON.stringify(lead));
}

export async function updateLeadStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const lead = await Lead.findByIdAndUpdate(
    id,
    {
      status,
      $push: {
        events: {
          type: "StatusUpdated",
          meta: { newStatus: status },
          at: new Date()
        }
      }
    },
    { new: true }
  );
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return JSON.parse(JSON.stringify(lead));
}

export async function addLeadNote(id: string, note: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const lead = await Lead.findByIdAndUpdate(
    id,
    {
      $push: {
        events: {
          type: "NoteAdded",
          meta: { note, author: session.user?.email },
          at: new Date()
        },
        notes: {
          content: note,
          author: session.user?.name || session.user?.email || "Admin",
          createdAt: new Date(),
          type: "note"
        }
      }
    },
    { new: true }
  );
  revalidatePath(`/admin/leads/${id}`);
  return JSON.parse(JSON.stringify(lead));
}

export async function addTask(id: string, task: { title: string; dueAt: Date; priority?: "low" | "medium" | "high" }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const lead = await Lead.findByIdAndUpdate(
    id,
    {
      $push: {
        tasks: {
          title: task.title,
          dueAt: task.dueAt,
          priority: task.priority || "medium",
          done: false,
          createdAt: new Date()
        }
      }
    },
    { new: true }
  );
  revalidatePath(`/admin/leads/${id}`);
  return JSON.parse(JSON.stringify(lead));
}

export async function completeTask(leadId: string, taskRef: number | string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const lead = await Lead.findById(leadId);
  if (!lead) throw new Error("Lead not found");

  if (typeof taskRef === "number" && lead.tasks[taskRef]) {
    lead.tasks[taskRef].done = true;
  } else {
    const task = lead.tasks.find((item: any) => String(item._id) === String(taskRef));
    if (!task) throw new Error("Task not found");
    task.done = true;
  }

  await lead.save();
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/tasks");
  return JSON.parse(JSON.stringify(lead));
}

export async function updateLeadScore(id: string, newScore: number, reason?: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const newTier = newScore >= 60 ? "HOT" : newScore >= 30 ? "WARM" : "COLD";

  const lead = await Lead.findByIdAndUpdate(
    id,
    {
      leadScore: newScore,
      leadTier: newTier,
      $push: {
        events: {
          type: "ScoreUpdated",
          meta: { newScore, newTier, reason, updatedBy: session.user?.email },
          at: new Date()
        }
      }
    },
    { new: true }
  );
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/analytics");
  return JSON.parse(JSON.stringify(lead));
}

export async function createLead(data: any) {
  const session = await getServerSession(authOptions);
  const isPublicContactForm = data?.source === "contact-form";
  if (!session && !isPublicContactForm) throw new Error("Unauthorized");

  await connectToDatabase();

  const scored = calculateLeadScore(data);

  const lead = await Lead.create({
    ...data,
    leadScore: scored.score,
    leadTier: scored.tier,
    source: data.source || (session ? "admin" : "contact-form"),
    events: [
      {
        type: "LeadCreated",
        meta: {
          source: isPublicContactForm ? "Contact Form" : "Admin Dashboard",
          creator: session?.user?.email || "public",
        }
      }
    ]
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");
  return JSON.parse(JSON.stringify(lead));
}

export async function deleteLead(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  await Lead.findByIdAndDelete(id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");
  return { ok: true };
}

export async function convertChatToLead(sessionId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  const chat = await ChatSession.findOne({ sessionId }).lean();
  if (!chat) throw new Error("Chat session not found");

  if ((chat as any).isConverted) {
    const existing = await Lead.findOne({ source: `chat:${sessionId}` }).lean();
    return existing ? JSON.parse(JSON.stringify(existing)) : { alreadyConverted: true };
  }

  const meta = (chat as any).metadata || {};
  const contact = meta.contactInfo || {};
  const service = meta.service || "consulting";
  const intent = meta.intent || "inquiry";
  const budget = meta.budget || "Flexible";

  const transcript = ((chat as any).messages || [])
    .slice(-6)
    .map((m: any) => `${m.role}: ${m.content}`)
    .join("\n")
    .slice(0, 2000);

  const leadPayload = {
    fullName: contact.name || "Chat Visitor",
    email: contact.email || `${sessionId}@chat.local`,
    company: "",
    serviceCategory: String(service),
    serviceInterest: String(intent),
    projectType: "chat-conversion",
    budgetRange: String(budget),
    timeline: "TBD",
    message: transcript || "Converted from chat session",
    source: `chat:${sessionId}`,
    status: "NEW",
  };

  const scored = calculateLeadScore(leadPayload);
  const lead = await Lead.create({
    ...leadPayload,
    leadScore: scored.score,
    leadTier: scored.tier,
    events: [
      {
        type: "LeadCreated",
        at: new Date(),
        meta: { source: "chat-conversion", sessionId, convertedBy: session.user?.email },
      },
    ],
  });

  await ChatSession.updateOne(
    { sessionId },
    {
      $set: { isConverted: true },
    }
  );

  revalidatePath("/admin/chats");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");

  return JSON.parse(JSON.stringify(lead));
}

