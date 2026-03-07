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
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolTracking, useFormTracking } from "@/lib/tracking-hooks";
import { useParams } from "next/navigation";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4;

interface ConfigValues {
  tier: "MVP" | "Standard" | "Enterprise";
  stack: string[];
  security: string[];
  maintenance: "Bronze" | "Silver" | "Gold";
}

export function ServiceConfigurator() {
  const params = useParams();
  const locale = params?.locale || "en";
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
            <div className="flex items-center gap-3 mb-6"><Layers className="text-primary" /><h4 className="text-lg font-bold text-foreground">Project Tier</h4></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["MVP", "Standard", "Enterprise"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setConfig({ ...config, tier })}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all",
                    config.tier === tier ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-border hover:border-primary/30"
                  )}
                >
                  <p className="font-black text-xl mb-2 text-foreground">{tier}</p>
                  <p className="text-xs text-muted-foreground">
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
            <div className="flex items-center gap-3 mb-6"><Settings className="text-primary" /><h4 className="text-lg font-bold text-foreground">Tech Stack</h4></div>
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
                    config.stack.includes(tech) ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
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
            <div className="flex items-center gap-3 mb-6"><Shield className="text-primary" /><h4 className="text-lg font-bold text-foreground">Security & Compliance</h4></div>
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
                    config.security.includes(sec) ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"
                  )}
                >
                  <div className={cn("w-5 h-5 rounded border flex items-center justify-center", config.security.includes(sec) ? "bg-primary border-primary text-primary-foreground" : "border-border")}>
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
            <div className="flex items-center gap-3 mb-6"><FileText className="text-primary" /><h4 className="text-lg font-bold text-foreground">Review Your Scope</h4></div>
            <div className="bg-secondary/40 p-6 rounded-2xl border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Project Architecture</p>
                  <p className="text-xl font-black text-foreground mb-4">{config.tier} Infrastructure</p>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Technical Core</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {config.stack.map((s) => (
                      <span key={s} className="px-2 py-1 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Security Standard</p>
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
                className="w-full py-4 bg-secondary text-foreground font-black text-sm uppercase tracking-wider rounded-xl transition-all border border-border hover:bg-card flex items-center justify-center gap-3"
              >
                <FileText size={18} />
                Download Scope PDF
              </button>

              <Link href={`/${locale}/quote`} className="w-full py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3">
                <Mail size={18} />
                Initiate Industrial Quote
              </Link>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-all duration-500", s <= step ? "bg-primary" : "bg-secondary")} />
        ))}
      </div>

      <div className="min-h-[400px]"><AnimatePresence mode="wait">{renderStep()}</AnimatePresence></div>

      <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={cn("flex items-center gap-2 text-sm font-bold transition-all", step === 1 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:text-foreground")}
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {step < 4 && (
          <button onClick={nextStep} className="px-8 py-3 bg-primary text-primary-foreground font-extrabold text-sm rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 uppercase tracking-widest">
            Inhale Strategy
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
