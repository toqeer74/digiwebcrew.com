"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertChatToLead } from "@/lib/actions/lead-actions";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { toast } from "sonner";

interface ChatMessage {
  role: string;
  content: string;
  timestamp?: string;
}

interface ChatSessionLite {
  sessionId: string;
  mode?: string;
  leadScore?: number;
  isConverted?: boolean;
  updatedAt?: string;
  metadata?: any;
  messages?: ChatMessage[];
}

function formatRelativeTime(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function ChatsClient({ sessions, selected }: { sessions: ChatSessionLite[]; selected: ChatSessionLite | null }) {
  const searchParams = useSearchParams();
  const selectedSessionId = searchParams.get("session") || "";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onConvert = (sessionId: string) => {
    startTransition(async () => {
      try {
        const lead = await convertChatToLead(sessionId);
        toast.success("Chat converted to lead");
        router.refresh();
        if (lead?._id) {
          router.push(`/admin/chats?session=${sessionId}`);
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to convert chat");
      }
    });
  };

  return (
    <div className="admin-page-stack h-[calc(100vh-14rem)] w-full flex flex-col gap-4">
      <PageHeader
        title="Chats"
        subtitle="Review chat sessions and convert qualified conversations to leads."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Chats" }]}
      />

      <div className="flex min-h-0 flex-1 gap-4">
        <Card className="admin-card min-h-0 w-96 shrink-0 overflow-hidden rounded-xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Sessions</h3>
            <p className="text-xs text-slate-500">{sessions.length}</p>
          </div>

          <div className="max-h-full space-y-2 overflow-y-auto">
            {sessions.map((chat) => {
              const active = selectedSessionId === chat.sessionId;
              const last = chat.messages && chat.messages.length ? chat.messages[0] : null;
              return (
                <Link
                  key={chat.sessionId}
                  href={{ query: { session: chat.sessionId } }}
                  className={cn(
                    "block rounded-xl border p-3 transition-colors",
                    active ? "border-indigo-200 border-l-4 border-l-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900">{chat.sessionId.slice(0, 8)}...</p>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${chat.isConverted ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                      {chat.isConverted ? "Converted" : "Open"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 font-medium text-indigo-700">{chat.mode || "chat"}</span>
                    <span>Score {chat.leadScore || 0}</span>
                    <span>{formatRelativeTime(chat.updatedAt)}</span>
                  </div>
                  <p className="mt-2 truncate text-xs text-slate-500">{last ? last.content : "No messages"}</p>
                </Link>
              );
            })}
            {sessions.length === 0 ? <p className="text-sm text-slate-500">No sessions found.</p> : null}
          </div>
        </Card>

        <Card className="admin-card flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl">
          {!selected ? (
            <div className="grid flex-1 place-items-center text-sm text-slate-500">Select a session to view conversation.</div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{selected.sessionId}</p>
                  <p className="text-xs text-slate-500">
                    {selected.mode || "-"} · score {selected.leadScore || 0} · {selected.isConverted ? "Converted" : "Not converted"}
                  </p>
                </div>
                {!selected.isConverted ? (
                  <Button onClick={() => onConvert(selected.sessionId)} disabled={isPending}>
                    {isPending ? "Converting..." : "Convert to Lead"}
                  </Button>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Converted</span>
                )}
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {(selected.messages || []).map((message, index) => (
                  <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                    <div className="max-w-3xl">
                      <div
                        className={cn(
                          "rounded-xl px-4 py-2 text-sm",
                          message.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "border border-slate-200 bg-white text-slate-700"
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        {message.timestamp ? new Date(message.timestamp).toLocaleString() : ""}
                      </p>
                    </div>
                  </div>
                ))}
                {(selected.messages || []).length === 0 ? <p className="text-sm text-slate-500">No messages.</p> : null}
              </div>

              <div className="border-t border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-900">Metadata</h3>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Intent</p>
                    <p className="mt-1 text-sm text-slate-900">{selected.metadata?.intent || "-"}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Service</p>
                    <p className="mt-1 text-sm text-slate-900">{selected.metadata?.service || "-"}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Budget</p>
                    <p className="mt-1 text-sm text-slate-900">{selected.metadata?.budget || "-"}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Urgency</p>
                    <p className="mt-1 text-sm text-slate-900">{selected.metadata?.urgency || "-"}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3 md:col-span-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Contact Info</p>
                    <p className="mt-1 text-sm text-slate-900">
                      {selected.metadata?.contactInfo?.name || "Unknown"}
                      {selected.metadata?.contactInfo?.email ? ` · ${selected.metadata.contactInfo.email}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

