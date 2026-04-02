"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Globe,
  MonitorCheck,
  Star,
  Database,
  Bot,
  CalendarCheck,
  ArrowRight,
  ChevronRight,
  Zap,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type Step = {
  id: number;
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;        // tailwind gradient classes
  hex: string;          // raw hex for glow
  description: string;
  outcome: string;
  outcomeLabel: string;
  pill: string;
};

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    id: 1,
    label: "Strategy & Discovery",
    sub: "Business Audit · Goal Mapping · Tech Planning",
    icon: Globe,
    color: "from-[#6366F1] to-[#818CF8]",
    hex: "#6366F1",
    description:
      "We start with a deep dive into your business — auditing your current digital presence, identifying growth gaps, and mapping a clear plan. No guesswork, only structured strategy built for your specific goals.",
    outcome: "100%",
    outcomeLabel: "Custom Strategy, Not Templates",
    pill: "Step 01",
  },
  {
    id: 2,
    label: "Custom Website Build",
    sub: "Next.js · TypeScript · Performance-First",
    icon: MonitorCheck,
    color: "from-[#8B5CF6] to-[#A78BFA]",
    hex: "#8B5CF6",
    description:
      "We engineer your website with Next.js and TypeScript — built for speed, clarity, and conversions. Every page is structured to present your business professionally and guide visitors toward action.",
    outcome: "98+",
    outcomeLabel: "Lighthouse Performance Score",
    pill: "Step 02",
  },
  {
    id: 3,
    label: "SEO & Search Visibility",
    sub: "Technical SEO · Rankings · Content Strategy",
    icon: Star,
    color: "from-[#F59E0B] to-[#FBBF24]",
    hex: "#F59E0B",
    description:
      "We make your business discoverable. Through technical SEO, on-page optimization, and strategic content, we improve your search ranking so the right clients find you — not your competitors.",
    outcome: "#1",
    outcomeLabel: "Target Keyword Rankings",
    pill: "Step 03",
  },
  {
    id: 4,
    label: "Conversion Funnel",
    sub: "Landing Pages · A/B Testing · Lead Paths",
    icon: Database,
    color: "from-[#10B981] to-[#34D399]",
    hex: "#10B981",
    description:
      "We build high-converting landing pages and multi-step funnels that turn website visitors into real leads. Every element — headline, CTA, form — is tested and optimized for your audience.",
    outcome: "3–5×",
    outcomeLabel: "Higher Conversion Rate",
    pill: "Step 04",
  },
  {
    id: 5,
    label: "AI & Automation",
    sub: "AI Chatbot · CRM Sync · Automated Follow-Up",
    icon: Bot,
    color: "from-[#EF4444] to-[#F87171]",
    hex: "#EF4444",
    description:
      "We connect AI chatbots, automated follow-up sequences, and CRM integrations so every lead is captured, nurtured, and routed — 24/7, without manual effort from your team.",
    outcome: "≤5 min",
    outcomeLabel: "Lead Response Time",
    pill: "Step 05",
  },
  {
    id: 6,
    label: "Growth & Results",
    sub: "Analytics · Optimization · Monthly Support",
    icon: CalendarCheck,
    color: "from-[#06B6D4] to-[#38BDF8]",
    hex: "#06B6D4",
    description:
      "We don't disappear after launch. Through analytics monitoring, ongoing SEO retainers, and monthly performance reviews, we keep your digital system growing and improving over time.",
    outcome: "40%",
    outcomeLabel: "Average Revenue Lift for Clients",
    pill: "Step 06",
  },
];

/* ─── Stats bar ─────────────────────────────────────────────────────────────── */
const STATS = [
  { icon: TrendingUp, value: "98+",    label: "Lighthouse Score Standard" },
  { icon: Users,      value: "3–5×",   label: "Conversion Rate Lift" },
  { icon: Clock,      value: "≤5 min", label: "AI Follow-Up Speed" },
  { icon: Zap,        value: "40%",    label: "Avg Revenue Lift" },
];

/* ─── Animated counter ────────────────────────────────────────────────────── */
function Counter({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const id = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(Math.floor(start));
      if (start >= to) clearInterval(id);
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}</span>;
}

/* ─── NodeCard (the 6 flow nodes) ────────────────────────────────────────── */
type NodeCardProps = {
  step: Step;
  isActive: boolean;
  idx: number;
  onClick: () => void;
  isAnimating: boolean;
};

function NodeCard({
  step,
  isActive,
  idx,
  onClick,
  isAnimating,
}: NodeCardProps) {
  const Icon = step.icon;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.07 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all duration-500 cursor-pointer",
        isActive
          ? "scale-105 border-slate-300 bg-white dark:shadow-2xl dark:border-white/20 dark:bg-white/8"
          : "border-slate-200 bg-slate-100/70 hover:border-slate-300 hover:bg-white dark:border-white/6 dark:bg-white/3 dark:hover:border-white/15 dark:hover:bg-white/6"
      )}
      style={
        isActive
          ? { borderColor: `${step.hex}60`, boxShadow: `var(--site-glow-shadow, none)`, "--site-glow-color": `${step.hex}15` } as any
          : {}
      }
    >
      {/* Gradient accent top */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-[2px] rounded-t-2xl bg-gradient-to-r transition-opacity duration-500",
          step.color,
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
        )}
      />

      {/* Pulse ring when active */}
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl border-2"
          style={{ borderColor: step.hex }}
        />
      )}

      {/* Step badge */}
      <div
        className={cn(
          "absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest transition-all duration-300",
          isActive ? "text-white" : "border border-slate-200 bg-white text-slate-500 dark:border-transparent dark:bg-white/5 dark:text-white/40"
        )}
        style={isActive ? { background: step.hex } : {}}
      >
        {step.pill}
      </div>

      {/* Icon */}
      <div
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white dark:shadow-lg transition-all duration-300 group-hover:scale-110",
          step.color
        )}
        style={isActive ? { boxShadow: `var(--site-glow-shadow, none)`, "--site-glow-color": `${step.hex}25` } as any : {}}
      >
        <Icon size={24} />
        {isActive && isAnimating && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className={cn("absolute inset-0 rounded-xl bg-gradient-to-br", step.color)}
          />
        )}
      </div>

      {/* Label */}
      <div>
        <p className={cn("text-sm font-black transition-colors duration-300", isActive ? "text-midnight-950 dark:text-white" : "text-midnight-600 group-hover:text-midnight-900 dark:text-white/70 dark:group-hover:text-white")}>
          {step.label}
        </p>
        <p className="mt-0.5 max-w-[120px] text-[10px] font-semibold leading-tight text-midnight-500 dark:text-white/30">{step.sub}</p>
      </div>

      {/* Mini outcome */}
      <div
        className={cn(
          "rounded-lg px-2.5 py-1 text-[11px] font-black transition-all duration-300",
          isActive ? "bg-[rgba(var(--site-primary-rgb),0.12)] text-[var(--site-primary)] dark:bg-white/10 dark:text-white" : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-white/40"
        )}
        style={isActive ? { color: step.hex } : {}}
      >
        {step.outcome}
      </div>
    </motion.button>
  );
}

/* ─── Animated arrow connector ───────────────────────────────────────────── */
function FlowArrow({ active, hex, vertical = false }: { active: boolean; hex: string; vertical?: boolean }) {
  return (
    <div className={cn("flex items-center justify-center shrink-0", vertical ? "flex-col h-8 w-8" : "w-10 h-8")}>
      <div
        className={cn(
          "relative transition-all duration-500",
          vertical ? "h-full w-[2px]" : "h-[2px] w-full"
        )}
        style={{ background: active ? `linear-gradient(to ${vertical ? "bottom" : "right"}, ${hex}80, ${hex})` : "rgba(148,163,184,0.35)" }}
      >
        {active && (
          <motion.div
            animate={vertical ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className={cn("absolute rounded-full", vertical ? "h-6 w-full" : "h-full w-6")}
            style={{ background: `linear-gradient(to ${vertical ? "bottom" : "right"}, transparent, ${hex}, transparent)` }}
          />
        )}
        {/* Arrowhead */}
        <div
          className={cn(
            "absolute transition-all duration-500",
            vertical
              ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-l-4 border-r-4 border-t-[6px] border-l-transparent border-r-transparent"
              : "right-0 top-1/2 -translate-y-1/2 translate-x-full border-t-4 border-b-4 border-l-[6px] border-t-transparent border-b-transparent"
          )}
          style={{ borderLeftColor: active ? hex : "rgba(148,163,184,0.45)", borderTopColor: active && vertical ? hex : undefined }}
        />
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function SystemWorkflow() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-150px" });

  const active = STEPS[activeIdx];
  const ActiveIcon = active.icon;

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying || !inView) return;
    const id = setInterval(() => {
      setIsAnimating(true);
      setActiveIdx((p) => (p + 1) % STEPS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [isAutoPlaying, inView]);

  const handleClick = useCallback((idx: number) => {
    setIsAutoPlaying(false);
    setActiveIdx(idx);
    setIsAnimating(false);
  }, []);

  // Row 1: steps 0–2, Row 2: steps 5–3 (reversed)
  const row1 = [0, 1, 2];
  const row2 = [5, 4, 3]; // reversed so arrows go right-to-left visually = left-to-right logical flow

  /* ─ is the connection between two nodes "lit"? ─ */
  const isLit = (nodeIdx: number) => nodeIdx <= activeIdx;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 dark:bg-midnight"
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Animated grid */}
        <div
          className="absolute inset-0 text-midnight-900 opacity-[0.02] dark:text-white dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Glows */}
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden dark:block absolute left-1/3 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: `radial-gradient(circle, ${active.hex}60 0%, transparent 70%)` }}
        />
        <div className="hidden dark:block absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-600/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/8 px-5 py-2"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-indigo-400"
            />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Our Proven Digital System
            </span>
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="h-2 w-2 rounded-full bg-indigo-400"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-5 text-4xl font-black tracking-tight text-midnight-950 dark:text-white sm:text-5xl lg:text-6xl"
          >
            How Our{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(120deg, ${active.hex}, #A78BFA, #38BDF8)` }}
            >
              System Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-midnight-600 dark:text-white/50"
          >
            A fully connected end-to-end system that turns strangers into loyal clients — automatically.
            <span className="ml-2 text-midnight-500 dark:text-white/30">Click any node to explore.</span>
          </motion.p>
        </div>

        {/* ── Flow Diagram ── */}
        <div className="relative mb-8">
          {/* Row 1: Strategy (0) → Custom Build (1) → SEO (2) */}
          <div className="flex items-center justify-center gap-0 mb-0 relative z-10">
            {row1.map((stepIdx, i) => (
              <div key={stepIdx} className="flex items-center">
                <div className="w-[160px] sm:w-[190px]">
                  <NodeCard
                    step={STEPS[stepIdx]}
                    isActive={activeIdx === stepIdx}
                    idx={stepIdx}
                    onClick={() => handleClick(stepIdx)}
                    isAnimating={isAnimating}
                  />
                </div>
                {i < row1.length - 1 && (
                  <FlowArrow
                    active={isLit(row1[i]) && isLit(row1[i + 1])}
                    hex={STEPS[row1[i]].hex}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Vertical arrow: SEO (idx 2) down to Conversion Funnel (idx 3) */}
          <div className="absolute flex flex-col items-center z-0" 
               style={{ 
                 top: "40%", 
                 height: "60px", 
                 right: "calc(50% - 190px * 1.5 - 10px * 2 + 95px)",
                 transform: "translateX(50%)"
               }}>
            <FlowArrow active={isLit(2) && isLit(3)} hex={STEPS[2].hex} vertical />
          </div>

          {/* Row 2: Growth (5) ← AI Automation (4) ← Conversion Funnel (3)
              BUT wait: Based on the screenshot:
              - SEO (Top Right) does NOT connect down to Conversion Funnel (Bottom Right).
              - Custom Build (Top Center) connects down to AI Automation (Bottom Center).
              - Conversion Funnel (Bottom Right) connects LEFT to AI Automation (Bottom Center).
              - AI Automation (Bottom Center) connects LEFT to Growth (Bottom Left).
              Let's build that exact flow.
          */}
          <div className="flex items-center justify-center gap-0 mt-8 relative z-10">
            {/* Left: Growth (5) */}
            <div className="flex items-center">
              <div className="w-[160px] sm:w-[190px]">
                <NodeCard
                  step={STEPS[5]}
                  isActive={activeIdx === 5}
                  idx={5}
                  onClick={() => handleClick(5)}
                  isAnimating={isAnimating}
                />
              </div>
            </div>

            {/* Arrow: Auto (4) → Growth (5) (Points Left, so we reverse it) */}
            <div className="flex items-center justify-center shrink-0 w-10 h-8 transform rotate-180">
              <FlowArrow
                active={isLit(4) && isLit(5)}
                hex={STEPS[4].hex}
              />
            </div>

            {/* Center: AI Automation (4) */}
            <div className="flex items-center">
              <div className="w-[160px] sm:w-[190px]">
                <NodeCard
                  step={STEPS[4]}
                  isActive={activeIdx === 4}
                  idx={4}
                  onClick={() => handleClick(4)}
                  isAnimating={isAnimating}
                />
              </div>
            </div>

            {/* Arrow: Funnel (3) → Auto (4) (Points Left, so we reverse it) */}
            <div className="flex items-center justify-center shrink-0 w-10 h-8 transform rotate-180">
               <FlowArrow
                active={isLit(3) && isLit(4)}
                hex={STEPS[3].hex}
              />
            </div>

            {/* Right: Conversion Funnel (3) */}
            <div className="flex items-center">
              <div className="w-[160px] sm:w-[190px]">
                <NodeCard
                  step={STEPS[3]}
                  isActive={activeIdx === 3}
                  idx={3}
                  onClick={() => handleClick(3)}
                  isAnimating={isAnimating}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Detail Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mb-8 overflow-hidden rounded-3xl border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,250,252,0.9))] p-8 backdrop-blur-xl dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.06),var(--dark-card-bg-start)_60%)]"
            style={{
              borderColor: `${active.hex}35`,
              boxShadow: `var(--site-glow-shadow, none)`,
              //@ts-ignore
              "--site-glow-color": `${active.hex}10`,
            }}
          >
            {/* Decorative glow orb */}
            <div
              className="hidden dark:block pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[80px] opacity-30"
              style={{ background: active.hex }}
            />

            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
              {/* Left: info */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white",
                      active.color
                    )}
                    style={{ 
                      boxShadow: `var(--site-glow-shadow, none)`,
                      //@ts-ignore
                      "--site-glow-color": `${active.hex}25`,
                    }}
                  >
                    <ActiveIcon size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-1" style={{ color: active.hex }}>
                      {active.pill} of 06
                    </p>
                    <h3 className="text-2xl font-black leading-tight text-midnight-950 dark:text-white">{active.label}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-midnight-500 dark:text-white/40">{active.sub}</p>
                  </div>
                </div>

                <p className="max-w-xl text-base font-medium leading-relaxed text-midnight-600 dark:text-white/65">
                  {active.description}
                </p>

                {/* Step dots */}
                <div className="flex items-center gap-2">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleClick(i)}
                      className={cn(
                        "rounded-full transition-all duration-400",
                        i === activeIdx ? "w-8 h-2" : "w-3 h-2 opacity-30 hover:opacity-60"
                      )}
                      style={{
                        background: i === activeIdx ? active.hex : "rgba(148,163,184,0.3)",
                      }}
                    />
                  ))}
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-midnight-500 dark:text-white/25">
                    {isAutoPlaying ? "Auto-advancing" : "Manual mode"}
                  </span>
                  <button
                    onClick={() => setIsAutoPlaying((p) => !p)}
                    className="ml-1 text-[10px] font-bold text-midnight-500 underline transition-colors hover:text-midnight-700 dark:text-white/30 dark:hover:text-white/60"
                  >
                    {isAutoPlaying ? "Pause" : "Resume"}
                  </button>
                </div>

                {/* Nav buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleClick(Math.max(0, activeIdx - 1))}
                    disabled={activeIdx === 0}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-sm font-bold text-midnight-600 transition-all hover:bg-slate-100 hover:text-midnight-900 disabled:opacity-20 dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white dark:shadow-sm"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => handleClick(Math.min(STEPS.length - 1, activeIdx + 1))}
                    disabled={activeIdx === STEPS.length - 1}
                    className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-20"
                    style={{ background: `linear-gradient(to right, ${active.hex}cc, ${active.hex}55)` }}
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right: outcome stat card */}
              <div
                className="flex flex-col items-center justify-center rounded-2xl border p-8 text-center bg-white/50 dark:bg-white/5"
                style={{ borderColor: `${active.hex}30` }}
              >
                <motion.p
                  key={activeIdx}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-2 text-6xl font-black bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(to bottom right, ${active.hex}, ${active.hex}88)` }}
                >
                  {active.outcome}
                </motion.p>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-midnight-500 dark:text-white/40">
                  {active.outcomeLabel}
                </p>

                {/* Progress ring */}
                <div className="relative mt-6 flex h-20 w-20 items-center justify-center">
                  <svg className="absolute inset-0" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="6" />
                    <motion.circle
                      cx="40" cy="40" r="34"
                      fill="none"
                      stroke={active.hex}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={2 * Math.PI * 34 * (1 - (activeIdx + 1) / STEPS.length)}
                      transform="rotate(-90 40 40)"
                      initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - (activeIdx + 1) / STEPS.length) }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="text-sm font-black text-midnight-950 dark:text-white">
                    {activeIdx + 1}/{STEPS.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/6 dark:bg-white/2 dark:hover:border-white/12 dark:hover:bg-white/5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                <Icon size={16} />
              </div>
              <p className="text-2xl font-black text-midnight-950 dark:text-white">{value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-midnight-500 dark:text-white/35">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white px-8 py-6 sm:flex-row dark:border-white/6 dark:bg-white/2"
        >
          <div>
            <p className="text-lg font-black text-midnight-950 dark:text-white">
              Ready to build a stronger digital system for your business?
            </p>
            <p className="text-sm text-midnight-600 dark:text-white/40">
              Book a free consultation — we'll map out the right path for your specific goals in 30 minutes.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/book-consultation"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-black text-white dark:shadow-lg dark:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 dark:hover:shadow-indigo-500/50"
            >
              Book Free Call <ArrowRight size={14} />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-6 py-3 text-sm font-black text-midnight-900 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Get Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

