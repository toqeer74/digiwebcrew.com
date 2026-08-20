"use client";

import { motion } from "framer-motion";
import { PhoneCall, Ruler, FileCheck2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: PhoneCall,
    ordinal: "01",
    title: "Scoping call",
    meta: "30 minutes · No cost",
    desc: "We map your goals, constraints, and what success actually looks like for your business.",
  },
  {
    icon: Ruler,
    ordinal: "02",
    title: "Scope & estimate",
    meta: "1–2 days",
    desc: "We translate the brief into deliverables and share a realistic range with the reasoning behind it.",
  },
  {
    icon: FileCheck2,
    ordinal: "03",
    title: "Fixed proposal",
    meta: "One document",
    desc: "Scope, milestones, timeline, and a fixed price agreed up front. No hourly surprises later.",
  },
  {
    icon: Rocket,
    ordinal: "04",
    title: "Build & launch",
    meta: "Sprint cadence",
    desc: "Clear milestones and demos through to launch — with ongoing support available if you want it.",
  },
];

export function PricingJourney() {
  return (
    <div className="relative">
      {/* Connector line (desktop) */}
      <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden lg:block">
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/15" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Node */}
              <div className="relative mb-6">
                <div
                  className={cn(
                    "flex h-[52px] w-[52px] items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md",
                    "border-slate-200 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
                  )}
                >
                  <Icon size={19} className="text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]" strokeWidth={1.75} />
                </div>
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--site-primary)] text-[10px] font-black text-white shadow-md shadow-[var(--site-primary)]/30">
                  {i + 1}
                </span>
              </div>

              <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {step.meta}
              </span>
              <h3 className="mb-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="max-w-[280px] text-[14px] leading-relaxed text-slate-500 dark:text-slate-400 lg:max-w-none">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
