"use client";

import { motion } from "framer-motion";
import { Check, Plus, Minus, Code2, Zap, Bot, Search, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccentKey, IconKey, PricingTier } from "@/lib/pricing-shared";

type Cell = "yes" | "addon" | "no";

const ICONS: Record<IconKey, typeof Code2> = {
  code: Code2,
  zap: Zap,
  bot: Bot,
  search: Search,
};

/** Gradient pair per palette slot, matching this table's original columns. */
const ACCENTS: Record<AccentKey, { from: string; to: string }> = {
  blue: { from: "from-[var(--site-primary)]", to: "to-emerald-400" },
  violet: { from: "from-violet-500", to: "to-indigo-400" },
  amber: { from: "from-amber-500", to: "to-orange-400" },
  teal: { from: "from-sky-500", to: "to-cyan-400" },
};

/**
 * The tier stores the figure and its qualifier separately ("$1,000" + "per
 * month"); this column is too narrow for the words, so it uses the table's own
 * shorthand: "/mo" for a recurring price, "+" for a starting one. A price that
 * already carries its own period (e.g. "$1,000/mo") is left alone.
 */
function formatColumnPrice(price: string, unit: string): string {
  if (price.includes("/")) return price;
  if (/month|\bmo\b|monthly/i.test(unit)) return `${price}/mo`;
  return `${price}+`;
}

const rows: { label: string; cells: Cell[] }[] = [
  { label: "Discovery & scoping session", cells: ["yes", "yes", "yes", "yes"] },
  { label: "Custom UI/UX design", cells: ["yes", "yes", "addon", "no"] },
  { label: "Copywriting & content structure", cells: ["addon", "yes", "addon", "yes"] },
  { label: "CMS & self-serve editing", cells: ["yes", "addon", "no", "addon"] },
  { label: "Forms, booking & CRM integration", cells: ["addon", "yes", "yes", "no"] },
  { label: "Automation & workflow logic", cells: ["addon", "addon", "yes", "no"] },
  { label: "Analytics & conversion tracking", cells: ["yes", "yes", "addon", "yes"] },
  { label: "Technical SEO foundation", cells: ["yes", "yes", "no", "yes"] },
  { label: "Performance & speed optimization", cells: ["yes", "yes", "no", "yes"] },
  { label: "Monthly reporting & insights", cells: ["no", "addon", "addon", "yes"] },
  { label: "Ongoing updates & support", cells: ["addon", "addon", "addon", "yes"] },
];

function CellMark({ value }: { value: Cell }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
        <Check size={13} strokeWidth={3} />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === "addon") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400">
        <Plus size={13} strokeWidth={3} />
        <span className="sr-only">Optional add-on</span>
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-300 dark:bg-white/5 dark:text-slate-600">
      <Minus size={13} strokeWidth={3} />
      <span className="sr-only">Not included</span>
    </span>
  );
}

const legend = [
  { mark: "yes" as Cell, label: "Included" },
  { mark: "addon" as Cell, label: "Optional add-on" },
  { mark: "no" as Cell, label: "Not applicable" },
];

export function PricingComparison({ tiers }: { tiers: PricingTier[] }) {
  // Columns follow the admin-managed tiers, so an edited price or renamed
  // package shows up here as well as on the tier cards above.
  const columns = tiers.map((tier) => ({
    key: tier.id,
    label: tier.shortName,
    price: formatColumnPrice(tier.price, tier.unit),
    icon: ICONS[tier.icon] ?? Code2,
    accent: ACCENTS[tier.accent] ?? ACCENTS.blue,
    popular: tier.popular,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-sm"
    >
      {/* The matrix scrolls sideways on narrow screens — tell people it can */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-6 py-3 md:hidden dark:border-white/8">
        <MoveHorizontal size={13} className="text-slate-400 dark:text-slate-500" />
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
          Swipe to compare
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10">
              <th className="sticky left-0 z-10 bg-white px-6 py-5 align-bottom dark:bg-[#232840]">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  What&apos;s included
                </span>
              </th>
              {columns.map((col) => {
                const Icon = col.icon;
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-5 text-center align-bottom",
                      col.popular && "bg-[var(--site-primary)]/[0.04] dark:bg-[var(--site-primary)]/10"
                    )}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br p-0.5", col.accent.from, col.accent.to)}>
                        <span className="flex h-full w-full items-center justify-center rounded-[7px] bg-white dark:bg-slate-900">
                          <Icon size={15} className="text-slate-700 dark:text-white" strokeWidth={1.75} />
                        </span>
                      </span>
                      <span className="font-display text-[13px] font-bold text-slate-900 dark:text-white">{col.label}</span>
                      <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{col.price}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={cn(
                  "group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70 dark:border-white/5 dark:hover:bg-white/[0.03]",
                  i % 2 === 1 && "bg-slate-50/40 dark:bg-white/[0.015]"
                )}
              >
                <th
                  scope="row"
                  className={cn(
                    "sticky left-0 z-10 px-6 py-4 text-[13px] font-semibold text-slate-700 transition-colors group-hover:bg-slate-50 dark:text-slate-300 dark:group-hover:bg-[#2a2f4a]",
                    i % 2 === 1 ? "bg-[#fbfcfd] dark:bg-[#262b43]" : "bg-white dark:bg-[#232840]"
                  )}
                >
                  {row.label}
                </th>
                {/*
                  Driven by the columns, not by row.cells: the tier list is
                  admin-editable, and indexing the other way would read
                  columns[ci] as undefined once a tier was removed. The feature
                  matrix is authored for the four default tiers, so a newly
                  added tier has no data yet and reads as "not applicable"
                  until the row is filled in.
                */}
                {columns.map((col, ci) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-4 text-center",
                      col.popular && "bg-[var(--site-primary)]/[0.04] dark:bg-[var(--site-primary)]/[0.07]"
                    )}
                  >
                    <CellMark value={row.cells[ci] ?? "no"} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 dark:border-white/8 dark:bg-white/[0.02]">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <CellMark value={l.mark} />
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
