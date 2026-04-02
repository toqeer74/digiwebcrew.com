"use client";

import { Container } from "../layout/layout-primitives";
import { Star, Award, Linkedin, Mail, FileCheck, Briefcase, Bot, Brain, Search, Infinity, Cloud, Triangle, CreditCard, Target, ShoppingBag, FileText, Globe } from "lucide-react";
import type { TrustedPlatformsData } from "@/lib/content-engine";

const trustSignalIcons: Record<string, { icon: any; color: string }> = {
  "Google Reviews": { icon: Star, color: "text-yellow-500" },
  "Clutch Profile": { icon: Award, color: "text-red-600" },
  "LinkedIn Presence": { icon: Linkedin, color: "text-blue-600" },
  "Verified Business Email": { icon: Mail, color: "text-emerald-500" },
  "Case Study Outcomes": { icon: FileCheck, color: "text-indigo-500" },
  "Technical Delivery Portfolio": { icon: Briefcase, color: "text-amber-600" },
};

const platformIcons: Record<string, { icon: any; color: string }> = {
  "OpenAI": { icon: Bot, color: "text-teal-500" },
  "Anthropic": { icon: Brain, color: "text-purple-500" },
  "Google": { icon: Search, color: "text-blue-500" },
  "Meta": { icon: Infinity, color: "text-blue-600" },
  "AWS": { icon: Cloud, color: "text-orange-500" },
  "Vercel": { icon: Triangle, color: "text-slate-900 dark:text-white" },
  "Stripe": { icon: CreditCard, color: "text-indigo-600" },
  "HubSpot": { icon: Target, color: "text-orange-600" },
  "Shopify": { icon: ShoppingBag, color: "text-green-600" },
  "Notion": { icon: FileText, color: "text-slate-800 dark:text-slate-200" },
};

const fallbackData: TrustedPlatformsData = {
  eyebrow: "Credibility",
  heading: "Trusted Platforms & Verified Expertise",
  platformsTitle: "Platforms & Ecosystems We Build With",
  trustSignalsTitle: "Verified Trust Signals",
  platforms: [],
  trustSignals: [],
  note: "Tools we use are listed separately from formal credentials to keep trust claims accurate.",
};

export function TrustedPlatforms({ data }: { data: TrustedPlatformsData }) {
  const sectionData = data || fallbackData;
  return (
    <section className="border-b border-slate-200 bg-white dark:bg-midnight py-20 transition-colors">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
              {sectionData.eyebrow}
            </span>
            <h2 className="text-3xl font-display font-black text-foreground md:text-4xl">
              {sectionData.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="site-card p-6">
              <h3 className="mb-4 text-lg font-display font-bold text-foreground">
                {sectionData.platformsTitle}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sectionData.platforms.map((item) => {
                  const entry = platformIcons[item] || { icon: Globe, color: "text-slate-400" };
                  const Icon = entry.icon;
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 transition-all hover:border-[var(--site-primary)]/30 hover:bg-white dark:hover:bg-white/10"
                    >
                      <Icon size={12} className={entry.color} />
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="site-card p-6">
              <h3 className="mb-4 text-lg font-display font-bold text-foreground">
                {sectionData.trustSignalsTitle}
              </h3>
              <ul className="space-y-3">
                {sectionData.trustSignals.map((item) => {
                  const entry = trustSignalIcons[item] || { icon: Briefcase, color: "text-slate-400" };
                  const Icon = entry.icon;
                  return (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-100 dark:bg-white/5 dark:border-white/10 transition-transform hover:scale-110">
                        <Icon size={15} className={entry.color} />
                      </div>
                      {item}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                {sectionData.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

