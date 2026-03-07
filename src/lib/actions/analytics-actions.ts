"use server";

import { connectToDatabase } from "@/lib/db";
import { DatabaseWrapper } from "@/lib/db-wrapper";
import { Lead } from "@/lib/models/lead";
import { startOfDay, subDays, startOfMonth, format } from "date-fns";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import * as analyticsEngine from "@/lib/analytics-engine";

export async function getDashboardStats() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  // Quick development mode check
  if (!process.env.MONGODB_URI) {
    return {
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
        CONVERTED: 0,
        CLOSED: 0
      }
    };
  }

  const db = await connectToDatabase();
  
  // If no database connection, return mock data for development
  if (!db) {
    return {
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
        CONVERTED: 0,
        CLOSED: 0
      }
    };
  }

  const totalLeads = await Lead.countDocuments();
  const newLeads = await Lead.countDocuments({ status: "NEW" });

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

  return {
    totalLeads,
    hotLeads: hotLeads.length,
    newLeads,
    avgHotScore,
    recentLeadsCount,
    ...metrics,
    kpis: [
      { label: "Total Intake", value: totalLeads, trend: "+12%", type: "neutral" },
      { label: "New Leads", value: newLeads, trend: "Active", type: "primary" },
      { label: "Avg Quality", value: `${avgHotScore}%`, trend: "Hot", type: "success" },
      { label: "30d Volume", value: recentLeadsCount, trend: "+5%", type: "neutral" },
    ]
  };
}

export async function getLeadTrends() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  // Quick development mode check
  if (!process.env.MONGODB_URI) {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return {
        name: format(d, "MMM dd"),
        leads: 0
      };
    });
    return last7Days;
  }

  const db = await connectToDatabase();
  
  // If no database connection, return empty trends for development
  if (!db) {
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return {
        name: format(d, "MMM dd"),
        leads: 0
      };
    });
    return last7Days;
  }

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = subDays(new Date(), 6 - i);
    return {
      date: format(d, "MMM dd"),
      rawDate: startOfDay(d),
      count: 0
    };
  });

  const leads = await Lead.find({
    createdAt: { $gte: last7Days[0].rawDate }
  }).select("createdAt");

  leads.forEach(lead => {
    const leadDate = format(lead.createdAt, "MMM dd");
    const day = last7Days.find(d => d.date === leadDate);
    if (day) day.count++;
  });

  return last7Days.map(({ date, count }) => ({ name: date, leads: count }));
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

