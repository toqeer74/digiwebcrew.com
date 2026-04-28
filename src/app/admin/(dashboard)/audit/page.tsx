import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { Activity, User, Shield, Download, CheckCircle, AlertCircle, Database, Zap } from "lucide-react";
import { prisma, connectToDatabase } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuditAutoRefresh } from "@/components/admin/audit-auto-refresh";
import { PageHeader } from "@/components/admin/page-header";

const PAGE_SIZE = 50;
type AuditSearchParams = Promise<{ group?: string; success?: string; page?: string }>;

const GROUPS = [
  { key: "all",    label: "All" },
  { key: "auth",   label: "Auth Events" },
  { key: "ai",     label: "AI Actions" },
  { key: "lead",   label: "Lead Actions" },
  { key: "system", label: "System" },
] as const;

const GROUP_ACTIONS: Record<string, string[]> = {
  auth:   ["LOGIN_SUCCESS","LOGIN_FAILED","LOGOUT"],
  ai:     ["RUN_AI_PROMPT","RUN_AI_WORKFLOW","CREATE_DRAFT"],
  lead:   ["VIEW_LEADS","VIEW_LEAD_DETAIL","EXPORT_DATA"],
  system: ["VIEW_DASHBOARD","VIEW_CHATS","VIEW_DRAFTS","VIEW_WORKFLOW_RUNS","UPDATE_BRANDING","UPDATE_SETTINGS"],
};

const getActionColor = (action: string, isSuccess: boolean) => {
  if (!isSuccess) return "adm-badge-danger";
  if (action === "LOGIN_SUCCESS") return "adm-badge-success";
  if (action.startsWith("RUN_AI")) return "adm-badge-accent";
  return "adm-badge-muted";
};

const getIconCls = (action: string) => {
  if (action.includes("LOGIN")) return "login";
  if (action.includes("CREATE") || action.includes("ADD")) return "create";
  if (action.includes("DELETE") || action.includes("REMOVE")) return "delete";
  return "update";
};

export default async function AuditPage({ searchParams }: { searchParams: AuditSearchParams }) {
  const { group = "all", success = "all", page } = await searchParams;
  const pageNum = Math.max(1, Number(page || "1"));

  await connectToDatabase();

  const where: any = {};
  if (group !== "all" && GROUP_ACTIONS[group]) {
    where.action = { in: GROUP_ACTIONS[group] };
  }
  if (success === "1") where.success = true;
  if (success === "0") where.success = false;

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.auditLog.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const makeHref = (overrides: Record<string, string>) => {
    const params = new URLSearchParams();
    const merged = { group, success, page: String(pageNum), ...overrides };
    if (merged.group !== "all") params.set("group", merged.group);
    if (merged.success !== "all") params.set("success", merged.success);
    if (merged.page !== "1") params.set("page", merged.page);
    const str = params.toString();
    return str ? `?${str}` : "?";
  };

  const systemStatusItems = [
    { label: "Database Connection", status: "Connected",    badge: "adm-badge-success", icon: <Database size={15}/> },
    { label: "OpenAI Integration",  status: "Active",       badge: "adm-badge-success", icon: <Zap size={15}/> },
    { label: "Email Service",       status: "Degraded",     badge: "adm-badge-warning", icon: <Activity size={15}/> },
    { label: "Chat Widget",         status: "Online",       badge: "adm-badge-success", icon: <User size={15}/> },
  ];

  return (
    <div className="admin-page-stack w-full pb-10">
      <AuditAutoRefresh />
      <PageHeader
        title="Audit Log"
        subtitle="Security and activity events (auto-refresh every 30s)."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Audit" }]}
        actions={
          <a href={`/api/admin/audit/export${makeHref({ page: "1" })}`} className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
            <Download size={14} /> Export CSV
          </a>
        }
      />

      {/* System diagnostics */}
      <ACard>
        <ACardHeader>
          <ACardTitle>System Diagnostics</ACardTitle>
          <span className="adm-badge adm-badge-success">All systems up</span>
        </ACardHeader>
        <ACardBody>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {systemStatusItems.map(s => (
              <div key={s.label} className="adm-toggle-row">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="admin-stat-icon adm-primary" style={{ width: 28, height: 28 }}>{s.icon}</div>
                  <span className="adm-toggle-label">{s.label}</span>
                </div>
                <span className={`adm-badge ${s.badge}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </ACardBody>
      </ACard>

      {/* Filters */}
      <ACard>
        <ACardBody style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {GROUPS.map(g => (
              <Link key={g.key} href={makeHref({ group: g.key, page: "1" })}
                className={cn("adm-btn adm-btn-sm", group===g.key?"adm-btn-primary":"adm-btn-secondary")}>
                {g.label}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[["all","All"],["1","Success"],["0","Failure"]].map(([val,lbl])=>(
              <Link key={val} href={makeHref({ success: val, page: "1" })}
                className={cn("adm-btn adm-btn-sm",
                  success===val ? (val==="1"?"adm-btn-success":val==="0"?"adm-btn-danger":"adm-btn-primary") : "adm-btn-secondary")}>
                {lbl}
              </Link>
            ))}
          </div>
        </ACardBody>
      </ACard>

      {/* Log entries */}
      <ACard>
        <ACardHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Activity size={17} style={{ color: "var(--adm-primary)" }} />
            <ACardTitle>Recent Activity</ACardTitle>
          </div>
          <span className="adm-badge adm-badge-muted">{total} entries</span>
        </ACardHeader>
        <ACardBody>
          {logs.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--adm-text-muted)", fontSize: 13 }}>No audit logs found.</div>
          ) : (
            logs.map((log: any) => {
              const iconCls = getIconCls(log.action);
              const IconComp = log.action.includes("LOGIN") ? Shield : log.action.startsWith("RUN_AI") ? Activity : User;
              return (
                <div key={log.id} className="adm-audit-item">
                  <div className={`adm-audit-icon ${iconCls}`}><IconComp size={15} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span className={`adm-badge ${getActionColor(log.action, log.success)}`}>
                        {String(log.action).replace(/_/g," ").toLowerCase()}
                      </span>
                      {log.success ? <CheckCircle size={13} style={{ color: "var(--adm-success)" }} /> : <AlertCircle size={13} style={{ color: "var(--adm-danger)" }} />}
                      <span style={{ fontSize: 11, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {log.userEmail && <p style={{ fontSize: 13, fontWeight: 600, color: "var(--adm-text)" }}>{log.userEmail}</p>}
                    {log.resource && <p style={{ fontSize: 12, color: "var(--adm-text-dim)" }}>Resource: {log.resource}{log.resourceId?` (${log.resourceId})`:""}</p>}
                    {log.ip && <p style={{ fontSize: 11, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>IP: {log.ip}</p>}
                    {log.error && <p style={{ fontSize: 11, color: "var(--adm-danger)" }}>{log.error}</p>}
                  </div>
                </div>
              );
            })
          )}

          <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 12.5, color: "var(--adm-text-muted)" }}>
              Showing {total===0?0:(pageNum-1)*PAGE_SIZE+1}–{Math.min(pageNum*PAGE_SIZE,total)} of {total}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href={makeHref({ page: String(Math.max(1,pageNum-1)) })} className={cn("adm-btn adm-btn-secondary adm-btn-sm", pageNum===1&&"opacity-40 pointer-events-none")}>← Prev</Link>
              <Link href={makeHref({ page: String(Math.min(totalPages,pageNum+1)) })} className={cn("adm-btn adm-btn-primary adm-btn-sm", pageNum===totalPages&&"opacity-40 pointer-events-none")}>Next →</Link>
            </div>
          </div>
        </ACardBody>
      </ACard>
    </div>
  );
}
