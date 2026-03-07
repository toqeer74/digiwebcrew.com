"use server";

import { connectToDatabase } from "@/lib/db";
import { Notification } from "@/lib/models/notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getNotifications() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  // Quick development mode check
  if (!process.env.MONGODB_URI) {
    return [];
  }

  const db = await connectToDatabase();
  if (!db) {
    return [];
  }

  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  return notifications.map(notification => ({
    id: notification._id.toString(),
    type: notification.type,
    title: notification.title,
    body: notification.body,
    time: notification.createdAt,
    read: notification.read,
  }));
}

export async function markNotificationAsRead(notificationId: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  await Notification.findByIdAndUpdate(notificationId, { read: true });
}

export async function createNotification(type: string, title: string, body: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();

  const notification = new Notification({
    type,
    title,
    body,
    read: false,
  });

  await notification.save();

  return notification;
}