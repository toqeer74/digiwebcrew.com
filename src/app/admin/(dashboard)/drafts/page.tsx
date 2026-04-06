import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";
import Link from "next/link";
import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { DraftDeleteButton } from "@/components/admin/draft-delete-button";
import { PageHeader } from "@/components/admin/page-header";

type SearchParams = Promise<{ q?: string; type?: string }>;

const TYPE_BADGE: Record<string, string> = {
  blog: "adm-badge-accent", landing: "adm-badge-purple", seo: "adm-badge-success",
  email: "adm-badge-warning", social: "adm-badge-danger", other: "adm-badge-muted",
};
const TYPE_OPTIONS = ["all", "blog", "landing", "seo", "email", "social", "other"];

function relTime(d?: Date | string) {
  if (!d) return "";
  const ms = Date.now() - new Date(d).getTime();
  const mins = Math.floor(ms/60000), hrs = Math.floor(ms/3600000), days = Math.floor(ms/86400000);
  if (mins < 1) return "Just now"; if (hrs < 1) return `${mins}m ago`;
  if (days < 1) return `${hrs} hour${hrs>1?"s":""} ago`; if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default async function DraftsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { q, type } = await searchParams;
  await connectToDatabase();
  
  const where: any = {};
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { promptKey: { contains: q, mode: "insensitive" } },
      { modelName: { contains: q, mode: "insensitive" } },
    ];
  }
  if (type && type !== "all") {
    where.type = type.toUpperCase();
  }

  const drafts = await prisma.contentDraft.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Drafts"
        subtitle="Manage your saved proposals and content drafts."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Drafts" }]}
        actions={
          <button className="adm-btn adm-btn-primary adm-btn-sm">+ New Draft</button>
        }
      />

      {/* Filters */}
      <ACard>
        <ACardBody>
          <form style={{ display: "grid", gridTemplateColumns: "1fr 200px auto", gap: 12 }}>
            <input name="q" defaultValue={q||""} placeholder="Search title, prompt key, model…" className="adm-input h-10" />
            <select name="type" defaultValue={type||"all"} className="adm-input h-10">
              {TYPE_OPTIONS.map(o => <option key={o} value={o}>{o==="all"?"All Types":o}</option>)}
            </select>
            <button type="submit" className="adm-btn adm-btn-primary h-10 px-5">Filter</button>
          </form>
        </ACardBody>
      </ACard>

      {/* Drafts as cards (matching HTML) */}
      <ACard>
        <ACardHeader>
          <ACardTitle>Recent Drafts</ACardTitle>
          <div className="flex items-center gap-3">
            <span className="adm-badge adm-badge-muted">{drafts.length} drafts</span>
            <div className="adm-pill-tabs">
              {["All","Proposals","Emails","Other"].map(t => (
                <button key={t} className={`adm-pill-tab${t==="All"?" active":""}`}>{t}</button>
              ))}
            </div>
          </div>
        </ACardHeader>
        <ACardBody style={{ padding: "8px 20px 20px" }}>
          {drafts.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--adm-text-muted)", fontSize: 13 }}>No drafts found.</div>
          ) : (
            drafts.map((draft: any) => {
              const id = String(draft._id);
              const draftType = String(draft.type || "other").toLowerCase();
              const excerpt = draft.content ? String(draft.content).slice(0, 140) + "…" : "";
              return (
                <div key={id} className="adm-draft-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="adm-draft-card-title">{draft.title || "Untitled"}</div>
                      <div className="adm-draft-card-meta">
                        Modified {relTime(draft.createdAt)} • {draftType}
                        {draft.promptKey ? ` • ${draft.promptKey}` : ""}
                      </div>
                      {excerpt && <div className="adm-draft-card-excerpt">{excerpt}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
                      <span className={`adm-badge ${TYPE_BADGE[draftType]||"adm-badge-muted"}`}>{draftType}</span>
                      <Link href={`/admin/drafts/${id}`} className="adm-btn adm-btn-primary adm-btn-sm">View</Link>
                      <DraftDeleteButton draftId={id} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </ACardBody>
      </ACard>
    </div>
  );
}
