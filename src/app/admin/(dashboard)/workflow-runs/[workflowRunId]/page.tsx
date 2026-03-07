import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function WorkflowRunDetailPage({
  params,
}: {
  params: Promise<{ workflowRunId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { workflowRunId } = await params;

  await connectToDatabase();
  const drafts = await ContentDraft.find({ workflowRunId })
    .sort({ workflowStepIndex: 1, createdAt: 1 })
    .select({
      type: 1,
      promptKey: 1,
      title: 1,
      content: 1,
      workflowKey: 1,
      workflowStepId: 1,
      workflowStepIndex: 1,
      createdAt: 1,
    })
    .lean();

  if (drafts.length === 0) redirect("/admin/workflow-runs");

  const workflowKey = String((drafts[0] as any).workflowKey || "");

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Workflow Run</div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">{workflowRunId}</h1>
          <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">
            {workflowKey ? `workflow: ${workflowKey}` : "workflow"} • {drafts.length} drafts
          </div>
        </div>
        <Link
          href="/admin/workflow-runs"
          className="h-10 px-4 rounded-xl border border-border bg-white text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-colors"
        >
          Back to Runs
        </Link>
      </div>

      <Card className="rounded-[2rem] border-border bg-white shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {drafts.map((d: any) => (
            <Link
              key={d._id.toString()}
              href={`/admin/drafts/${d._id.toString()}`}
              className="block p-4 rounded-2xl border border-border bg-secondary/10 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    {d.workflowStepIndex ? `Step ${d.workflowStepIndex}` : "Step"}
                    {d.workflowStepId ? ` • ${d.workflowStepId}` : ""}
                    {d.promptKey ? ` • ${d.promptKey}` : ""}
                  </div>
                  <div className="text-sm font-black mt-1 truncate">{(d.title as string) || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground/70 font-medium mt-2 line-clamp-2">
                    {String(d.content || "").slice(0, 240)}
                  </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 shrink-0">
                  {d.createdAt ? new Date(d.createdAt).toLocaleString() : ""}
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
