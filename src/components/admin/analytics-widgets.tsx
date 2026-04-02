"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from "recharts";
import { ArrowUpRight, TrendingUp, Users, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, trend, type }: any) {
  const Icon = type === "primary" ? Users : type === "success" ? Zap : Target;
  
  return (
    <div className="bg-white border-border border rounded-[2.5rem] p-10 shadow-xl shadow-primary/5 group hover:scale-[1.02] transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-8">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
          type === "primary" ? "bg-primary/10 text-primary shadow-primary/5" :
          type === "success" ? "bg-emerald-100 text-emerald-600 shadow-emerald-500/5" :
          "bg-secondary text-muted-foreground"
        )}>
          <Icon size={28} />
        </div>
        <div className="flex items-center gap-1 text-[11px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full">
          <ArrowUpRight size={12} />
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">{label}</h3>
        <p className="text-4xl font-black tracking-tighter text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function TrendChart({ data }: { data: any[] }) {
  return (
    <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold mb-1">Lead Velocity</h3>
          <p className="text-xs text-muted-foreground">Inbound laboratory intake over the last 7 days.</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
          <TrendingUp size={20} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 900, fill: 'hsl(var(--muted-foreground))' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fontWeight: 900, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))',
              borderRadius: '1rem',
              fontSize: '12px',
              fontWeight: 'bold'
            }} 
          />
          <Area 
            type="monotone" 
            dataKey="leads" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorLeads)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const COLORS = ['hsl(var(--primary))', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function DistributionChart({ data }: { data: any[] }) {
  return (
    <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm h-[400px]">
       <div className="mb-8">
          <h3 className="text-xl font-bold mb-1">Lab Performance</h3>
          <p className="text-xs text-muted-foreground">Volume distribution across service categories.</p>
       </div>
       <ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={280}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
             <XAxis type="number" hide />
             <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 900, fill: 'hsl(var(--muted-foreground))' }}
                width={100}
             />
             <Tooltip cursor={{ fill: 'transparent' }} />
             <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
             </Bar>
          </BarChart>
       </ResponsiveContainer>
    </div>
  );
}

