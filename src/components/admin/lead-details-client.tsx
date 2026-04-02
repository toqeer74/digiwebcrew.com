"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addLeadNote, addTask, completeTask, deleteLead, updateLeadStatus } from "@/lib/actions/lead-actions";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { toast } from "sonner";

interface LeadDetailsClientProps {
  leadId: string;
  initialStatus: string;
  initialNotes: any[];
  initialTasks: any[];
  initialEvents: any[];
}

const STATUS_OPTIONS = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];

export function LeadDetailsClient({
  leadId,
  initialStatus,
  initialNotes,
  initialTasks,
  initialEvents,
}: LeadDetailsClientProps) {
  const router = useRouter();

  const [status, setStatus] = useState(initialStatus || "NEW");
  const [notes, setNotes] = useState(initialNotes || []);
  const [tasks, setTasks] = useState(initialTasks || []);
  const [events, setEvents] = useState(initialEvents || []);

  const [noteText, setNoteText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [isPending, startTransition] = useTransition();

  const sortedEvents = useMemo(
    () => [...events].sort((a: any, b: any) => +new Date(b.at || 0) - +new Date(a.at || 0)),
    [events]
  );

  const onStatusChange = (nextStatus: string) => {
    setStatus(nextStatus);
    startTransition(async () => {
      try {
        const updated = await updateLeadStatus(leadId, nextStatus);
        if (updated?.events) setEvents(updated.events);
        toast.success("Lead status updated");
      } catch {
        toast.error("Failed to update status");
      }
    });
  };

  const onAddNote = () => {
    if (!noteText.trim()) return;
    startTransition(async () => {
      try {
        const updated = await addLeadNote(leadId, noteText.trim());
        setNotes(updated?.notes || notes);
        setEvents(updated?.events || events);
        setNoteText("");
        toast.success("Note added");
      } catch {
        toast.error("Failed to add note");
      }
    });
  };

  const onAddTask = () => {
    if (!taskTitle.trim() || !taskDueDate) return;
    startTransition(async () => {
      try {
        const updated = await addTask(leadId, {
          title: taskTitle.trim(),
          dueAt: new Date(taskDueDate),
          priority: taskPriority as "low" | "medium" | "high",
        });
        setTasks(updated?.tasks || tasks);
        setTaskTitle("");
        setTaskDueDate("");
        toast.success("Task created");
      } catch {
        toast.error("Failed to create task");
      }
    });
  };

  const onCompleteTask = (taskId: string) => {
    startTransition(async () => {
      try {
        const updated = await completeTask(leadId, taskId);
        setTasks(updated?.tasks || tasks);
        toast.success("Task completed");
      } catch {
        toast.error("Failed to complete task");
      }
    });
  };

  const onDeleteLead = () => {
    startTransition(async () => {
      try {
        await deleteLead(leadId);
        toast.success("Lead deleted");
        router.push("/admin/leads");
      } catch {
        toast.error("Failed to delete lead");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-semibold text-slate-900">Status</h3>
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
              disabled={isPending}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Notes</h3>
          <div className="space-y-2">
            {notes.length === 0 && <p className="text-sm text-slate-500">No notes yet.</p>}
            {notes.map((note: any, idx: number) => (
              <div key={idx} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">{note.author || "Admin"}</p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{note.type || "note"}</span>
                    <span className="text-xs text-slate-500">{note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-700">{note.content}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note"
              className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm"
            />
            <Button onClick={onAddNote} disabled={isPending || !noteText.trim()}>Add</Button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <h3 className="text-base font-semibold text-slate-900">Tasks</h3>
          <div className="space-y-2">
            {tasks.length === 0 && <p className="text-sm text-slate-500">No tasks yet.</p>}
            {tasks.map((task: any, idx: number) => {
              const taskId = String(task._id || idx);
              return (
                <div key={taskId} className="rounded-lg border border-slate-200 p-3 flex items-start gap-3">
                  <input type="checkbox" checked={!!task.done} onChange={() => onCompleteTask(taskId)} disabled={!!task.done || isPending} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.done ? "line-through text-slate-400" : "text-slate-900"}`}>{task.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Due: {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : "-"}   
                      <span className={`ml-1 ${task.priority === "high" ? "text-red-700" : task.priority === "medium" ? "text-amber-700" : "text-slate-600"}`}>
                        {(task.priority || "medium").toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task title"
              className="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-2"
            />
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
            />
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <Button onClick={onAddTask} disabled={isPending || !taskTitle.trim() || !taskDueDate}>Create Task</Button>
        </section>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900 mb-3">Timeline</h3>
          <div className="space-y-3">
            {sortedEvents.length === 0 && <p className="text-sm text-slate-500">No events yet.</p>}
            {sortedEvents.map((event: any, idx: number) => (
              <div key={idx} className="border-l-2 border-slate-200 pl-3">
                <p className="text-sm font-medium text-slate-900">{event.type || "Event"}</p>
                <p className="text-xs text-slate-500">{event.at ? new Date(event.at).toLocaleString() : ""}</p>
                {event.meta ? <p className="text-xs text-slate-600 mt-1">{typeof event.meta === "string" ? event.meta : JSON.stringify(event.meta)}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-red-200 bg-red-50 p-4">
          <h3 className="text-base font-semibold text-red-800">Danger Zone</h3>
          <p className="mt-2 text-sm text-red-700">Delete this lead permanently.</p>
          <Button className="mt-3 bg-red-600 hover:bg-red-700 text-white" onClick={() => setConfirmDelete(true)}>
            Delete Lead
          </Button>
        </section>
      </div>

      <ConfirmModal
        open={confirmDelete}
        title="Delete this lead?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isPending}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={onDeleteLead}
      />
    </div>
  );
}



