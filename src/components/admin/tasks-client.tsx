"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { addTask, completeTask } from "@/lib/actions/lead-actions";
import { toast } from "sonner";
import { Plus, CheckSquare } from "lucide-react";
import { ACard, ACardBody } from "@/components/admin/acard";

interface TaskItem { _id:string; leadId:string; leadName:string; title:string; dueAt?:string; priority?:"low"|"medium"|"high"; done?:boolean; }
interface LeadOption { id:string; name:string; }
type FilterKey = "all"|"overdue"|"today"|"week";

const FILTERS: { key:FilterKey; label:string }[] = [
  { key:"all", label:"All" }, { key:"overdue", label:"Overdue" },
  { key:"today", label:"Due Today" }, { key:"week", label:"This Week" },
];

const PRIORITY_BADGE: Record<string, string> = {
  high:"adm-badge-danger", medium:"adm-badge-warning", low:"adm-badge-muted"
};

function formatDue(s?: string) {
  if (!s) return "No due date";
  const d = new Date(s);
  const now = new Date(); now.setHours(0,0,0,0);
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate()+1);
  if (d < now) return `Overdue · ${d.toLocaleDateString(undefined,{month:"short",day:"numeric"})}`;
  if (d < tomorrow) return "Due Today";
  if (d < new Date(now.getTime()+86400000)) return "Due Tomorrow";
  return d.toLocaleDateString(undefined,{month:"short",day:"numeric"});
}

export function TasksClient({ initialTasks, leadOptions }: { initialTasks:TaskItem[]; leadOptions:LeadOption[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [leadId, setLeadId] = useState(leadOptions[0]?.id||"");
  const [leadQuery, setLeadQuery] = useState("");
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [priority, setPriority] = useState<"low"|"medium"|"high">("medium");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [isPending, startTransition] = useTransition();

  const filteredLeads = useMemo(() => {
    const q = leadQuery.trim().toLowerCase();
    return q ? leadOptions.filter(l => l.name.toLowerCase().includes(q)) : leadOptions;
  }, [leadOptions, leadQuery]);

  const today = useMemo(() => { const d=new Date(); d.setHours(0,0,0,0); return d; }, []);

  const visible = useMemo(() => {
    const endToday = new Date(today); endToday.setDate(today.getDate()+1);
    const endWeek  = new Date(today); endWeek.setDate(today.getDate()+7);
    return [...tasks].filter(t => {
      const dd = t.dueAt ? new Date(t.dueAt) : null;
      if (!dd) return filter==="all";
      if (filter==="overdue") return dd<today;
      if (filter==="today")   return dd>=today && dd<endToday;
      if (filter==="week")    return dd>=today && dd<endWeek;
      return true;
    }).sort((a,b) => {
      const at=a.dueAt?new Date(a.dueAt).getTime():Number.MAX_SAFE_INTEGER;
      const bt=b.dueAt?new Date(b.dueAt).getTime():Number.MAX_SAFE_INTEGER;
      return at-bt;
    });
  }, [tasks, filter, today]);

  const highCount = tasks.filter(t=>t.priority==="high"&&!t.done).length;
  const medCount  = tasks.filter(t=>t.priority==="medium"&&!t.done).length;
  const doneCount = initialTasks.length - tasks.length;
  const lowCount  = tasks.filter(t=>(!t.priority||t.priority==="low")&&!t.done).length;

  const replaceLeadTasks = (updated: any) => {
    const next = (updated?.tasks||[]).filter((t:any)=>!t.done).map((t:any)=>({
      _id:String(t._id), leadId:String(updated._id), leadName:updated.fullName,
      title:t.title, dueAt:t.dueAt, priority:t.priority, done:t.done,
    }));
    setTasks(prev=>[...prev.filter(t=>t.leadId!==String(updated._id)), ...next]);
  };

  const onComplete = (task:TaskItem) => {
    startTransition(async()=>{
      try { const u=await completeTask(task.leadId,task._id); replaceLeadTasks(u); toast.success("Task completed!"); }
      catch { toast.error("Failed"); }
    });
  };

  const onAdd = () => {
    if (!leadId||!title.trim()||!dueAt) return;
    startTransition(async()=>{
      try {
        const u=await addTask(leadId,{title:title.trim(),dueAt:new Date(dueAt),priority});
        replaceLeadTasks(u); setTitle(""); setDueAt(""); toast.success("Task created!");
      } catch { toast.error("Failed"); }
    });
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <div className="adm-page-header">
        <div className="adm-page-header-row">
          <div>
            <h1 className="adm-page-title">Tasks</h1>
            <p className="adm-page-subtitle">Track and complete lead follow-up tasks.</p>
          </div>
          <button onClick={onAdd} disabled={isPending||!leadId||!title.trim()||!dueAt} className="adm-btn adm-btn-primary inline-flex items-center gap-2">
            <Plus size={15}/> New Task
          </button>
        </div>
      </div>

      <div className="adm-col-2">
        {/* Left: pending tasks */}
        <div>
          {/* Quick add */}
          <ACard style={{ marginBottom:20 }}>
            <div className="adm-card-header"><span className="adm-card-title">Quick Add Task</span></div>
            <ACardBody>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                <input value={leadQuery} onChange={e=>setLeadQuery(e.target.value)} placeholder="Search lead…" className="adm-input" style={{ height:38, fontSize:13 }}/>
                <select value={leadId} onChange={e=>setLeadId(e.target.value)} className="adm-input" style={{ height:38, fontSize:13 }}>
                  {filteredLeads.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:10 }}>
                <input value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onAdd()} placeholder="Task title…" className="adm-input" style={{ height:38, fontSize:13 }}/>
                <input type="date" value={dueAt} onChange={e=>setDueAt(e.target.value)} className="adm-input" style={{ height:38, fontSize:13, width:"auto" }}/>
                <select value={priority} onChange={e=>setPriority(e.target.value as any)} className="adm-input" style={{ height:38, fontSize:13, width:"auto" }}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </ACardBody>
          </ACard>

          {/* Filter tabs */}
          <div className="adm-pill-tabs" style={{ marginBottom:16, width:"fit-content" }}>
            {FILTERS.map(f=>(
              <button key={f.key} className={`adm-pill-tab${filter===f.key?" active":""}`} onClick={()=>setFilter(f.key)}>{f.label}</button>
            ))}
          </div>

          <ACard>
            <div className="adm-card-header">
              <span className="adm-card-title">Pending Tasks</span>
              <span className="adm-badge adm-badge-warning">{visible.length} due</span>
            </div>
            <div style={{ padding:16, display:"flex", flexDirection:"column", gap:10 }}>
              {visible.length === 0 && (
                <div className="adm-empty">
                  <CheckSquare size={28} style={{ color:"var(--adm-text-muted)", marginBottom:8 }}/>
                  <p style={{ fontSize:14, fontWeight:600, color:"var(--adm-text-dim)" }}>All clear!</p>
                </div>
              )}
              {visible.map(task=>{
                const overdue = task.dueAt && new Date(task.dueAt) < today;
                return (
                  <div key={task._id} className="adm-run-row" style={{ marginBottom:0 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div className="adm-wf-name">{task.title}</div>
                      <div className="adm-wf-meta" style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ color: overdue?"var(--adm-danger)":"inherit" }}>{formatDue(task.dueAt)}</span>
                        <span>•</span>
                        <Link href={`/admin/leads/${task.leadId}`} style={{ color:"var(--adm-primary)", fontWeight:600 }}>{task.leadName}</Link>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                      <span className={`adm-badge ${PRIORITY_BADGE[task.priority||"low"]}`}>
                        {(task.priority||"low").charAt(0).toUpperCase()+(task.priority||"low").slice(1)}
                      </span>
                      <button onClick={()=>onComplete(task)} disabled={isPending} className="adm-btn adm-btn-success adm-btn-sm">
                        ✓ Done
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ACard>
        </div>

        {/* Right: overview */}
        <ACard>
          <div className="adm-card-header"><span className="adm-card-title">Task Overview</span></div>
          <ACardBody>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>Overall Progress</span>
                  <span style={{ fontSize:12, fontFamily:"var(--adm-mono)", color:"var(--adm-text-muted)" }}>
                    {doneCount} / {initialTasks.length}
                  </span>
                </div>
                <div className="adm-progress-wrap">
                  <div className="adm-progress-bar" style={{ width:`${initialTasks.length>0?Math.round(doneCount/initialTasks.length*100):0}%` }}/>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:6 }}>
                {[
                  { count:highCount, label:"HIGH PRIORITY", bg:"var(--adm-danger-dim)", color:"var(--adm-danger)", textColor:"#991b1b" },
                  { count:medCount,  label:"MED PRIORITY",  bg:"var(--adm-warning-dim)",color:"var(--adm-warning)",textColor:"#92400e" },
                  { count:Math.max(0,doneCount), label:"COMPLETED",    bg:"var(--adm-success-dim)",color:"var(--adm-success)",textColor:"#065f46" },
                  { count:lowCount,  label:"LOW PRIORITY",  bg:"var(--adm-primary-dim)",color:"var(--adm-primary)",textColor:"#3730a3" },
                ].map(s=>(
                  <div key={s.label} style={{ background:s.bg, padding:14, borderRadius:"var(--adm-radius-md)", textAlign:"center" }}>
                    <div style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.count}</div>
                    <div style={{ fontSize:11, color:s.textColor, fontWeight:700, fontFamily:"var(--adm-mono)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ACardBody>
        </ACard>
      </div>
    </div>
  );
}
