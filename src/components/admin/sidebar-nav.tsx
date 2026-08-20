"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, MessageSquare, FileText, Settings, Palette,
  FileStack, Shield, BarChart3, Sparkles, CheckSquare, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItemConfig = { name: string; href: string; icon: any; badge?: string; badgeVariant?: string };

const sections: Array<{ label: string; items: NavItemConfig[] }> = [
  {
    label: "Main",
    items: [
      { name: "Dashboard",     href: "/digiadmin/dashboard",    icon: LayoutDashboard },
      { name: "Analytics",     href: "/digiadmin/analytics",    icon: BarChart3, badge: "↑12%", badgeVariant: "success" },
      { name: "Leads",         href: "/digiadmin/leads",        icon: Users, badge: "24" },
      { name: "Chats",         href: "/digiadmin/chats",        icon: MessageSquare, badge: "7", badgeVariant: "warning" },
      { name: "Tasks",         href: "/digiadmin/tasks",        icon: CheckSquare, badge: "5" },
    ],
  },
  {
    label: "Content",
    items: [
      { name: "AI Assistant",  href: "/digiadmin/ai-assistant",  icon: Sparkles },
      { name: "Drafts",        href: "/digiadmin/drafts",        icon: FileText },
      { name: "Workflow Runs", href: "/digiadmin/workflow-runs", icon: FileStack },
      { name: "Pricing",       href: "/digiadmin/pricing",       icon: Tag },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Branding",  href: "/digiadmin/branding", icon: Palette },
      { name: "Audit",     href: "/digiadmin/audit",    icon: Shield },
      { name: "Settings",  href: "/digiadmin/settings", icon: Settings },
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


  // Flatten all items from all sections into a single list
  const allItems = sections.flatMap((s) => s.items);

  return (
    <nav className="flex flex-1 flex-col h-full">
      <div className="flex flex-col custom-scrollbar" style={{ gap: 4, paddingRight: 2 }}>
        {allItems.map((item) => {
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
                <Icon size={17} strokeWidth={isActive ? 2.4 : 1.8} />
              </span>
              {!isCompressed && (
                <>
                  <span className="admin-nav-label">{item.name}</span>
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

    </nav>
  );
}
