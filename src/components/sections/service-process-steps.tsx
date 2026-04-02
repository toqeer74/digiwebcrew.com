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
    <div className="site-card group relative flex flex-col items-center p-8 text-center transition-all hover:bg-white/10 dark:border-white/10 dark:bg-transparent">
      <h2 className="mb-4 text-2xl font-bold text-foreground">{title}</h2>
      <div className="mb-5 space-y-3 text-muted-foreground">
        {steps.map((step, idx) => (
          <p key={step.title}>
            <strong className="text-foreground">Step {idx + 1} {step.title}:</strong> {step.description}
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

