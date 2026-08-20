"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  TrendingUp,
  Globe,
  Code2,
  Zap,
  ShieldCheck,
  BarChart3,
  Rocket,
  HeartHandshake,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  DollarSign,
  Clock,
  Target,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ──────────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────────── */
const beforeItems = [
  "Guesswork-based marketing with no clear ROI",
  "Missed leads due to manual follow-up processes",
  "Outdated website that repels potential clients",
  "Zero data insight into customer behaviour",
  "Scattered tools that don't talk to each other",
  "Wasted ad spend on untargeted campaigns",
];

const afterItems = [
  "Data-driven strategy with measurable ROI every month",
  "Automated lead nurturing that converts while you sleep",
  "Premium digital presence that builds instant trust",
  "Real-time analytics dashboard for smart decisions",
  "Unified tech stack seamlessly integrated end-to-end",
  "Precision-targeted campaigns that maximise every dollar",
];


const metrics = [
  { icon: Users, value: "340+", label: "Projects Delivered", color: "#114b97" },
  { icon: TrendingUp, value: "4.8×", label: "Avg. ROI Multiplier", color: "#34D399" },
  { icon: DollarSign, value: "$12M+", label: "Revenue Generated", color: "#F59E0B" },
  { icon: Star, value: "98%", label: "Client Satisfaction", color: "#EC4899" },
];

const growthSteps = [
  {
    phase: "01",
    title: "Discovery & Strategy",
    desc: "Deep-dive audit of your current digital footprint, competitors, and revenue gaps.",
    icon: Target,
    color: "#114b97",
  },
  {
    phase: "02",
    title: "Build & Integrate",
    desc: "We engineer your stack — web, automations, analytics — into one cohesive system.",
    icon: Code2,
    color: "#34D399",
  },
  {
    phase: "03",
    title: "Launch & Optimise",
    desc: "Go live with precision campaigns and continuous CRO to accelerate results.",
    icon: Rocket,
    color: "#F59E0B",
  },
  {
    phase: "04",
    title: "Scale & Retain",
    desc: "Ongoing retainer partnership to compound growth and protect your market position.",
    icon: HeartHandshake,
    color: "#60A5FA",
  },
];

/* ──────────────────────────────────────────────────────────
   ANIMATED COUNTER
────────────────────────────────────────────────────────── */
function AnimatedCounter({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/(\d+\.?\d*)/);
    if (!match) { setDisplay(value); return; }
    const target = parseFloat(match[1]);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[0].length);
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target * 10) / 10;
      setDisplay(`${prefix}${target % 1 !== 0 ? current.toFixed(1) : Math.floor(current)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} style={{ color }} className="text-4xl font-black font-display tabular-nums">
      {display}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────── */
export function WhyChooseUs() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32 dark:bg-midnight"
      aria-label="Why Choose Us"
    >
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hidden dark:block absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] blur-[140px]" />
        <div className="hidden dark:block absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-[#34D399]/6 blur-[120px]" />
        <div className="hidden dark:block absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F59E0B]/4 blur-[160px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 text-midnight-900 opacity-[0.04] dark:text-white"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--site-primary)]/30 bg-[rgba(var(--site-primary-rgb),0.1)] px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--site-primary)]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--site-primary)]">
              Why Digi Web Crew
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-midnight-900 dark:text-white mb-5 leading-[1.1]">
            Stop Guessing.{" "}
            <span className="bg-gradient-to-r from-[var(--site-primary)] via-[var(--site-primary-soft)] to-[#34D399] bg-clip-text text-transparent">
              Start Growing.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-midnight-600 dark:text-slate-300 leading-relaxed">
            We turn your digital presence into a compounding growth machine — combining
            strategy, technology, and automation into one seamless system.
          </p>
        </motion.div>

        {/* ── Metrics Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="relative rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-white/[0.04] backdrop-blur-sm p-6 text-center overflow-hidden group hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 shadow-none dark:shadow-sm"
                style={{ 
                  boxShadow: `var(--site-glow-shadow, none)`,
                  //@ts-ignore
                  "--site-glow-color": `${m.color}20`
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${m.color}15 0%, transparent 70%)` }}
                />
                <Icon size={20} className="mx-auto mb-3" style={{ color: m.color }} />
                <AnimatedCounter value={m.value} color={m.color} />
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-midnight-500 dark:text-slate-300">
                  {m.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── BEFORE vs AFTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black font-display text-midnight-950 dark:text-white tracking-tight">
              Before{" "}
              <span className="text-midnight-400 font-medium">vs</span>{" "}
              After
            </h3>
            <p className="mt-2 text-midnight-500 dark:text-slate-300 text-sm">
              The reality of your business — before and after partnering with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Before card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative rounded-2xl border border-slate-200 dark:border-red-500/20 bg-slate-50/50 dark:bg-white/5 overflow-hidden p-8 shadow-none dark:shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-red-500/30"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-200 dark:via-red-500/60 to-transparent" />
              <div className="hidden dark:block absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/10 blur-2xl" />
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                  <X size={10} /> Without Us
                </span>
              </div>
              <ul className="space-y-4">
                {beforeItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.07 }}
                    className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-200 group/item"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white dark:bg-red-500/15 border border-slate-200 dark:border-red-500/20 shadow-sm dark:shadow-none transition-colors group-hover/item:border-red-200 dark:group-hover/item:border-red-500/40">
                      <X size={10} className="text-red-500 dark:text-red-400" />
                    </span>
                    <span className="leading-relaxed group-hover/item:text-slate-800 dark:group-hover/item:text-white transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative rounded-2xl border border-slate-200 dark:border-[#34D399]/25 bg-white dark:bg-white/5 overflow-hidden p-8 shadow-md shadow-slate-200/50 dark:shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:border-[#34D399]/40"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#34D399]/40 dark:via-[#34D399]/80 to-transparent" />
              <div className="hidden dark:block absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#34D399]/10 blur-2xl" />
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-[#34D399]/10 border border-emerald-100 dark:border-[#34D399]/25 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-[#34D399]">
                  <Check size={10} /> With Digi Web Crew
                </span>
              </div>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.07 }}
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-200 group/item"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-[#34D399]/15 border border-emerald-200 dark:border-[#34D399]/25 transition-colors group-hover/item:bg-emerald-100 dark:group-hover/item:bg-[#34D399]/25">
                      <Check size={10} className="text-emerald-600 dark:text-[#34D399]" />
                    </span>
                    <span className="leading-relaxed font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Services Grid has been moved to About page ── */}

        {/* ── Growth Roadmap ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black font-display text-midnight-950 dark:text-white tracking-tight">
              How We{" "}
              <span className="bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)] bg-clip-text text-transparent">
                Grow Your Business
              </span>
            </h3>
            <p className="mt-2 text-midnight-500 dark:text-slate-300 text-sm max-w-lg mx-auto">
              A proven four-phase framework that takes you from digital struggle to market leader
            </p>
          </div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connecting line (desktop) - Modern Data Stream */}
            <div className="hidden lg:block absolute top-[34px] left-[15%] right-[15%] h-[2px] z-0 overflow-hidden">
              <div className="absolute inset-0 bg-white/5 dark:bg-white/10" />
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent opacity-60" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {growthSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: i * 0.15,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    className="group relative flex flex-col items-center text-center"
                  >
                    {/* Icon circle */}
                    <div className="relative mb-8">
                      <div
                        className="relative z-10 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: `rgba(var(--site-primary-rgb), 0.03)`,
                          borderColor: `${step.color}30`,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {/* Internal Neon Glow */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-20 blur-md pointer-events-none"
                          style={{ backgroundColor: step.color }}
                        />
                        <Icon size={28} style={{ color: step.color }} className="relative z-20 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                      </div>
                      
                      {/* Phase badge - Sleeker pill style */}
                      <div
                        className="absolute -bottom-2 -right-2 z-30 flex px-2.5 py-1 items-center justify-center rounded-full text-[10px] font-black text-white shadow-xl ring-2 ring-white dark:ring-midnight tracking-tighter"
                        style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
                      >
                        STEP {step.phase.replace("0", "")}
                      </div>
                    </div>

                    <div
                      className="rounded-3xl border bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl p-8 w-full transition-all duration-500 group-hover:-translate-y-2 dark:border-white/10 shadow-2xl shadow-black/5"
                      style={{ 
                        borderTop: `3px solid ${step.color}`
                      }}
                    >
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">{step.title}</h4>
                      <p className="text-[13px] text-slate-600 dark:text-slate-200 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}

