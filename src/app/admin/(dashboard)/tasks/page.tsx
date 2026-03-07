import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { CheckCircle2, Clock, AlertCircle, ShieldAlert, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getTasks() {
  try {
    // Quick development mode check
    if (!process.env.MONGODB_URI) {
      return [];
    }

    const db = await connectToDatabase();
    if (!db) {
      return [];
    }

    // Find leads and safely process tasks
    const leads = await Lead.find({ "tasks.done": false }).lean();

    const allTasks = leads.flatMap(lead => {
      if (!lead.tasks || !Array.isArray(lead.tasks)) return [];

      return lead.tasks
        .filter((t: any) => t && !t.done)
        .map((t: any) => ({
          ...t,
          _id: t._id?.toString() || Math.random().toString(),
          leadId: lead._id?.toString(),
          leadName: lead.fullName,
          leadEmail: lead.email,
          leadTier: lead.leadTier
        }));
    });

    // Elite sorting with date validation
    return allTasks.sort((a: any, b: any) => {
      const dateA = a.dueAt ? new Date(a.dueAt).getTime() : 0;
      const dateB = b.dueAt ? new Date(b.dueAt).getTime() : 0;
      return dateA - dateB;
    });
  } catch (error: any) {
    console.error("Infrastructure Error Details:", error);

    // Distinguish between different errors
    if (error.message?.includes("MONGODB_URI")) {
      throw new Error("CONFIG_MISSING");
    }

    if (error.name === "MongooseServerSelectionError" || error.message?.includes("ETIMEDOUT")) {
      throw new Error("CONNECTION_TIMEOUT");
    }

    throw error;
  }
}

export default async function TasksPage() {
  let tasks: any[] = [];
  let errorType: "NONE" | "CONFIG" | "CONNECTION" | "GENERIC" = "NONE";

  try {
    tasks = await getTasks();
  } catch (err: any) {
    if (err.message === "CONFIG_MISSING") errorType = "CONFIG";
    else if (err.message === "CONNECTION_TIMEOUT") errorType = "CONNECTION";
    else errorType = "GENERIC";
  }

  if (errorType !== "NONE") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-12 text-center">
        <div className={cn(
          "w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl transition-all duration-700 animate-in fade-in zoom-in slide-in-from-bottom-8",
          errorType === "CONFIG" ? "bg-amber-50 text-amber-500 shadow-amber-500/10" :
            errorType === "CONNECTION" ? "bg-rose-50 text-rose-500 shadow-rose-500/10" :
              "bg-gray-100 text-gray-500 shadow-gray-500/10"
        )}>
          {errorType === "CONFIG" ? <ShieldAlert size={48} /> :
            errorType === "CONNECTION" ? <WifiOff size={48} /> :
              <AlertCircle size={48} />}
        </div>

        <h1 className="text-4xl font-black tracking-tight text-foreground uppercase">
          {errorType === "CONFIG" ? "Configuration Gap" :
            errorType === "CONNECTION" ? "Connectivity Shield" :
              "Infrastructure Offline"}
        </h1>

        <p className="max-w-lg text-sm font-bold text-muted-foreground/60 mt-6 uppercase tracking-[0.2em] leading-relaxed">
          {errorType === "CONFIG" ? (
            <>
              The <span className="text-amber-600">MONGODB_URI</span> environment variable is not defined for this deployment deployment. Please verify Vercel Secrets.
            </>
          ) : errorType === "CONNECTION" ? (
            <>
              The operational database rejected the connection. verify that the <span className="text-rose-600">Vercel Deployment IP</span> is whitelisted in MongoDB Atlas.
            </>
          ) : (
            "The operations queue is currently unreachable. Please verify database connectivity services and cloud infrastructure status."
          )}
        </p>

        {errorType === "CONNECTION" && (
          <div className="mt-12 p-6 bg-rose-50/50 rounded-2xl border border-rose-100 max-w-md">
            <p className="text-[10px] font-black text-rose-600/60 uppercase tracking-widest mb-2">Technical Guidance</p>
            <p className="text-xs text-rose-700/80 font-bold leading-relaxed">
              Whitelisting "0.0.0.0/0" in MongoDB Atlas is the standard fix for dynamic IP environments like Vercel.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-12 pb-20">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-black text-muted-foreground/40 mb-1 uppercase tracking-[0.2em]">Operations Suite</p>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Tasks: <span className="text-raly-accent">Queue</span></h1>
          <p className="text-sm text-muted-foreground/60 italic mt-1 font-medium">Manage pending <span className="text-raly-accent font-black\">task</span> protocols</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="h-9 px-5 rounded-xl bg-raly-accent text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-raly-accent/20 hover:scale-105 transition-all">
            <CheckCircle2 size={14} className="mr-2" />
            Clear Completed
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task: any) => (
            <Card
              key={task._id}
              className="group border-border bg-white p-8 hover:shadow-xl hover:shadow-primary/5 transition-all rounded-[2.5rem] cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={cn(
                    "w-16 h-16 rounded-[1.5rem] flex items-center justify-center border transition-all shadow-sm",
                    task.leadTier === "HOT" ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-primary/5 text-primary border-primary/10"
                  )}>
                    {task.leadTier === "HOT" ? <AlertCircle size={28} /> : <Clock size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">{task.title || "Untitled Task"}</h3>
                    <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        Lead: <span className="text-foreground">{task.leadName || "Unknown"}</span>
                      </span>
                      <span className="flex items-center gap-2 text-rose-500">
                        <Clock size={12} />
                        Due: <span className="font-black">
                          {task.dueAt ? new Date(task.dueAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "No Date"}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={cn(
                    "px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border",
                    task.leadTier === "HOT" ? "bg-rose-100 text-rose-600 border-rose-200" : "bg-secondary text-muted-foreground border-border"
                  )}>
                    {task.leadTier || "COLD"} PRIORITY
                  </div>
                  <Button className="h-12 px-8 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    Complete Task
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-32 rounded-[3rem] border border-dashed border-border bg-white/40">
            <div className="w-20 h-20 bg-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-foreground opacity-30">No pending tasks</h2>
            <p className="text-xs font-bold text-muted-foreground/40 mt-3 uppercase tracking-widest">The laboratory queue is currently optimized</p>
          </div>
        )}
      </div>
    </div>
  );
}
