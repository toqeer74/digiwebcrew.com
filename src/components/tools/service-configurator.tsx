"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Settings,
  Layers,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Mail,
  FileText,
  ArrowRight
} from "lucide-react";
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
            <div className="mb-6 flex items-center gap-3"><Layers className="text-[var(--site-primary)] dark:text-[#6EA3E6]" /><h4 className="text-lg font-bold text-slate-950 dark:text-[#F8F8FF]">Project Tier</h4></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["MVP", "Standard", "Enterprise"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setConfig({ ...config, tier })}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all",
                    config.tier === tier ? "border-[#3A6FB8] bg-white ring-4 ring-[#114B97]/15 text-slate-950 shadow-[0_12px_24px_-18px_rgba(0,0,0,0.18)] dark:bg-[linear-gradient(180deg,rgba(23,37,53,0.98),rgba(11,19,31,0.99))] dark:text-inherit dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "border-slate-300 bg-slate-50 hover:border-[color:rgba(var(--site-primary-rgb),0.4)] dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-500 dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  )}
                >
                  <p className="mb-2 text-xl font-black text-slate-950 dark:text-[#F8F8FF]">{tier}</p>
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8]">
                    {tier === "MVP" && "Rapid launch focus"}
                    {tier === "Standard" && "Scale & performance"}
                    {tier === "Enterprise" && "Complex infrastructure"}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3"><Settings className="text-[var(--site-primary)] dark:text-[#6EA3E6]" /><h4 className="text-lg font-bold text-slate-950 dark:text-[#F8F8FF]">Tech Stack</h4></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Next.js", "Django", "Tailwind CSS", "PostgreSQL", "AWS", "Python", "React Native", "Docker"].map((tech) => (
                <button
                  key={tech}
                  onClick={() => {
                    const newStack = config.stack.includes(tech) ? config.stack.filter((s) => s !== tech) : [...config.stack, tech];
                    setConfig({ ...config, stack: newStack });
                  }}
                  className={cn(
                    "p-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-between",
                    config.stack.includes(tech) ? "border-[#3A6FB8] bg-[#114B97] text-white" : "border-slate-300 bg-white text-slate-700 hover:border-[color:rgba(var(--site-primary-rgb),0.4)] dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-500"
                  )}
                >
                  {tech}
                  {config.stack.includes(tech) && <CheckCircle2 size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3"><Shield className="text-[var(--site-primary)] dark:text-[#6EA3E6]" /><h4 className="text-lg font-bold text-slate-950 dark:text-[#F8F8FF]">Security & Compliance</h4></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["SSL Encryption", "JWT Auth", "Two-Factor Auth", "SOC2 Compliance", "HIPAA Ready", "GDPR Guard"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    const newSec = config.security.includes(sec) ? config.security.filter((s) => s !== sec) : [...config.security, sec];
                    setConfig({ ...config, security: newSec });
                  }}
                  className={cn(
                    "p-4 rounded-xl border text-sm font-bold transition-all flex items-center gap-3",
                    config.security.includes(sec) ? "border-[#3A6FB8] bg-white text-[var(--site-primary)] dark:bg-[linear-gradient(180deg,rgba(23,37,53,0.98),rgba(11,19,31,0.99))] dark:text-[#6EA3E6]" : "border-slate-300 bg-white text-slate-700 hover:border-[color:rgba(var(--site-primary-rgb),0.4)] dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:text-[#D5DEEB] dark:hover:border-[#4A86C8]"
                  )}
                >
                  <div className={cn("flex h-5 w-5 items-center justify-center rounded border", config.security.includes(sec) ? "border-[#3A6FB8] bg-[#114B97] text-white" : "border-slate-300 bg-slate-100 dark:border-[#123040] dark:bg-[#10202C]")}>
                    {config.security.includes(sec) && <CheckCircle2 size={12} />}
                  </div>
                  {sec}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="mb-6 flex items-center gap-3"><FileText className="text-[var(--site-primary)] dark:text-[#6EA3E6]" /><h4 className="text-lg font-bold text-slate-950 dark:text-[#F8F8FF]">Review Your Scope</h4></div>
            <div className="rounded-2xl border border-slate-200 bg-white/96 p-6 shadow-[0_18px_36px_-24px_rgba(0,0,0,0.12)] dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(22,36,52,0.98),rgba(12,20,32,0.99))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_40px_-30px_rgba(17,75,151,0.18)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-[#94A3B8] mb-2">Project Architecture</p>
                  <p className="text-xl font-black text-slate-950 dark:text-[#F8F8FF] mb-4">{config.tier} Infrastructure</p>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-[#94A3B8] mb-2">Technical Core</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {config.stack.map((s) => (
                      <span key={s} className="rounded px-2 py-1 text-[10px] font-bold uppercase bg-[rgba(var(--site-primary-rgb),0.1)] text-[var(--site-primary)] dark:bg-[#114B97]/12 dark:text-[#6EA3E6]">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-[#94A3B8] mb-2">Security Standard</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {config.security.map((s) => (
                      <span key={s} className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-[10px] font-bold uppercase">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-4">
            <button
                onClick={() => {
                  trackPdfDownload({ documentName: "Custom_Service_Config", documentType: "scope_pdf" });
                  trackConfiguratorComplete({ tier: config.tier, stack: config.stack, maintenance: config.maintenance });
                }}
                className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white py-4 text-sm font-black uppercase tracking-wider text-slate-950 transition-all hover:border-[color:rgba(var(--site-primary-rgb),0.4)] hover:bg-slate-50 dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:text-[#F8F8FF] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-[#4A86C8] dark:hover:bg-[linear-gradient(180deg,rgba(24,38,54,0.98),rgba(12,21,34,0.98))]"
              >
                <FileText size={18} />
                Download Scope PDF
              </button>

              <Link href={localePath(locale, "/quote")} className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--site-primary)] bg-[var(--site-primary)] py-4 text-sm font-black uppercase tracking-wider text-white transition-all shadow-sm hover:bg-[var(--site-primary-hover)] active:scale-95">
                Initiate Industrial Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="h-full overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-[0_24px_54px_-32px_rgba(0,0,0,0.14)] dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.18),0_34px_64px_-30px_rgba(0,0,0,0.82),0_24px_48px_-22px_rgba(17,75,151,0.26)] md:p-7 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA] opacity-90" />
      <div className="flex items-center gap-2 mb-7">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", s <= step ? "bg-[#114B97]" : "bg-[#123040]")} />
        ))}
      </div>

      <div className="min-h-[300px]"><AnimatePresence mode="wait">{renderStep()}</AnimatePresence></div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-6">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={cn("flex items-center gap-2 text-sm font-bold transition-all", step === 1 ? "pointer-events-none opacity-0" : "text-slate-500 hover:text-slate-950 dark:text-[#94A3B8] dark:hover:text-[#F8F8FF]")}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {step < 4 && (
          <button onClick={nextStep} className="flex items-center gap-2 rounded-full border border-[var(--site-primary)] bg-[var(--site-primary)] px-8 py-3 text-sm font-extrabold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[var(--site-primary-hover)] active:scale-95">
            Inhale Strategy
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

