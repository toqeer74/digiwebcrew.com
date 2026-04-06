import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";
import Link from "next/link";
import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { PageHeader } from "@/components/admin/page-header";
import { Play } from "lucide-react";

type SearchParams = Promise<{ q?: string; page?: string }>;
const PAGE_SIZE = 20;

export default async function WorkflowRunsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { q, page } = await searchParams;
  const pageNum = Math.max(1, Number(page || "1"));
  await connectToDatabase();

  const where: any = { workflowRunId: { not: null } };
  if (q) {
    where.OR = [
      { workflowRunId: { contains: q, mode: "insensitive" } },
      { workflowKey: { contains: q, mode: "insensitive" } },
      { promptKey: { contains: q, mode: "insensitive" } },
    ];
  }

  const [groupedRaw, totalResult] = await Promise.all([
    prisma.contentDraft.groupBy({
      by: ['workflowRunId', 'workflowKey'],
      where,
      _min: { createdAt: true },
      _max: { updatedAt: true, workflowStepIndex: true },
      _count: { _all: true },
      orderBy: { _max: { updatedAt: 'desc' } },
      skip: (pageNum - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contentDraft.groupBy({
      by: ['workflowRunId'],
      where,
    }),
  ]);

  const total = totalResult.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const grouped = groupedRaw.map(g => ({
    _id: g.workflowRunId,
    workflowKey: g.workflowKey,
    createdAt: g._min?.createdAt,
    updatedAt: g._max?.updatedAt,
    steps: g._count?._all || 0,
    maxStepIndex: g._max?.workflowStepIndex
  }));

  const pageLink = (t: number) => {
    const p = new URLSearchParams(); if (q) p.set("q", q); p.set("page", String(t)); return `?${p.toString()}`;
  };

  // Mock runs for display when no DB data (matching HTML reference)
  const mockRuns = [
    { _id: "run-1042", workflowKey: "Lead Qualification Workflow", steps: 4, updatedAt: new Date(Date.now()-600000), isComplete: true, status: "success" },
    { _id: "run-1041", workflowKey: "Email Follow-up Sequence",    steps: 2, updatedAt: new Date(Date.now()-3600000), isComplete: false, status: "danger" },
    { _id: "run-1040", workflowKey: "New Lead Notification",       steps: 3, updatedAt: new Date(Date.now()-10800000), isComplete: true, status: "success" },
    { _id: "run-1039", workflowKey: "AI Proposal Generator",       steps: 2, updatedAt: new Date(Date.now()-86400000), isComplete: false, status: "warning" },
  ];

  const displayRuns = grouped.length > 0 ? grouped.map((run: any) => ({
    _id: run._id, workflowKey: run.workflowKey || "—",
    steps: run.steps, updatedAt: run.updatedAt,
    isComplete: Number(run.steps) >= (Number.isFinite(Number(run.maxStepIndex)) ? Number(run.maxStepIndex)+1 : Number(run.steps)),
    status: Number(run.steps) >= (Number.isFinite(Number(run.maxStepIndex)) ? Number(run.maxStepIndex)+1 : Number(run.steps)) ? "success" : "warning",
  })) : mockRuns;

  const statusMeta: Record<string, { label: string; badge: string; meta: string }> = {
    success: { label: "Success",  badge: "adm-badge-success", meta: "steps completed" },
    danger:  { label: "Failed",   badge: "adm-badge-danger",  meta: "failed" },
    warning: { label: "Partial",  badge: "adm-badge-warning", meta: "partial" },
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Workflow Runs"
        subtitle="Automated process history and status."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Workflow Runs" }]}
      />

      {/* Search */}
      <ACard>
        <ACardBody>
          <form className="flex gap-3">
            <input name="q" defaultValue={q || ""} placeholder="Search by run ID, workflow key, prompt key…" className="adm-input h-10" style={{ maxWidth: 480 }} />
            <button type="submit" className="adm-btn adm-btn-primary adm-btn-sm">Search</button>
          </form>
        </ACardBody>
      </ACard>

      {/* Runs list */}
      <ACard>
        <ACardHeader>
          <ACardTitle>Recent Runs</ACardTitle>
          <div className="flex items-center gap-3">
            <span className="adm-badge adm-badge-muted">{total || displayRuns.length} total</span>
            <button className="adm-btn adm-btn-primary adm-btn-sm inline-flex items-center gap-2">
              <Play size={12} /> Trigger Run
            </button>
          </div>
        </ACardHeader>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {displayRuns.map((run: any) => {
            const s = statusMeta[run.status] || statusMeta.success;
            const dotStyle = run.status === "success"
              ? { background: "var(--adm-success)", boxShadow: "0 0 6px rgba(16,185,129,0.5)" }
              : run.status === "danger"
              ? { background: "var(--adm-danger)" }
              : { background: "var(--adm-warning)" };
            return (
              <div key={run._id} className="adm-run-row">
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, ...dotStyle }} />
                  <div style={{ minWidth: 0 }}>
                    <div className="adm-wf-name">{run.workflowKey}</div>
                    <div className="adm-wf-meta">
                      Run {typeof run._id === "string" ? run._id : `#${String(run._id).slice(-4)}`}
                      {" • "}
                      {run.updatedAt ? new Date(run.updatedAt).toLocaleString() : ""}
                      {" • "}
                      {run.steps} {s.meta}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <span className={`adm-badge ${s.badge}`}>{s.label}</span>
                  {grouped.length > 0 ? (
                    <Link href={`/admin/workflow-runs/${run._id}`} className="adm-btn adm-btn-secondary adm-btn-sm">Details</Link>
                  ) : (
                    <button className="adm-btn adm-btn-secondary adm-btn-sm">
                      {run.status === "danger" ? "Retry" : "Details"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {displayRuns.length === 0 && (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--adm-text-muted)", fontSize: 13 }}>No workflow runs found.</div>
          )}
        </div>

        {total > PAGE_SIZE && (
          <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1.5px solid var(--adm-border)" }}>
            <p style={{ fontSize: 12.5, color: "var(--adm-text-muted)" }}>Showing {(pageNum-1)*PAGE_SIZE+1}–{Math.min(pageNum*PAGE_SIZE,total)} of {total}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href={pageLink(Math.max(1,pageNum-1))} className={`adm-btn adm-btn-secondary adm-btn-sm${pageNum===1?" opacity-40 pointer-events-none":""}`}>← Prev</Link>
              <Link href={pageLink(Math.min(totalPages,pageNum+1))} className={`adm-btn adm-btn-primary adm-btn-sm${pageNum===totalPages?" opacity-40 pointer-events-none":""}`}>Next →</Link>
            </div>
          </div>
        )}
      </ACard>
    </div>
  );
}
