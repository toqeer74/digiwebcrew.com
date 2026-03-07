import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/page-header";

export default async function DraftsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  // Quick development mode check
  if (!process.env.MONGODB_URI) {
    return (
      <div className="space-y-6 pb-10 w-full">
        <PageHeader
          label="Content Management"
          title="Drafts"
          highlight="0 Available"
          description="Database connection disabled in development mode"
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">No drafts available in development mode</p>
        </div>
      </div>
    );
  }

  const db = await connectToDatabase();
  if (!db) {
    return (
      <div className="space-y-6 pb-10 w-full">
        <PageHeader
          label="Content Management"
          title="Drafts"
          highlight="0 Available"
          description="Database connection unavailable"
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Unable to connect to database</p>
        </div>
      </div>
    );
  }

  const drafts = await ContentDraft.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .select({
      type: 1,
      promptKey: 1,
      title: 1,
      modelName: 1,
      createdAt: 1,
      workflowRunId: 1,
      workflowKey: 1,
      workflowStepIndex: 1,
    })
    .lean();

  const workflowDrafts = drafts.filter((d: any) => Boolean(d.workflowRunId));
  const standaloneDrafts = drafts.filter((d: any) => !d.workflowRunId);

  const workflowRunsMap = new Map<
    string,
    {
      workflowRunId: string;
      workflowKey: string;
      createdAt: Date | null;
      drafts: any[];
    }
  >();

  for (const d of workflowDrafts as any[]) {
    const runId = String(d.workflowRunId);
    const existing = workflowRunsMap.get(runId);

    const workflowKey = String(d.workflowKey || "");
    const createdAt = d.createdAt ? new Date(d.createdAt) : null;

    if (!existing) {
      workflowRunsMap.set(runId, {
        workflowRunId: runId,
        workflowKey,
        createdAt,
        drafts: [d],
      });
    } else {
      existing.drafts.push(d);
      if (!existing.createdAt || (createdAt && createdAt < existing.createdAt)) {
        existing.createdAt = createdAt;
      }
      if (!existing.workflowKey && workflowKey) {
        existing.workflowKey = workflowKey;
      }
    }
  }

  const workflowRuns = Array.from(workflowRunsMap.values())
    .map((r) => {
      r.drafts.sort((a, b) => (a.workflowStepIndex || 0) - (b.workflowStepIndex || 0));
      return r;
    })
    .sort((a, b) => {
      const at = a.createdAt ? a.createdAt.getTime() : 0;
      const bt = b.createdAt ? b.createdAt.getTime() : 0;
      return bt - at;
    });

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        label="AI Studio Output"
        title="Drafts"
        description="Generated content saved to MongoDB."
      />

      <Card className="rounded-[2rem] border-border bg-white shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Workflow Runs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {workflowRuns.length === 0 ? (
            <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">No workflow runs yet</div>
          ) : (
            workflowRuns.map((run) => (
              <Link
                key={run.workflowRunId}
                href={`/admin/drafts/${run.drafts[0]?._id?.toString?.() || ""}`}
                className="block p-4 rounded-2xl border border-border bg-secondary/10 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {run.workflowKey ? `workflow: ${run.workflowKey}` : "workflow"} • {run.drafts.length} drafts
                    </div>
                    <div className="text-sm font-black mt-1 truncate">{run.workflowRunId}</div>
                    <div className="text-xs text-muted-foreground/70 font-medium mt-1">
                      {run.drafts
                        .slice(0, 3)
                        .map((d: any) => `${d.workflowStepIndex ? `#${d.workflowStepIndex}` : ""}${d.promptKey ? ` ${d.promptKey}` : ""}`.trim())
                        .filter(Boolean)
                        .join(" • ")}
                      {run.drafts.length > 3 ? " • …" : ""}
                    </div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 shrink-0">
                    {run.createdAt ? run.createdAt.toLocaleString() : ""}
                  </div>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-border bg-white shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Recent Drafts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {standaloneDrafts.length === 0 ? (
            <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">No standalone drafts yet</div>
          ) : (
            standaloneDrafts.map((d: any) => (
              <Link
                key={d._id.toString()}
                href={`/admin/drafts/${d._id.toString()}`}
                className="block p-4 rounded-2xl border border-border bg-secondary/10 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {d.type} • {d.promptKey}
                    </div>
                    <div className="text-sm font-black mt-1 truncate">{(d.title as string) || "Untitled"}</div>
                    <div className="text-xs text-muted-foreground/70 font-medium mt-1">
                      {(d.modelName as string) ? `Model: ${d.modelName}` : ""}
                    </div>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 shrink-0">
                    {d.createdAt ? new Date(d.createdAt).toLocaleString() : ""}
                  </div>
                </div>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
