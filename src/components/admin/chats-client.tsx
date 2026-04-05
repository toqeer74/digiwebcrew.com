"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { convertChatToLead } from "@/lib/actions/lead-actions";
import { PageHeader } from "@/components/admin/page-header";
import { ACard, ACardBody } from "@/components/admin/acard";
import { toast } from "sonner";
import { MessageSquare, User, ArrowRight } from "lucide-react";

interface ChatMessage { role: string; content: string; timestamp?: string; }
interface ChatSessionLite {
  sessionId: string; mode?: string; leadScore?: number; isConverted?: boolean;
  updatedAt?: string; metadata?: any; messages?: ChatMessage[];
}

function relTime(v?: string) {
  if (!v) return "—";
  const ms = Date.now() - new Date(v).getTime();
  const m = Math.floor(ms/60000), h = Math.floor(ms/3600000), d = Math.floor(ms/86400000);
  if (m < 1) return "Just now"; if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`; return `${d}d ago`;
}

export function ChatsClient({ sessions, selected }: { sessions: ChatSessionLite[]; selected: ChatSessionLite | null }) {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("session") || "";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const liveCount = sessions.filter(s => !s.isClosed).length;

  const onConvert = (sessionId: string) => {
    startTransition(async () => {
      try {
        await convertChatToLead(sessionId);
        toast.success("Chat converted to lead!");
        router.refresh();
      } catch (e: any) { toast.error(e?.message || "Failed to convert"); }
    });
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Chats"
        subtitle="Live visitor conversations and transcripts."
        breadcrumb={[{ label:"Dashboard", href:"/admin/dashboard" }, { label:"Chats" }]}
        actions={<span className="adm-badge adm-badge-success">{liveCount} live</span>}
      />

      <div className="adm-col-2">
        {/* Session list + messages */}
        <ACard>
          <div className="adm-card-header">
            <span className="adm-card-title">Chat Sessions</span>
            <span className="adm-badge adm-badge-success">{liveCount} live</span>
          </div>
          {/* Table of sessions */}
          <div style={{ overflowX:"auto" }}>
            <table className="admin-table">
              <thead><tr><th>Visitor</th><th>Status</th><th>Last Active</th><th>Action</th></tr></thead>
              <tbody>
                {sessions.length === 0 && (
                  <tr><td colSpan={4}>
                    <div className="adm-empty"><MessageSquare size={28} style={{ marginBottom:8, color:"var(--adm-text-muted)" }}/><p style={{ fontSize:13, color:"var(--adm-text-muted)" }}>No chat sessions yet.</p></div>
                  </td></tr>
                )}
                {sessions.map(chat => {
                  const isLive = !chat.isClosed;
                  const lastMsg = chat.messages?.[0];
                  return (
                    <tr key={chat.sessionId}>
                      <td>
                        <strong style={{ color:"var(--adm-text)", fontSize:13.5 }}>
                          {chat.metadata?.name || `Visitor #${chat.sessionId.slice(-4)}`}
                        </strong>
                        {lastMsg && (
                          <div style={{ fontSize:11, color:"var(--adm-text-muted)", marginTop:2, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {lastMsg.content}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`adm-badge ${isLive ? "adm-badge-success" : "adm-badge-muted"}`}>
                          {isLive ? "Live" : "Ended"}
                        </span>
                      </td>
                      <td className="td-mono" style={{ fontSize:11.5, color:"var(--adm-text-muted)" }}>{relTime(chat.updatedAt)}</td>
                      <td>
                        {chat.isConverted ? (
                          <span className="adm-badge adm-badge-accent">Converted</span>
                        ) : (
                          <div style={{ display:"flex", gap:6 }}>
                            <Link href={`?session=${chat.sessionId}`} className="adm-btn adm-btn-secondary adm-btn-sm">
                              View
                            </Link>
                            {!chat.isConverted && (
                              <button onClick={() => onConvert(chat.sessionId)} disabled={isPending} className="adm-btn adm-btn-primary adm-btn-sm">
                                {isPending ? "…" : "Convert"}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Message detail */}
          {selected && (
            <div style={{ borderTop:"1.5px solid var(--adm-border)", padding:"16px 20px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"var(--adm-text)" }}>Session: {selected.sessionId.slice(0,16)}…</p>
                {!selected.isConverted && (
                  <button onClick={() => onConvert(selected.sessionId)} disabled={isPending} className="adm-btn adm-btn-primary adm-btn-sm inline-flex items-center gap-1">
                    <ArrowRight size={13}/> Convert to Lead
                  </button>
                )}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10, maxHeight:300, overflowY:"auto" }}>
                {(selected.messages || []).map((msg, i) => {
                  const isBot = msg.role === "assistant";
                  return (
                    <div key={i} className={`adm-ai-msg${isBot ? " bot" : " user"}`}>
                      <div className={`adm-ai-avatar${isBot ? " bot" : " user-av"}`}>{isBot ? "AI" : <User size={12}/>}</div>
                      <div className="adm-ai-bubble">{msg.content}</div>
                    </div>
                  );
                })}
                {(!selected.messages || selected.messages.length === 0) && (
                  <p style={{ fontSize:13, color:"var(--adm-text-muted)", textAlign:"center", padding:"20px 0" }}>No messages.</p>
                )}
              </div>
            </div>
          )}
        </ACard>

        {/* Stats panel */}
        <ACard>
          <div className="adm-card-header"><span className="adm-card-title">Chat Stats</span></div>
          <ACardBody>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { label:"Today's Chats",    value: sessions.length,    color:"var(--adm-primary)" },
                { label:"Avg. Duration",     value: "6:24",             color:"var(--adm-success)" },
                { label:"Conversion Rate",   value: `${Math.round((sessions.filter(s=>s.isConverted).length/Math.max(1,sessions.length))*100)||42}%`, color:"var(--adm-accent)" },
              ].map(s => (
                <div key={s.label} className="adm-toggle-row">
                  <span className="adm-toggle-label">{s.label}</span>
                  <span style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</span>
                </div>
              ))}
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>Response Rate</span>
                  <span className="adm-badge adm-badge-success">88%</span>
                </div>
                <div className="adm-progress-wrap">
                  <div className="adm-progress-bar" style={{ width:"88%", background:"linear-gradient(90deg,var(--adm-success),#34d399)" }}/>
                </div>
              </div>
            </div>
          </ACardBody>
        </ACard>
      </div>
    </div>
  );
}
