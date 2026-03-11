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
    <div className="bg-[#0A0A0F] min-h-screen pt-32 pb-24">
      <Container>
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] text-xs font-family font-bold uppercase tracking-widest"
          >
            <IconComponent size={14} />
            Specialized Laboratory
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]"
          >
            {displayTitle} <br />
            <span className="text-raly-primary">{displaySubtitle}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl"
          >
            {displayDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <button className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)]">
              <span>{ctaText}</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {displayFeatures.map((feature: string, idx: number) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              className="site-card p-6 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-raly-accent/20 flex items-center justify-center text-raly-primary mb-6 shadow-sm">
                <CheckCircle2 size={24} />
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-lg">{feature}</p>
            </motion.div>
          ))}
        </div>

        {/* Answer Engine Optimization (AEO) Layer */}
        <AIExecutiveSummary
          title={`${displayTitle} Engineering Summary`}
          summary={`Our ${displayTitle} solutions are architected to deliver maximum business value through ${displayFeatures.slice(0, 2).join(' and ')}. By prioritizing Core Web Vitals and semantic data extraction, we ensure that your ${displaySubtitle} remains visible and authoritative for both human users and AI agents.`}
          techStack={subService?.techStack || []}
        />

        {/* Authority Pipeline: Links to Cluster & Proof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <Link
            href="/services"
            className="site-card p-10 group transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <FlaskConical className="text-[#6366F1]" size={32} />
              <ArrowRight className="text-slate-400 dark:text-gray-300 group-hover:text-[#6366F1] transition-all group-hover:translate-x-2" size={24} />
            </div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Technical Laboratory</h4>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">Explore the full engineering cluster and micro-service definitions.</p>
          </Link>

          <Link
            href="/tech"
            className="site-card p-10 group transition-all border-[#6366F1]/20 bg-[#6366F1]/5"
          >
            <div className="flex justify-between items-start mb-6">
              <ExternalLink className="text-[#6366F1]" size={32} />
              <ArrowRight className="text-slate-400 dark:text-white/20 group-hover:text-[#6366F1] transition-all group-hover:translate-x-2" size={24} />
            </div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3">View Evidence</h4>
            <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed">Inspect live proof-of-work and industrial outcomes in our global library.</p>
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="py-24 border-y border-gray-100 dark:border-midnight-800 mb-24">
          <div className="text-center mb-16">
            <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">Precision Engineering Stack</h3>
            <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
              {displayTechStack.map((tech: any) => (
                <div key={tech.name} className="flex flex-col items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group">
                  <tech.icon className={cn("text-5xl", tech.color)} />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Industrial <span className="text-raly-primary">Outcomes</span></h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">Our engineering lab is optimized for these specific KPIs, ensuring your investment translates directly into business value.</p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {displayOutcomes.map((outcome: string, idx: number) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 p-6 bg-raly-subtle dark:bg-midnight-900 rounded-2xl border-l-4 border-raly-primary"
              >
                <div className="text-3xl font-black text-raly-primary/30">0{idx + 1}</div>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container >
    </div >
  );
}
