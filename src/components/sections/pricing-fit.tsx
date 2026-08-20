"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const goodFit = [
  "You rely on qualified leads, calls, bookings, or consultations",
  "You need stronger trust and presentation online",
  "You want custom work instead of a generic template setup",
  "You value a clear process and professional implementation",
  "You are investing in growth, not just a basic online presence",
  "You may need support beyond a single website or page",
];

const poorFit = [
  "You are shopping purely on lowest possible price",
  "You need a template site live by tomorrow",
  "You would rather skip discovery and hand over a fixed spec",
  "You are not looking to maintain or grow the site after launch",
];

const panels = [
  {
    kind: "good" as const,
    eyebrow: "Built for",
    title: "Businesses treating digital as infrastructure",
    items: goodFit,
    footer: "If most of these sound like you, a scoping call is the fastest way to a real number.",
  },
  {
    kind: "poor" as const,
    eyebrow: "Probably not for",
    title: "Projects where speed beats substance",
    items: poorFit,
    footer: "No hard feelings — a hosted template platform will serve those projects faster and cheaper, and we will say so.",
  },
];

export function PricingFit() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {panels.map((panel, i) => {
        const isGood = panel.kind === "good";
        const Icon = isGood ? Check : X;
        return (
          <motion.div
            key={panel.kind}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-2xl border p-8 shadow-sm transition-all duration-500 dark:shadow-none dark:backdrop-blur-sm",
              isGood
                ? "border-emerald-200 bg-white hover:border-emerald-300 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04] dark:hover:border-emerald-500/35"
                : "border-slate-200 bg-slate-50/60 hover:border-slate-300 dark:border-white/8 dark:bg-white/[0.02] dark:hover:border-white/15"
            )}
          >
            {isGood && (
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-[80px]" />
            )}

            <div className="relative z-10 mb-8">
              <div className="mb-5 inline-flex items-center gap-2">
                <span className={cn("h-1.5 w-1.5 rounded-full", isGood ? "bg-emerald-500" : "bg-slate-400")} />
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.24em]",
                    isGood ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {panel.eyebrow}
                </span>
              </div>

              <h3 className="mb-6 font-display text-xl font-black leading-snug tracking-tight text-slate-900 dark:text-white md:text-2xl">
                {panel.title}
              </h3>

              <ul className="space-y-3">
                {panel.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        isGood
                          ? "bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400"
                          : "bg-slate-200/70 text-slate-400 dark:bg-white/8 dark:text-slate-500"
                      )}
                    >
                      <Icon size={11} strokeWidth={3.5} />
                    </span>
                    <span
                      className={cn(
                        "text-[14px] leading-relaxed",
                        isGood
                          ? "font-medium text-slate-700 dark:text-slate-300"
                          : "font-medium text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "relative z-10 mt-auto border-t pt-5",
                isGood ? "border-emerald-200/70 dark:border-emerald-500/15" : "border-slate-200 dark:border-white/8"
              )}
            >
              <p className="text-[12.5px] font-medium leading-relaxed text-slate-400 dark:text-slate-500">
                {panel.footer}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
