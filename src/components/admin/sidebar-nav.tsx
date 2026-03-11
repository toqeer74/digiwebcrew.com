"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Palette,
  FileStack,
  Shield,
  BarChart3,
  Sparkles,
  CheckSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

type NavItemConfig = {
  name: string;
  href: string;
  icon: any;
};

const sections: Array<{ label: string; items: NavItemConfig[] }> = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { name: "Leads", href: "/admin/leads", icon: Users },
      { name: "Chats", href: "/admin/chats", icon: MessageSquare },
      { name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
    ],
  },
  {
    label: "Content",
    items: [
      { name: "AI Assistant", href: "/admin/ai-assistant", icon: Sparkles },
      { name: "Drafts", href: "/admin/drafts", icon: FileText },
      { name: "Workflow Runs", href: "/admin/workflow-runs", icon: FileStack },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Branding", href: "/admin/branding", icon: Palette },
      { name: "Audit", href: "/admin/audit", icon: Shield },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

interface NavItemProps {
  item: NavItemConfig;
  isActive?: boolean;
  isCompressed?: boolean;
}

function getInitials(nameOrEmail?: string | null) {
  const value = (nameOrEmail || "").trim();
  if (!value) return "AD";
  const parts = value.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return value.slice(0, 2).toUpperCase();
}

export function SidebarNav({
  isCompressed = false,
  userName,
  userEmail,
}: {
  isCompressed?: boolean;
  userName?: string | null;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const displayName = userName || "Admin User";
  const displayEmail = userEmail || "admin@digiwebcrew.com";
  const initials = getInitials(userName || userEmail);

  return (
    <nav className={cn("flex-1 flex flex-col h-full", isCompressed && "items-center")}>
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            {!isCompressed ? (
              <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{section.label}</p>
            ) : null}
            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                  isCompressed={isCompressed}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!isCompressed ? (
        <div className="mt-3 rounded-lg border-t border-slate-200 pt-3">
          <div className="mb-2 flex items-center gap-2 px-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-800">{displayName}</p>
              <p className="truncate text-[11px] text-slate-500">{displayEmail}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500">
              <LogOut size={18} />
            </div>
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-2 flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
        >
          <LogOut size={18} />
        </button>
      )}
    </nav>
  );
}

function NavItem({ item, isActive, isCompressed = false }: NavItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center transition-all duration-200 group relative",
        isCompressed ? "justify-center w-10 h-10" : "gap-3 px-3 py-2 rounded-lg",
        isActive ? "bg-indigo-50" : "hover:bg-slate-50"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-200 w-8 h-8 rounded-lg",
          isActive ? "bg-indigo-600 text-white" : "text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50"
        )}
      >
        <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
      </div>
      {!isCompressed ? (
        <span className={cn("text-sm font-medium transition-colors", isActive ? "text-indigo-700" : "text-slate-600 group-hover:text-slate-900")}>{item.name}</span>
      ) : null}
    </Link>
  );
}
