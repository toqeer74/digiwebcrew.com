import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function DraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;

  await connectToDatabase();
  const draft = await ContentDraft.findById(id).lean();
  if (!draft) redirect("/admin/drafts");

  const d: any = draft;
  const variables = d.variables ? JSON.stringify(d.variables, null, 2) : "{}";

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Draft</div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">{d.title || "Untitled"}</h1>
          <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">
            {d.type} • {d.promptKey} {d.modelName ? `• ${d.modelName}` : ""}
          </div>
        </div>
        <Link
          href="/admin/drafts"
          className="h-10 px-4 rounded-xl border border-border bg-white text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-colors"
        >
          Back to Drafts
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 rounded-[2rem] border-border bg-white shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              readOnly
              value={d.content || ""}
              className="w-full min-h-[520px] rounded-xl border border-border bg-secondary/10 p-4 font-mono text-xs"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 rounded-[2rem] border-border bg-white shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">ID</div>
              <div className="text-xs font-mono mt-1 break-all">{d._id.toString()}</div>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Created</div>
              <div className="text-xs font-bold mt-1">{d.createdAt ? new Date(d.createdAt).toLocaleString() : ""}</div>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Variables</div>
              <textarea
                readOnly
                value={variables}
                className="w-full min-h-[220px] rounded-xl border border-border bg-white p-3 font-mono text-xs"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
