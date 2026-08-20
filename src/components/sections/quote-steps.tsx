"use client";

import { motion } from "framer-motion";
import { ClipboardList, Target, SlidersHorizontal, Send } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Share the basics",
    meta: "2 questions",
    desc: "Tell us what you need help with and what kind of business you run.",
  },
  {
    icon: Target,
    title: "Define the goal",
    meta: "1 question",
    desc: "Explain what you are trying to improve, launch, fix, or grow.",
  },
  {
    icon: SlidersHorizontal,
    title: "Add project details",
    meta: "4 questions",
    desc: "Select the services, timeline, project stage, and budget range.",
  },
  {
    icon: Send,
    title: "Send it over",
    meta: "2 questions",
    desc: "Add your contact details and anything else we should know. We reply within one business day.",
  },
];

export function QuoteSteps() {
  return (
    <div className="relative">
      {/* Connector runs behind the nodes */}
      <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden lg:block">
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
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
              <div className="relative mb-6">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                  <Icon size={19} className="text-[var(--site-primary)]" strokeWidth={1.75} />
                </div>
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--site-primary)] text-[10px] font-black text-white shadow-md shadow-[var(--site-primary)]/30">
                  {i + 1}
                </span>
              </div>

              <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {step.meta}
              </span>
              <h3 className="mb-2 font-display text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="max-w-[280px] text-[14px] leading-relaxed text-slate-500 lg:max-w-none">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
