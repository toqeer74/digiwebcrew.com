"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut, User, Shield } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserProfilePopoverProps {
  userName: string;
  userEmail: string;
  initials: string;
}

export function UserProfilePopover({ userName, userEmail, initials }: UserProfilePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="admin-topbar-avatar grid place-items-center text-xs font-black text-white select-none cursor-pointer transition-transform hover:scale-105 active:scale-95"
        title={userName}
        style={{ width: 36, height: 36, borderRadius: "var(--adm-radius-sm)" }}
      >
        {initials}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
          style={{ border: "1.5px solid var(--adm-border)" }}
        >
          {/* User Info Header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid var(--adm-border)", background: "var(--adm-bg)" }}
          >
            <div
              className="grid shrink-0 place-items-center rounded-xl text-xs font-black text-white"
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, var(--adm-primary), var(--adm-purple))",
              }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--adm-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {userName}
              </p>
              <p style={{ fontSize: 11, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {userEmail}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
               className="flex w-full items-center gap-3 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50 text-slate-600 outline-none"
            >
              <User size={16} />
              My Profile
            </button>
            <button
               className="flex w-full items-center gap-3 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-50 text-slate-600 outline-none"
            >
              <Shield size={16} />
              Security Settings
            </button>
          </div>

          {/* Sign Out Footer */}
          <div
            className="px-2 py-2"
            style={{ borderTop: "1px solid var(--adm-border)", background: "var(--adm-bg)" }}
          >
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 outline-none"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
