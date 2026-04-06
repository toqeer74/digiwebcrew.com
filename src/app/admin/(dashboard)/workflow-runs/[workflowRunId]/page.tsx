import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";
import Link from "next/link";
import { ACard, ACardHeader, ACardTitle } from "@/components/admin/acard";
import { PageHeader } from "@/components/admin/page-header";
import { ArrowLeft } from "lucide-react";

export default async function WorkflowRunDetailPage({
  params,
}: {
  params: Promise<{ workflowRunId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { workflowRunId } = await params;

  await connectToDatabase();

  const drafts = await prisma.contentDraft.findMany({
    where: { workflowRunId },
    orderBy: [
      { workflowStepIndex: "asc" },
      { createdAt: "asc" },
    ],
  });

  if (drafts.length === 0) redirect("/admin/workflow-runs");

  const workflowKey = String((drafts[0] as any).workflowKey || "");

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Workflow Run"
        subtitle={`${workflowRunId} · ${workflowKey || "workflow"} · ${drafts.length} step${drafts.length !== 1 ? "s" : ""}`}
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Workflow Runs", href: "/admin/workflow-runs" },
          { label: "Detail" },
        ]}
        actions={
          <Link href="/admin/workflow-runs" className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
            <ArrowLeft size={13} /> Back
          </Link>
        }
      />

      <ACard>
        <ACardHeader>
          <ACardTitle>Steps</ACardTitle>
          <span className="adm-badge adm-badge-muted">{drafts.length} steps</span>
        </ACardHeader>
        <div style={{ borderTop: "none", overflowX: "auto" }}>
          <table className="admin-table w-full">
            <thead>
              <tr>
                <th>Step</th>
                <th>Prompt Key</th>
                <th>Title</th>
                <th>Created</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {drafts.map((d: any) => {
                const id = String(d._id);
                return (
                  <tr key={id}>
                    <td>
                      <span
                        className="adm-badge adm-badge-muted"
                        style={{ fontFamily: "var(--adm-mono)" }}
                      >
                        {d.workflowStepIndex ?? "—"}
                      </span>
                    </td>
                    <td style={{ color: "var(--adm-text-dim)", fontSize: 12.5, fontFamily: "var(--adm-mono)" }}>
                      {d.promptKey || d.workflowStepId || "—"}
                    </td>
                    <td
                      style={{ maxWidth: 360, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600, color: "var(--adm-text)" }}
                    >
                      {d.title || "Untitled"}
                    </td>
                    <td style={{ fontSize: 11.5, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>
                      {d.createdAt ? new Date(d.createdAt).toLocaleString() : ""}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link href={`/admin/drafts/${id}`} className="adm-btn adm-btn-secondary adm-btn-sm">
                        View Draft
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ACard>
    </div>
  );
}
