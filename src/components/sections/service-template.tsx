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
    <div className="bg-white dark:bg-midnight-950 min-h-screen pt-32 pb-24">
      <Container>
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raly-accent/20 text-raly-primary text-xs font-bold uppercase tracking-widest"
            >
              <IconComponent size={14} />
              Specialized Laboratory
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight"
            >
              {displayTitle} <br />
              <span className="text-raly-primary">{displaySubtitle}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed"
            >
              {displayDescription}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-4 bg-raly-accent text-raly-primary font-extrabold text-sm uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-raly-primary/30 flex items-center gap-3">
                {ctaText}
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {displayFeatures.map((feature: string, idx: number) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="p-6 bg-gray-50 dark:bg-midnight-900 rounded-2xl border border-gray-100 dark:border-midnight-800"
              >
                <div className="w-10 h-10 rounded-lg bg-raly-accent/20 flex items-center justify-center text-raly-primary mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{feature}</p>
              </motion.div>
            ))}
          </div>
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
            className="group p-8 rounded-[2rem] bg-raly-subtle dark:bg-midnight-900 border border-[rgba(229,231,235,0.5)] dark:border-midnight-800 hover:border-raly-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <FlaskConical className="text-raly-primary" size={24} />
              <ArrowRight className="text-gray-300 group-hover:text-raly-primary transition-all group-hover:translate-x-1" size={20} />
            </div>
            <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2">Technical Laboratory</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Explore the full engineering cluster and micro-service definitions.</p>
          </Link>

          <Link
            href="/tech"
            className="group p-8 rounded-[2rem] bg-raly-primary text-white border border-white/10 hover:border-raly-accent/40 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <ExternalLink className="text-raly-accent" size={24} />
              <ArrowRight className="text-white/20 group-hover:text-raly-accent transition-all group-hover:translate-x-1" size={20} />
            </div>
            <h4 className="text-lg font-black mb-2">View Evidence</h4>
            <p className="text-sm text-white/40">Inspect live proof-of-work and industrial outcomes in our global library.</p>
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
