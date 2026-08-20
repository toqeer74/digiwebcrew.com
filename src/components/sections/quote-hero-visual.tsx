"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { label: "Website Design or Redesign", active: true },
  { label: "Funnel or Landing Pages", active: false },
  { label: "AI Chatbot", active: false },
  { label: "SEO & Growth", active: false },
];

/** Mock of the scope form, framed like a real product screen. */
export function QuoteHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[var(--site-primary)]/10 blur-[80px]" />

      {/* Ghost stack for depth */}
      <div className="absolute inset-x-4 -bottom-3 h-full rounded-[22px] border border-slate-200/70 bg-white/50" />
      <div className="absolute inset-x-2 -bottom-1.5 h-full rounded-[22px] border border-slate-200/80 bg-white/70" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Project Scope
          </span>
        </div>

        <div className="p-6">
          {/* Step + progress */}
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-[var(--site-primary)]/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--site-primary)]">
              Step 1 of 9
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">11% complete</span>
          </div>

          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "11%" }}
              transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[var(--site-primary)] to-emerald-400"
            />
          </div>

          <h3 className="mb-5 font-display text-xl font-black tracking-tight text-slate-900">
            What do you need help with?
          </h3>

          <div className="space-y-2.5">
            {options.map((opt, i) => (
              <motion.div
                key={opt.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.09 }}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-[13px] font-bold transition-colors",
                  opt.active
                    ? "border-[var(--site-primary)] bg-[var(--site-primary)]/[0.06] text-slate-900"
                    : "border-slate-200 bg-white text-slate-500"
                )}
              >
                <span>{opt.label}</span>
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border",
                    opt.active
                      ? "border-[var(--site-primary)] bg-[var(--site-primary)] text-white"
                      : "border-slate-200 bg-white"
                  )}
                >
                  {opt.active && <Check size={11} strokeWidth={3.5} />}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-[12px] font-bold text-white">
              Next Step →
            </span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
