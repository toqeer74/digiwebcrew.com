import Link from "next/link";
import { getDashboardStats, getLeadTrends, getCategoryDistribution } from "@/lib/actions/analytics-actions";
import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { LeadStatusDonut } from "@/components/admin/lead-status-donut";
import { PageHeader } from "@/components/admin/page-header";
import { Users, UserPlus, Flame, TrendingUp } from "lucide-react";

type SearchParams = Promise<{ range?: string }>;
const RANGE_OPTIONS = [7, 30, 90] as const;

const PIPELINE_KEYS = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON"] as const;
const PIPELINE_COLORS: Record<string, string> = {
  NEW: "var(--adm-primary)", CONTACTED: "var(--adm-accent)",
  QUALIFIED: "var(--adm-purple)", PROPOSAL: "var(--adm-warning)", WON: "var(--adm-success)",
};

const SERVICE_BARS = [
  { name: "Web Development", pct: 42, color: "linear-gradient(90deg,var(--adm-primary),var(--adm-primary-soft))" },
  { name: "UI/UX Design",    pct: 28, color: "linear-gradient(90deg,var(--adm-success),#34d399)" },
  { name: "SEO & Marketing", pct: 18, color: "linear-gradient(90deg,var(--adm-warning),#fbbf24)" },
  { name: "E-commerce",      pct: 12, color: "linear-gradient(90deg,var(--adm-purple),#a78bfa)" },
];

export default async function AnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
  const { range } = await searchParams;
  const selectedRange = RANGE_OPTIONS.includes(Number(range) as 7|30|90) ? (Number(range) as 7|30|90) : 30;

  const [statsData, trends, distribution] = await Promise.all([
    getDashboardStats(),
    getLeadTrends(selectedRange),
    getCategoryDistribution(),
  ]);

  const statusEntries = Object.entries(statsData.leadStatusBreakdown || {});
  const statusChartData = statusEntries.map(([name, value]) => ({ name, value: Number(value) || 0 }));

  const STATS = [
    { label: "Total Leads",     value: statsData.totalLeads,    icon: Users,       cls: "adm-primary", meta: "↑ 18% vs previous", trendDir: "up" },
    { label: "New Leads",       value: statsData.newLeads,      icon: UserPlus,    cls: "adm-accent",  meta: "↑ 5 this week",     trendDir: "up" },
    { label: "Hot Leads",       value: statsData.hotLeads,      icon: Flame,       cls: "adm-danger",  meta: "↑ 3 high priority", trendDir: "up" },
    { label: "Conversion Rate", value: `${Math.round(Number(statsData.conversionRate||0))}%`, icon: TrendingUp, cls: "adm-success", meta: "↑ 4% this period", trendDir: "up" },
  ];

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Analytics"
        subtitle="Live lead performance and quality trends."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Analytics" }]}
        actions={
          <div className="adm-pill-tabs">
            {RANGE_OPTIONS.map((opt) => (
              <Link key={opt} href={`?range=${opt}`} className={`adm-pill-tab${selectedRange===opt?" active":""}`}>
                {opt} Days
              </Link>
            ))}
          </div>
        }
      />

      {/* ── Stat cards ── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
        {STATS.map(({ label, value, icon: Icon, cls, meta, trendDir }) => (
          <div key={label} className={`admin-stat-card ${cls}`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="admin-stat-label">{label}</span>
              <div className="admin-stat-icon"><Icon size={16} /></div>
            </div>
            <p className="admin-stat-value">{typeof value === "number" ? value.toLocaleString() : value}</p>
            <div className="admin-stat-meta">
              <span className={`admin-stat-trend ${trendDir}`}>{trendDir === "up" ? "↑" : "↓"}</span>
              <span>{meta}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Lead Trends chart + Service Distribution ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22 }}>
        <AnalyticsChart trends={trends} />

        <ACard>
          <ACardHeader>
            <ACardTitle>Service Distribution</ACardTitle>
          </ACardHeader>
          <ACardBody>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(distribution.length > 0 ? distribution.map((item: any) => ({ name: item.name, pct: item.value })) : SERVICE_BARS).map((item: any) => (
                <div key={item.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--adm-text-dim)" }}>{item.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--adm-text)", fontFamily: "var(--adm-mono)" }}>{item.pct || item.value}%</span>
                  </div>
                  <div className="adm-bar-bg">
                    <div className="adm-bar-fill" style={{ width: `${item.pct || item.value}%`, background: item.color || "linear-gradient(90deg,var(--adm-primary),var(--adm-accent))" }} />
                  </div>
                </div>
              ))}
            </div>
          </ACardBody>
        </ACard>
      </div>

      {/* ── Status Breakdown pipeline ── */}
      <ACard>
        <ACardHeader>
          <ACardTitle>Status Breakdown</ACardTitle>
        </ACardHeader>
        <ACardBody>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
            {PIPELINE_KEYS.map((key) => (
              <div key={key} className="adm-pipeline-col">
                <p style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", marginBottom: 6 }}>{key}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: PIPELINE_COLORS[key] }}>
                  {statsData.statusPipeline?.[key] ?? statsData.leadStatusBreakdown?.[key] ?? 0}
                </p>
              </div>
            ))}
          </div>
        </ACardBody>
      </ACard>

      {/* ── Lead Status Donut + Avg Score ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        <ACard>
          <ACardHeader><ACardTitle>Lead Status Breakdown</ACardTitle></ACardHeader>
          <ACardBody>
            <LeadStatusDonut data={statusChartData} />
            {statusEntries.length === 0 && <p style={{ fontSize: 13, color: "var(--adm-text-muted)" }}>No status data available.</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {statusEntries.map(([status, count]) => (
                <div key={status}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--adm-text-dim)" }}>{status}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--adm-text)", fontFamily: "var(--adm-mono)" }}>{Number(count).toLocaleString()}</p>
                  </div>
                  <div className="adm-progress-wrap">
                    <div className="adm-progress-bar" style={{ width: `${statsData.totalLeads ? Math.max(6,(Number(count)/statsData.totalLeads)*100) : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </ACardBody>
        </ACard>

        <ACard>
          <ACardHeader><ACardTitle>Average Lead Score</ACardTitle></ACardHeader>
          <ACardBody>
            <p style={{ fontSize: 13, color: "var(--adm-text-dim)", marginBottom: 12 }}>Quality of high-intent leads</p>
            <p style={{ fontSize: 40, fontWeight: 800, color: "var(--adm-primary)", letterSpacing: -2, marginBottom: 12 }}>
              {statsData.avgHotScore}%
            </p>
            <div className="adm-progress-wrap" style={{ height: 12 }}>
              <div className="adm-progress-bar" style={{ width: `${Math.min(100, Number(statsData.avgHotScore||0))}%` }} />
            </div>
          </ACardBody>
        </ACard>
      </div>
    </div>
  );
}
