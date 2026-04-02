"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  CheckCircle2,
  Rocket,
  GitBranch,
  Server,
  Database,
  Terminal,
  ShieldCheck,
  Eye,
  Sparkles
} from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { cn } from "@/lib/utils";

const stages = [
  {
    icon: Search,
    color: "text-blue-500",
    title: "Discovery & Logic Mapping",
    description: "Deep dive into business logic, user journeys, and technical architecture."
  },
  {
    icon: PenTool,
    color: "text-purple-500",
    title: "High-Fidelity Prototyping",
    description: "Interactive blueprints to validate UX and user flows before development."
  },
  {
    icon: Code2,
    color: "text-emerald-500",
    title: "Agile Development Sprints",
    description: "Scalable code shipped in iterative cycles with clear demos and milestones."
  },
  {
    icon: CheckCircle2,
    color: "text-amber-500",
    title: "Automated QA Testing",
    description: "Unit, integration, and performance testing to ensure reliability at launch."
  },
  {
    icon: Rocket,
    color: "text-rose-500",
    title: "Deployment & Scaling",
    description: "Go-live, monitoring, and optimization for speed, security, and growth."
  }
];

const sprintItems: Array<{
  label: string;
  status: "todo" | "doing" | "review" | "done";
  icon: any;
}> = [
    { label: "Logic Mapping", status: "done", icon: GitBranch },
    { label: "UI Prototypes", status: "done", icon: PenTool },
    { label: "API Architecture", status: "doing", icon: Server },
    { label: "Database Schema", status: "doing", icon: Database },
    { label: "Backend Dev", status: "doing", icon: Terminal },
    { label: "Frontend Logic", status: "review", icon: Code2 },
    { label: "QA Integration", status: "todo", icon: ShieldCheck },
    { label: "Final Review", status: "review", icon: Eye },
    { label: "Launch Polish", status: "todo", icon: Sparkles }
  ];

export function ProcessVisualization() {
  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-midnight">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.22)] bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] animate-pulse dark:bg-[var(--site-primary-soft)]" />
            Our Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-6 dark:text-white"
          >
            Engineering Excellence, <br />
            <span className="text-[var(--site-primary-soft)]">By Design</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 font-body font-medium dark:text-[#B7CADB]"
          >
            A proven 5-stage framework that transforms complex challenges into scalable, production-ready digital assets.
          </motion.p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative mb-16 lg:mb-0"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-[radial-gradient(120%_140%_at_10%_0%,rgba(var(--site-primary-rgb),0.16),transparent_55%),linear-gradient(180deg,#ffffff,rgba(248,250,252,0.75))] shadow-none dark:border-white/10 dark:bg-[radial-gradient(120%_140%_at_10%_0%,rgba(var(--site-primary-rgb),0.35),transparent_55%),linear-gradient(180deg,#1a1f38,#121826)] dark:shadow-[0_38px_90px_-56px_rgba(0,0,0,0.95)]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA] opacity-90" />
              <div className="aspect-[4/3] w-full" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9),transparent_55%)] dark:bg-[linear-gradient(90deg,rgba(15,23,42,0.9),transparent_55%)]" />
              <div className="absolute inset-0 p-7 sm:p-10">
                <div className="max-w-[270px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                    Project Workspace
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                    Clear milestones.<br />Fast feedback loops.
                  </h3>
                  <p className="mt-3 text-sm font-body font-medium text-slate-600 dark:text-slate-300">
                    Visual prototypes, sprint demos, and QA reports—all in one streamlined flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 right-0 w-[86%] max-w-[420px] rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-none backdrop-blur-lg sm:-bottom-12 sm:p-6 lg:-right-6 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-[0_42px_100px_-50px_rgba(0,0,0,0.95)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-display font-extrabold text-slate-900 dark:text-slate-100">
                  Sprint Board
                </p>
                <span className="rounded-full border border-[color:rgba(var(--site-primary-rgb),0.3)] bg-[rgba(var(--site-primary-rgb),0.10)] px-2.5 py-1 text-[11px] font-semibold text-[var(--site-primary)] dark:border-[var(--site-primary-soft)]/30 dark:bg-[var(--site-primary)]/20 dark:text-[var(--site-primary-soft)]">
                  Live
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {sprintItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={cn(
                        "flex h-11 items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 shadow-none",
                        "dark:border-slate-700 dark:bg-slate-800/60 dark:shadow-none"
                      )}
                    >
                      <Icon
                        size={14}
                        className={cn(
                          item.status === "done" && "text-emerald-500",
                          item.status === "doing" && "text-[var(--site-primary)]",
                          item.status === "review" && "text-amber-500",
                          item.status === "todo" && "text-slate-400 dark:text-slate-500"
                        )}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 text-[10px] font-bold leading-tight text-slate-700 dark:text-slate-200">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute left-[58%] top-[52%] hidden -translate-y-1/2 lg:block">
              <div className="rounded-full border border-[color:rgba(var(--site-primary-rgb),0.35)] bg-[rgba(var(--site-primary-rgb),0.15)] px-4 py-2 text-xs font-semibold text-[var(--site-primary)] shadow-none backdrop-blur-md dark:bg-slate-800/80 dark:text-[var(--site-primary-soft)] dark:shadow-[0_16px_40px_-20px_rgba(var(--site-primary-rgb),0.6)]">
                Start with Discovery
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          >
            <div className="relative">
              <div className="pointer-events-none absolute left-[18px] top-1 bottom-1 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
              <ol className="space-y-10">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  return (
                    <motion.li
                      key={stage.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: idx * 0.15,
                        ease: [0.21, 0.47, 0.32, 0.98] 
                      }}
                      className="relative pl-12"
                    >
                      <div className="absolute left-[18px] top-2 -translate-x-1/2" aria-hidden="true">
                        <span
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-xl border bg-white shadow-none dark:bg-slate-800 transition-all duration-300 hover:scale-110",
                            "border-slate-200 dark:border-slate-700"
                          )}
                        >
                          <Icon size={18} className={stage.color} />
                        </span>
                      </div>

                      <div className="pt-0.5">
                        <p className="text-base font-display font-extrabold text-slate-900 dark:text-slate-100">
                          {stage.title}
                        </p>
                        <p className="mt-1.5 text-sm font-body font-medium text-slate-600 dark:text-slate-400">
                          {stage.description}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 max-w-2xl w-full">
            <p className="text-sm font-body font-bold text-slate-600 dark:text-slate-300 text-center sm:text-left">
              Ready to initiate the first stage?
            </p>
            <button className="rounded-xl border border-[color:rgba(var(--site-primary-rgb),0.3)] bg-[var(--site-primary)] px-7 py-3 text-sm font-display font-extrabold uppercase tracking-widest text-white transition-all shadow-none hover:bg-[var(--site-primary-hover)] active:scale-95 dark:border-[var(--site-primary-soft)]/30 dark:shadow-[0_14px_34px_-18px_rgba(var(--site-primary-rgb),0.62)] whitespace-nowrap">
              Start Discovery Phase
            </button>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}

