"use client";

import { motion } from "framer-motion";
import { HelpCircle, Building2, Target, Workflow, Lightbulb, CalendarClock, Wallet, AtSign, PencilLine } from "lucide-react";

const asks = [
  { icon: HelpCircle, label: "What you need help with", hint: "Pick one or several services" },
  { icon: Building2, label: "What kind of business you run", hint: "Industry and size" },
  { icon: Target, label: "Your main goal", hint: "What success looks like" },
  { icon: Workflow, label: "Services that may be involved", hint: "We'll suggest a mix" },
  { icon: Lightbulb, label: "What stage the project is in", hint: "Idea, in progress, or rebuild" },
  { icon: CalendarClock, label: "Your timeline", hint: "Target launch window" },
  { icon: Wallet, label: "Your budget range", hint: "A range is fine" },
  { icon: AtSign, label: "How to contact you", hint: "Where we send the direction" },
  { icon: PencilLine, label: "Anything else we should know", hint: "Optional — leave blank if unsure" },
];

export function QuoteAsks() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {asks.map((ask, i) => {
        const Icon = ask.icon;
        return (
          <motion.div
            key={ask.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <span className="absolute right-4 top-4 font-display text-[11px] font-black text-slate-900/[0.08]">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors group-hover:bg-[var(--site-primary)]/10 group-hover:text-[var(--site-primary)]">
              <Icon size={17} strokeWidth={1.75} />
            </div>

            <p className="mb-1 font-display text-[14px] font-bold leading-snug text-slate-900">{ask.label}</p>
            <p className="text-[12px] font-medium leading-snug text-slate-400">{ask.hint}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
