"use client";

import { serviceDomains } from "@/lib/services-data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Sparkle, Globe, Smartphone, ShoppingCart, Zap, Code2, Server, FileText, Wrench } from "lucide-react";
import Link from "next/link";
import { localePath } from "@/lib/locale-path";

const iconMap: Record<string, React.ComponentType<any>> = {
  "Globe": Globe,
  "Smartphone": Smartphone,
  "ShoppingCart": ShoppingCart,
  "Zap": Zap,
  "Code2": Code2,
  "Server": Server,
  "FileText": FileText,
  "Wrench": Wrench,
};

export default function ServiceDomainsOverview({ dict, locale }: { dict: any; locale: string }) {
  return (
    <>
      <AnimatedSection className="mx-auto mb-20 max-w-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] py-16 text-center dark:bg-transparent dark:bg-none md:mb-40">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.25)] bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1">
            <Sparkle size={16} strokeWidth={2.5} className="animate-pulse text-[var(--site-primary)]" />
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-[var(--site-primary)]">
              Service Architecture
            </span>
          </div>
          <h1 className="mb-8 text-5xl font-display font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            Services Built to Strengthen Growth, Conversion, and Digital Performance
          </h1>
          <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict.services.hubDesc}
          </p>
        </AnimatedSection>

        {/* Service Domains Grid */}
        <AnimatedSection className="pb-40 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceDomains.map((domain, i) => {
              const Icon = iconMap[domain.icon] || Globe;
              
              return (
                <Link
                  key={domain.slug}
                  href={localePath(locale, `/services/${domain.slug}`)}
                >
                  <AnimatedSection
                    delay={i * 0.1}
                    className="relative h-full cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white/96 p-6 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:border-[color:rgba(var(--site-primary-rgb),0.35)] hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[#1a1f38] dark:hover:shadow-[0_20px_40px_-24px_rgba(var(--site-primary-rgb),0.18)]"
                  >
                    {/* Decorative background */}
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[var(--site-primary)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-10" />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(var(--site-primary-rgb),0.08)] text-[var(--site-primary)] transition-all duration-300 group-hover:scale-110">
                        <Icon size={24} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="mb-2 text-lg font-display font-bold tracking-tight text-slate-950 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                        {domain.title}
                      </h3>
                      <p className="mb-6 font-body text-sm leading-relaxed text-muted-foreground">
                        {domain.description}
                      </p>

                      {/* Service Count */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-body font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          {domain.categories.length} Service{domain.categories.length !== 1 ? 's' : ''}
                        </span>
                        <ArrowRight size={16} className="text-[var(--site-primary)] transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </AnimatedSection>
                </Link>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Premium CTA Section */}
        <AnimatedSection>
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(241,245,249,0.98))] p-12 shadow-[0_20px_44px_-28px_rgba(15,23,42,0.18)] dark:border-indigo-500/20 dark:bg-gradient-to-br dark:from-indigo-900/40 dark:to-violet-900/30 md:p-20">
            {/* Decorative orb */}
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] opacity-50 blur-[100px] transition-opacity duration-700 group-hover:opacity-70 dark:bg-indigo-600/10" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="mb-4 text-3xl font-display font-bold tracking-tight text-foreground md:text-5xl">
                  {dict.services.customSolution}
                </h2>
                <p className="font-body text-lg leading-relaxed text-muted-foreground">
                  {dict.services.customSolutionDesc}
                </p>
              </div>
              <Link
                href={localePath(locale, "/quote")}
                className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--site-primary)] px-8 py-3 font-body font-semibold text-white transition-all duration-200 hover:bg-[var(--site-primary-hover)]"
              >
                <span>{dict.services.getQuote}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </>
    );
  }

