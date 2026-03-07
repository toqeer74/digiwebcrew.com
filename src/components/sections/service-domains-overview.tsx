"use client";

import { serviceDomains } from "@/lib/services-data";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, Sparkle, Globe, Smartphone, ShoppingCart, Zap, Code2, Server, FileText, Wrench } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      <AnimatedSection className="text-center max-w-3xl mx-auto mb-20 md:mb-40">
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-raly-accent/20 text-raly-deep text-[11px] font-bold uppercase tracking-[0.3em] border border-raly-accent/30 backdrop-blur-sm">
            <Sparkle size={16} strokeWidth={2.5} className="text-raly-primary animate-pulse" />
            Service Architecture
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tight mb-10 leading-[0.85]">
            <span className="text-gradient block">Service Domains</span>
          </h1>
          <p className="text-xl md:text-2xl text-raly-text font-semibold max-w-2xl mx-auto leading-relaxed opacity-90">
            {dict.services.hubDesc}
          </p>
        </AnimatedSection>

        {/* Service Domains Grid */}
        <AnimatedSection className="pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceDomains.map((domain, i) => {
              const Icon = iconMap[domain.icon] || Globe;
              const gradientColors = domain.color;
              
              return (
                <Link
                  key={domain.slug}
                  href={`/${locale}/services/${domain.slug}`}
                >
                  <AnimatedSection
                    delay={i * 0.1}
                    className="h-full p-8 rounded-3xl group cursor-pointer transition-all duration-500 border border-raly-accent/20 hover:border-raly-primary/50 bg-raly-subtle hover:premium-shadow overflow-hidden relative"
                  >
                    {/* Gradient Background */}
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 blur-2xl rounded-full transition-opacity duration-500",
                      `bg-gradient-to-br ${gradientColors}`
                    )} />
                    
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-raly-base mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 border border-raly-accent/20 bg-raly-base",
                        `bg-gradient-to-br ${gradientColors}`
                      )}>
                        <Icon size={32} strokeWidth={2} />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-black tracking-tight mb-3 text-raly-deep group-hover:text-raly-primary transition-colors">
                        {domain.title}
                      </h3>
                      <p className="text-sm text-raly-text font-medium leading-relaxed mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                        {domain.description}
                      </p>

                      {/* Service Count */}
                      <div className="flex items-center justify-between pt-6 border-t border-raly-accent/20">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-raly-text">
                          {domain.categories.length} Service{domain.categories.length !== 1 ? 's' : ''}
                        </span>
                        <ArrowRight size={18} className="text-raly-primary group-hover:translate-x-2 transition-transform" />
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
          <div className="relative p-16 md:p-24 rounded-[4rem] bg-raly-deep text-raly-base overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-raly-accent/20 via-transparent to-raly-primary/10 opacity-30 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-raly-primary/10 blur-[100px] rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
                  {dict.services.customSolution}
                </h2>
                <p className="text-xl text-raly-accent font-medium leading-relaxed">
                  {dict.services.customSolutionDesc}
                </p>
              </div>
              <Link
                href={`/${locale}/quote`}
                className="group flex h-20 items-center justify-center rounded-xl bg-raly-base text-raly-deep font-extrabold text-[13px] px-12 uppercase tracking-[0.2em] transition-all hover:bg-raly-subtle hover:scale-[1.02] active:scale-95 border border-raly-accent/20 shadow-xl shadow-raly-primary/5 whitespace-nowrap"
              >
                <span>{dict.services.getQuote}</span>
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </>
    );
  }
