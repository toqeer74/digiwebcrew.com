"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Sparkles, Plus, Settings } from "lucide-react";
import { AddLeadModal } from "@/components/admin/add-lead-modal";

const actions = [
  { label: "Add Lead",       desc: "New prospect",   icon: Plus,       color: "var(--adm-primary)", dim: "var(--adm-primary-dim)", onClick: true  },
  { label: "Analytics",     desc: "View trends",    icon: BarChart3,  color: "var(--adm-accent)",  dim: "var(--adm-accent-dim)",  href: "/admin/analytics" },
  { label: "AI Assistant",  desc: "Generate copy",  icon: Sparkles,   color: "var(--adm-purple)",  dim: "var(--adm-purple-dim)",  href: "/admin/ai-assistant" },
  { label: "Settings",      desc: "Configure",      icon: Settings,   color: "var(--adm-warning)", dim: "var(--adm-warning-dim)", href: "/admin/settings" },
];

export function DashboardQuickActions() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 px-6 pb-6 pt-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const inner = (
            <>
              <div
                className="grid place-items-center rounded-xl mb-3"
                style={{ width: 40, height: 40, background: action.dim, color: action.color }}
              >
                <Icon size={18} />
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: "var(--adm-text)" }}>{action.label}</p>
              <p style={{ fontSize: 11.5, color: "var(--adm-text-muted)", marginTop: 2 }}>{action.desc}</p>
            </>
          );

          if (action.onClick) {
            return (
              <button
                key={action.label}
                onClick={() => setIsAddOpen(true)}
                className="adm-quick-action text-left"
              >
                {inner}
              </button>
            );
          }

          return (
            <Link key={action.label} href={action.href!} className="adm-quick-action">
              {inner}
            </Link>
          );
        })}
      </div>
      <AddLeadModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}
