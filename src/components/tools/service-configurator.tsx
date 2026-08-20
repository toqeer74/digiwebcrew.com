"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Settings,
  Layers,
  CheckCircle2,
  ChevronLeft,
  FileText,
  ArrowRight
} from "lucide-react";
import { 
  SiNextdotjs, 
  SiDjango, 
  SiTailwindcss, 
  SiPostgresql, 
  SiPython, 
  SiReact, 
  SiDocker 
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useToolTracking, useFormTracking } from "@/lib/tracking-hooks";
import { useParams } from "next/navigation";
import Link from "next/link";
import { localePath } from "@/lib/locale-path";

type Step = 1 | 2 | 3 | 4;

interface ConfigValues {
  tier: "MVP" | "Standard" | "Enterprise";
  stack: string[];
  security: string[];
  maintenance: "Bronze" | "Silver" | "Gold";
}

const TECH_METADATA: Record<string, { icon: any, color: string }> = {
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "Django": { icon: SiDjango, color: "#092E20" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "AWS": { icon: FaAws, color: "#FF9900" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
};

export function ServiceConfigurator() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  const [step, setStep] = useState<Step>(1);
  const [config, setConfig] = useState<ConfigValues>({
    tier: "Standard",
    stack: ["Next.js", "Tailwind CSS"],
    security: ["SSL", "JWT"],
    maintenance: "Silver",
  });

  const { trackConfiguratorStart, trackConfiguratorComplete } = useToolTracking();
  const { trackPdfDownload } = useFormTracking();

  useEffect(() => {
    trackConfiguratorStart();
  }, [trackConfiguratorStart]);

  const nextStep = () => setStep((s) => (s < 4 ? (s + 1) as Step : s));
  const prevStep = () => setStep((s) => (s > 1 ? (s - 1) as Step : s));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <Layers size={20} className="text-slate-700 dark:text-slate-350" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Project Tier</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["MVP", "Standard", "Enterprise"] as const).map((tier) => {
                const isSelected = config.tier === tier;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setConfig({ ...config, tier })}
                    className={cn(
                      "p-6 rounded-2xl border transition-all flex flex-col justify-between h-32 text-left cursor-pointer",
                      isSelected 
                        ? "border-[var(--site-primary)] bg-[var(--site-primary)]/[0.02] shadow-sm dark:border-[var(--site-primary)] dark:bg-[var(--site-primary)]/[0.05]" 
                        : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/5 dark:bg-white/5 dark:hover:border-white/10"
                    )}
                  >
                    <p className={cn("text-base sm:text-lg md:text-xl font-black uppercase tracking-tight transition-colors", isSelected ? "text-slate-950 dark:text-white" : "text-slate-400 dark:text-slate-500")}>
                      {tier}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {tier === "MVP" && "Rapid launch focus"}
                      {tier === "Standard" && "Scale & performance"}
                      {tier === "Enterprise" && "Infrastructure focus"}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <Settings size={20} className="text-slate-700 dark:text-slate-350" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Tech Stack</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(TECH_METADATA).map((tech) => {
                const isSelected = config.stack.includes(tech);
                const metadata = TECH_METADATA[tech];
                const Icon = metadata.icon;
                
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => {
                      const newStack = isSelected ? config.stack.filter((s) => s !== tech) : [...config.stack, tech];
                      setConfig({ ...config, stack: newStack });
                    }}
                    className={cn(
                      "p-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-2 text-center h-28 relative group cursor-pointer",
                      isSelected 
                        ? "border-[var(--site-primary)] bg-[var(--site-primary)]/[0.02] text-slate-950 dark:border-[var(--site-primary)] dark:bg-[var(--site-primary)]/[0.05] dark:text-white" 
                        : "border-slate-200 bg-white text-slate-405 hover:border-slate-300 dark:border-white/5 dark:bg-white/5 dark:text-slate-500 dark:hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "p-2.5 rounded-lg border transition-all duration-300 transform group-hover:scale-110",
                      isSelected 
                        ? "border-slate-300 bg-white dark:border-white/10 dark:bg-slate-900" 
                        : "border-slate-100 bg-slate-50 dark:border-white/5 dark:bg-white/5"
                    )}>
                      <Icon size={24} style={{ color: isSelected ? metadata.color : "inherit" }} />
                    </div>
                    <span>{tech}</span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--site-primary)] text-white shadow-sm">
                        <CheckCircle2 size={10} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <Shield size={20} className="text-slate-700 dark:text-slate-350" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Security & Compliance</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["SSL Encryption", "JWT Auth", "Two-Factor Auth", "SOC2 Compliance", "HIPAA Ready", "GDPR Guard"].map((sec) => {
                const isSelected = config.security.includes(sec);
                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => {
                      const newSec = isSelected ? config.security.filter((s) => s !== sec) : [...config.security, sec];
                      setConfig({ ...config, security: newSec });
                    }}
                    className={cn(
                      "p-4 rounded-xl border transition-all flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.15em] cursor-pointer",
                      isSelected 
                        ? "border-[var(--site-primary)] bg-[var(--site-primary)]/[0.02] text-slate-950 dark:border-[var(--site-primary)] dark:bg-[var(--site-primary)]/[0.05] dark:text-white" 
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-350 dark:border-white/5 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border transition-colors",
                      isSelected 
                        ? "border-[var(--site-primary)] bg-[var(--site-primary)] text-white" 
                        : "border-slate-300 bg-slate-50 dark:border-white/10 dark:bg-white/10"
                    )}>
                      {isSelected && <CheckCircle2 size={12} />}
                    </div>
                    <span>{sec}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <FileText size={20} className="text-slate-700 dark:text-slate-350" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Review Your Scope</h4>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 dark:border-white/10 dark:bg-white/[0.01]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Project Architecture</p>
                  <p className="text-xl font-bold text-slate-950 dark:text-white mb-4">{config.tier} Infrastructure</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Technical Core</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {config.stack.map((s) => {
                       const metadata = TECH_METADATA[s];
                       const Icon = metadata?.icon;
                       return (
                        <div key={s} className="flex items-center gap-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-1.5 shadow-none">
                          {Icon && <Icon size={14} style={{ color: metadata.color }} />}
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{s}</span>
                        </div>
                       );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Security Standard</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {config.security.map((s) => (
                      <span key={s} className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  trackPdfDownload({ documentName: "Custom_Service_Config", documentType: "scope_pdf" });
                  trackConfiguratorComplete({ tier: config.tier, stack: config.stack, maintenance: config.maintenance });
                }}
                className="flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-4 text-xs font-bold uppercase tracking-wider text-slate-800 transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <FileText size={16} />
                Download Scope PDF
              </button>
 
              <Link href={localePath(locale, "/quote")} className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[var(--site-primary)] hover:bg-[var(--site-primary-hover)] py-4 text-xs font-bold uppercase tracking-wider text-white transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]">
                Initiate Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-xl p-6 md:p-8 shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:from-slate-900/40 dark:to-slate-900/80">
      {/* Background Decorative Blur */}
      <div className="hidden dark:block absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[var(--site-primary)]/5 blur-[80px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-200/80 dark:bg-white/5 dark:border-white/10 shadow-sm">
          <Settings size={18} className="text-slate-800 dark:text-white" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-slate-950 dark:text-white leading-tight">Service Configurator</h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 mt-0.5">Configure your industrial scope</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={cn("h-1 flex-1 rounded-full transition-all duration-500", s <= step ? "bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.5)]" : "bg-slate-200 dark:bg-white/10")} />
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center min-h-[250px]"><AnimatePresence mode="wait">{renderStep()}</AnimatePresence></div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-white/10 pt-6">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className={cn("flex items-center gap-2 text-sm font-bold transition-all cursor-pointer", step === 1 ? "pointer-events-none opacity-0" : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-foreground")}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {step < 4 && (
          <button type="button" onClick={nextStep} className="group relative flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-50 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]">
            Next Level
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
}



