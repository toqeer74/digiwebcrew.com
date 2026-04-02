"use client";

import { Container, Section } from "@/components/layout/layout-primitives";
import { serviceCatalog, techLabs } from "@/lib/services-data";
import { ServiceCard } from "@/components/ui/service-card";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Sparkle, Filter, Code2, Globe, ShoppingCart, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";

export default function ServicesHub({ dict, locale }: { dict: any; locale: string }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = activeFilter === "all"
    ? serviceCatalog
    : serviceCatalog.filter(s => s.slug === activeFilter);

  return (
    <main className="flex-1 pt-32 pb-20 overflow-hidden">
      <Container>
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20 md:mb-40">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-[var(--site-primary)]/5 text-[var(--site-primary)] text-[11px] font-bold uppercase tracking-[0.3em] border border-[var(--site-primary)]/20 backdrop-blur-sm">
            <Sparkle size={16} strokeWidth={2.5} className="text-[var(--site-primary)] animate-pulse" />
            {dict.services.specializations}
          </div>
          <h1 className="text-7xl md:text-9xl font-display font-black tracking-tight mb-10 leading-[0.85]">
            <span className="bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)] bg-clip-text text-transparent block">{dict.services.hubTitle}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-body font-semibold max-w-2xl mx-auto leading-relaxed opacity-90">
            {dict.services.hubDesc}
          </p>
        </AnimatedSection>

        {/* Filtering System */}
        <AnimatedSection className="mb-24">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "px-10 py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border",
                activeFilter === "all" ? "bg-[var(--site-primary)] text-white border-[var(--site-primary)] dark:shadow-xl dark:shadow-[var(--site-primary)]/30" : "bg-slate-200 text-slate-900 border-slate-300 hover:bg-slate-300 dark:bg-midnight dark:text-white dark:border-white/10 dark:hover:border-[var(--site-primary)]/50"
              )}
            >
              All Labs
            </button>
            {serviceCatalog.map(service => (
              <button
                key={service.slug}
                onClick={() => setActiveFilter(service.slug)}
                className={cn(
                  "px-10 py-5 rounded-[2rem] text-[10px] font-body font-black uppercase tracking-[0.2em] transition-all border",
                  activeFilter === service.slug ? "bg-[var(--site-primary)] text-white border-[var(--site-primary)] dark:shadow-2xl dark:shadow-[var(--site-primary)]/30" : "bg-slate-200 text-slate-900 border-slate-300 hover:bg-slate-300 dark:bg-midnight dark:text-white dark:border-white/10 dark:hover:border-[var(--site-primary)]/50"
                )}
              >
                {service.title}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pb-40">
          {filteredServices.map((service, i) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              description={service.description}
              iconName={service.iconName}
              href={localePath(locale, `/services/${service.slug}`)}
              index={i}
            />
          ))}
        </div>

        {/* Tech Labs Engine Section */}
        <Section className="pb-40">
          <AnimatedSection className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter mb-10 text-slate-900 dark:text-white">Built with <span className="bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)] bg-clip-text text-transparent italic">Industrial-Grade</span> Tech</h2>
            <p className="text-muted-foreground font-body font-semibold max-w-xl mx-auto leading-relaxed text-xl opacity-90">
              Our specialized technology hubs where we master the tools that power your success.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {techLabs.map((tech, i) => {
              const Icon = (tech.iconName === "Zap" ? Zap : tech.iconName === "ShoppingCart" ? ShoppingCart : Code2);
              return (
                <AnimatedSection
                  key={tech.slug}
                  delay={i * 0.1}
                  className="p-12 rounded-[3.5rem] bg-slate-50 dark:bg-midnight border border-slate-200 dark:border-white/10 transition-colors group"
                >
                  <div className="w-20 h-20 rounded-2xl bg-[var(--site-primary)]/10 border border-white/10 flex items-center justify-center text-[var(--site-primary)] mb-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Icon size={40} />
                  </div>
                  <h4 className="text-3xl font-display font-black tracking-tight mb-6 text-slate-900 dark:text-white">{tech.title}</h4>
                  <p className="text-lg text-muted-foreground font-body font-semibold leading-relaxed mb-12 opacity-90">
                    {tech.description}
                  </p>
                  <Link
                    href={localePath(locale, `/tech/${tech.slug}`)}
                    className="flex h-16 items-center justify-center rounded-xl bg-slate-200 text-slate-900 border-slate-300 hover:bg-slate-300 dark:bg-midnight dark:text-white dark:border-white/10 dark:hover:border-[var(--site-primary)]/50 transition-colors"
                  >
                    View Tech Laboratory
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </Section>

        {/* Premium CTA Section */}
        <AnimatedSection>
          <div className="relative p-16 md:p-24 rounded-[4rem] bg-gradient-to-br dark:from-midnight dark:to-[#11152c] border border-[var(--site-primary)]/20 overflow-hidden group dark:shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--site-primary)]/20 via-transparent to-[var(--site-primary-soft)]/10 opacity-30 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--site-primary)]/10 blur-[100px] rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter mb-6 leading-tight text-slate-900 dark:text-white">
                  {dict.services.customSolution}
                </h2>
                <p className="text-xl text-muted-foreground font-body font-medium leading-relaxed">
                  {dict.services.customSolutionDesc}
                </p>
              </div>
              <Link
                href={localePath(locale, "/quote")}
                className="group flex h-20 items-center justify-center rounded-xl bg-white text-midnight font-display font-extrabold text-[13px] px-12 uppercase tracking-[0.2em] transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-95 border border-white dark:shadow-xl dark:shadow-[var(--site-primary)]/10 whitespace-nowrap"
              >
                <span>{dict.services.getQuote}</span>
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </main>
  );
}

