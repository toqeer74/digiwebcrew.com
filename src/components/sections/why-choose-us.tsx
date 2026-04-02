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
import Link from "next/link";

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

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    desc: "Blazing-fast, SEO-ready websites and web apps built to convert.",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.25)",
  },
  {
    icon: BarChart3,
    title: "SEO & Growth Retainers",
    desc: "Compound rankings and organic traffic that grow month over month.",
    color: "#34D399",
    glow: "rgba(52,211,153,0.25)",
  },
  {
    icon: Zap,
    title: "AI Chatbots & Automation",
    desc: "24/7 AI agents that qualify leads and handle ops without human touch.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    icon: Code2,
    title: "Custom Software & SaaS",
    desc: "Bespoke platforms engineered to your exact business logic.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.25)",
  },
  {
    icon: ShieldCheck,
    title: "DevOps & Cloud Infrastructure",
    desc: "Scalable, secure cloud architecture with zero-downtime deployments.",
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.25)",
  },
  {
    icon: Layers,
    title: "E-Commerce Solutions",
    desc: "High-converting stores powered by cutting-edge headless tech.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.25)",
  },
];

const metrics = [
  { icon: Users, value: "340+", label: "Projects Delivered", color: "#6366F1" },
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
    color: "#6366F1",
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
  const [activeService, setActiveService] = useState<number | null>(null);
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
        <div className="hidden dark:block absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#6366F1]/8 blur-[140px]" />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/10 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6366F1]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6366F1]">
              Why Digi Web Crew
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-midnight-900 dark:text-white mb-5 leading-[1.1]">
            Stop Guessing.{" "}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#A78BFA] to-[#34D399] bg-clip-text text-transparent">
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
                    className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-300 group/item"
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
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 group/item"
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

        {/* ── Services Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black font-display text-midnight-950 dark:text-white tracking-tight">
              Everything You Need.{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#EC4899] bg-clip-text text-transparent">
                Under One Roof.
              </span>
            </h3>
            <p className="mt-2 text-midnight-500 dark:text-slate-300 text-sm">
              Hover over a service to see what's included
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const isActive = activeService === i;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                  className="group relative rounded-2xl border border-slate-200 bg-white dark:border-white/5 dark:bg-white/5 p-6 cursor-pointer overflow-hidden transition-all duration-300 shadow-none dark:shadow-sm dark:hover:shadow-md"
                  style={{
                    borderColor: isActive ? `${svc.color}50` : undefined,
                    boxShadow: isActive ? `var(--site-glow-shadow, none)` : undefined,
                    //@ts-ignore
                    "--site-glow-color": svc.glow,
                  }}
                >
                  {/* Glow overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${svc.glow} 0%, transparent 60%)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300"
                        style={{
                          background: `${svc.color}18`,
                          borderColor: `${svc.color}30`,
                          boxShadow: isActive ? `var(--site-glow-shadow, none)` : "none",
                          //@ts-ignore
                          "--site-glow-color": svc.glow,
                        }}
                    >
                      <Icon size={20} style={{ color: svc.color }} />
                    </div>
                    <h4 className="font-bold text-midnight-950 dark:text-white text-base mb-2 leading-snug">{svc.title}</h4>
                    <p className="text-sm text-midnight-500 dark:text-slate-300 leading-relaxed group-hover:text-midnight-800 dark:group-hover:text-midnight-500 transition-colors">
                      {svc.desc}
                    </p>
                    <div
                      className="mt-4 flex items-center gap-1 text-xs font-semibold transition-all duration-300"
                      style={{ color: svc.color, opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(-8px)" }}
                    >
                      Learn more <ChevronRight size={12} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

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
              <span className="bg-gradient-to-r from-[#6366F1] to-[#60A5FA] bg-clip-text text-transparent">
                Grow Your Business
              </span>
            </h3>
            <p className="mt-2 text-midnight-500 dark:text-slate-300 text-sm max-w-lg mx-auto">
              A proven four-phase framework that takes you from digital struggle to market leader
            </p>
          </div>

          {/* Steps — horizontal on desktop, vertical on mobile */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[29px] left-[calc(12.5%+29px)] right-[calc(12.5%+29px)] h-px bg-gradient-to-r from-blue-500/40 via-emerald-500/40 via-orange-500/40 to-rose-500/40 z-0" />

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
                    <div className="relative mb-6">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                        className="absolute inset-0 rounded-full blur-xl z-0"
                        style={{ background: step.color, opacity: 0.2 }}
                      />
                      <div
                        className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full border-2 transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, white, ${step.color}15)`,
                          borderColor: `${step.color}40`,
                          boxShadow: `var(--site-glow-shadow, none)`,
                          //@ts-ignore
                          "--site-glow-color": `${step.color}15`
                        }}
                      >
                        <Icon size={24} style={{ color: step.color }} />
                      </div>
                      {/* Phase badge */}
                      <div
                        className="absolute -top-1.5 -right-1.5 z-30 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white shadow-lg ring-4 ring-white dark:ring-[#06060F]"
                        style={{ background: step.color }}
                      >
                        {step.phase.replace("0", "")}
                      </div>
                    </div>

                    <div
                      className="rounded-2xl border bg-white p-6 w-full transition-all duration-500 group-hover:-translate-y-1 dark:border-white/5 dark:bg-white/5 shadow-none dark:group-hover:bg-white/[0.04]"
                      style={{ 
                        borderColor: `${step.color}30`,
                        borderTop: `2px solid ${step.color}`
                      }}
                    >
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">{step.title}</h4>
                      <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden border border-indigo-100 dark:border-white/10 p-10 md:p-14 text-center bg-[linear-gradient(135deg,rgba(99,102,241,0.08)_0%,rgba(52,211,153,0.04)_50%,rgba(96,165,250,0.05)_100%)] dark:bg-white/5 shadow-none"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6366F1] via-[#A78BFA] to-[#34D399]" />
          <div className="hidden dark:block absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#6366F1]/10 blur-3xl opacity-0 dark:opacity-100" />
          <div className="hidden dark:block absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#34D399]/8 blur-3xl opacity-0 dark:opacity-100" />

          {/* Floating orbits */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute"
              style={{
                width: 80 + i * 60,
                height: 80 + i * 60,
                left: "50%",
                top: "50%",
                marginLeft: -(40 + i * 30),
                marginTop: -(40 + i * 30),
                border: `1px dashed rgba(99,102,241,${0.12 - i * 0.03})`,
                borderRadius: "50%",
              }}
            />
          ))}

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-4 py-1.5 mb-5">
              <Clock size={12} className="text-[#F59E0B]" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#F59E0B]">
                Limited Spots — Q2 2025
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black font-display text-midnight-950 dark:text-white tracking-tight mb-4 leading-[1.1]">
              Ready to Transform{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#A78BFA] to-[#34D399] bg-clip-text text-transparent">
                Your Digital Future?
              </span>
            </h3>
            <p className="mx-auto max-w-xl text-midnight-600 dark:text-slate-300 text-base leading-relaxed mb-8">
              Book a free strategy session. We'll audit your current setup, identify
              the biggest growth levers, and map out a tailored 90-day plan — at no cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/book-consultation"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-8 py-4 text-sm font-bold text-white transition-all duration-300 shadow-none dark:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 dark:hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.7)]"
              >
                Book Free Strategy Call
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/15 group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 dark:bg-white/5 px-8 py-4 text-sm font-bold text-midnight-900 dark:text-white hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/25 transition-all duration-300"
              >
                Explore All Services <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

