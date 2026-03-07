"use client";

import { useState } from "react";
import { addLeadNote, updateLeadStatus, addTask } from "@/lib/actions/lead-actions";
import { MessageSquare, Plus, CheckCircle2, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadDetailsClientProps {
  leadId: string;
  initialNotes: any[];
  initialTasks: any[];
  initialStatus: string;
}

export function LeadDetailsClient({ leadId, initialNotes, initialTasks, initialStatus }: LeadDetailsClientProps) {
  const [notes, setNotes] = useState(initialNotes || []);
  const [tasks, setTasks] = useState(initialTasks || []);
  const [status, setStatus] = useState(initialStatus);
  const [noteText, setNoteText] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  const handleAddNote = async () => {
    if (!noteText.trim()) return;
    setIsLoadingNote(true);
    try {
      await addLeadNote(leadId, noteText);
      setNotes([...notes, { content: noteText, author: "You", createdAt: new Date(), type: "note" }]);
      setNoteText("");
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    } finally {
      setIsLoadingNote(false);
    }
  };

  const handleAddTask = async () => {
    if (!taskTitle.trim() || !taskDueDate) return;
    setIsLoadingTask(true);
    try {
      await addTask(leadId, {
        title: taskTitle,
        dueAt: new Date(taskDueDate),
        priority: "medium",
      });
      setTasks([
        ...tasks,
        {
          title: taskTitle,
          dueAt: new Date(taskDueDate),
          done: false,
          priority: "medium",
          createdAt: new Date(),
        },
      ]);
      setTaskTitle("");
      setTaskDueDate("");
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    } finally {
      setIsLoadingTask(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsLoadingStatus(true);
    try {
      await updateLeadStatus(leadId, newStatus);
      setStatus(newStatus);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const statusOptions = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"];

  return (
    <div className="space-y-12">
      {/* Status Management */}
      <div className="bg-white rounded-[2.5rem] p-12 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-[900] text-gray-900 mb-6 flex items-center gap-3">
          <CheckCircle2 size={28} className="text-electric" /> Pipeline Status
        </h3>
        <div className="flex flex-wrap gap-3">
          {statusOptions.map((s) => (
            <button
              key={s}
              disabled={isLoadingStatus}
              onClick={() => handleStatusChange(s)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${
                status === s
                  ? "bg-electric text-white shadow-lg shadow-electric/30"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${isLoadingStatus ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoadingStatus ? <Loader2 size={16} className="inline mr-2 animate-spin" /> : null}
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-[2.5rem] p-12 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-[900] text-gray-900 mb-8 flex items-center gap-3">
          <MessageSquare size={28} className="text-electric" /> Notes & Comments ({notes.length})
        </h3>

        <div className="space-y-6 mb-10">
          {notes.length > 0 ? (
            notes.map((note, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-600 mb-2">
                      {note.author} • {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-900 font-medium">{note.content}</p>
                  </div>
                  <span className="text-xs bg-electric/10 text-electric px-3 py-1 rounded-full font-bold">
                    {note.type || "note"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8 opacity-60">No notes yet. Add one to get started.</p>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-electric focus:outline-none bg-gray-50 font-medium"
          />
          <Button
            onClick={handleAddNote}
            disabled={isLoadingNote || !noteText.trim()}
            className="bg-electric hover:bg-electric/90 text-white px-8 rounded-2xl font-bold"
          >
            {isLoadingNote ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
          </Button>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-[2.5rem] p-12 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-[900] text-gray-900 mb-8 flex items-center gap-3">
          <CheckCircle2 size={28} className="text-electric" /> Tasks ({tasks.filter((t) => !t.done).length} pending)
        </h3>

        <div className="space-y-4 mb-10">
          {tasks.length > 0 ? (
            tasks.map((task, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                  task.done ? "bg-emerald-50 border-emerald-200 opacity-60" : "bg-gray-50 border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {
                    const newTasks = [...tasks];
                    newTasks[idx].done = !newTasks[idx].done;
                    setTasks(newTasks);
                  }}
                  className="w-5 h-5 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <p className={`font-bold ${task.done ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.dueAt).toLocaleDateString()} •{" "}
                    <span
                      className={`font-bold ${
                        task.priority === "high" ? "text-rose-600" : task.priority === "medium" ? "text-amber-600" : "text-gray-600"
                      }`}
                    >
                      {task.priority?.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8 opacity-60">No tasks yet. Create one to stay organized.</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:border-electric focus:outline-none bg-gray-50 font-medium"
            />
            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              className="px-6 py-4 rounded-2xl border border-gray-200 focus:border-electric focus:outline-none bg-gray-50 font-medium"
            />
            <Button
              onClick={handleAddTask}
              disabled={isLoadingTask || !taskTitle.trim() || !taskDueDate}
              className="bg-electric hover:bg-electric/90 text-white px-8 rounded-2xl font-bold"
            >
              {isLoadingTask ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
