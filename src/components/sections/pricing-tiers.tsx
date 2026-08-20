"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Zap, Bot, Search, ArrowRight, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";
import type { AccentKey, IconKey, PricingTier } from "@/lib/pricing-shared";

const ICONS: Record<IconKey, LucideIcon> = {
  code: Code2,
  zap: Zap,
  bot: Bot,
  search: Search,
};

const ACCENTS: Record<AccentKey, { from: string; to: string }> = {
  blue: { from: "from-[var(--site-primary)]", to: "to-emerald-400" },
  violet: { from: "from-violet-500", to: "to-indigo-400" },
  amber: { from: "from-amber-500", to: "to-orange-400" },
  teal: { from: "from-sky-500", to: "to-cyan-400" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function PricingTiers({ locale, tiers }: { locale: string; tiers: PricingTier[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {tiers.map((tier, i) => {
        const Icon = ICONS[tier.icon] ?? Code2;
        const accent = ACCENTS[tier.accent] ?? ACCENTS.blue;
        const ordinal = String(i + 1).padStart(2, "0");
        return (
          <motion.div
            key={tier.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={cn(
              "group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500",
              tier.popular
                ? "border-2 border-[var(--site-primary)] bg-white shadow-xl shadow-[var(--site-primary)]/15 lg:-translate-y-2 dark:border-[var(--site-primary)]/50 dark:bg-slate-900/80"
                : "border border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-sm dark:hover:border-white/15 dark:hover:bg-white/[0.07]"
            )}
          >
            {/* Gradient top rule */}
            <div className={cn("h-1 w-full bg-gradient-to-r", accent.from, accent.to)} />

            {/* Popular ribbon */}
            {tier.popular && (
              <div className="pointer-events-none absolute right-0 top-1 h-20 w-20 overflow-hidden">
                <div className="absolute -right-7 top-4 w-32 rotate-45 bg-[var(--site-primary)] py-1 text-center text-[9px] font-black uppercase tracking-widest text-white shadow-md">
                  Popular
                </div>
              </div>
            )}

            {/* Faded ordinal watermark */}
            <div className="pointer-events-none absolute right-4 top-4 select-none font-display text-[80px] font-black leading-none text-slate-900/[0.04] dark:text-white/[0.035]">
              {ordinal}
            </div>

            <div className="relative flex flex-grow flex-col p-7">
              <div className={cn("mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br p-0.5", accent.from, accent.to)}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-slate-900">
                  <Icon size={18} className="text-slate-700 dark:text-white" strokeWidth={1.75} />
                </div>
              </div>

              <h3 className="mb-4 min-h-[3rem] font-display text-[17px] font-bold leading-snug text-slate-900 dark:text-white">
                {tier.name}
              </h3>

              <div className="mb-4">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  From
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[2.6rem] font-black leading-none tracking-tighter text-slate-950 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{tier.unit}</span>
                </div>
              </div>

              <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <span className={cn("h-1.5 w-1.5 rounded-full bg-gradient-to-br", accent.from, accent.to)} />
                {tier.timeline}
              </div>

              <p className="mb-6 min-h-[6.3rem] text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                {tier.description}
              </p>

              <div className="mb-6 flex-grow">
                <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  Scope drivers
                </span>
                <ul className="space-y-2.5">
                  {tier.drivers.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-300">
                      <span className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white", accent.from, accent.to)}>
                        <Check size={10} strokeWidth={3.5} />
                      </span>
                      <span className="leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-t border-slate-100 pt-5 dark:border-white/8">
                <Link
                  href={localePath(locale, tier.href)}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[12px] font-extrabold transition-all duration-300 active:scale-[0.98]",
                    tier.popular
                      ? "bg-[var(--site-primary)] text-white shadow-lg shadow-[var(--site-primary)]/25 hover:brightness-110"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  )}
                >
                  {tier.ctaLabel}
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
