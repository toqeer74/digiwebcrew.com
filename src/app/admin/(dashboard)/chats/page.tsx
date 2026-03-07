import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import ChatSession from "@/lib/models/chat";
import { Card } from "@/components/ui/card";
import { MessageSquare, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";

type SearchParams = Promise<{ session?: string }>;

async function getSessions() {
    // Quick development mode check
    if (!process.env.MONGODB_URI) {
        return [];
    }

    const db = await connectToDatabase();
    if (!db) {
        return [];
    }

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

    return sessions as any[];
}

async function getSessionById(sessionId: string) {
    await connectToDatabase();
    const session = await ChatSession.findOne({ sessionId }).lean();
    return session as any | null;
}

export default async function ChatsPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const { session: selectedSessionId } = await searchParams;
    const sessions = await getSessions();

    const selected = selectedSessionId ? await getSessionById(selectedSessionId) : null;

    return (
        <div className="h-[calc(100vh-16rem)] flex flex-col gap-8">
            <PageHeader
                label="Communication Suite"
                title="Chats"
                highlight="Sessions"
                description="Real-time chat sessions"
                descriptionHighlight=""
                icon={<Terminal />}
            />

            <div className="flex-1 flex gap-8 min-h-0">
                <div className="w-96 flex flex-col gap-6 shrink-0 min-h-0">
                    <Card className="flex-1 rounded-[2.5rem] border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col p-6 min-h-0">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 px-2">Sessions</h3>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                                {sessions.length} total
                            </div>
                        </div>

                        <div className="space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                            {sessions.map((s) => {
                                const last = Array.isArray(s.messages) && s.messages.length > 0 ? s.messages[0] : null;
                                const active = selectedSessionId === s.sessionId;
                                const title = s.metadata?.contactInfo?.email || s.metadata?.contactInfo?.name || s.sessionId;

                                return (
                                    <Link
                                        key={s.sessionId}
                                        href={{ query: { session: s.sessionId } }}
                                        className={cn(
                                            "block p-4 rounded-3xl transition-all border",
                                            active
                                                ? "bg-electric/5 border-electric/20 shadow-sm"
                                                : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-100"
                                        )}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="min-w-0">
                                                <div className="font-black text-sm text-gray-900 truncate">{title}</div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">
                                                    {s.mode} • score {s.leadScore}
                                                </div>
                                                <div className="text-xs text-muted-foreground/70 font-medium truncate mt-2">
                                                    {last ? `${last.role}: ${last.content}` : "No messages yet"}
                                                </div>
                                            </div>
                                            <div className="text-[9px] font-bold text-gray-400 uppercase shrink-0">
                                                {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : ""}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}

                            {sessions.length === 0 && (
                                <div className="text-center py-16 text-muted-foreground/60">
                                    <div className="text-xs font-black uppercase tracking-widest">No chat sessions</div>
                                    <div className="text-xs font-medium mt-2">Start one from the public chatbot to see it here.</div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <Card className="flex-1 rounded-[3rem] border-gray-100 bg-white shadow-sm overflow-hidden flex flex-col relative min-h-0">
                    <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />

                    {!selected ? (
                        <div className="flex-1 p-12 flex flex-col items-center justify-center text-center opacity-60 relative z-10">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-8 border border-white">
                                <MessageSquare size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tight">Select a <span className="text-electric">Session</span></h3>
                            <p className="max-w-xs text-gray-400 font-bold mt-4 italic">Pick a session from the left to view the message timeline.</p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col min-h-0 relative z-10">
                            <div className="p-8 border-b border-gray-50 bg-white/50 backdrop-blur-md">
                                <div className="flex items-center justify-between gap-6">
                                    <div className="min-w-0">
                                        <div className="text-lg font-black text-gray-900 truncate">{selected.sessionId}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mt-1">
                                            {selected.mode} • score {selected.leadScore} • {selected.isConverted ? "converted" : "not converted"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-4">
                                {(selected.messages || []).map((m: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "max-w-3xl rounded-2xl border p-4",
                                            m.role === "user"
                                                ? "ml-auto bg-gray-50 border-gray-100"
                                                : m.role === "assistant"
                                                    ? "mr-auto bg-electric/5 border-electric/10"
                                                    : "mx-auto bg-white border-gray-100"
                                        )}
                                    >
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                                            {m.role} {m.timestamp ? `• ${new Date(m.timestamp).toLocaleString()}` : ""}
                                        </div>
                                        <div className="text-sm font-medium text-gray-900 mt-2 whitespace-pre-wrap">
                                            {m.content}
                                        </div>
                                    </div>
                                ))}

                                {(selected.messages || []).length === 0 && (
                                    <div className="text-center py-16 text-muted-foreground/60">
                                        <div className="text-xs font-black uppercase tracking-widest">No messages</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
