import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { TasksClient } from "@/components/admin/tasks-client";

async function getTasksData() {
  await connectToDatabase();
  const leads = await Lead.find({}).select({ fullName: 1, tasks: 1 }).sort({ createdAt: -1 }).lean();
  const leadOptions = leads.map((lead: any) => ({ id: String(lead._id), name: lead.fullName || "Unnamed Lead" }));
  const tasks = leads.flatMap((lead: any) =>
    (lead.tasks || []).filter((task: any) => !task.done).map((task: any) => ({
      _id: String(task._id), leadId: String(lead._id), leadName: lead.fullName || "Unnamed Lead",
      title: task.title || "Untitled Task", dueAt: task.dueAt, priority: task.priority || "medium", done: !!task.done,
    }))
  );
  return { tasks, leadOptions };
}

export default async function TasksPage() {
  const { tasks, leadOptions } = await getTasksData();
  return <TasksClient initialTasks={tasks} leadOptions={leadOptions} />;
}
