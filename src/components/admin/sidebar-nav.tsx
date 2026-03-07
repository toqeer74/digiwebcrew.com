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
  Bot,
  FileStack,
  Activity,
  Shield,
  BarChart3,
  Sparkles,
  CheckSquare,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Leads", href: "/admin/leads", icon: Users },
  { name: "AI Assistant", href: "/admin/ai-assistant", icon: Sparkles },
  { name: "Drafts", href: "/admin/drafts", icon: FileText },
  { name: "Workflow Runs", href: "/admin/workflow-runs", icon: FileStack },
  { name: "Chats", href: "/admin/chats", icon: MessageSquare },
  { name: "Tasks", href: "/admin/tasks", icon: CheckSquare },
  { name: "Branding", href: "/admin/branding", icon: Palette },
  { name: "Docs", href: "/admin/docs", icon: FileText },
  { name: "Audit", href: "/admin/audit", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface NavItemProps {
  item: {
    name: string;
    href?: string;
    icon: any;
  };
  isActive?: boolean;
  isLink?: boolean;
  isCompressed?: boolean;
}

export function SidebarNav({ isCompressed = false }: { isCompressed?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex-1 flex flex-col h-full", isCompressed && "items-center")}>
      <div className="flex-1 flex flex-col items-center gap-1">
        {navItems.map(item => (
          <NavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isCompressed={isCompressed}
          />
        ))}
      </div>
    </nav>
  );
}

function NavItem({ item, isActive, isLink = true, isCompressed = false }: NavItemProps) {
  const Icon = item.icon;

  const content = (
    <>
      <div className={cn(
        "flex items-center justify-center transition-all duration-300",
        isCompressed ? "w-10 h-10 rounded-xl" : "w-8 h-8 rounded-lg",
        isActive
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
          : "text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 dark:group-hover:bg-midnight-800"
      )}>
        <Icon size={isCompressed ? 20 : 16} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      {!isCompressed && (
        <span className={cn(
          "text-sm font-bold tracking-tight transition-colors duration-300",
          isActive ? "text-indigo-600" : "text-muted-foreground/80 group-hover:text-foreground"
        )}>
          {item.name}
        </span>
      )}
      {isCompressed && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
          {item.name}
        </div>
      )}
    </>
  );

  if (isLink && item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center transition-all duration-300 group relative ring-offset-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isCompressed ? "justify-center w-12 h-12" : "gap-3 px-4 py-2.5 rounded-[1rem] mb-1",
          !isActive && !isCompressed && "hover:bg-gray-50 dark:hover:bg-midnight-900"
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className={cn(
        "flex items-center transition-all duration-300 group relative hover:bg-rose-50 dark:hover:bg-rose-950/20",
        isCompressed ? "justify-center w-12 h-12" : "w-full gap-3 px-4 py-2.5 rounded-[1rem] mb-1"
      )}
    >
      <div className={cn(
        "flex items-center justify-center transition-all duration-300",
        isCompressed ? "w-10 h-10 rounded-xl" : "w-8 h-8 rounded-lg",
        "text-muted-foreground group-hover:bg-rose-500/10 group-hover:text-rose-500 group-hover:border-rose-200"
      )}>
        <LogOut size={isCompressed ? 20 : 18} />
      </div>
      {!isCompressed && (
        <span className="text-sm font-bold tracking-tight text-muted-foreground/80 group-hover:text-rose-600 transition-colors">
          Sign Out
        </span>
      )}
    </button>
  )
}
