// Analytics Engine — PostgreSQL/Prisma version
import { prisma, connectToDatabase } from "@/lib/db";

export async function getLeadAnalytics() {
  try {
    await connectToDatabase();
    const [totalLeads, byTier, byStatus, byCategory] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({ by: ["leadTier"], _count: { id: true } }),
      prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
      prisma.lead.groupBy({ by: ["serviceCategory"], _count: { id: true } }),
    ]);
    return {
      totalLeads,
      byTier: Object.fromEntries(byTier.map((r) => [r.leadTier, r._count.id])),
      byStatus: Object.fromEntries(byStatus.map((r) => [r.status, r._count.id])),
      byCategory: Object.fromEntries(byCategory.map((r) => [r.serviceCategory, r._count.id])),
    };
  } catch {
    return { totalLeads: 0, byTier: {}, byStatus: {}, byCategory: {} };
  }
}

export async function getConversionMetrics() {
  try {
    await connectToDatabase();
    const [total, contacted, qualified, won] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: { not: "NEW" } } }),
      prisma.lead.count({ where: { status: { in: ["QUALIFIED", "PROPOSAL", "WON"] } } }),
      prisma.lead.count({ where: { status: "WON" } }),
    ]);
    return {
      total,
      contactedRate: total > 0 ? ((contacted / total) * 100).toFixed(1) + "%" : "0%",
      qualificationRate: total > 0 ? ((qualified / total) * 100).toFixed(1) + "%" : "0%",
      closureRate: total > 0 ? ((won / total) * 100).toFixed(1) + "%" : "0%",
      conversionRate: total > 0 ? Number(((won / total) * 100).toFixed(1)) : 0,
      qualified,
      won,
    };
  } catch {
    return { total: 0, contactedRate: "0%", qualificationRate: "0%", closureRate: "0%", conversionRate: 0, qualified: 0, won: 0 };
  }
}

export async function getScoreDistribution() {
  try {
    await connectToDatabase();
    const buckets = [
      { label: "0-20", min: 0, max: 20 },
      { label: "21-40", min: 21, max: 40 },
      { label: "41-60", min: 41, max: 60 },
      { label: "61-80", min: 61, max: 80 },
      { label: "81-100", min: 81, max: 100 },
    ];
    return Promise.all(
      buckets.map(async (b) => ({
        label: b.label,
        count: await prisma.lead.count({ where: { leadScore: { gte: b.min, lte: b.max } } }),
      }))
    );
  } catch {
    return [];
  }
}

export async function getRevenueInsights() {
  return { message: "Revenue insights not yet implemented" };
}

export async function getActivityTimeline(days = 30) {
  try {
    await connectToDatabase();
    const since = new Date(Date.now() - days * 86400000);
    const result: Array<{ date: string; count: bigint }> = await prisma.$queryRaw`
      SELECT TO_CHAR(DATE_TRUNC('day', "createdAt"), 'YYYY-MM-DD') AS date,
             COUNT(*)::int AS count
      FROM "Lead"
      WHERE "createdAt" >= ${since}
      GROUP BY DATE_TRUNC('day', "createdAt")
      ORDER BY DATE_TRUNC('day', "createdAt")
    `;
    return result.map((r) => ({ date: r.date, count: Number(r.count) }));
  } catch {
    return [];
  }
}

export async function getTopPerformingCategories(limit = 5) {
  try {
    await connectToDatabase();
    const groups = await prisma.lead.groupBy({
      by: ["serviceCategory"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: limit,
    });
    return groups.map((g) => ({ name: g.serviceCategory, count: g._count.id }));
  } catch {
    return [];
  }
}

export async function generateLeadReport() {
  try {
    await connectToDatabase();
    const [total, byTier, byStatus] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.groupBy({ by: ["leadTier"], _count: { id: true } }),
      prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    ]);
    return {
      generatedAt: new Date().toISOString(),
      totalLeads: total,
      byTier: Object.fromEntries(byTier.map((r) => [r.leadTier, r._count.id])),
      byStatus: Object.fromEntries(byStatus.map((r) => [r.status, r._count.id])),
    };
  } catch {
    return {};
  }
}
