"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { addTask, completeTask } from "@/lib/actions/lead-actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TaskItem {
  _id: string;
  leadId: string;
  leadName: string;
  title: string;
  dueAt?: string;
  priority?: "low" | "medium" | "high";
  done?: boolean;
}

interface LeadOption {
  id: string;
  name: string;
}

type FilterKey = "all" | "overdue" | "today" | "week";

const FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "overdue", label: "Overdue" },
  { key: "today", label: "Due Today" },
  { key: "week", label: "This Week" },
];

const PRIORITY_ORDER = ["high", "medium", "low"] as const;

export function TasksClient({ initialTasks, leadOptions }: { initialTasks: TaskItem[]; leadOptions: LeadOption[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [leadId, setLeadId] = useState(leadOptions[0]?.id || "");
  const [leadQuery, setLeadQuery] = useState("");
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [isPending, startTransition] = useTransition();

  const filteredLeadOptions = useMemo(() => {
    const query = leadQuery.trim().toLowerCase();
    if (!query) return leadOptions;
    return leadOptions.filter((lead) => lead.name.toLowerCase().includes(query));
  }, [leadOptions, leadQuery]);

  const visibleTasks = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);
    const endOfWeek = new Date(startOfToday);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    return [...tasks]
      .filter((task) => {
        const dueDate = task.dueAt ? new Date(task.dueAt) : null;
        if (!dueDate) return activeFilter === "all";

        if (activeFilter === "overdue") return dueDate < startOfToday;
        if (activeFilter === "today") return dueDate >= startOfToday && dueDate < endOfToday;
        if (activeFilter === "week") return dueDate >= startOfToday && dueDate < endOfWeek;
        return true;
      })
      .sort((a, b) => {
        const aDue = a.dueAt ? new Date(a.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
        const bDue = b.dueAt ? new Date(b.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
        const aOverdue = aDue < startOfToday.getTime();
        const bOverdue = bDue < startOfToday.getTime();
        if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;
        return aDue - bDue;
      });
  }, [activeFilter, tasks]);

  const groupedTasks = useMemo(() => {
    const groups = {
      high: [] as TaskItem[],
      medium: [] as TaskItem[],
      low: [] as TaskItem[],
    };

    for (const task of visibleTasks) {
      const key = (task.priority || "medium") as keyof typeof groups;
      groups[key].push(task);
    }

    return groups;
  }, [visibleTasks]);

  const replaceLeadTasks = (updated: any) => {
    const updatedTasks = (updated?.tasks || [])
      .filter((task: any) => !task.done)
      .map((task: any) => ({
        _id: String(task._id),
        leadId: String(updated._id),
        leadName: updated.fullName,
        title: task.title,
        dueAt: task.dueAt,
        priority: task.priority,
        done: task.done,
      }));

    setTasks((prev) => [...prev.filter((task) => task.leadId !== String(updated._id)), ...updatedTasks]);
  };

  const onComplete = (task: TaskItem) => {
    startTransition(async () => {
      try {
        const updated = await completeTask(task.leadId, task._id);
        replaceLeadTasks(updated);
        toast.success("Task completed");
      } catch {
        toast.error("Failed to complete task");
      }
    });
  };

  const onAdd = () => {
    if (!leadId || !title.trim() || !dueAt) return;
    startTransition(async () => {
      try {
        const updated = await addTask(leadId, { title: title.trim(), dueAt: new Date(dueAt), priority });
        replaceLeadTasks(updated);
        setTitle("");
        setDueAt("");
        toast.success("Task created");
      } catch {
        toast.error("Failed to add task");
      }
    });
  };

  const renderTaskRow = (task: TaskItem) => {
    const dueDate = task.dueAt ? new Date(task.dueAt) : null;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const overdue = dueDate ? dueDate.getTime() < startOfToday.getTime() : false;

    return (
      <div key={`${task.leadId}-${task._id}`} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <input type="checkbox" checked={!!task.done} onChange={() => onComplete(task)} disabled={isPending} aria-label={`Complete ${task.title}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900">{task.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>{dueDate ? dueDate.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "No due date"}</span>
            {overdue ? <span className="rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-700">OVERDUE</span> : null}
            <span
              className={`rounded-full px-2 py-0.5 font-semibold ${
                task.priority === "high"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {(task.priority || "medium").toUpperCase()}
            </span>
          </div>
        </div>
        <Link href={`/admin/leads/${task.leadId}`} className="text-sm font-medium text-indigo-700 hover:underline">
          {task.leadName}
        </Link>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold text-slate-900">Quick Add Task</h2>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-5">
          <input
            value={leadQuery}
            onChange={(e) => setLeadQuery(e.target.value)}
            placeholder="Search lead"
            className="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-2"
          />
          <select value={leadId} onChange={(e) => setLeadId(e.target.value)} className="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-2">
            {filteredLeadOptions.map((lead) => (
              <option key={lead.id} value={lead.id}>{lead.name}</option>
            ))}
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")} className="h-10 rounded-lg border border-slate-200 px-3 text-sm">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-5">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" className="h-10 rounded-lg border border-slate-200 px-3 text-sm md:col-span-4" />
          <input type="date" value={dueAt} onChange={(e) => setDueAt(e.target.value)} className="h-10 rounded-lg border border-slate-200 px-3 text-sm" />
        </div>
        <Button className="mt-3" onClick={onAdd} disabled={isPending || !leadId || !title.trim() || !dueAt}>Create Task</Button>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex h-9 items-center rounded-lg border px-3 text-sm ${
                activeFilter === filter.key ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {visibleTasks.length === 0 ? (
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
          All clear - no pending tasks.
        </section>
      ) : (
        PRIORITY_ORDER.map((priorityKey) => {
          const groupTasks = groupedTasks[priorityKey];
          if (groupTasks.length === 0) return null;

          const sectionClasses =
            priorityKey === "high"
              ? "bg-rose-50"
              : priorityKey === "medium"
                ? "bg-amber-50"
                : "bg-slate-50";

          return (
            <section key={priorityKey} className={`rounded-xl border border-slate-200 p-4 ${sectionClasses}`}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">{priorityKey.toUpperCase()} Priority</h3>
                <span className="text-xs text-slate-500">{groupTasks.length}</span>
              </div>
              <div className="space-y-3">
                {groupTasks.map(renderTaskRow)}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}

