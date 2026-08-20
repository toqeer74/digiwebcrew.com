"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Code2, Eye, DollarSign, Users, TrendingUp, ArrowUpRight, CheckCircle2, ChevronRight, BarChart3, Globe, LineChart, Activity } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { SectionKicker } from "@/components/ui/section-kicker";
import { cn } from "@/lib/utils";

const CHART_BARS = [35, 55, 45, 70, 60, 90, 75, 85, 100, 95, 110, 105];

function BriefScreen() {
  return (
    <div className="flex h-full flex-col bg-slate-50 p-0 dark:bg-[#0a0a0c]">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-white/5 dark:bg-[#0d1117]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[var(--site-primary)] flex items-center justify-center">
            <CheckCircle2 size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-white">Project Setup</span>
        </div>
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 dark:border-[#0d1117] dark:bg-slate-700" />
          <div className="h-6 w-6 rounded-full border-2 border-white bg-blue-200 dark:border-[#0d1117] dark:bg-blue-900" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-5 overflow-hidden">
        <div className="mb-4">
          <h4 className="text-lg font-black text-slate-900 dark:text-white">Acme Corp Redesign</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Due in 4 weeks • Lead: Sarah J.</p>
        </div>

        {/* Task Board */}
        <div className="grid grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-white/5">
            <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>To Do</span>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] dark:bg-white/10">3</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm dark:border-white/5 dark:bg-[#0d1117]">
                <div className="mb-2 text-xs font-semibold text-slate-800 dark:text-slate-200">Finalize Brand Assets</div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-500/20 dark:text-red-400">High</span>
                  <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm dark:border-white/5 dark:bg-[#0d1117]">
                <div className="mb-2 text-xs font-semibold text-slate-800 dark:text-slate-200">Wireframe Homepage</div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">Med</span>
                  <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="rounded-xl bg-slate-100 p-3 dark:bg-white/5">
            <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>In Progress</span>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] dark:bg-white/10">1</span>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-[var(--site-primary)] bg-white p-2.5 shadow-sm ring-1 ring-[var(--site-primary)]/20 dark:bg-[#0d1117]">
                <div className="mb-2 text-xs font-semibold text-slate-800 dark:text-slate-200">Strategy & Goals Brief</div>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[var(--site-primary)]/10 px-1.5 py-0.5 text-[9px] font-bold text-[var(--site-primary)]">Active</span>
                  <div className="h-4 w-4 rounded-full bg-[var(--site-primary)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildScreen() {
  return (
    <div className="flex h-full bg-[#1e1e1e] font-mono">
      {/* Code Editor Left */}
      <div className="flex w-3/5 flex-col border-r border-[#333]">
        <div className="flex items-center gap-4 bg-[#252526] px-3 py-2 text-[10px] text-[#969696]">
          <div className="flex items-center gap-1.5 border-b border-blue-400 pb-1 text-blue-400">
            <Code2 size={12} /> page.tsx
          </div>
          <div className="flex items-center gap-1.5 pb-1">
            globals.css
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-4 text-[11px] leading-relaxed">
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">1</div>
            <div className="text-[#569cd6]">import <span className="text-[#9cdcfe]">React</span> from <span className="text-[#ce9178]">'react'</span>;</div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">2</div>
            <div className="text-[#569cd6]">import <span className="text-[#d4d4d4]">{`{ Hero }`}</span> from <span className="text-[#ce9178]">'@/components/hero'</span>;</div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">3</div>
            <div className="text-[#d4d4d4]"></div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">4</div>
            <div className="text-[#569cd6]">export default function <span className="text-[#dcdcaa]">Page</span><span className="text-[#d4d4d4]">() {`{`}</span></div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">5</div>
            <div className="text-[#c586c0] pl-4">return <span className="text-[#d4d4d4]">(</span></div>
          </div>
          <div className="flex bg-[#2a2d2e]">
            <div className="w-6 select-none text-right text-[#858585] pr-3">6</div>
            <div className="text-[#808080] pl-8">{`// Highly optimized hero section`}</div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">7</div>
            <div className="text-[#808080] pl-8"><span className="text-[#808080]">&lt;</span><span className="text-[#4ec9b0]">Hero</span></div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">8</div>
            <div className="text-[#9cdcfe] pl-12">title<span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">"Next-Gen SaaS"</span></div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">9</div>
            <div className="text-[#9cdcfe] pl-12">theme<span className="text-[#d4d4d4]">=</span><span className="text-[#ce9178]">"dark"</span></div>
          </div>
          <div className="flex">
            <div className="w-6 select-none text-right text-[#858585] pr-3">10</div>
            <div className="text-[#808080] pl-8">/&gt;</div>
          </div>
        </div>
      </div>
      
      {/* Live Preview Right */}
      <div className="flex w-2/5 flex-col bg-white">
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 text-[10px] text-slate-500">
          <Eye size={12} className="text-emerald-500" /> localhost:3000
        </div>
        <div className="flex-1 p-3 bg-slate-900 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold text-white mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live
          </div>
          <h1 className="text-lg font-black text-white mb-1">Next-Gen SaaS</h1>
          <p className="text-[9px] text-slate-400 w-3/4 mx-auto mb-3">Scale your business securely.</p>
          <div className="h-6 w-16 rounded-md bg-blue-500" />
        </div>
      </div>
    </div>
  );
}

function GrowScreen() {
  const stats = [
    { icon: DollarSign, val: "$142.8k", label: "Monthly Rev", trend: "+12.5%" },
    { icon: Users, val: "34,102", label: "Active Users", trend: "+8.2%" },
    { icon: TrendingUp, val: "4.8%", label: "Conv. Rate", trend: "+1.1%" },
  ];
  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-[#0a0a0c]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-white/5 dark:bg-[#0d1117]">
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-[var(--site-primary)]" />
          <span className="text-sm font-black text-slate-900 dark:text-white">Growth Analytics</span>
        </div>
        <div className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
          Last 30 Days
        </div>
      </div>

      <div className="flex-1 p-5 overflow-hidden flex flex-col gap-4">
        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/5 dark:bg-[#0d1117]">
              <div className="mb-2 flex items-center justify-between">
                <s.icon size={12} className="text-slate-400" />
                <span className="text-[10px] font-bold text-emerald-500">{s.trend}</span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{s.val}</div>
              <div className="text-[10px] font-semibold text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-[#0d1117] flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Revenue Trend</span>
            <div className="flex gap-2 text-[9px] font-semibold text-slate-400">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)]" /> Current</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Previous</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-1.5">
            {CHART_BARS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 group">
                {/* Simulated Chart Bars */}
                <div 
                  className="w-full rounded-t-sm bg-gradient-to-t from-[var(--site-primary)]/80 to-blue-400 transition-all duration-300 group-hover:opacity-80"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: "Share Your Goals",
    desc: "Tell us what you're building and where you want to go. We turn that into a clear, scoped plan.",
    Screen: BriefScreen,
  },
  {
    title: "We Design & Build",
    desc: "Our team designs and engineers your site, funnel, or automation system — end to end.",
    Screen: BuildScreen,
  },
  {
    title: "Launch & Grow",
    desc: "You go live with ongoing support, SEO, and automation that keeps compounding results.",
    Screen: GrowScreen,
  },
];

function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#0d1117]">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-white/15" />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const ActiveScreen = STEPS[active].Screen;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[rgba(var(--site-primary-rgb),0.05)] via-white to-white py-10 dark:from-[rgba(var(--site-primary-rgb),0.08)] dark:via-midnight dark:to-midnight lg:py-12">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8">
          {/* Left: steps */}
          <div>
            <SectionKicker label="How It Works" />
            <h2 className="mb-3 font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
              From idea to <span className="text-[var(--site-primary)]">launch</span>, in three steps.
            </h2>
            <p className="mb-6 max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400">
              A few focused steps can change how your business runs. Here's what working with us actually looks like.
            </p>

            <div className="space-y-1">
              {STEPS.map((step, i) => (
                <button
                  key={step.title}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "block w-full rounded-2xl p-3.5 text-left transition-all duration-300",
                    active === i
                      ? "bg-white shadow-lg shadow-slate-900/5 dark:bg-white/[0.06]"
                      : "hover:bg-white/50 dark:hover:bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black transition-colors",
                        active === i
                          ? "bg-[var(--site-primary)] text-white"
                          : "bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                      )}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={cn(
                        "font-display text-base font-bold transition-colors",
                        active === i ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 pl-10 text-[13px] leading-relaxed transition-colors",
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
          <div className="relative mx-auto hidden h-[380px] w-full max-w-[500px] lg:block">
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
          <div className="h-[340px] w-full lg:hidden mt-8">
            <DeviceFrame>
              <ActiveScreen />
            </DeviceFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
