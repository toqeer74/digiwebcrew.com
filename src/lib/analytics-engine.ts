// Analytics Engine - Dashboard metrics and reporting

import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";

export async function getLeadAnalytics() {
  try {
    await connectToDatabase();

    const [totalLeads, leadsByTier, leadsByStatus, leadsByCategory] = await Promise.all([
      Lead.countDocuments(),
      Lead.aggregate([
        {
          $group: {
            _id: "$leadTier",
            count: { $sum: 1 },
          },
        },
      ]),
      Lead.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
      Lead.aggregate([
        {
          $group: {
            _id: "$serviceCategory",
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    return {
      totalLeads,
      byTier: Object.fromEntries(leadsByTier.map((item) => [item._id, item.count])),
      byStatus: Object.fromEntries(leadsByStatus.map((item) => [item._id, item.count])),
      byCategory: Object.fromEntries(leadsByCategory.map((item) => [item._id, item.count])),
    };
  } catch (error) {
    console.error("Analytics error:", error);
    return { totalLeads: 0, byTier: {}, byStatus: {}, byCategory: {} };
  }
}

export async function getConversionMetrics() {
  try {
    await connectToDatabase();

    const total = await Lead.countDocuments();
    const contacted = await Lead.countDocuments({ status: { $ne: "NEW" } });
    const qualified = await Lead.countDocuments({ status: { $in: ["QUALIFIED", "PROPOSAL", "WON"] } });
    const won = await Lead.countDocuments({ status: "WON" });

    return {
      total,
      contactedRate: total > 0 ? ((contacted / total) * 100).toFixed(1) + "%" : "0%",
      qualificationRate: total > 0 ? ((qualified / total) * 100).toFixed(1) + "%" : "0%",
      closureRate: total > 0 ? ((won / total) * 100).toFixed(1) + "%" : "0%",
      qualified,
      won,
    };
  } catch (error) {
    console.error("Conversion metrics error:", error);
    return { total: 0, contactedRate: "0%", qualificationRate: "0%", closureRate: "0%", qualified: 0, won: 0 };
  }
}

export async function getScoreDistribution() {
  try {
    await connectToDatabase();

    const distribution = await Lead.aggregate([
      {
        $bucket: {
          groupBy: "$leadScore",
          boundaries: [0, 20, 40, 60, 80, 100],
          default: "Others",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    return distribution;
  } catch (error) {
    console.error("Score distribution error:", error);
    return [];
  }
}

export async function getRevenueInsights() {
  try {
    await connectToDatabase();

    const budgetAnalysis = await Lead.aggregate([
      {
        $group: {
          _id: "$budgetRange",
          count: { $sum: 1 },
          avgScore: { $avg: "$leadScore" },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const tierInsights = await Lead.aggregate([
      {
        $group: {
          _id: "$leadTier",
          avgBudget: { $push: "$budgetRange" },
          count: { $sum: 1 },
        },
      },
    ]);

    return { budgetAnalysis, tierInsights };
  } catch (error) {
    console.error("Revenue insights error:", error);
    return { budgetAnalysis: [], tierInsights: [] };
  }
}

export async function getActivityTimeline(days: number = 30) {
  try {
    await connectToDatabase();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const timeline = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          leads: { $sum: 1 },
          avgScore: { $avg: "$leadScore" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return timeline;
  } catch (error) {
    console.error("Activity timeline error:", error);
    return [];
  }
}

export async function getTopPerformingCategories(limit: number = 5) {
  try {
    await connectToDatabase();

    const categories = await Lead.aggregate([
      {
        $group: {
          _id: "$serviceCategory",
          leadCount: { $sum: 1 },
          avgScore: { $avg: "$leadScore" },
          conversionCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "WON"] }, 1, 0],
            },
          },
        },
      },
      {
        $addFields: {
          conversionRate: {
            $multiply: [{ $divide: ["$conversionCount", "$leadCount"] }, 100],
          },
        },
      },
      { $sort: { conversionCount: -1 } },
      { $limit: limit },
    ]);

    return categories;
  } catch (error) {
    console.error("Top categories error:", error);
    return [];
  }
}

export async function generateLeadReport(dateRange?: { from: Date; to: Date }) {
  try {
    await connectToDatabase();

    const query: any = {};
    if (dateRange) {
      query.createdAt = {
        $gte: dateRange.from,
        $lte: dateRange.to,
      };
    }

    const leads = await Lead.find(query).lean();
    const totalLeads = leads.length;
    const hotLeads = leads.filter((l) => l.leadTier === "HOT").length;
    const warmLeads = leads.filter((l) => l.leadTier === "WARM").length;
    const coldLeads = leads.filter((l) => l.leadTier === "COLD").length;

    const avgScore = leads.reduce((sum, l) => sum + l.leadScore, 0) / totalLeads || 0;
    const highValueLeads = leads.filter((l) => l.budgetRange && l.budgetRange.includes("50k")).length;

    return {
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      avgScore: avgScore.toFixed(1),
      highValueLeads,
      reportDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Report generation error:", error);
    return null;
  }
}
