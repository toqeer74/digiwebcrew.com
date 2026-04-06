import { prisma, connectToDatabase } from "@/lib/db";
import { TasksClient } from "@/components/admin/tasks-client";

async function getTasksData() {
  await connectToDatabase();
  const leads = await prisma.lead.findMany({
    select: { id: true, fullName: true, tasks: true },
    orderBy: { createdAt: "desc" },
  });

  const leadOptions = leads.map((lead: any) => ({
    id: lead.id,
    name: lead.fullName || "Unnamed Lead",
  }));

  const tasks = leads.flatMap((lead: any) =>
    (lead.tasks || [])
      .filter((task: any) => !task.done)
      .map((task: any) => ({
        _id: task.id,
        leadId: lead.id,
        leadName: lead.fullName || "Unnamed Lead",
        title: task.title || "Untitled Task",
        dueAt: task.dueAt,
        priority: task.priority || "medium",
        done: !!task.done,
      }))
  );
  return { tasks, leadOptions };
}

export default async function TasksPage() {
  const { tasks, leadOptions } = await getTasksData();
  return <TasksClient initialTasks={tasks} leadOptions={leadOptions} />;
}
