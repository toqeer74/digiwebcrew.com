"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Check, Zap, Info } from "lucide-react";
import { getNotifications, markNotificationAsRead } from "@/lib/actions/notification-actions";
import { format } from "date-fns";

interface Notification {
  id: string; type: string; title: string; body: string; time: Date; read: boolean;
}

const typeIcon = (type: string) => {
  if (type === "SYSTEM") return <Check size={15} />;
  if (type === "ALERT")  return <Zap size={15} />;
  return <Info size={15} />;
};

const typeColor = (type: string) => {
  if (type === "SYSTEM") return { bg: "var(--adm-success-dim)", color: "var(--adm-success)" };
  if (type === "ALERT")  return { bg: "var(--adm-danger-dim)",  color: "var(--adm-danger)" };
  return { bg: "var(--adm-accent-dim)", color: "var(--adm-accent)" };
};

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getNotifications().then(setNotifications).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id: string) => {
    await markNotificationAsRead(id).catch(() => {});
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="admin-icon-btn relative"
        title="Notifications"
        style={{ width: 36, height: 36, borderRadius: "var(--adm-radius-sm)" }}
      >
        <Bell size={16} />
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[17px] h-[17px] px-1 rounded-full text-white font-black"
            style={{ fontSize: 9, background: "var(--adm-danger)", border: "2px solid white" }}
          >
            {unread}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl bg-white shadow-2xl"
          style={{ border: "1.5px solid var(--adm-border)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid var(--adm-border)", background: "var(--adm-bg)" }}
          >
            <h3 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--adm-text)" }}>
              Notifications
            </h3>
            {unread > 0 && (
              <span className="adm-badge adm-badge-danger">{unread} new</span>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="grid min-h-[120px] place-items-center">
                <p style={{ fontSize: 13, color: "var(--adm-text-muted)" }}>No notifications</p>
              </div>
            ) : (
              notifications.map((n) => {
                const { bg, color } = typeColor(n.type);
                return (
                  <div
                    key={n.id}
                    onClick={() => !n.read && markRead(n.id)}
                    className="flex gap-3 px-5 py-4 cursor-pointer transition-colors"
                    style={{
                      borderBottom: "1px solid var(--adm-border)",
                      background: n.read ? "white" : "var(--adm-primary-dim)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--adm-bg)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = n.read ? "white" : "var(--adm-primary-dim)")}
                  >
                    <div
                      className="grid shrink-0 place-items-center rounded-xl"
                      style={{ width: 34, height: 34, background: bg, color }}
                    >
                      {typeIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--adm-text)" }}>{n.title}</p>
                        <span style={{ fontSize: 10, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", flexShrink: 0 }}>
                          {format(n.time, "HH:mm")}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--adm-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {n.body}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div
            className="px-5 py-3 text-center"
            style={{ background: "var(--adm-bg)", borderTop: "1px solid var(--adm-border)" }}
          >
            <button
              style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--adm-primary)" }}
              onClick={() => setIsOpen(false)}
            >
              Dismiss All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
