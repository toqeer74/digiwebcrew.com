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

const complexitySteps = [1.0, 1.3, 1.5, 1.8, 2.0, 2.3, 2.5];

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

  const complexityIndex = complexitySteps.indexOf(inputs.complexity);

  return (
    <div className="relative h-full flex flex-col overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-xl p-5 md:p-6 shadow-sm transition-all duration-500 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:from-slate-900/40 dark:to-slate-900/80">
      {/* Background Decorative Blur */}
      <div className="hidden dark:block absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--site-primary)]/5 blur-[80px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-200/80 dark:bg-white/5 dark:border-white/10 shadow-sm">
          <Calculator size={18} className="text-slate-800 dark:text-white" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-slate-950 dark:text-white leading-tight">AI Project Calculator</h3>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400 mt-0.5">Get an instant scope estimate</p>
        </div>
      </div>

      <div className="space-y-2.5 flex-1 flex flex-col justify-center">
        {/* Platform Choice */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">Platform Choice</label>
          <div className="relative grid grid-cols-3 gap-1 rounded-xl bg-slate-100/80 p-1 dark:bg-white/5 border border-slate-200/40 dark:border-white/5">
            {(["Web", "Mobile", "Both"] as const).map((platform) => {
              const isSelected = inputs.platform === platform;
              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setInputs({ ...inputs, platform })}
                  className={cn(
                    "relative py-2.5 rounded-lg font-extrabold text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer text-center",
                    isSelected
                      ? "bg-white text-slate-950 shadow-[0_2px_8px_rgba(15,23,42,0.08)] dark:bg-white/10 dark:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  )}
                >
                  {platform}
                </button>
              );
            })}
          </div>
        </div>

        {/* Total Views / Screens Slider */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">Total Views / Screens</label>
            <span className="text-2xl font-display font-black text-slate-950 dark:text-white leading-none">{inputs.pages}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={inputs.pages}
            onChange={(e) => setInputs({ ...inputs, pages: parseInt(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer slider [--bg-unfilled:#e2e8f0] dark:[--bg-unfilled:rgba(255,255,255,0.1)]"
            style={{ 
              background: `linear-gradient(to right, var(--site-primary) 0%, var(--site-primary) ${inputs.pages}%, var(--bg-unfilled) ${inputs.pages}%, var(--bg-unfilled) 100%)` 
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest">
            <span className={cn(inputs.pages <= 20 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>01</span>
            <span className={cn(inputs.pages > 40 && inputs.pages < 60 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>50</span>
            <span className={cn(inputs.pages >= 80 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>100</span>
          </div>
        </div>

        {/* Project Complexity Slider */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">Project Complexity</label>
            <span className="text-xs font-black uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">{complexityLabels[inputs.complexity]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            value={complexityIndex}
            onChange={(e) => {
              const idx = parseInt(e.target.value);
              setInputs({ ...inputs, complexity: complexitySteps[idx] });
            }}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer slider [--bg-unfilled:#e2e8f0] dark:[--bg-unfilled:rgba(255,255,255,0.1)]"
            style={{ 
              background: `linear-gradient(to right, var(--site-primary) 0%, var(--site-primary) ${(complexityIndex / 6) * 100}%, var(--bg-unfilled) ${(complexityIndex / 6) * 100}%, var(--bg-unfilled) 100%)` 
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest">
            <span className={cn(inputs.complexity <= 1.3 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>SIMPLE</span>
            <span className={cn(inputs.complexity >= 1.5 && inputs.complexity <= 2.0 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>STANDARD</span>
            <span className={cn(inputs.complexity >= 2.3 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>ENTERPRISE</span>
          </div>
        </div>

        {/* AI / API Modules Slider */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-end">
            <label className="text-xs font-bold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">AI / API Modules</label>
            <span className="text-2xl font-display font-black text-slate-950 dark:text-white leading-none">{inputs.apiIntegrations}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={inputs.apiIntegrations}
            onChange={(e) => setInputs({ ...inputs, apiIntegrations: parseInt(e.target.value) })}
            className="w-full h-1.5 appearance-none rounded-full cursor-pointer slider [--bg-unfilled:#e2e8f0] dark:[--bg-unfilled:rgba(255,255,255,0.1)]"
            style={{ 
              background: `linear-gradient(to right, var(--site-primary) 0%, var(--site-primary) ${(inputs.apiIntegrations / 20) * 100}%, var(--bg-unfilled) ${(inputs.apiIntegrations / 20) * 100}%, var(--bg-unfilled) 100%)` 
            }}
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-widest">
            <span className={cn(inputs.apiIntegrations <= 3 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>0</span>
            <span className={cn(inputs.apiIntegrations > 7 && inputs.apiIntegrations < 13 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>10</span>
            <span className={cn(inputs.apiIntegrations >= 17 && "text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] transition-colors")}>20</span>
          </div>
        </div>

        <button
          onClick={() => {
            const isUpdate = showResults;
            setShowResults(!showResults);
            if (!isUpdate) {
              trackCalculatorComplete({ estimatedHours: hours, platform: inputs.platform, complexity: inputs.complexity });
            }
          }}
          className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 transition-all dark:bg-white dark:text-slate-950 dark:hover:bg-slate-50 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {showResults ? "Refine Parameters" : "Calculate Scope"}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4 border-t border-slate-200 dark:border-white/10 pt-6">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 dark:border-white/10 dark:bg-white/[0.01]">
            <div className="text-center mb-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">Estimated Build Time</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-black text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">{hours}</span>
                <span className="text-2xl font-display font-bold text-slate-950 dark:text-white">hours</span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">~ {weeks} weeks at 40h/week</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-white/8 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Code size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]" />
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">Pages</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{inputs.pages * 12}h</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-white/8 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <ArrowRight size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]" />
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">Complexity</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{Math.round(inputs.complexity * 40)}h</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-white/8 dark:bg-white/5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <Server size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]" />
                <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">APIs</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{inputs.apiIntegrations * 15}h</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white py-4 text-center dark:border-white/8 dark:bg-white/5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Estimated Investment</p>
              <p className="text-3xl font-black text-slate-950 dark:text-white">${estimatedCost.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-bold">Based on $75/hour average rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button onClick={handleDownloadPDF} className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-4 text-xs font-bold uppercase tracking-wider text-slate-800 transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 cursor-pointer shadow-sm active:scale-[0.98]">
              <Download size={16} /> Download Tech Breakdown
            </button>

            <Link href={localePath(locale, "/quote")} className="flex w-full items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--site-primary-hover)] active:scale-95 shadow-sm">
              Request Industrial Quote
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="text-[11px] text-center font-bold text-slate-500 dark:text-slate-400">This is an AI-generated estimate. Actual scope may vary based on specific requirements.</p>
        </motion.div>
      )}

      <style jsx>{`
        .slider {
          outline: none;
        }
        .slider::-webkit-slider-runnable-track {
          border: none;
          background: transparent;
        }
        .slider::-moz-range-track {
          border: none;
          background: transparent;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 4px solid var(--site-primary);
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(15, 23, 42, 0.2);
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
          border: 4px solid var(--site-primary);
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(15, 23, 42, 0.2);
        }
      `}</style>
    </div>
  );
}



