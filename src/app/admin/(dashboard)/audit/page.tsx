import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, User, AlertCircle, CheckCircle, Shield, Download } from "lucide-react";
import { AuditLog } from "@/lib/models/audit-log";
import { connectToDatabase } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuditAutoRefresh } from "@/components/admin/audit-auto-refresh";
import { PageHeader } from "@/components/admin/page-header";

const PAGE_SIZE = 50;

type AuditSearchParams = Promise<{
  group?: string;
  success?: string;
  page?: string;
}>;

const GROUPS = [
  { key: "all", label: "All" },
  { key: "auth", label: "Auth Events" },
  { key: "ai", label: "AI Actions" },
  { key: "lead", label: "Lead Actions" },
  { key: "system", label: "System" },
] as const;

const GROUP_ACTIONS: Record<string, string[]> = {
  auth: ["LOGIN_SUCCESS", "LOGIN_FAILED", "LOGOUT"],
  ai: ["RUN_AI_PROMPT", "RUN_AI_WORKFLOW", "CREATE_DRAFT"],
  lead: ["VIEW_LEADS", "VIEW_LEAD_DETAIL", "EXPORT_DATA"],
  system: ["VIEW_DASHBOARD", "VIEW_CHATS", "VIEW_DRAFTS", "VIEW_WORKFLOW_RUNS", "UPDATE_BRANDING", "UPDATE_SETTINGS"],
};

export default async function AuditPage({ searchParams }: { searchParams: AuditSearchParams }) {
  const { group = "all", success = "all", page } = await searchParams;
  const pageNum = Math.max(1, Number(page || "1"));

  await connectToDatabase();

  const query: Record<string, any> = {};
  if (group !== "all" && GROUP_ACTIONS[group]) {
    query.action = { $in: GROUP_ACTIONS[group] };
  }
  if (success === "1") query.success = true;
  if (success === "0") query.success = false;

  const [logs, total] = await Promise.all([
    AuditLog.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    AuditLog.countDocuments(query),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const makeHref = (overrides: Record<string, string>) => {
    const params = new URLSearchParams();
    const merged = {
      group,
      success,
      page: String(pageNum),
      ...overrides,
    };

    if (merged.group !== "all") params.set("group", merged.group);
    if (merged.success !== "all") params.set("success", merged.success);
    if (merged.page !== "1") params.set("page", merged.page);

    const str = params.toString();
    return str ? `?${str}` : "?";
  };

  const getIcon = (action: string) => {
    switch (action) {
      case "LOGIN_SUCCESS":
      case "LOGIN_FAILED":
        return Shield;
      case "RUN_AI_PROMPT":
      case "RUN_AI_WORKFLOW":
        return Activity;
      default:
        return User;
    }
  };

  const getActionColor = (action: string, isSuccess: boolean) => {
    if (!isSuccess) return "bg-rose-100 text-rose-800 border-rose-200";
    switch (action) {
      case "LOGIN_SUCCESS":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "RUN_AI_PROMPT":
      case "RUN_AI_WORKFLOW":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="admin-page-stack space-y-6 pb-10 w-full">
      <AuditAutoRefresh />
      <PageHeader
        title="Audit"
        subtitle="Security and activity events (auto refresh every 30s)."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Audit" }]}
        actions={
          <a
            href={`/api/admin/audit/export${makeHref({ page: "1" })}`}
            className="inline-flex h-10 items-center rounded-lg border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50"
          >
            <Download size={14} className="mr-2" /> Export CSV
          </a>
        }
      />

      <Card className="admin-card rounded-xl">
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <Link
                key={g.key}
                href={makeHref({ group: g.key, page: "1" })}
                className={cn(
                  "inline-flex h-9 items-center rounded-lg border px-3 text-sm",
                  group === g.key ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                )}
              >
                {g.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href={makeHref({ success: "all", page: "1" })} className={cn("inline-flex h-8 items-center rounded-lg border px-3 text-xs", success === "all" ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700")}>All</Link>
            <Link href={makeHref({ success: "1", page: "1" })} className={cn("inline-flex h-8 items-center rounded-lg border px-3 text-xs", success === "1" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-700")}>Success</Link>
            <Link href={makeHref({ success: "0", page: "1" })} className={cn("inline-flex h-8 items-center rounded-lg border px-3 text-xs", success === "0" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-700")}>Failure</Link>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-card rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" /> Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No audit logs found</p>
            ) : (
              logs.map((log: any) => {
                const Icon = getIcon(log.action);
                return (
                  <div key={String(log._id)} className="flex items-start gap-4 p-4 rounded-lg border bg-white hover:bg-slate-50 transition-colors">
                    <div className="mt-1">
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={cn("text-xs", getActionColor(log.action, log.success))}>
                          {String(log.action).replace(/_/g, " ").toLowerCase()}
                        </Badge>
                        {log.success ? <CheckCircle className="h-3 w-3 text-emerald-500" /> : <AlertCircle className="h-3 w-3 text-rose-500" />}
                        <span className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-sm">
                        {log.userEmail ? <p className="font-medium text-slate-900">{log.userEmail}</p> : null}
                        {log.resource ? <p className="text-slate-600">Resource: {log.resource}{log.resourceId ? ` (${log.resourceId})` : ""}</p> : null}
                        {log.ip ? <p className="text-xs text-slate-500 mt-1">IP: {log.ip}</p> : null}
                        {log.error ? <p className="text-rose-600 text-xs mt-1">{log.error}</p> : null}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing {total === 0 ? 0 : (pageNum - 1) * PAGE_SIZE + 1}-{Math.min(pageNum * PAGE_SIZE, total)} of {total}
            </p>
            <div className="flex gap-2">
              <Link href={makeHref({ page: String(Math.max(1, pageNum - 1)) })} className={cn("inline-flex h-9 items-center rounded-lg border border-slate-200 px-3 text-sm", pageNum === 1 && "pointer-events-none opacity-50")}>
                Prev
              </Link>
              <Link href={makeHref({ page: String(Math.min(totalPages, pageNum + 1)) })} className={cn("inline-flex h-9 items-center rounded-lg border border-slate-200 px-3 text-sm", pageNum === totalPages && "pointer-events-none opacity-50")}>
                Next
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

