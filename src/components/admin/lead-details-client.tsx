"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addLeadNote, addTask, completeTask, deleteLead, updateLeadStatus } from "@/lib/actions/lead-actions";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { toast } from "sonner";
import { Plus, MessageSquare, CheckSquare, Clock, Trash2 } from "lucide-react";

interface LeadDetailsClientProps {
  leadId: string; initialStatus: string; initialNotes: any[];
  initialTasks: any[]; initialEvents: any[];
}

const STATUS_OPTIONS = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];
const STATUS_BADGE: Record<string, string> = {
  NEW: "adm-badge-muted", CONTACTED: "adm-badge-accent", QUALIFIED: "adm-badge-primary",
  PROPOSAL: "adm-badge-purple", WON: "adm-badge-success", LOST: "adm-badge-danger",
};

export function LeadDetailsClient({ leadId, initialStatus, initialNotes, initialTasks, initialEvents }: LeadDetailsClientProps) {
  const router = useRouter();
  const [status, setStatus]       = useState(initialStatus || "NEW");
  const [notes, setNotes]         = useState(initialNotes || []);
  const [tasks, setTasks]         = useState(initialTasks || []);
  const [events, setEvents]       = useState(initialEvents || []);
  const [noteText, setNoteText]   = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue]     = useState("");
  const [taskPri, setTaskPri]     = useState("medium");
  const [confirmDel, setConfirmDel] = useState(false);
  const [isPending, startTransition] = useTransition();

  const sortedEvents = useMemo(() => [...events].sort((a: any, b: any) => +new Date(b.at || 0) - +new Date(a.at || 0)), [events]);

  const onStatusChange = (next: string) => {
    setStatus(next);
    startTransition(async () => {
      try { const u = await updateLeadStatus(leadId, next); if (u?.events) setEvents(u.events); toast.success("Status updated"); }
      catch { toast.error("Failed to update status"); }
    });
  };

  const onAddNote = () => {
    if (!noteText.trim()) return;
    startTransition(async () => {
      try {
        const u = await addLeadNote(leadId, noteText.trim());
        setNotes(u?.notes || notes); setEvents(u?.events || events); setNoteText(""); toast.success("Note added");
      } catch { toast.error("Failed to add note"); }
    });
  };

  const onAddTask = () => {
    if (!taskTitle.trim() || !taskDue) return;
    startTransition(async () => {
      try {
        const u = await addTask(leadId, { title: taskTitle.trim(), dueAt: new Date(taskDue), priority: taskPri as "low" | "medium" | "high" });
        setTasks(u?.tasks || tasks); setTaskTitle(""); setTaskDue(""); toast.success("Task created");
      } catch { toast.error("Failed to create task"); }
    });
  };

  const onCompleteTask = (taskId: string) => {
    startTransition(async () => {
      try { const u = await completeTask(leadId, taskId); setTasks(u?.tasks || tasks); toast.success("Task completed"); }
      catch { toast.error("Failed to complete task"); }
    });
  };

  const onDeleteLead = () => {
    startTransition(async () => {
      try { await deleteLead(leadId); toast.success("Lead deleted"); router.push("/admin/leads"); }
      catch { toast.error("Failed to delete lead"); }
    });
  };

  const inputCls = "adm-input h-10";
  const sectionCls = "rounded-xl bg-white p-5";
  const sectionStyle = { border: "1.5px solid var(--adm-border)" };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Left column */}
      <div className="lg:col-span-8 space-y-5">

        {/* Status */}
        <div className={sectionCls} style={sectionStyle}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--adm-text)" }}>Status</h3>
              <span className={`adm-badge ${STATUS_BADGE[status] || "adm-badge-muted"}`}>{status}</span>
            </div>
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              disabled={isPending}
              className="adm-input h-9"
              style={{ width: "auto", minWidth: 160 }}
            >
              {STATUS_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className={sectionCls} style={sectionStyle}>
          <div className="flex items-center gap-2 mb-4">
            <div className="admin-stat-icon adm-accent" style={{ width: 28, height: 28 }}><MessageSquare size={14} /></div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--adm-text)" }}>Notes</h3>
          </div>
          <div className="space-y-2 mb-4">
            {notes.length === 0 && <p style={{ fontSize: 13, color: "var(--adm-text-muted)" }}>No notes yet.</p>}
            {notes.map((note: any, idx: number) => (
              <div key={idx} className="rounded-xl p-4" style={{ border: "1.5px solid var(--adm-border)", background: "var(--adm-bg)" }}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--adm-text)" }}>{note.author || "Admin"}</p>
                  <div className="flex items-center gap-2">
                    <span className="adm-badge adm-badge-muted">{note.type || "note"}</span>
                    <span style={{ fontSize: 11, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>
                      {note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: "var(--adm-text-dim)" }}>{note.content}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onAddNote()}
              placeholder="Add a note…"
              className="adm-input h-10 flex-1"
            />
            <button
              onClick={onAddNote}
              disabled={isPending || !noteText.trim()}
              className="adm-btn adm-btn-primary adm-btn-sm shrink-0"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className={sectionCls} style={sectionStyle}>
          <div className="flex items-center gap-2 mb-4">
            <div className="admin-stat-icon adm-success" style={{ width: 28, height: 28 }}><CheckSquare size={14} /></div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--adm-text)" }}>Tasks</h3>
          </div>
          <div className="space-y-2 mb-4">
            {tasks.length === 0 && <p style={{ fontSize: 13, color: "var(--adm-text-muted)" }}>No tasks yet.</p>}
            {tasks.map((task: any, idx: number) => {
              const taskId = String(task._id || idx);
              return (
                <div
                  key={taskId}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ border: "1.5px solid var(--adm-border)" }}
                >
                  <input
                    type="checkbox"
                    checked={!!task.done}
                    onChange={() => onCompleteTask(taskId)}
                    disabled={!!task.done || isPending}
                    style={{ accentColor: "var(--adm-primary)", width: 16, height: 16, marginTop: 2, flexShrink: 0 }}
                  />
                  <div className="flex-1">
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: task.done ? "var(--adm-text-muted)" : "var(--adm-text)", textDecoration: task.done ? "line-through" : "none" }}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span style={{ fontSize: 11.5, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>
                        Due: {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : "—"}
                      </span>
                      <span
                        className="adm-badge"
                        style={{
                          background: task.priority === "high" ? "var(--adm-danger-dim)" : task.priority === "medium" ? "var(--adm-warning-dim)" : "var(--adm-bg)",
                          color: task.priority === "high" ? "#991b1b" : task.priority === "medium" ? "#92400e" : "var(--adm-text-muted)",
                        }}
                      >
                        {(task.priority || "medium").toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4 mb-3">
            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task title…" className={`${inputCls} md:col-span-2`} />
            <input type="date" value={taskDue} onChange={(e) => setTaskDue(e.target.value)} className={inputCls} />
            <select value={taskPri} onChange={(e) => setTaskPri(e.target.value)} className={inputCls}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            onClick={onAddTask}
            disabled={isPending || !taskTitle.trim() || !taskDue}
            className="adm-btn adm-btn-primary adm-btn-sm inline-flex items-center gap-2"
          >
            <Plus size={13} /> Create Task
          </button>
        </div>
      </div>

      {/* Right column */}
      <div className="lg:col-span-4 space-y-5">

        {/* Timeline */}
        <div className={sectionCls} style={sectionStyle}>
          <div className="flex items-center gap-2 mb-4">
            <div className="admin-stat-icon adm-purple" style={{ width: 28, height: 28 }}><Clock size={14} /></div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--adm-text)" }}>Timeline</h3>
          </div>
          {sortedEvents.length === 0 && <p style={{ fontSize: 13, color: "var(--adm-text-muted)" }}>No events yet.</p>}
          <div className="space-y-3">
            {sortedEvents.map((event: any, idx: number) => (
              <div key={idx} className="flex gap-3">
                <div style={{ width: 2, background: "var(--adm-border)", borderRadius: 99, flexShrink: 0, alignSelf: "stretch" }} />
                <div className="pb-3 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--adm-text)" }}>{event.type || "Event"}</p>
                  <p style={{ fontSize: 11, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", marginTop: 2 }}>
                    {event.at ? new Date(event.at).toLocaleString() : ""}
                  </p>
                  {event.meta && (
                    <p style={{ fontSize: 12, color: "var(--adm-text-dim)", marginTop: 4 }}>
                      {typeof event.meta === "string" ? event.meta : JSON.stringify(event.meta)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--adm-danger-dim)", border: "1.5px solid #fca5a5" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Trash2 size={16} style={{ color: "var(--adm-danger)" }} />
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#991b1b" }}>Danger Zone</h3>
          </div>
          <p style={{ fontSize: 13, color: "#b91c1c", marginBottom: 12 }}>Permanently delete this lead and all associated data.</p>
          <button
            onClick={() => setConfirmDel(true)}
            className="adm-btn adm-btn-sm text-white"
            style={{ background: "var(--adm-danger)" }}
          >
            Delete Lead
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmDel}
        title="Delete this lead?"
        description="This action cannot be undone. All notes, tasks, and events will be permanently removed."
        confirmLabel="Delete Lead"
        isLoading={isPending}
        onCancel={() => setConfirmDel(false)}
        onConfirm={onDeleteLead}
      />
    </div>
  );
}
