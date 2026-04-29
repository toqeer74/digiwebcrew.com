"use server";

import { prisma, connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getNotifications() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  if (!process.env.DATABASE_URL) return [];

  const db = await connectToDatabase();
  if (!db) return [];

  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return notifications.map((n: any) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    time: n.createdAt,
    read: n.read,
  }));
}

export async function markNotificationAsRead(notificationId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  await prisma.notification.update({ where: { id: notificationId }, data: { read: true } });
}

export async function createNotification(type: string, title: string, body: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  return prisma.notification.create({
    data: { type: type as any, title, body, read: false },
  });
}
