"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";

interface AnalyticsChartProps {
  trends: Array<{ date: string; count: number }>;
}

export function AnalyticsChart({ trends }: AnalyticsChartProps) {
  const totalLeads = trends.reduce((sum, item) => sum + item.count, 0);
  const midpoint = Math.max(1, Math.floor(trends.length / 2));
  const previousTotal = trends.slice(0, midpoint).reduce((sum, item) => sum + item.count, 0);
  const latestTotal = trends.slice(midpoint).reduce((sum, item) => sum + item.count, 0);
  const trend = previousTotal > 0 ? (((latestTotal - previousTotal) / previousTotal) * 100).toFixed(1) : "0.0";
  const directionPrefix = Number(trend) > 0 ? "+" : "";

  return (
    <Card className="admin-card admin-card-hover rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-5 pb-1">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold text-slate-900">Lead Acquisition Flow</CardTitle>
          <p className="text-xs text-slate-500">Daily lead volume over the selected range</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <ArrowUpRight size={12} />
          <span>{directionPrefix}{trend}%</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-5 pt-2 text-xs text-slate-500">{totalLeads.toLocaleString()} total leads</div>
        {totalLeads === 0 ? (
          <div className="grid h-[220px] place-items-center px-5 py-6 text-center">
            <div>
              <p className="text-sm font-medium text-slate-700">No lead activity yet</p>
              <p className="mt-1 text-xs text-slate-500">The chart will appear after leads start coming in.</p>
            </div>
          </div>
        ) : (
          <div className="mt-2 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="analytics-trend-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338CA" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#4338CA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickFormatter={(value) => format(new Date(value), "MMM d")}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 11 }} width={36} />
                <Tooltip
                  labelFormatter={(value) => format(new Date(value), "MMM d, yyyy")}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="#4338CA" strokeWidth={2} fill="url(#analytics-trend-fill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

