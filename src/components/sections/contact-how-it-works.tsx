"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Calendar, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { SectionKicker } from "@/components/ui/section-kicker";
import { cn } from "@/lib/utils";

function InquiryScreen() {
  return (
    <div className="flex h-full flex-col bg-white p-6 dark:bg-[#0d1117]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-black text-slate-800 dark:text-white">Contact Form</span>
        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-600 dark:text-blue-400">
          Step 1
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">Full Name</div>
          <div className="h-8 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white">
            Jane Doe
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">Service Interest</div>
          <div className="flex flex-wrap gap-2">
            {["Website", "SEO", "Custom App"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-bold",
                  i === 0
                    ? "bg-[var(--site-primary)] text-white"
                    : "border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">Message</div>
          <div className="h-16 rounded-md border border-slate-200 bg-slate-50 p-2 text-[10px] text-slate-400 dark:border-white/10 dark:bg-white/5">
            We are looking to rebuild our company website and improve our SEO...
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-end pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1746A2] px-4 py-2 text-[11px] font-bold text-white shadow-md">
          Submit <Send size={11} />
        </span>
      </div>
    </div>
  );
}

function ScheduleScreen() {
  return (
    <div className="flex h-full flex-col bg-white p-6 dark:bg-[#0d1117]">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-black text-slate-800 dark:text-white">Select a Time</span>
        <Calendar size={14} className="text-emerald-500" />
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-xs">August 2026</span>
          <div className="flex gap-1">
            <div className="h-5 w-5 rounded flex items-center justify-center bg-slate-100 text-[10px] dark:bg-white/5">&lt;</div>
            <div className="h-5 w-5 rounded flex items-center justify-center bg-slate-100 text-[10px] dark:bg-white/5">&gt;</div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-medium text-slate-400 mb-1">
          <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className={cn("h-6 w-6 flex items-center justify-center rounded-full mx-auto", i === 14 ? "bg-[var(--site-primary)] text-white shadow-sm" : "text-slate-700 dark:text-slate-300")}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto border-t border-slate-100 pt-4 dark:border-white/5">
        <div className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-2 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <CheckCircle2 size={14} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300">Call Scheduled!</div>
            <div className="text-[9px] text-emerald-700 dark:text-emerald-400/70">Aug 15 at 10:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EstimateScreen() {
  return (
    <div className="flex h-full flex-col bg-slate-50 p-6 dark:bg-[#0d1117]">
      <div className="mb-4 flex items-center gap-2">
        <FileText size={14} className="text-amber-500" />
        <span className="text-sm font-black text-slate-800 dark:text-white">Project Proposal</span>
      </div>
      <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="mb-4 border-b border-slate-100 pb-3 dark:border-white/5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Total Estimate</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">$4,500</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Custom Web Design</span>
            <span className="text-slate-500 font-medium">$2,000</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Frontend Development</span>
            <span className="text-slate-500 font-medium">$1,500</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-semibold text-slate-700 dark:text-slate-300">SEO Optimization</span>
            <span className="text-slate-500 font-medium">$1,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollaborateScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#0d1117] p-6 text-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--site-primary)]/20 via-transparent to-transparent opacity-50" />
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--site-primary)] to-blue-400 shadow-lg mb-6">
        <Sparkles size={28} className="text-white" />
      </div>
      <h3 className="text-xl font-black tracking-tight mb-2 relative z-10">Project Approved</h3>
      <p className="text-xs text-slate-400 max-w-[200px] mb-8 relative z-10">
        We've mapped the logic, aligned on scope, and are ready to build.
      </p>
      <div className="w-full h-1.5 bg-white/10 rounded-full relative z-10 overflow-hidden">
        <div className="h-full bg-emerald-400 w-1/3 rounded-full" />
      </div>
      <div className="w-full flex justify-between mt-2 text-[9px] text-slate-500 font-bold uppercase relative z-10">
        <span>Kickoff</span>
        <span>Launch</span>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: "Submit Inquiry",
    desc: "Share your project details with our quick contact form.",
    Screen: InquiryScreen,
  },
  {
    title: "Schedule a Call",
    desc: "Discuss your specific needs and goals with our expert team.",
    Screen: ScheduleScreen,
  },
  {
    title: "Free Estimation",
    desc: "Get a tailored, negotiable project scope estimation.",
    Screen: EstimateScreen,
  },
  {
    title: "Let's Collaborate",
    desc: "Ready to bring your ideas to life? Let's work together!",
    Screen: CollaborateScreen,
  },
];

function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#0d1117]">
        <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-white/15" />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export function ContactHowItWorks() {
  const [active, setActive] = useState(0);
  const ActiveScreen = STEPS[active].Screen;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[rgba(var(--site-primary-rgb),0.05)] via-white to-white py-24 dark:from-[rgba(var(--site-primary-rgb),0.08)] dark:via-midnight dark:to-midnight lg:py-32">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Left: steps */}
          <div>
            <SectionKicker label="Process" />
            <h2 className="mb-4 font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              How It Works
            </h2>
            <p className="mb-10 max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
              Getting started is simple. From initial contact to kicking off the project, here is exactly what to expect.
            </p>

            <div className="space-y-2">
              {STEPS.map((step, i) => (
                <button
                  key={step.title}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "block w-full rounded-2xl p-5 text-left transition-all duration-300",
                    active === i
                      ? "bg-white shadow-lg shadow-slate-900/5 dark:bg-white/[0.06]"
                      : "hover:bg-white/50 dark:hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors",
                        active === i
                          ? "bg-[var(--site-primary)] text-white"
                          : "bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                      )}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={cn(
                        "font-display text-lg font-bold transition-colors",
                        active === i ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "mt-2 pl-11 text-sm leading-relaxed transition-colors",
                      active === i ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {step.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: stacked device mockup (desktop) */}
          <div className="relative mx-auto hidden h-[420px] w-full max-w-[480px] lg:block">
            {/* Ghost stacked cards for depth */}
            <div className="absolute inset-4 -rotate-3 rounded-2xl border border-slate-200/50 bg-white/60 dark:border-white/5 dark:bg-white/[0.02]" />
            <div className="absolute inset-2 rotate-2 rounded-2xl border border-slate-200/60 bg-white/80 dark:border-white/8 dark:bg-white/[0.03]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, rotate: -1, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <DeviceFrame>
                  <ActiveScreen />
                </DeviceFrame>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: static current screen below steps */}
          <div className="h-[300px] w-full lg:hidden">
            <DeviceFrame>
               <ActiveScreen />
            </DeviceFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
