"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

type StatusDatum = {
  name: string;
  value: number;
};

const COLORS = ["#4338CA", "#0284C7", "#0D9488", "#CA8A04", "#16A34A", "#DC2626", "#7C3AED"];

export function LeadStatusDonut({ data }: { data: StatusDatum[] }) {
  const chartData = data.filter((item) => item.value > 0);

  if (chartData.length === 0) {
    return <p className="text-sm text-slate-500">No status data available.</p>;
  }

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={82} paddingAngle={2}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}


