"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Download, ArrowRight, Code, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolTracking, useFormTracking } from "@/lib/tracking-hooks";
import { useParams } from "next/navigation";
import Link from "next/link";
import { localePath } from "@/lib/locale-path";

interface CalculatorInputs {
  platform: "Web" | "Mobile" | "Both";
  pages: number;
  complexity: number;
  apiIntegrations: number;
}

export function AIProjectCalculator() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  const [inputs, setInputs] = useState<CalculatorInputs>({
    platform: "Web",
    pages: 10,
    complexity: 1.5,
    apiIntegrations: 3,
  });

  const [showResults, setShowResults] = useState(false);
  const { trackCalculatorStart, trackCalculatorComplete } = useToolTracking();
  const { trackPdfDownload } = useFormTracking();

  useEffect(() => {
    trackCalculatorStart();
  }, [trackCalculatorStart]);

  const calculateHours = () => {
    const baseHours = (inputs.pages * 12) + (inputs.complexity * 40) + (inputs.apiIntegrations * 15);
    const platformMultiplier = inputs.platform === "Both" ? 1.6 : inputs.platform === "Mobile" ? 1.2 : 1.0;
    return Math.round(baseHours * platformMultiplier);
  };

  const hours = calculateHours();
  const weeks = Math.ceil(hours / 40);
  const estimatedCost = hours * 75;

  const complexityLabels: Record<number, string> = {
    1.0: "Simple Static",
    1.3: "Basic Dynamic",
    1.5: "Standard App",
    1.8: "Complex Features",
    2.0: "Advanced System",
    2.3: "Enterprise Features",
    2.5: "Enterprise Complex",
  };

  const handleDownloadPDF = async () => {
    trackPdfDownload({
      documentName: "AI_Project_Scope_Estimate",
      documentType: "tech_breakdown"
    });

    alert("PDF generation functionality is being developed. Your estimate: " + hours + " hours, " + weeks + " weeks, $" + estimatedCost.toLocaleString());
  };

  const sliderTrack = "#dbe4f0";
  const sliderTrackDark = "#1B2C3D";

  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-500 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] md:p-10 lg:p-12">
      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#818CF8] to-[#60A5FA] opacity-90" />
      
      {/* Background Decorative Blur */}
      <div className="hidden dark:block absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--site-primary)]/5 blur-[80px] pointer-events-none" />

      <div className="flex items-center gap-4 mb-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--site-primary)]/20 bg-[var(--site-primary)]/5 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.3)]">
          <Calculator size={24} className="text-[var(--site-primary)]" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-black tracking-tight text-foreground leading-tight">AI Project Calculator</h3>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-1">Get an instant scope estimate</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Platform Choice</label>
          <div className="grid grid-cols-3 gap-3">
            {(["Web", "Mobile", "Both"] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setInputs({ ...inputs, platform })}
                className={cn(
                  "px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border",
                  inputs.platform === platform
                    ? "border-[var(--site-primary)] bg-[var(--site-primary)] text-white dark:shadow-[0_8px_16px_-6px_rgba(var(--site-primary-rgb),0.4)] shadow-none"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20 dark:hover:bg-white/10"
                )}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Total Views / Screens</label>
            <span className="text-2xl font-display font-black text-foreground leading-none">{inputs.pages}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={inputs.pages}
            onChange={(e) => setInputs({ ...inputs, pages: parseInt(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full bg-slate-200 dark:bg-white/10 cursor-pointer slider"
            style={{ 
              background: `linear-gradient(to right, var(--site-primary) 0%, var(--site-primary) ${inputs.pages}%, transparent ${inputs.pages}%, transparent 100%)` 
            }}
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest"><span>01</span><span>50</span><span>100</span></div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Project Complexity</label>
            <span className="text-xs font-black uppercase tracking-widest text-[var(--site-primary)]">{complexityLabels[inputs.complexity]}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.3"
            value={inputs.complexity}
            onChange={(e) => setInputs({ ...inputs, complexity: parseFloat(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full bg-slate-200 dark:bg-white/10 cursor-pointer slider"
            style={{ 
              background: `linear-gradient(to right, var(--site-primary) 0%, var(--site-primary) ${((inputs.complexity - 1) / 1.5) * 100}%, transparent ${((inputs.complexity - 1) / 1.5) * 100}%, transparent 100%)` 
            }}
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest"><span>SIMPLE</span><span>STANDARD</span><span>ENTERPRISE</span></div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">AI / API Modules</label>
            <span className="text-2xl font-display font-black text-foreground leading-none">{inputs.apiIntegrations}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={inputs.apiIntegrations}
            onChange={(e) => setInputs({ ...inputs, apiIntegrations: parseInt(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full bg-slate-200 dark:bg-white/10 cursor-pointer slider"
            style={{ 
              background: `linear-gradient(to right, var(--site-primary) 0%, var(--site-primary) ${(inputs.apiIntegrations / 20) * 100}%, transparent ${(inputs.apiIntegrations / 20) * 100}%, transparent 100%)` 
            }}
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest"><span>0</span><span>10</span><span>20</span></div>
        </div>

        <button
          onClick={() => {
            const isUpdate = showResults;
            setShowResults(!showResults);
            if (!isUpdate) {
              trackCalculatorComplete({ estimatedHours: hours, platform: inputs.platform, complexity: inputs.complexity });
            }
          }}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-950 px-8 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-slate-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--site-primary)] transition-transform scale-x-0 group-hover:scale-x-100" />
          {showResults ? "Refine Parameters" : "Calculate Scope"}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6 border-t border-slate-700 pt-8">
          <div className="rounded-2xl border border-slate-200 bg-white/96 p-6 dark:shadow-[0_18px_36px_-24px_rgba(0,0,0,0.12)] dark:border-[#3A6FB833] dark:bg-[linear-gradient(180deg,rgba(22,36,52,0.98),rgba(12,20,32,0.99))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_40px_-30px_rgba(17,75,151,0.18)]">
            <div className="text-center mb-6">
              <p className="text-sm font-body font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Estimated Build Time</p>
              <div className="flex items-baseline justify-center gap-2"><span className="text-5xl font-black text-[var(--site-primary)] dark:text-[#6EA3E6]">{hours}</span><span className="text-2xl font-display font-bold text-foreground">hours</span></div>
              <p className="text-lg font-display font-bold text-slate-500 dark:text-slate-400 mt-2">~ {weeks} weeks at 40h/week</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"><Code size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[#6EA3E6]" /><p className="mb-1 text-xs font-body font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">Pages</p><p className="text-lg font-black text-foreground">{inputs.pages * 12}h</p></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"><ArrowRight size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[#6EA3E6]" /><p className="mb-1 text-xs font-body font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">Complexity</p><p className="text-lg font-black text-foreground">{Math.round(inputs.complexity * 40)}h</p></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"><Server size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[#6EA3E6]" /><p className="mb-1 text-xs font-body font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">APIs</p><p className="text-lg font-black text-foreground">{inputs.apiIntegrations * 15}h</p></div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 py-4 text-center dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <p className="text-xs font-body font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Estimated Investment</p>
              <p className="text-3xl font-black text-foreground">${estimatedCost.toLocaleString()}</p>
              <p className="text-xs font-body text-slate-500 dark:text-slate-400 mt-1">Based on $75/hour average rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button onClick={handleDownloadPDF} className="flex w-full items-center justify-center gap-3 rounded-full border border-[#123040] bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] py-4 text-sm font-display font-black uppercase tracking-wider text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-[#4A86C8] hover:bg-[linear-gradient(180deg,rgba(24,38,54,0.98),rgba(12,21,34,0.98))]">
              <Download size={18} /> Download Tech Breakdown
            </button>

            <Link href={localePath(locale, "/quote")} className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--site-primary)] bg-[var(--site-primary)] py-4 text-sm font-display font-black uppercase tracking-wider text-white transition-all dark:shadow-sm hover:bg-[var(--site-primary-hover)] active:scale-95">
              Request Industrial Quote
              <ArrowRight size={18} />
            </Link>
          </div>

          <p className="text-xs text-center font-body text-slate-500 dark:text-slate-400">This is an AI-generated estimate. Actual scope may vary based on specific requirements.</p>
        </motion.div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--site-primary);
          cursor: pointer;
          box-shadow: none;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--site-primary);
          cursor: pointer;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}


