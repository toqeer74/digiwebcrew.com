"use client";

import Link from "next/link";

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
      <Link href={ctaHref} className="inline-flex items-center justify-center rounded-full bg-[var(--site-primary)] px-6 py-3 font-bold text-white transition-colors hover:bg-[var(--site-primary-hover)]">
        {ctaLabel}
      </Link>
    </div>
  );
}
