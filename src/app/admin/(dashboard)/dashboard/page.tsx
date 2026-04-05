import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/dashboard-actions";
import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { ArrowRight, Users, MessageSquare, FileText, Zap } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { DashboardQuickActions } from "@/components/admin/dashboard-quick-actions";
import { RefreshButton } from "@/components/admin/refresh-button";

const PIPELINE_KEYS = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON"] as const;
const PIPELINE_COLORS: Record<string, string> = {
  NEW: "var(--adm-primary)", CONTACTED: "var(--adm-accent)",
  QUALIFIED: "var(--adm-purple)", PROPOSAL: "var(--adm-warning)", WON: "var(--adm-success)",
};

const STATS = [
  { key: "leadCount",  label: "Total Leads",  icon: Users,         cls: "adm-primary", meta: "↑ 12% vs last month",   trendDir: "up",   sparkH: [60,72,65,80,88,92,100,110,115,120,130,142] },
  { key: "chatCount",  label: "Active Chats", icon: MessageSquare, cls: "adm-accent",  meta: "↑ 5 today",             trendDir: "up",   sparkH: [8,11,9,13,10,14,12,16,15,17,16,18] },
  { key: "draftCount", label: "Drafts",       icon: FileText,      cls: "adm-warning", meta: "3 pending review",      trendDir: "down", sparkH: [2,3,2,4,3,5,4,4,5,5,6,6] },
  { key: "siteName",   label: "Site Name",    icon: Zap,           cls: "adm-purple",  meta: "Configured",            trendDir: "up",   sparkH: [] },
];

export default async function DashboardPage() {
  const data = await getDashboardStats();
  const statValues: Record<string, any> = {
    leadCount:  data.leadCount,
    chatCount:  data.chatCount,
    draftCount: data.draftCount,
    siteName:   data.brandingConfig?.siteName || "Digi Web Crew",
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of leads, activity, and pipeline status."
        breadcrumb={[{ label: "Dashboard" }]}
        actions={<RefreshButton />}
      />

      {/* ── Stat cards ── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}
        className="grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ key, label, icon: Icon, cls, meta, trendDir, sparkH }) => {
          const val = statValues[key];
          const max = sparkH.length ? Math.max(...sparkH, 1) : 1;
          return (
            <div key={key} className={`admin-stat-card ${cls}`}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span className="admin-stat-label">{label}</span>
                <div className="admin-stat-icon"><Icon size={16} /></div>
              </div>
              <p className="admin-stat-value">
                {typeof val === "number" ? val.toLocaleString() : val}
              </p>
              <div className="admin-stat-meta">
                <span className={`admin-stat-trend ${trendDir}`}>{trendDir === "up" ? "↑" : "↓"}</span>
                <span>{meta}</span>
              </div>
              {sparkH.length > 0 && (
                <div className="admin-sparkline" style={{ marginTop: 8 }}>
                  {sparkH.map((h, i) => (
                    <div key={i} className="admin-spark-bar" style={{ height: `${Math.max(10, Math.round((h/max)*100))}%` }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ── Lead Pipeline ── */}
      <ACard>
        <ACardHeader>
          <ACardTitle>Lead Status Pipeline</ACardTitle>
          <span className="adm-badge adm-badge-primary">Live</span>
        </ACardHeader>
        <ACardBody>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
            {PIPELINE_KEYS.map((key) => (
              <div key={key} className="adm-pipeline-col">
                <p style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", marginBottom: 6 }}>{key}</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: PIPELINE_COLORS[key] }}>{data.statusPipeline?.[key] || 0}</p>
              </div>
            ))}
          </div>
        </ACardBody>
      </ACard>

      {/* ── Recent Leads + Activity ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22 }} className="grid-cols-1 xl:grid-cols-12">
        <ACard>
          <ACardHeader>
            <ACardTitle>Recent Leads</ACardTitle>
            <Link href="/admin/leads" className="adm-btn adm-btn-ghost adm-btn-sm inline-flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </ACardHeader>
          <ACardBody style={{ padding: 0 }}>
            {!(data.recentLeads || []).length ? (
              <div style={{ padding: "48px 24px", textAlign: "center", color: "var(--adm-text-muted)", fontSize: 13 }}>No recent leads.</div>
            ) : (
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Industry</th><th>Budget</th><th>Intent</th></tr></thead>
                <tbody>
                  {(data.recentLeads || []).map((lead: any) => (
                    <tr key={lead.id || lead.name}>
                      <td>
                        <Link href={`/admin/leads/${lead.id}`} style={{ fontWeight: 600, color: "var(--adm-primary)" }}>{lead.name}</Link>
                        <div style={{ fontSize: 11.5, color: "var(--adm-text-muted)", marginTop: 1 }}>{lead.email || lead.industry}</div>
                      </td>
                      <td style={{ color: "var(--adm-text-dim)" }}>{lead.industry || "General"}</td>
                      <td style={{ fontFamily: "var(--adm-mono)", fontSize: 12 }}>{lead.budget || "TBD"}</td>
                      <td>
                        <span className={`adm-badge ${lead.intent==="HOT"?"adm-badge-danger":lead.intent==="WARM"?"adm-badge-warning":"adm-badge-muted"}`}>
                          {lead.intent || "COLD"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </ACardBody>
        </ACard>

        <ACard>
          <ACardHeader>
            <ACardTitle>Activity Feed</ACardTitle>
            <span className="adm-badge adm-badge-muted">Today</span>
          </ACardHeader>
          <ACardBody>
            {!(data.recentEvents || []).length ? (
              <p style={{ fontSize: 13, color: "var(--adm-text-muted)" }}>No recent activity.</p>
            ) : (
              (data.recentEvents || []).map((event: any, i: number) => (
                <div key={`${event.title}-${i}`} className="adm-activity-item">
                  <div className="adm-activity-dot" />
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--adm-text)" }}>{event.title}</p>
                    <p style={{ fontSize: 11.5, color: "var(--adm-text-muted)", marginTop: 2, fontFamily: "var(--adm-mono)" }}>{event.time}</p>
                  </div>
                </div>
              ))
            )}
          </ACardBody>
        </ACard>
      </div>

      {/* ── Quick Actions ── */}
      <ACard>
        <ACardHeader><ACardTitle>Quick Actions</ACardTitle></ACardHeader>
        <DashboardQuickActions />
      </ACard>
    </div>
  );
}
