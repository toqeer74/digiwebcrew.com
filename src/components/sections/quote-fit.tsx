"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, FileSearch, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";

const panels = [
  {
    key: "scope",
    icon: FileSearch,
    eyebrow: "Recommended",
    title: "Start with a project scope",
    lead: "Best when the need is clear but the exact project isn't yet.",
    items: [
      "You want help defining the project properly",
      "You may need more than one service",
      "The project has a few moving parts",
      "You are weighing priorities, timeline, or budget",
      "You would rather think it through before a call",
      "You are not fully sure what should be built first",
    ],
    cta: "Start Project Scope",
    href: "#scope-form",
    featured: true,
  },
  {
    key: "call",
    icon: CalendarDays,
    eyebrow: "Alternative",
    title: "Book a consultation instead",
    lead: "Best when you already know what you want built.",
    items: [
      "You know which service you need",
      "You have a written brief or spec ready",
      "You want to talk it through live",
      "You are working to a tight deadline",
    ],
    cta: "Book Consultation",
    href: "/book-consultation",
    featured: false,
  },
];

export function QuoteFit({ locale }: { locale: string }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
      {panels.map((panel, i) => {
        const Icon = panel.icon;
        const featured = panel.featured;
        return (
          <motion.div
            key={panel.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-500",
              featured
                ? "border-[var(--site-primary)]/30 bg-white shadow-xl shadow-[var(--site-primary)]/10"
                : "border-slate-200 bg-slate-50/60 shadow-sm hover:border-slate-300"
            )}
          >
            {featured && (
              <>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--site-primary)] via-emerald-400 to-sky-400" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--site-primary)]/10 blur-[80px]" />
              </>
            )}

            <div className="relative z-10 mb-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    featured
                      ? "bg-[var(--site-primary)]/10 text-[var(--site-primary)]"
                      : "bg-slate-200/70 text-slate-500"
                  )}
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                    featured
                      ? "bg-[var(--site-primary)] text-white"
                      : "bg-slate-200/80 text-slate-500"
                  )}
                >
                  {panel.eyebrow}
                </span>
              </div>

              <h3 className="mb-2 font-display text-2xl font-black leading-snug tracking-tight text-slate-900">
                {panel.title}
              </h3>
              <p className="text-[14px] font-medium leading-relaxed text-slate-500">{panel.lead}</p>
            </div>

            <ul className="relative z-10 mb-8 flex-grow space-y-3">
              {panel.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      featured
                        ? "bg-[var(--site-primary)]/12 text-[var(--site-primary)]"
                        : "bg-slate-200/80 text-slate-400"
                    )}
                  >
                    <Check size={11} strokeWidth={3.5} />
                  </span>
                  <span className="text-[14px] font-medium leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href={panel.href.startsWith("#") ? panel.href : localePath(locale, panel.href)}
              className={cn(
                "relative z-10 mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-extrabold transition-all active:scale-[0.99]",
                featured
                  ? "bg-[var(--site-primary)] text-white shadow-lg shadow-[var(--site-primary)]/25 hover:brightness-110"
                  : "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              {panel.cta}
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
