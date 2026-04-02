import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import ChatSession from "@/lib/models/chat";
import { ChatsClient } from "@/components/admin/chats-client";

type SearchParams = Promise<{ session?: string }>;

async function getSessions() {
  await connectToDatabase();
  const sessions = await ChatSession.find(
    {},
    {
      sessionId: 1,
      mode: 1,
      leadScore: 1,
      isConverted: 1,
      isClosed: 1,
      metadata: 1,
      createdAt: 1,
      updatedAt: 1,
      messages: { $slice: -1 },
    }
  )
    .sort({ updatedAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(sessions));
}

async function getSessionById(sessionId: string) {
  await connectToDatabase();
  const session = await ChatSession.findOne({ sessionId }).lean();
  return session ? JSON.parse(JSON.stringify(session)) : null;
}

export default async function ChatsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { session: selectedSessionId } = await searchParams;
  const sessions = await getSessions();
  const selected = selectedSessionId ? await getSessionById(selectedSessionId) : null;

  return <ChatsClient sessions={sessions} selected={selected} />;
}

