"use client";

import { motion } from "framer-motion";
import {
  Files,
  Palette,
  LayoutGrid,
  Blocks,
  Database,
  Plug,
  Workflow,
  Server,
  Clock,
  LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Impact = "high" | "medium" | "low";

const drivers: { icon: typeof Files; label: string; note: string; impact: Impact }[] = [
  { icon: Files, label: "Number of pages", note: "Scope of the build", impact: "high" },
  { icon: Palette, label: "Design depth", note: "Custom vs. system-driven", impact: "high" },
  { icon: LayoutGrid, label: "Content structure", note: "Information architecture", impact: "medium" },
  { icon: Blocks, label: "Custom functionality", note: "Bespoke features & logic", impact: "high" },
  { icon: Database, label: "CMS requirements", note: "Self-serve editing needs", impact: "medium" },
  { icon: Plug, label: "Integrations", note: "Forms, CRM & booking tools", impact: "high" },
  { icon: Workflow, label: "Automation logic", note: "Routing & qualification rules", impact: "high" },
  { icon: Server, label: "Technical setup", note: "Hosting, infra, migrations", impact: "medium" },
  { icon: Clock, label: "Timeline & urgency", note: "Compressed delivery", impact: "medium" },
  { icon: LifeBuoy, label: "Ongoing support", note: "Post-launch care level", impact: "low" },
];

const impactMeta: Record<Impact, { segments: number; label: string; bar: string; chip: string }> = {
  high: {
    segments: 3,
    label: "High",
    bar: "bg-[var(--site-primary)] dark:bg-[var(--site-primary-soft)]",
    chip: "text-[var(--site-primary)] bg-[var(--site-primary)]/10 dark:text-[var(--site-primary-soft)] dark:bg-[var(--site-primary)]/20",
  },
  medium: {
    segments: 2,
    label: "Medium",
    bar: "bg-sky-500",
    chip: "text-sky-600 bg-sky-500/10 dark:text-sky-400 dark:bg-sky-500/15",
  },
  low: {
    segments: 1,
    label: "Low",
    bar: "bg-slate-400",
    chip: "text-slate-500 bg-slate-500/10 dark:text-slate-400 dark:bg-white/10",
  },
};

function ImpactMeter({ impact }: { impact: Impact }) {
  const meta = impactMeta[impact];
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1" aria-hidden="true">
        {[0, 1, 2].map((s) => (
          <span
            key={s}
            className={cn(
              "h-1 w-4 rounded-full transition-colors",
              s < meta.segments ? meta.bar : "bg-slate-200 dark:bg-white/10"
            )}
          />
        ))}
      </div>
      <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em]", meta.chip)}>
        {meta.label}
      </span>
    </div>
  );
}

export function PricingDrivers() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Narrative panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-4"
      >
        <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-sm">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--site-primary)]/10 blur-[70px]" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                Scope & Structure
              </span>
            </div>

            <h3 className="mb-4 font-display text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-3xl">
              What actually moves the number.
            </h3>
            <p className="mb-6 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
              We price around technical depth and business impact, not hours on a template. These are the variables we weigh when scoping a project — and the ones we walk you through before any proposal.
            </p>

            <div className="rounded-xl border-l-2 border-[var(--site-primary)] bg-slate-50 py-3 pl-4 pr-3 dark:bg-white/5">
              <p className="text-[13px] font-semibold italic leading-relaxed text-slate-600 dark:text-slate-300">
                Transparent starting points that prioritize outcome over effort.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 dark:border-white/8">
              {[
                { value: "3", label: "Impact levels" },
                { value: "10", label: "Variables" },
                { value: "0", label: "Hidden fees" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
                  <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Driver grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
        {drivers.map((driver, i) => {
          const Icon = driver.icon;
          return (
            <motion.div
              key={driver.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-white/15 dark:hover:bg-white/[0.07]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors group-hover:bg-[var(--site-primary)]/10 group-hover:text-[var(--site-primary)] dark:bg-white/5 dark:text-slate-400 dark:group-hover:text-[var(--site-primary-soft)]">
                <Icon size={17} strokeWidth={1.75} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-display text-[14px] font-bold leading-tight text-slate-900 dark:text-white">
                  {driver.label}
                </div>
                <div className="mt-0.5 truncate text-[12px] font-medium text-slate-400 dark:text-slate-500">
                  {driver.note}
                </div>
              </div>

              <div className="shrink-0">
                <ImpactMeter impact={driver.impact} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
