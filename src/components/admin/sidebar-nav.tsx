"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, MessageSquare, FileText, Settings, Palette,
  FileStack, Shield, BarChart3, Sparkles, CheckSquare, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

type NavItemConfig = { name: string; href: string; icon: any; badge?: string; badgeVariant?: string };

const sections: Array<{ label: string; items: NavItemConfig[] }> = [
  {
    label: "Main",
    items: [
      { name: "Dashboard",     href: "/admin/dashboard",    icon: LayoutDashboard },
      { name: "Analytics",     href: "/admin/analytics",    icon: BarChart3, badge: "↑12%", badgeVariant: "success" },
      { name: "Leads",         href: "/admin/leads",        icon: Users, badge: "24" },
      { name: "Chats",         href: "/admin/chats",        icon: MessageSquare, badge: "7", badgeVariant: "warning" },
      { name: "Tasks",         href: "/admin/tasks",        icon: CheckSquare, badge: "5" },
    ],
  },
  {
    label: "Content",
    items: [
      { name: "AI Assistant",  href: "/admin/ai-assistant",  icon: Sparkles },
      { name: "Drafts",        href: "/admin/drafts",        icon: FileText },
      { name: "Workflow Runs", href: "/admin/workflow-runs", icon: FileStack },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Branding",  href: "/admin/branding", icon: Palette },
      { name: "Audit",     href: "/admin/audit",    icon: Shield },
      { name: "Settings",  href: "/admin/settings", icon: Settings },
    ],
  },
];

function getInitials(v?: string | null) {
  const s = (v || "").trim();
  if (!s) return "AD";
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return s.slice(0, 2).toUpperCase();
}

export function SidebarNav({
  isCompressed = false,
  userName,
  userEmail,
}: { isCompressed?: boolean; userName?: string | null; userEmail?: string | null }) {
  const pathname = usePathname();
  const displayName  = userName  || "Admin User";
  const displayEmail = userEmail || "admin@digiwebcrew.com";
  const initials = getInitials(userName || userEmail);

  return (
    <nav className="flex flex-1 flex-col h-full">
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
        {sections.map((section) => (
          <div key={section.label} className="mb-3">
            {!isCompressed && (
              <p className="admin-nav-section">{section.label}</p>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn("admin-nav-item", isActive && "active-nav")}
                  >
                    <span className="admin-nav-icon">
                      <Icon size={15} strokeWidth={isActive ? 2.4 : 2} />
                    </span>
                    {!isCompressed && (
                      <>
                        <span style={{ flex: 1 }}>{item.name}</span>
                        {item.badge && (
                          <span className={cn("admin-nav-badge", item.badgeVariant)}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User footer */}
      {!isCompressed && (
        <div
          className="mt-3 pt-3"
          style={{ borderTop: "1.5px solid var(--adm-border)" }}
        >
          <div className="admin-user-card mb-2">
            <div className="admin-user-avatar">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="admin-user-name">{displayName}</p>
              <p className="admin-user-role">{displayEmail}</p>
            </div>
            <div className="admin-status-dot" />
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all"
            style={{ color: "var(--adm-text-muted)", fontFamily: "var(--adm-font)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--adm-danger-dim)";
              (e.currentTarget as HTMLElement).style.color = "var(--adm-danger)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "";
              (e.currentTarget as HTMLElement).style.color = "var(--adm-text-muted)";
            }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
