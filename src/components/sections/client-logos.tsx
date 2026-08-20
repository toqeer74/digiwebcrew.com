"use client";

import { Container } from "../layout/layout-primitives";
import type { ClientLogosData } from "@/lib/content-engine";
import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPostgresql, SiAmazonwebservices, SiOpenai, SiAnthropic,
  SiGooglecloud, SiMeta, SiVercel, SiStripe, SiHubspot, SiShopify,
  SiNotion, SiWordpress, SiWebflow, SiZapier, SiSupabase, SiPrisma,
  SiFigma, SiN8N, SiDocker, SiGithub, SiTrustpilot, SiG2,
  SiSlack, SiAirtable, SiMongodb, SiFirebase, SiRedis, SiGraphql,
} from "react-icons/si";
import { FaGoogle, FaLinkedin, FaAws, FaUpwork, FaShopify, FaWordpress } from "react-icons/fa6";
import { Scale, Heart, Mountain, Cpu, Stethoscope, TrendingUp } from "lucide-react";

const ClutchIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 16.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5c1.782 0 3.319 1.042 4.053 2.553l-2.28 1.011c-.347-.621-.994-1.064-1.773-1.064-.993 0-1.8 1.007-1.8 2s.807 2 1.8 2c.779 0 1.426-.443 1.773-1.064l2.28 1.011c-.734 1.511-2.271 2.553-4.053 2.553zm7.5-2.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75z" />
  </svg>
);

type LogoEntry = { icon: IconType; color: string };

const LOGO_ICONS: Record<string, LogoEntry> = {
  "React":            { icon: SiReact,              color: "#61DAFB" },
  "Next.js":          { icon: SiNextdotjs,          color: "#0F172A" },
  "TypeScript":       { icon: SiTypescript,         color: "#3178C6" },
  "Tailwind CSS":     { icon: SiTailwindcss,        color: "#06B6D4" },
  "Node.js":          { icon: SiNodedotjs,          color: "#5FA04E" },
  "PostgreSQL":       { icon: SiPostgresql,         color: "#4169E1" },
  "AWS":              { icon: SiAmazonwebservices,  color: "#FF9900" },
  "Amazon AWS":       { icon: FaAws,                color: "#FF9900" },
  "OpenAI":           { icon: SiOpenai,             color: "#10A37F" },
  "Anthropic":        { icon: SiAnthropic,          color: "#b67a52" },
  "Google":           { icon: FaGoogle,             color: "#4285F4" },
  "Google Cloud":     { icon: SiGooglecloud,        color: "#4285F4" },
  "Meta":             { icon: SiMeta,               color: "#0866FF" },
  "Vercel":           { icon: SiVercel,             color: "#000000" },
  "Stripe":           { icon: SiStripe,             color: "#635BFF" },
  "HubSpot":          { icon: SiHubspot,            color: "#FF7A59" },
  "Shopify":          { icon: SiShopify,            color: "#96BF48" },
  "Notion":           { icon: SiNotion,             color: "#191919" },
  "WordPress":        { icon: SiWordpress,          color: "#21759B" },
  "Webflow":          { icon: SiWebflow,            color: "#4353FF" },
  "Zapier":           { icon: SiZapier,             color: "#FF4A00" },
  "Supabase":         { icon: SiSupabase,           color: "#3ECF8E" },
  "Prisma":           { icon: SiPrisma,             color: "#5a67d8" },
  "Figma":            { icon: SiFigma,              color: "#F24E1E" },
  "n8n":              { icon: SiN8N,                color: "#EA4B71" },
  "Docker":           { icon: SiDocker,             color: "#2496ED" },
  "GitHub":           { icon: SiGithub,             color: "#181717" },
  "LinkedIn":         { icon: FaLinkedin,           color: "#0A66C2" },
  "Upwork":           { icon: FaUpwork,             color: "#14A800" },
  "Clutch":           { icon: ClutchIcon,           color: "#E62415" },
  "Trustpilot":       { icon: SiTrustpilot,        color: "#00B67A" },
  "G2":               { icon: SiG2,                 color: "#FF492C" },
  "Slack":            { icon: SiSlack,              color: "#4A154B" },
  "Airtable":         { icon: SiAirtable,           color: "#18BFFF" },
  "MongoDB":          { icon: SiMongodb,            color: "#47A248" },
  "Firebase":         { icon: SiFirebase,           color: "#FFCA28" },
  "Redis":            { icon: SiRedis,              color: "#DC382D" },
  "GraphQL":          { icon: SiGraphql,            color: "#E10098" },
  "Northbridge Legal": { icon: Scale as IconType, color: "#1E3A8A" },
  "Apex Dental Group": { icon: Heart as IconType, color: "#ef4444" },
  "BluePeak Services": { icon: Mountain as IconType, color: "#0284c7" },
  "ScaleForge SaaS":   { icon: Cpu as IconType, color: "#114b97" },
  "PrimeEdge Clinics": { icon: Stethoscope as IconType, color: "#10b981" },
  "Summit Growth Co.": { icon: TrendingUp as IconType, color: "#f59e0b" },
};

export function ClientLogos({ data }: { data: ClientLogosData }) {
  const logosData = data || { heading: "Trusted by growing brands and ambitious businesses", logos: [] };
  return (
    <section className="border-y border-slate-200/80 bg-white py-10 dark:border-white/10 dark:bg-midnight">
      <Container>
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
            {logosData.heading}
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {logosData.logos.map((logo) => {
              const entry = LOGO_ICONS[logo];
              const Icon = entry?.icon;
              return (
                <div
                  key={logo}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center transition-all hover:border-[rgba(var(--site-primary-rgb),0.35)] hover:bg-white hover:shadow-sm dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/25 group"
                >
                  {typeof Icon !== "undefined" && entry ? (
                    <Icon
                      size={26}
                      style={{ color: entry.color }}
                      className="transition-transform group-hover:scale-110"
                    />
                  ) : null}
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                    {logo}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
