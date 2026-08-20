"use client";

import { Container } from "../layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Mail, FileCheck, Briefcase, Globe, Star } from "lucide-react";
import type { TrustedPlatformsData } from "@/lib/content-engine";
import type { IconType } from "react-icons";
import {
  SiOpenai,
  SiAnthropic,
  SiGooglecloud,
  SiMeta,
  SiAmazonwebservices,
  SiVercel,
  SiStripe,
  SiHubspot,
  SiShopify,
  SiNotion,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiGoogleanalytics,
  SiWordpress,
  SiN8N,
  SiWebflow,
  SiZapier,
  SiSupabase,
  SiPrisma,
  SiFigma,
  SiTrustpilot,
  SiG2,
} from "react-icons/si";
import {
  FaGoogle,
  FaLinkedin,
  FaAws,
  FaUpwork,
} from "react-icons/fa6";

const ClutchIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5c1.782 0 3.319 1.042 4.053 2.553l-2.28 1.011c-.347-.621-.994-1.064-1.773-1.064-.993 0-1.8 1.007-1.8 2s.807 2 1.8 2c.779 0 1.426-.443 1.773-1.064l2.28 1.011c-.734 1.511-2.271 2.553-4.053 2.553zm7.5-2.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75z" />
  </svg>
);

type IconEntry = { icon: IconType; color: string; bg?: string };

const trustSignalIcons: Record<string, IconEntry> = {
  "Google Reviews":      { icon: FaGoogle,    color: "text-white", bg: "bg-[#4285F4]" },
  "Clutch Profile":      { icon: ClutchIcon,  color: "text-white", bg: "bg-[#E62415]" },
  "Clutch":              { icon: ClutchIcon,  color: "text-white", bg: "bg-[#E62415]" },
  "LinkedIn Presence":   { icon: FaLinkedin,  color: "text-white", bg: "bg-[#0A66C2]" },
  "Trustpilot":          { icon: SiTrustpilot, color: "text-white", bg: "bg-[#00B67A]" },
  "G2":                  { icon: SiG2,        color: "text-white", bg: "bg-[#FF492C]" },
  "Upwork":              { icon: FaUpwork,    color: "text-white", bg: "bg-[#6FDA44]" },
  "Verified Business Email": { icon: Mail,    color: "text-emerald-600" },
  "Case Study Outcomes":     { icon: FileCheck, color: "text-[var(--site-primary)]" },
  "Technical Delivery Portfolio": { icon: Briefcase, color: "text-amber-600" },
};

const platformIcons: Record<string, IconEntry> = {
  "OpenAI":       { icon: SiOpenai,              color: "text-teal-500" },
  "Anthropic":    { icon: SiAnthropic,            color: "text-purple-500" },
  "Google":       { icon: FaGoogle,               color: "text-[#4285F4]" },
  "Google Cloud": { icon: SiGooglecloud,          color: "text-blue-500" },
  "Meta":         { icon: SiMeta,                 color: "text-blue-600" },
  "AWS":          { icon: SiAmazonwebservices,     color: "text-orange-500" },
  "Amazon AWS":   { icon: FaAws,                  color: "text-orange-500" },
  "Vercel":       { icon: SiVercel,               color: "text-slate-900 dark:text-white" },
  "Stripe":       { icon: SiStripe,               color: "text-indigo-600" },
  "HubSpot":      { icon: SiHubspot,              color: "text-orange-600" },
  "Shopify":      { icon: SiShopify,              color: "text-green-600" },
  "Notion":       { icon: SiNotion,               color: "text-slate-800 dark:text-slate-200" },
  "Next.js":      { icon: SiNextdotjs,            color: "text-slate-900 dark:text-white" },
  "React":        { icon: SiReact,                color: "text-cyan-500" },
  "Tailwind CSS": { icon: SiTailwindcss,          color: "text-sky-400" },
  "Node.js":      { icon: SiNodedotjs,            color: "text-green-600" },
  "TypeScript":   { icon: SiTypescript,           color: "text-blue-600" },
  "PostgreSQL":   { icon: SiPostgresql,           color: "text-blue-700" },
  "Docker":       { icon: SiDocker,               color: "text-blue-500" },
  "GitHub":       { icon: SiGithub,               color: "text-slate-900 dark:text-white" },
  "Google Analytics": { icon: SiGoogleanalytics,  color: "text-orange-500" },
  "WordPress":    { icon: SiWordpress,            color: "text-blue-600" },
  "n8n":          { icon: SiN8N,                  color: "text-red-500" },
  "Webflow":      { icon: SiWebflow,              color: "text-blue-500" },
  "Zapier":       { icon: SiZapier,               color: "text-orange-500" },
  "Supabase":     { icon: SiSupabase,             color: "text-emerald-500" },
  "Prisma":       { icon: SiPrisma,               color: "text-slate-700 dark:text-slate-300" },
  "Figma":        { icon: SiFigma,                color: "text-pink-500" },
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
              {sectionData.eyebrow}
            </span>
            <h2 className="text-3xl font-display font-black text-foreground md:text-4xl">
              {sectionData.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Platforms pill badges */}
            <AnimatedSection direction="left" className="site-card p-6">
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
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 transition-all hover:border-[var(--site-primary)]/30 hover:bg-white hover:shadow-sm dark:hover:bg-white/10"
                    >
                      <Icon size={13} className={entry.color} />
                      {item}
                    </span>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* Trust signal list */}
            <AnimatedSection direction="right" className="site-card p-6">
              <h3 className="mb-4 text-lg font-display font-bold text-foreground">
                {sectionData.trustSignalsTitle}
              </h3>
              <ul className="space-y-3">
                {sectionData.trustSignals.map((item) => {
                  const entry = trustSignalIcons[item] || { icon: Briefcase, color: "text-slate-400" };
                  const Icon = entry.icon;
                  const hasBrand = !!entry.bg;
                  return (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform hover:scale-110 ${
                          hasBrand
                            ? `${entry.bg}`
                            : "bg-white border border-slate-100 dark:bg-white/5 dark:border-white/10"
                        }`}
                      >
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
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}
