"use server";

import { prisma, connectToDatabase } from "@/lib/db";

const EMPTY_PIPELINE = {
  NEW: 0, CONTACTED: 0, QUALIFIED: 0, PROPOSAL: 0, WON: 0,
};

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

export async function getDashboardStats() {
  try {
    if (!process.env.DATABASE_URL) {
      return {
        leadCount: 0, hotLeads: 0, chatCount: 0, draftCount: 0,
        statusPipeline: { ...EMPTY_PIPELINE },
        brandingConfig: { siteName: "Digi Web Crew" },
        recentLeads: [],
        recentEvents: [{ title: "Database not configured", time: "Just now", type: "info" }],
      };
    }

    const db = await connectToDatabase();
    if (!db) {
      return {
        leadCount: 0, hotLeads: 0, chatCount: 0, draftCount: 0,
        statusPipeline: { ...EMPTY_PIPELINE },
        brandingConfig: { siteName: "Digi Web Crew" },
        recentLeads: [], recentEvents: [],
      };
    }

    const [leadCount, hotLeads, chatCount, draftCount, branding, pipeline, recentLeads, recentChats, recentDrafts] =
      await Promise.all([
        prisma.lead.count(),
        prisma.lead.count({ where: { leadTier: "HOT" } }),
        prisma.chatSession.count(),
        prisma.contentDraft.count(),
        prisma.setting.findUnique({ where: { key: "admin.branding" } }),
        prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
        prisma.lead.findMany({
          orderBy: { createdAt: "desc" }, take: 3,
          select: { id: true, fullName: true, budgetRange: true, leadTier: true, createdAt: true },
        }),
        prisma.chatSession.findMany({
          orderBy: { createdAt: "desc" }, take: 3,
          select: { sessionId: true, createdAt: true },
        }),
        prisma.contentDraft.findMany({
          orderBy: { createdAt: "desc" }, take: 3,
          select: { promptKey: true, workflowRunId: true, createdAt: true },
        }),
      ]);

    const statusPipeline = { ...EMPTY_PIPELINE };
    for (const row of pipeline) {
      const key = row.status as keyof typeof statusPipeline;
      if (key in statusPipeline) statusPipeline[key] = row._count.id;
    }

    const recentEvents = [
      ...recentLeads.map((l: any) => ({ title: `New lead: ${l.fullName}`, time: timeAgo(l.createdAt), type: "success" })),
      ...recentChats.map((c: any) => ({ title: "Chat session started", time: timeAgo(c.createdAt), type: "system" })),
      ...recentDrafts.map((d: any) => ({ title: `Draft generated: ${d.promptKey}`, time: timeAgo(d.createdAt), type: d.workflowRunId ? "system" : "success" })),
    ]
      .sort((a, b) => b.time.localeCompare(a.time))
      .slice(0, 4);

    return {
      leadCount, hotLeads, chatCount, draftCount, statusPipeline,
      brandingConfig: (branding?.value as any) || {},
      recentLeads: recentLeads.map((l: any) => ({
        id: l.id,
        name: l.fullName,
        industry: "Other",
        budget: l.budgetRange || "TBD",
        intent: l.leadTier,
      })),
      recentEvents,
    };
  } catch (err) {
    console.error("[DASHBOARD_STATS_ERROR]:", err);
    return {
      leadCount: 0, hotLeads: 0, chatCount: 0, draftCount: 0,
      statusPipeline: { ...EMPTY_PIPELINE },
      brandingConfig: {}, recentLeads: [], recentEvents: [],
    };
  }
}
