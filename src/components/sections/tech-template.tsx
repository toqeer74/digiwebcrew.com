"use client";

import { Container, Section } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, Zap, Target, ShieldCheck, Rocket, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";

interface TechTemplateProps {
  tech: any;
  dict: any;
  locale: string;
}

export function TechTemplate({ tech, dict, locale }: TechTemplateProps) {
  const Icon = (Icons as any)[tech.iconName] || Icons.Circle;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-transparent text-slate-900 dark:text-white">
          {/* Background Accents */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#6366F1]/20 via-transparent to-[#8B5CF6]/10 opacity-30" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6366F1]/20 blur-[150px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-0 dark:opacity-100" />
          </div>

          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="right">
                <div className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/30 mb-8 text-[11px] font-bold font-body uppercase tracking-[0.4em] backdrop-blur-md">
                  <Icons.Sparkle size={18} strokeWidth={2.5} className="text-[#6366F1]" />
                  Technology Laboratory
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.9]">
                  <span className="text-slate-950 dark:text-white block">{tech.title.split(' ').slice(0, -1).join(' ')}</span>
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent block">{tech.title.split(' ').slice(-1)}</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-body font-medium mb-12 max-w-xl leading-relaxed">
                  {tech.description}
                </p>
                <Link
                  href={localePath(locale, "/quote")}
                  className="group flex h-16 items-center justify-center rounded-xl bg-white text-[#1a1f38] font-display font-extrabold text-[13px] px-10 uppercase tracking-[0.2em] transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-95 border border-white dark:shadow-lg dark:shadow-[#6366F1]/10 w-max"
                >
                  <span>Start a Tech Audit</span>
                  <ArrowRight size={18} strokeWidth={2.5} className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimatedSection>

              <AnimatedSection direction="left" className="relative hidden lg:block">
                <div className="aspect-square glass border-[#6366F1]/10 rounded-[4rem] flex items-center justify-center relative overflow-hidden bg-[#6366F1]/5">
                  <Icon size={240} className="text-[#6366F1]/10" strokeWidth={0.5} />
                  {/* Animated Pulse */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0, 0.2, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-64 h-64 border-2 border-[#6366F1]/50 rounded-full"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>

        {/* Capabilities */}
        <Section className="py-24 md:py-32">
          <Container>
            <AnimatedSection className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">Core Capabilities</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto">
                Specialized technical strengths we bring to every project within this laboratory.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tech.capabilities.map((cap: string, i: number) => (
                <AnimatedSection
                  key={i}
                  delay={i * 0.1}
                  className="p-10 rounded-[3rem] glass border border-white/10 hover:border-[#6366F1]/30 transition-all duration-500 hover:premium-shadow text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/5 flex items-center justify-center text-[#6366F1] mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Target size={32} />
                  </div>
                  <h4 className="text-xl font-bold tracking-tight mb-2 uppercase tracking-widest">{cap}</h4>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </Section>

        {/* Related Services */}
        <Section className="py-24 md:py-32 border-t border-white/10">
          <Container>
            <AnimatedSection className="mb-16">
              <h2 className="text-4xl font-extrabold tracking-tighter">Related Laboratories</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tech.relatedServices.map((serviceSlug: string) => {
                const service = dict.services; // Need to actually fetch the service object from data
                // For now, let's just make a simple link based on slug
                const title = serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                return (
                  <Link
                    key={serviceSlug}
                    href={localePath(locale, `/services/${serviceSlug}`)}
                    className="group p-8 rounded-[2.5rem] glass border border-slate-200 dark:border-white/10 flex items-center justify-between hover:border-[#6366F1]/50 transition-all"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6366F1] mb-2">Service Category</p>
                      <h4 className="text-2xl font-bold tracking-tight">{title}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-midnight border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-200 dark:group-hover:bg-white/10 group-hover:border-[#6366F1]/50 transition-all dark:shadow-sm">
                      <ArrowRight size={20} strokeWidth={3} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Value Props */}
        <Section className="py-24 md:py-32 bg-[#6366F1]/5">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Production Grade", desc: "No experimental shortcuts. Only battle-tested, industrial-grade code." },
                { icon: Zap, title: "Edge Ready", desc: "Optimized for global delivery with extreme performance and low latency." },
                { icon: Rocket, title: "Scalable Logic", desc: "Architectures that handle 10x growth without requiring a rewrite." },
                { icon: Heart, title: "Client Focused", desc: "Technology serves the business objective, not the other way around." }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="space-y-4">
                  <item.icon size={40} className="text-[#6366F1]" strokeWidth={1} />
                  <h5 className="text-lg font-black uppercase tracking-tighter">{item.title}</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </AnimatedSection>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}

