"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ProcessStep = {
  title: string;
  description: string;
};

interface ServiceProcessStepsProps {
  title: string;
  steps: ProcessStep[];
  ctaHref: string;
  ctaLabel: string;
}

export function ServiceProcessSteps({ title, steps, ctaHref, ctaLabel }: ServiceProcessStepsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/96 p-8 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.18)] dark:border-[#1E1E2E] dark:bg-[#13131E]">
      <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">{title}</h2>
      <div className="mb-5 space-y-3 text-slate-600 dark:text-[#94A3B8]">
        {steps.map((step, idx) => (
          <p key={step.title}>
            <strong className="text-slate-950 dark:text-[#F8F8FF]">Step {idx + 1} {step.title}:</strong> {step.description}
          </p>
        ))}
      </div>
      <Link href={ctaHref} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-6 py-3 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[var(--site-primary-hover)]">
        <span>{ctaLabel}</span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
