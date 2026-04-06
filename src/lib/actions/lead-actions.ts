"use server";

import { prisma, connectToDatabase } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { calculateLeadScore } from "@/lib/lead-scoring";
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

  const where: any = {};

  if (query) {
    where.OR = [
      { fullName: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { company: { contains: query, mode: "insensitive" } },
    ];
  }
  if (status && status !== "ALL") where.status = status;
  if (tier && tier !== "ALL") where.leadTier = tier;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { notes: true, events: true, tasks: true },
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    leads: leads.map(serializeLead),
    total,
    pages: Math.ceil(total / limit),
  };
}

export async function getLeadById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { notes: true, events: true, tasks: true },
  });
  return lead ? serializeLead(lead) : null;
}

export async function updateLeadStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  const [lead] = await Promise.all([
    prisma.lead.update({
      where: { id },
      data: { status: status as any },
    }),
    prisma.leadEvent.create({
      data: { leadId: id, type: "StatusUpdated", meta: { newStatus: status } },
    }),
  ]);

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return serializeLead(lead);
}

export async function addLeadNote(id: string, note: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  await Promise.all([
    prisma.leadNote.create({
      data: {
        leadId: id,
        content: note,
        author: session.user?.name || session.user?.email || "Admin",
        type: "NOTE",
      },
    }),
    prisma.leadEvent.create({
      data: {
        leadId: id,
        type: "NoteAdded",
        meta: { note, author: session.user?.email },
      },
    }),
  ]);

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { notes: true, events: true, tasks: true },
  });
  revalidatePath(`/admin/leads/${id}`);
  return lead ? serializeLead(lead) : null;
}

export async function addTask(
  id: string,
  task: { title: string; dueAt: Date; priority?: "low" | "medium" | "high" }
) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  await prisma.leadTask.create({
    data: {
      leadId: id,
      title: task.title,
      dueAt: task.dueAt,
      priority: (task.priority?.toUpperCase() as any) || "MEDIUM",
      done: false,
    },
  });

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { notes: true, events: true, tasks: true },
  });
  revalidatePath(`/admin/leads/${id}`);
  return lead ? serializeLead(lead) : null;
}

export async function completeTask(leadId: string, taskId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  await prisma.leadTask.update({ where: { id: taskId }, data: { done: true } });

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/tasks");

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { notes: true, events: true, tasks: true },
  });
  return lead ? serializeLead(lead) : null;
}

export async function updateLeadScore(id: string, newScore: number, reason?: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  const newTier = newScore >= 60 ? "HOT" : newScore >= 30 ? "WARM" : "COLD";

  const [lead] = await Promise.all([
    prisma.lead.update({
      where: { id },
      data: { leadScore: newScore, leadTier: newTier as any },
    }),
    prisma.leadEvent.create({
      data: {
        leadId: id,
        type: "ScoreUpdated",
        meta: { newScore, newTier, reason, updatedBy: session.user?.email },
      },
    }),
  ]);

  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/analytics");
  return serializeLead(lead);
}

export async function createLead(data: any) {
  const session = await getServerSession(authOptions);
  const isPublicContactForm = data?.source === "contact-form";
  if (!session && !isPublicContactForm) throw new Error("Unauthorized");

  await connectToDatabase();

  const scored = calculateLeadScore(data);

  const lead = await prisma.lead.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      company: data.company,
      country: data.country,
      timezone: data.timezone,
      serviceCategory: data.serviceCategory,
      serviceInterest: data.serviceInterest,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      techPreference: data.techPreference,
      message: data.message,
      source: data.source || (session ? "admin" : "contact-form"),
      utm: data.utm,
      leadScore: scored.score,
      leadTier: scored.tier as any,
      status: "NEW",
      events: {
        create: [
          {
            type: "LeadCreated",
            meta: {
              source: isPublicContactForm ? "Contact Form" : "Admin Dashboard",
              creator: session?.user?.email || "public",
            },
          },
        ],
      },
    },
    include: { notes: true, events: true, tasks: true },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");
  return serializeLead(lead);
}

export async function deleteLead(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");
  return { ok: true };
}

export async function convertChatToLead(sessionId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  const chat = await prisma.chatSession.findUnique({
    where: { sessionId },
    include: { messages: { orderBy: { timestamp: "asc" } } },
  });
  if (!chat) throw new Error("Chat session not found");

  if (chat.isConverted) {
    const existing = await prisma.lead.findFirst({
      where: { source: `chat:${sessionId}` },
    });
    return existing ? serializeLead(existing) : { alreadyConverted: true };
  }

  const transcript = chat.messages
    .slice(-6)
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n")
    .slice(0, 2000);

  const leadPayload = {
    fullName: chat.contactName || "Chat Visitor",
    email: chat.contactEmail || `${sessionId}@chat.local`,
    serviceCategory: chat.service || "consulting",
    serviceInterest: chat.intent || "inquiry",
    projectType: "chat-conversion",
    budgetRange: chat.budget || "Flexible",
    timeline: "TBD",
    message: transcript || "Converted from chat session",
    source: `chat:${sessionId}`,
  };

  const scored = calculateLeadScore(leadPayload);

  const [lead] = await Promise.all([
    prisma.lead.create({
      data: {
        ...leadPayload,
        company: "",
        leadScore: scored.score,
        leadTier: scored.tier as any,
        status: "NEW",
        events: {
          create: [
            {
              type: "LeadCreated",
              meta: { source: "chat-conversion", sessionId, convertedBy: session.user?.email },
            },
          ],
        },
      },
    }),
    prisma.chatSession.update({ where: { sessionId }, data: { isConverted: true } }),
  ]);

  revalidatePath("/admin/chats");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/analytics");
  return serializeLead(lead);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function serializeLead(lead: any) {
  return JSON.parse(JSON.stringify(lead));
}
