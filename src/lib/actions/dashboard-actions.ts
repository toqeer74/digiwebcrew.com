"use server";

import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { ChatSession } from "@/lib/models/chat";
import { ContentDraft } from "@/lib/models/content-draft";
import { Setting } from "@/lib/models/setting";

export async function getDashboardStats() {
  try {
    // Quick development mode check
    if (!process.env.MONGODB_URI) {
      return {
        leadCount: 0,
        chatCount: 0,
        draftCount: 0,
        brandingConfig: { siteName: "Software Lab" },
        recentLeads: [],
        recentEvents: [
          { title: "Database connection disabled in development", time: "Just now", type: "info" }
        ]
      };
    }

    const db = await connectToDatabase();
    
    // If no database connection, return mock data for development
    if (!db) {
      return {
        leadCount: 0,
        chatCount: 0,
        draftCount: 0,
        brandingConfig: { siteName: "Software Lab" },
        recentLeads: [],
        recentEvents: [
          { title: "Database connection unavailable", time: "Just now", type: "warning" }
        ]
      };
    }

    const [leadCount, chatCount, draftCount, branding] = await Promise.all([
      Lead.countDocuments(),
      ChatSession.countDocuments(),
      ContentDraft.countDocuments(),
      Setting.findOne({ key: "admin.branding" }).lean(),
    ]);

    const recentLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select({ fullName: 1, industry: 1, budgetRange: 1, leadTier: 1, createdAt: 1 })
      .lean();

    const recentChats = await ChatSession.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select({ sessionId: 1, createdAt: 1, leadScore: 1 })
      .lean();

    const recentDrafts = await ContentDraft.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select({ promptKey: 1, workflowRunId: 1, createdAt: 1 })
      .lean();

    const recentEvents = [
      ...(recentLeads.map((l: any) => ({
        title: `New lead: ${l.fullName || "Unknown"}`,
        time: timeAgo(l.createdAt),
        type: "success",
      })) || []),
      ...(recentChats.map((c: any) => ({
        title: `Chat session started`,
        time: timeAgo(c.createdAt),
        type: "system",
      })) || []),
      ...(recentDrafts.map((d: any) => ({
        title: `Draft generated: ${d.promptKey}`,
        time: timeAgo(d.createdAt),
        type: d.workflowRunId ? "system" : "success",
      })) || []),
    ]
      .sort((a, b) => b.time.localeCompare(a.time))
      .slice(0, 4);

    const brandingConfig = (branding?.value as any) || {};

    return {
      leadCount,
      chatCount,
      draftCount,
      brandingConfig,
      recentLeads: recentLeads.map((l: any) => ({
        name: l.fullName || "Unknown",
        industry: l.industry || "Other",
        budget: l.budgetRange || "TBD",
        intent: l.leadTier || "COLD",
      })),
      recentEvents,
    };
  } catch {
    return {
      leadCount: 0,
      chatCount: 0,
      draftCount: 0,
      brandingConfig: {},
      recentLeads: [],
      recentEvents: [],
    };
  }
}

function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 2) return "1 min ago";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
