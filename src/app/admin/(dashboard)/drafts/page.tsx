import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraftDeleteButton } from "@/components/admin/draft-delete-button";
import { PageHeader } from "@/components/admin/page-header";

type SearchParams = Promise<{ q?: string; type?: string }>;

const TYPE_BADGES: Record<string, string> = {
  blog: "bg-blue-100 text-blue-700",
  landing: "bg-violet-100 text-violet-700",
  seo: "bg-emerald-100 text-emerald-700",
  email: "bg-amber-100 text-amber-700",
  social: "bg-pink-100 text-pink-700",
  other: "bg-slate-100 text-slate-700",
};

const TYPE_OPTIONS = ["all", "blog", "landing", "seo", "email", "social", "other"];

export default async function DraftsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { q, type } = await searchParams;

  const db = await connectToDatabase();
  const query: Record<string, any> = {};
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { promptKey: { $regex: q, $options: "i" } },
      { modelName: { $regex: q, $options: "i" } },
    ];
  }
  if (type && type !== "all") {
    query.type = type;
  }

  const drafts = db
    ? await ContentDraft.find(query)
        .sort({ createdAt: -1 })
        .limit(100)
        .select({
          type: 1,
          promptKey: 1,
          title: 1,
          modelName: 1,
          createdAt: 1,
          workflowRunId: 1,
          workflowStepIndex: 1,
        })
        .lean()
    : [];

  return (
    <div className="admin-page-stack space-y-6 pb-8 w-full">
      <PageHeader
        title="Drafts"
        subtitle="Generated drafts and workflow outputs."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Drafts" }]}
      />

      <Card className="admin-card rounded-xl">
        <CardContent className="pt-6">
          <form className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_200px_auto]">
            <input
              name="q"
              defaultValue={q || ""}
              placeholder="Search title, prompt key, model"
              className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
            />
            <select name="type" defaultValue={type || "all"} className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All Types" : option}
                </option>
              ))}
            </select>
            <button className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white">Filter</button>
          </form>
        </CardContent>
      </Card>

      <Card className="admin-card rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Recent Drafts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt Key</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Title</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Model</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Created</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((draft: any) => {
                  const id = String(draft._id);
                  const draftType = String(draft.type || "other").toLowerCase();
                  return (
                    <tr key={id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${TYPE_BADGES[draftType] || TYPE_BADGES.other}`}>
                          {draftType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{draft.promptKey || "-"}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 max-w-[360px] truncate">{draft.title || "Untitled"}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{draft.modelName || "-"}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{draft.createdAt ? new Date(draft.createdAt).toLocaleString() : ""}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/drafts/${id}`}
                            className="inline-flex h-8 items-center rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            View
                          </Link>
                          <DraftDeleteButton draftId={id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {drafts.length === 0 ? <div className="p-10 text-center text-sm text-slate-500">No drafts available.</div> : null}
        </CardContent>
      </Card>
    </div>
  );
}

