"use client";

import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, TrendingDown } from "lucide-react";
import { format } from "date-fns";

interface AnalyticsChartProps {
  trends: Array<{ date: string; count: number }>;
}

export function AnalyticsChart({ trends }: AnalyticsChartProps) {
  const totalLeads = trends.reduce((sum, item) => sum + item.count, 0);
  const mid = Math.max(1, Math.floor(trends.length / 2));
  const prev = trends.slice(0, mid).reduce((s, i) => s + i.count, 0);
  const latest = trends.slice(mid).reduce((s, i) => s + i.count, 0);
  const trendPct = prev > 0 ? (((latest - prev) / prev) * 100).toFixed(1) : "0.0";
  const isUp = Number(trendPct) >= 0;
  const prefix = isUp ? "+" : "";

  return (
    <ACard hover>
      <ACardHeader>
        <div>
          <ACardTitle>Lead Acquisition Flow</ACardTitle>
          <p style={{ fontSize: 12, color: "var(--adm-text-muted)", marginTop: 2 }}>
            Daily lead volume · {totalLeads.toLocaleString()} total
          </p>
        </div>
        <div
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1"
          style={{
            background: isUp ? "var(--adm-success-dim)" : "var(--adm-danger-dim)",
            color: isUp ? "#065f46" : "#991b1b",
            fontSize: 12, fontWeight: 700,
          }}
        >
          {isUp ? <ArrowUpRight size={13} /> : <TrendingDown size={13} />}
          {prefix}{trendPct}%
        </div>
      </ACardHeader>

      <ACardBody style={{ paddingTop: 12 }}>
        {totalLeads === 0 ? (
          <div
            className="grid min-h-[200px] place-items-center rounded-xl text-center"
            style={{ background: "var(--adm-bg)", border: "1.5px dashed var(--adm-border)" }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--adm-text-dim)" }}>No lead activity yet</p>
              <p style={{ fontSize: 12.5, color: "var(--adm-text-muted)", marginTop: 4 }}>
                The chart will populate once leads start arriving.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="adm-trend-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--adm-primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--adm-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--adm-border)" />
                <XAxis
                  dataKey="date"
                  axisLine={false} tickLine={false}
                  tick={{ fill: "var(--adm-text-muted)", fontSize: 11, fontFamily: "var(--adm-mono)" }}
                  tickFormatter={(v) => format(new Date(v), "MMM d")}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fill: "var(--adm-text-muted)", fontSize: 11 }}
                  width={32}
                />
                <Tooltip
                  labelFormatter={(v) => format(new Date(v), "MMM d, yyyy")}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1.5px solid var(--adm-border)",
                    boxShadow: "var(--adm-shadow-md)",
                    fontFamily: "var(--adm-font)",
                    fontSize: 13,
                  }}
                  itemStyle={{ color: "var(--adm-primary)", fontWeight: 700 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="var(--adm-primary)"
                  strokeWidth={2.5}
                  fill="url(#adm-trend-fill)"
                  dot={false}
                  activeDot={{ r: 5, fill: "var(--adm-primary)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </ACardBody>
    </ACard>
  );
}
