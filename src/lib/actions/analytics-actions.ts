"use server";

import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { startOfDay, subDays, format } from "date-fns";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import * as analyticsEngine from "@/lib/analytics-engine";

export async function getDashboardStats() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const emptyStats = {
    totalLeads: 0,
    newLeads: 0,
    hotLeads: 0,
    avgHotScore: 0,
    recentLeadsCount: 0,
    conversionRate: 0,
    topIndustries: [],
    monthlyTrend: [],
    leadStatusBreakdown: {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL: 0,
      WON: 0,
      LOST: 0,
      SPAM: 0,
    },
  };

  if (!process.env.MONGODB_URI) {
    return emptyStats;
  }

  const db = await connectToDatabase();
  
  if (!db) {
    return emptyStats;
  }

  const totalLeads = await Lead.countDocuments();
  const newLeads = await Lead.countDocuments({ status: "NEW" });
  const leadStatusRaw = await Lead.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  // Calculate average score for "HOT" leads as a proxy for pipeline quality
  const hotLeads = await Lead.find({ leadTier: "HOT" }).select("leadScore");
  const avgHotScore = hotLeads.length > 0
    ? Math.round(hotLeads.reduce((acc, lead) => acc + (lead.leadScore || 0), 0) / hotLeads.length)
    : 0;

  // Recent leads (last 30 days)
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentLeadsCount = await Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

  // Get conversion metrics
  const metrics = await analyticsEngine.getConversionMetrics();
  const conversionRate = Number((metrics as any)?.conversionRate || 0);
  const leadStatusBreakdown = { ...emptyStats.leadStatusBreakdown };
  for (const item of leadStatusRaw) {
    const key = String(item?._id || "").toUpperCase() as keyof typeof leadStatusBreakdown;
    if (key in leadStatusBreakdown) {
      leadStatusBreakdown[key] = Number(item.count || 0);
    }
  }

  return {
    totalLeads,
    hotLeads: hotLeads.length,
    newLeads,
    avgHotScore,
    recentLeadsCount,
    ...metrics,
    conversionRate,
    leadStatusBreakdown,
    kpis: [
      { label: "Total Intake", value: totalLeads, trend: "+12%", type: "neutral" },
      { label: "New Leads", value: newLeads, trend: "Active", type: "primary" },
      { label: "Avg Quality", value: `${avgHotScore}%`, trend: "Hot", type: "success" },
      { label: "30d Volume", value: recentLeadsCount, trend: "+5%", type: "neutral" },
    ]
  };
}

export async function getLeadTrends(range: 7 | 30 | 90 = 30) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  if (!process.env.MONGODB_URI) {
    return Array.from({ length: range }).map((_, i) => {
      const d = subDays(new Date(), range - 1 - i);
      return {
        date: format(d, "yyyy-MM-dd"),
        count: 0,
      };
    });
  }

  const db = await connectToDatabase();
  if (!db) {
    return Array.from({ length: range }).map((_, i) => {
      const d = subDays(new Date(), range - 1 - i);
      return {
        date: format(d, "yyyy-MM-dd"),
        count: 0,
      };
    });
  }

  const since = startOfDay(subDays(new Date(), range - 1));
  const result = await Lead.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const countMap = new Map<string, number>(result.map((row) => [String(row._id), Number(row.count || 0)]));
  return Array.from({ length: range }).map((_, i) => {
    const d = subDays(new Date(), range - 1 - i);
    const key = format(d, "yyyy-MM-dd");
    return { date: key, count: countMap.get(key) || 0 };
  });
}

export async function getCategoryDistribution() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  // Quick development mode check
  if (!process.env.MONGODB_URI) {
    return [];
  }

  const db = await connectToDatabase();
  if (!db) return [];

  await connectToDatabase();

  const distribution = await Lead.aggregate([
    { $group: { _id: "$serviceCategory", value: { $sum: 1 } } },
    { $project: { name: { $toUpper: "$_id" }, value: 1 } },
    { $sort: { value: -1 } }
  ]);

  return distribution.map(item => ({
    ...item,
    name: item.name.replace("-", " ")
  }));
}

export async function getLeadAnalyticsData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return analyticsEngine.getLeadAnalytics();
}

export async function getScoreDistributionData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return analyticsEngine.getScoreDistribution();
}

export async function getRevenueInsightsData() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return analyticsEngine.getRevenueInsights();
}

export async function getActivityTimelineData(days: number = 30) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return analyticsEngine.getActivityTimeline(days);
}

export async function getTopCategoriesData(limit: number = 5) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return analyticsEngine.getTopPerformingCategories(limit);
}

export async function generateReportData(dateRange?: { from: Date; to: Date }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  return analyticsEngine.generateLeadReport(dateRange);
}


