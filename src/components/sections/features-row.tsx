"use client";

import { Code2, Zap, Rocket, Palette, ArrowRight } from "lucide-react";
import { Container } from "../layout/layout-primitives";
const features = [
  {
    icon: Code2,
    title: "Custom Website Development",
    description: "Premium websites built for credibility, performance, and long-term business growth.",
    category: "WEB DEVELOPMENT",
  },
  {
    icon: Zap,
    title: "Conversion Funnels & Landing Pages",
    description: "Focused page systems designed to turn traffic into inquiries, bookings, and qualified leads.",
    category: "FUNNELS",
  },
  {
    icon: Rocket,
    title: "AI Chatbots & Automation",
    description: "AI-powered workflows that improve response speed and reduce manual follow-up.",
    category: "AI AUTOMATION",
  },
  {
    icon: Palette,
    title: "SEO & Growth Retainers",
    description: "Ongoing SEO, optimization, updates, and performance support to improve visibility.",
    category: "SEO & GROWTH",
  },
];

export function FeaturesRow() {
  return (
    <section className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] py-12 lg:py-16 dark:border-[#1E1E2E] dark:bg-[#0A0A0F]">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.25)] bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--site-primary)]" />
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-[var(--site-primary)]">
              Our Services
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-display font-black tracking-tight text-slate-950 dark:text-[#F8F8FF] md:text-5xl">
            Enterprise Solutions
          </h2>
          <p className="font-body text-lg leading-relaxed text-slate-600 dark:text-[#94A3B8]">
            Comprehensive services designed to transform your business with cutting-edge technology.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="site-card site-card-interactive group relative flex h-full flex-col p-6"
              >
                {/* Icon Circle */}
                <div className="site-card-icon mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-colors group-hover:bg-[rgba(var(--site-primary-rgb),0.14)]">
                  <Icon size={20} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="site-card-title mb-2 text-lg font-display font-bold">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="site-card-muted flex-grow font-body text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Category Tag - appears at bottom */}
                <div className="mt-6 pt-2 flex items-center justify-between">
                  <span className="site-card-accent text-xs font-body font-semibold uppercase tracking-widest">
                    {feature.category}
                  </span>
                  <ArrowRight
                    size={16}
                    className="site-card-accent transform opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
