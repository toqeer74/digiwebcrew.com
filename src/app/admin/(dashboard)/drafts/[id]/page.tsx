import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";
import Link from "next/link";
import { DraftDeleteButton } from "@/components/admin/draft-delete-button";
import { PageHeader } from "@/components/admin/page-header";
import { CopyButton } from "@/components/admin/copy-button";
import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { FileText, Info, ArrowLeft } from "lucide-react";

const TYPE_BADGE: Record<string, string> = {
  blog:    "adm-badge-accent",
  landing: "adm-badge-purple",
  seo:     "adm-badge-success",
  email:   "adm-badge-warning",
  social:  "adm-badge-danger",
  other:   "adm-badge-muted",
};

export default async function DraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const db = await connectToDatabase();
  if (!db) redirect("/admin/drafts");

  const draft = await ContentDraft.findById(id).lean();
  if (!draft) redirect("/admin/drafts");

  const d: any = draft;
  const variables = d.variables ? JSON.stringify(d.variables, null, 2) : "{}";
  const content = d.content || "";
  const draftType = String(d.type || "other").toLowerCase();

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title={d.title || "Untitled Draft"}
        subtitle={`${draftType} · ${d.promptKey}${d.modelName ? ` · ${d.modelName}` : ""}${d.workflowRunId ? ` · Run ${d.workflowRunId}` : ""}`}
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Drafts", href: "/admin/drafts" },
          { label: "Detail" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <CopyButton value={content} label="Copy Content" />
            {d.workflowRunId && (
              <Link href={`/admin/workflow-runs/${d.workflowRunId}`} className="adm-btn adm-btn-secondary adm-btn-sm">
                View Run
              </Link>
            )}
            <Link href="/admin/drafts" className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
              <ArrowLeft size={13} /> Back
            </Link>
            <DraftDeleteButton draftId={String(d._id)} />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Content */}
        <ACard className="lg:col-span-8">
          <ACardHeader>
            <ACardTitle icon={<FileText size={14} />}>Content</ACardTitle>
            <div className="flex items-center gap-2">
              <span className={`adm-badge ${TYPE_BADGE[draftType] || "adm-badge-muted"}`}>{draftType}</span>
              {d.promptKey && <span className="adm-badge adm-badge-muted">{d.promptKey}</span>}
            </div>
          </ACardHeader>
          <ACardBody>
            <pre
              className="max-h-[560px] overflow-auto rounded-xl p-5 text-xs whitespace-pre-wrap"
              style={{
                background: "#0d1117",
                color: "#c9d1d9",
                fontFamily: "var(--adm-mono)",
                lineHeight: 1.7,
                border: "1.5px solid var(--adm-border)",
              }}
            >
              {content || "No content generated."}
            </pre>
          </ACardBody>
        </ACard>

        {/* Metadata */}
        <ACard className="lg:col-span-4">
          <ACardHeader>
            <ACardTitle icon={<Info size={14} />}>Metadata</ACardTitle>
          </ACardHeader>
          <ACardBody className="space-y-4">
            {[
              { label: "Created",      value: d.createdAt ? new Date(d.createdAt).toLocaleString() : "—" },
              { label: "Model",        value: d.modelName || "—" },
              { label: "Prompt Key",   value: d.promptKey || "—" },
              { label: "Type",         value: draftType },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="adm-label mb-1">{label}</p>
                <p style={{ fontSize: 13.5, color: "var(--adm-text-dim)" }}>{value}</p>
              </div>
            ))}

            <div>
              <p className="adm-label mb-1">Workflow Run</p>
              {d.workflowRunId ? (
                <Link
                  href={`/admin/workflow-runs/${d.workflowRunId}`}
                  style={{ fontSize: 13.5, color: "var(--adm-primary)", fontWeight: 600 }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
                >
                  {d.workflowRunId}
                </Link>
              ) : (
                <p style={{ fontSize: 13.5, color: "var(--adm-text-muted)" }}>—</p>
              )}
            </div>

            <div>
              <p className="adm-label mb-1">Document ID</p>
              <p
                style={{ fontSize: 11, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", wordBreak: "break-all" }}
              >
                {String(d._id)}
              </p>
            </div>

            {variables !== "{}" && (
              <div>
                <p className="adm-label mb-1">Variables</p>
                <pre
                  className="max-h-[200px] overflow-auto rounded-xl p-3 text-xs whitespace-pre-wrap"
                  style={{
                    background: "var(--adm-bg)",
                    border: "1.5px solid var(--adm-border)",
                    fontFamily: "var(--adm-mono)",
                    color: "var(--adm-text-dim)",
                  }}
                >
                  {variables}
                </pre>
              </div>
            )}
          </ACardBody>
        </ACard>
      </div>
    </div>
  );
}
