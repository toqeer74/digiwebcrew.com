"use server";

import { prisma, connectToDatabase } from "@/lib/db";
import { subDays, startOfDay, format } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const emptyStats = {
  totalLeads: 0, newLeads: 0, hotLeads: 0, avgHotScore: 0,
  recentLeadsCount: 0, conversionRate: 0, topIndustries: [], monthlyTrend: [],
  leadStatusBreakdown: { NEW: 0, CONTACTED: 0, QUALIFIED: 0, PROPOSAL: 0, WON: 0, LOST: 0, SPAM: 0 },
  statusPipeline: { NEW: 0, CONTACTED: 0, QUALIFIED: 0, PROPOSAL: 0, WON: 0 },
};

export async function getDashboardStats() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  if (!process.env.DATABASE_URL) return emptyStats;

  const db = await connectToDatabase();
  if (!db) return emptyStats;

  const thirtyDaysAgo = subDays(new Date(), 30);

  const [totalLeads, newLeads, statusGroups, hotLeadsData, recentLeadsCount, wonLeads, contactedLeads] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
      prisma.lead.findMany({ where: { leadTier: "HOT" }, select: { leadScore: true } }),
      prisma.lead.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.lead.count({ where: { status: "WON" } }),
      prisma.lead.count({ where: { status: { not: "NEW" } } }),
    ]);

  const avgHotScore =
    hotLeadsData.length > 0
      ? Math.round(hotLeadsData.reduce((acc: number, l: any) => acc + (l.leadScore || 0), 0) / hotLeadsData.length)
      : 0;

  const conversionRate = totalLeads > 0 ? Number(((wonLeads / totalLeads) * 100).toFixed(1)) : 0;

  const leadStatusBreakdown = { ...emptyStats.leadStatusBreakdown };
  const statusPipeline = { NEW: 0, CONTACTED: 0, QUALIFIED: 0, PROPOSAL: 0, WON: 0 };

  for (const row of statusGroups) {
    const key = row.status as keyof typeof leadStatusBreakdown;
    if (key in leadStatusBreakdown) leadStatusBreakdown[key] = row._count.id;
    if (key in statusPipeline) (statusPipeline as any)[key] = row._count.id;
  }

  return {
    totalLeads,
    newLeads,
    hotLeads: hotLeadsData.length,
    avgHotScore,
    recentLeadsCount,
    conversionRate,
    topIndustries: [],
    monthlyTrend: [],
    leadStatusBreakdown,
    statusPipeline,
    kpis: [
      { label: "Total Intake", value: totalLeads, trend: "+12%", type: "neutral" },
      { label: "New Leads", value: newLeads, trend: "Active", type: "primary" },
      { label: "Avg Quality", value: `${avgHotScore}%`, trend: "Hot", type: "success" },
      { label: "30d Volume", value: recentLeadsCount, trend: "+5%", type: "neutral" },
    ],
  };
}

export async function getLeadTrends(range: 7 | 30 | 90 = 30) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const empty = Array.from({ length: range }).map((_, i) => ({
    date: format(subDays(new Date(), range - 1 - i), "yyyy-MM-dd"),
    count: 0,
  }));

  if (!process.env.DATABASE_URL) return empty;
  const db = await connectToDatabase();
  if (!db) return empty;

  const since = startOfDay(subDays(new Date(), range - 1));

  // Use Prisma's $queryRaw for date-truncated grouping in PostgreSQL
  const result: Array<{ date: string; count: bigint }> = await prisma.$queryRaw`
    SELECT TO_CHAR(DATE_TRUNC('day', "createdAt"), 'YYYY-MM-DD') AS date,
           COUNT(*)::int AS count
    FROM "Lead"
    WHERE "createdAt" >= ${since}
    GROUP BY DATE_TRUNC('day', "createdAt")
    ORDER BY DATE_TRUNC('day', "createdAt")
  `;

  const countMap = new Map(result.map((r: any) => [r.date, Number(r.count)]));

  return Array.from({ length: range }).map((_, i) => {
    const date = format(subDays(new Date(), range - 1 - i), "yyyy-MM-dd");
    return { date, count: countMap.get(date) || 0 };
  });
}

export async function getCategoryDistribution() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  if (!process.env.DATABASE_URL) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const groups = await prisma.lead.groupBy({
    by: ["serviceCategory"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  return groups.map((g: any) => ({
    name: (g.serviceCategory || "Other").replace(/-/g, " ").toUpperCase(),
    value: g._count.id,
  }));
}

export async function getLeadAnalyticsData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  if (!process.env.DATABASE_URL) return { totalLeads: 0, byTier: {}, byStatus: {}, byCategory: {} };

  const db = await connectToDatabase();
  if (!db) return { totalLeads: 0, byTier: {}, byStatus: {}, byCategory: {} };

  const [total, byTier, byStatus, byCategory] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.groupBy({ by: ["leadTier"], _count: { id: true } }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.lead.groupBy({ by: ["serviceCategory"], _count: { id: true } }),
  ]);

  return {
    totalLeads: total,
    byTier: Object.fromEntries(byTier.map((r: any) => [r.leadTier, r._count.id])),
    byStatus: Object.fromEntries(byStatus.map((r: any) => [r.status, r._count.id])),
    byCategory: Object.fromEntries(byCategory.map((r: any) => [r.serviceCategory, r._count.id])),
  };
}

export async function getScoreDistributionData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  if (!process.env.DATABASE_URL) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const buckets = [
    { label: "0-20", min: 0, max: 20 },
    { label: "21-40", min: 21, max: 40 },
    { label: "41-60", min: 41, max: 60 },
    { label: "61-80", min: 61, max: 80 },
    { label: "81-100", min: 81, max: 100 },
  ];

  return Promise.all(
    buckets.map(async (b: any) => ({
      label: b.label,
      count: await prisma.lead.count({ where: { leadScore: { gte: b.min, lte: b.max } } }),
    }))
  );
}

export async function getRevenueInsightsData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return { message: "Revenue insights not yet implemented for PostgreSQL" };
}

export async function getActivityTimelineData(days = 30) {
  return getLeadTrends(days as 7 | 30 | 90);
}

export async function getTopCategoriesData(limit = 5) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  const dist = await getCategoryDistribution();
  return dist.slice(0, limit);
}

export async function generateReportData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return getDashboardStats();
}
