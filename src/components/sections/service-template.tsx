"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/layout-primitives";
import * as LucideIcons from "lucide-react";
import * as SiIcons from "react-icons/si";
import { ArrowRight, CheckCircle2, FlaskConical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIExecutiveSummary } from "../ui/ai-summary";
import Link from "next/link";

interface ServiceTemplateProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: any;
  iconName?: string;
  features?: string[];
  techStack?: { name: string; icon?: any; iconName?: string; color: string }[];
  outcomes?: string[];
  ctaText?: string;
  category?: any;
  subService?: any;
  dict?: any;
  locale?: string;
}

export function ServiceTemplate({
  title,
  subtitle,
  description,
  icon,
  iconName,
  features,
  techStack,
  outcomes,
  ctaText = "Initiate Project Discovery",
  category,
  subService
}: ServiceTemplateProps) {
  // Extract data from subService/category if provided
  const displayTitle = subService?.title || title || "Specialized Service";
  const displaySubtitle = category?.title || subtitle || "Engineering Lab";
  const displayDescription = subService?.description || description || "";
  const displayFeatures = subService?.features || features || [];
  const displayOutcomes = subService?.outcomes || outcomes || [];

  // Icon handling
  const IconComponent = typeof icon === 'function' ? icon : ((LucideIcons as any)[iconName || subService?.iconName || category?.iconName || "Code2"] || LucideIcons.Code2);

  // Tech stack mapping
  const displayTechStack = (techStack || subService?.techStack?.map((name: string) => ({ name, color: "text-gray-400" })) || []).map((tech: any) => {
    // Resolve icon if it's a string name
    const resolvedIcon = typeof tech.icon === 'function' ? tech.icon : (
      (SiIcons as any)[tech.iconName] ||
      (LucideIcons as any)[tech.iconName] ||
      (SiIcons as any)[`Si${tech.name.replace(/[^a-zA-Z0-9]/g, '')}`] ||
      LucideIcons.Zap
    );
    return { ...tech, icon: resolvedIcon };
  });

  return (
    <div className="min-h-screen pt-32 pb-24 dark:bg-[#0A0A0F]">
      <Container>
        {/* Modern Centered Hero */}
        <div className="flex flex-col items-center text-center mb-24 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
            <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Focus: {displaySubtitle}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1]"
          >
            {displayTitle} <br />
            <span className="text-[var(--site-primary)]">Solutions</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed"
          >
            {displayDescription}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/book-consultation" className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
              <span>{ctaText}</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid - Bento Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {displayFeatures.map((feature: string, idx: number) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="site-card site-card-interactive p-8 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-[var(--site-primary)]/5 dark:bg-white/5 flex items-center justify-center text-[var(--site-primary)] mb-8 transition-transform group-hover:scale-110">
                <CheckCircle2 size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-black text-slate-950 dark:text-[#F8F8FF] text-xl leading-tight">{feature}</h3>
            </motion.div>
          ))}
        </div>

        {/* Answer Engine Optimization (AEO) Layer */}
        <div className="mb-24">
            <AIExecutiveSummary
              title={`${displayTitle} Engineering Summary`}
              summary={`Our ${displayTitle} solutions are architected to deliver maximum business value through ${displayFeatures.slice(0, 2).join(' and ')}. By prioritizing Core Web Vitals and semantic data extraction, we ensure that your ${displaySubtitle} remains visible and authoritative for both human users and AI agents.`}
              techStack={subService?.techStack || []}
            />
        </div>

        {/* Authority Pipeline - Redesigned Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <Link
            href="/services"
            className="site-card p-10 lg:p-12 relative overflow-hidden group transition-all border-2 border-transparent hover:border-[var(--site-primary)]/10"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[var(--site-primary-soft)] to-transparent" />
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[var(--site-primary)]/10 flex items-center justify-center text-[var(--site-primary)]">
                <FlaskConical size={32} />
              </div>
              <ArrowRight className="text-slate-400 group-hover:text-[var(--site-primary)] transition-all group-hover:translate-x-2" size={28} />
            </div>
            <h4 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-4">Service Cluster</h4>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">Explore the full engineering cluster and connected micro-service definitions.</p>
          </Link>

          <Link
            href="/tech"
            className="site-card p-10 lg:p-12 relative overflow-hidden group transition-all border-2 border-[var(--site-primary)]/20 shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.3)] bg-gradient-to-br from-slate-50 to-white dark:from-[#13131E] dark:to-[#1a1a2e]"
          >
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)]" />
            <div className="flex justify-between items-start mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[var(--site-primary)] flex items-center justify-center text-white">
                <ExternalLink size={32} />
              </div>
              <ArrowRight className="text-slate-400 dark:text-white/20 group-hover:text-[var(--site-primary)] transition-all group-hover:translate-x-2" size={28} />
            </div>
            <h4 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-4">View Evidence</h4>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">Inspect live proof-of-work and industrial outcomes in our global tech library.</p>
          </Link>
        </div>

        {/* Tech Stack - Modern Logo Cloud */}
        <div className="py-24 border-y border-slate-200 dark:border-white/10 mb-24">
          <div className="text-center">
            <h3 className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.4em] mb-16">Precision Engineering Stack</h3>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
              {displayTechStack.map((tech: any) => (
                <div key={tech.name} className="flex flex-col items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default group">
                  <tech.icon className={cn("text-5xl transition-transform group-hover:scale-110", tech.color)} />
                  <span className="text-[9px] font-bold text-slate-500 dark:text-white/40 uppercase tracking-[0.2em]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outcomes - Alternating Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
               Direct Business Value
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">Key Industrial <span className="text-[var(--site-primary)]">Outcomes</span></h3>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">Our engineering lab is optimized for these specific KPIs, ensuring your investment translates directly into sustained business growth.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {displayOutcomes.map((outcome: string, idx: number) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="site-card p-6 flex items-center gap-6 group relative overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--site-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-3xl font-display font-black text-[var(--site-primary)] opacity-20 group-hover:opacity-100 transition-opacity w-12">0{idx + 1}</div>
                <p className="text-lg font-bold text-slate-800 dark:text-[#F8F8FF]">{outcome}</p>
                <div className="ml-auto w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-all">
                  <CheckCircle2 size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container >
    </div >

  );
}
