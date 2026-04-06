import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";
import { ChatsClient } from "@/components/admin/chats-client";

type SearchParams = Promise<{ session?: string }>;

async function getSessions() {
  await connectToDatabase();
  const sessions = await prisma.chatSession.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        take: 1,
        orderBy: { timestamp: "desc" },
      },
    },
  });
  return JSON.parse(JSON.stringify(sessions));
}

async function getSessionById(sessionId: string) {
  await connectToDatabase();
  const session = await prisma.chatSession.findUnique({
    where: { sessionId },
    include: {
      messages: {
        orderBy: { timestamp: "asc" },
      },
    },
  });
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
