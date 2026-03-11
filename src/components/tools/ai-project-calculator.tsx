"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Download, Zap, Code, Server } from "lucide-react";
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

    console.log("PDF Download requested", { inputs, hours, weeks, estimatedCost });
    alert("PDF generation functionality is being developed. Your estimate: " + hours + " hours, " + weeks + " weeks, $" + estimatedCost.toLocaleString());
  };

  const sliderTrack = "#dbe4f0";
  const sliderTrackDark = "#1B2C3D";

  return (
    <div className="relative h-full rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-[0_24px_54px_-32px_rgba(0,0,0,0.14)] dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(27,40,57,0.98),rgba(12,20,33,0.99))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(255,255,255,0.18),0_34px_64px_-30px_rgba(0,0,0,0.82),0_24px_48px_-22px_rgba(17,75,151,0.26)] md:p-7">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:rgba(var(--site-primary-rgb),0.35)] bg-[rgba(var(--site-primary-rgb),0.08)] dark:border-[#4A86C8] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_24px_-18px_rgba(17,75,151,0.24)]">
          <Calculator size={20} className="text-[var(--site-primary)] dark:text-[#6EA3E6]" />
        </div>
        <div>
          <h3 className="text-xl font-display font-black tracking-tight text-slate-950 dark:text-[#F8F8FF]">AI Project Calculator</h3>
          <p className="text-sm font-body font-medium text-slate-600 dark:text-[#94A3B8]">Get an instant scope estimate</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-body font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8F8FF]">Platform</label>
          <div className="grid grid-cols-3 gap-3">
            {(["Web", "Mobile", "Both"] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setInputs({ ...inputs, platform })}
                className={cn(
                  "px-4 py-2.5 rounded-xl font-bold text-sm transition-all border-2",
                  inputs.platform === platform
                    ? "border-[#3A6FB8] bg-[#114B97] text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.24)] dark:shadow-[0_10px_24px_-12px_rgba(17,75,151,0.55)]"
                    : "border-slate-300 bg-white text-slate-700 hover:border-[color:rgba(var(--site-primary-rgb),0.45)] dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:text-[#D5DEEB] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:border-[#4A86C8]"
                )}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-body font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8F8FF]">Number of Pages/Views</label>
            <span className="text-xl font-black text-[var(--site-primary)] dark:text-[#6EA3E6]">{inputs.pages}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={inputs.pages}
            onChange={(e) => setInputs({ ...inputs, pages: parseInt(e.target.value) })}
            className="w-full h-2 appearance-none rounded-full bg-[#10202C] cursor-pointer slider"
            style={{ background: `linear-gradient(to right, #114B97 0%, #114B97 ${inputs.pages}%, ${typeof document === "undefined" ? sliderTrackDark : sliderTrack} ${inputs.pages}%, ${typeof document === "undefined" ? sliderTrackDark : sliderTrack} 100%)` }}
          />
          <div className="flex justify-between text-xs font-body text-slate-500 dark:text-[#94A3B8]"><span>1</span><span>50</span><span>100</span></div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-body font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8F8FF]">Complexity</label>
            <span className="text-sm font-black text-[var(--site-primary)] dark:text-[#6EA3E6]">{complexityLabels[inputs.complexity]}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.3"
            value={inputs.complexity}
            onChange={(e) => setInputs({ ...inputs, complexity: parseFloat(e.target.value) })}
            className="w-full h-2 appearance-none rounded-full bg-[#10202C] cursor-pointer slider"
            style={{ background: `linear-gradient(to right, #114B97 0%, #114B97 ${((inputs.complexity - 1) / 1.5) * 100}%, ${typeof document === "undefined" ? sliderTrackDark : sliderTrack} ${((inputs.complexity - 1) / 1.5) * 100}%, ${typeof document === "undefined" ? sliderTrackDark : sliderTrack} 100%)` }}
          />
          <div className="flex justify-between text-xs font-body text-slate-500 dark:text-[#94A3B8]"><span>Simple</span><span>Standard</span><span>Enterprise</span></div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-body font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8F8FF]">API Integrations</label>
            <span className="text-xl font-black text-[var(--site-primary)] dark:text-[#6EA3E6]">{inputs.apiIntegrations}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={inputs.apiIntegrations}
            onChange={(e) => setInputs({ ...inputs, apiIntegrations: parseInt(e.target.value) })}
            className="w-full h-2 appearance-none rounded-full bg-[#10202C] cursor-pointer slider"
            style={{ background: `linear-gradient(to right, #114B97 0%, #114B97 ${(inputs.apiIntegrations / 20) * 100}%, ${typeof document === "undefined" ? sliderTrackDark : sliderTrack} ${(inputs.apiIntegrations / 20) * 100}%, ${typeof document === "undefined" ? sliderTrackDark : sliderTrack} 100%)` }}
          />
          <div className="flex justify-between text-xs font-body text-slate-500 dark:text-[#94A3B8]"><span>0</span><span>10</span><span>20</span></div>
        </div>

        <button
          onClick={() => {
            const isUpdate = showResults;
            setShowResults(!showResults);
            if (!isUpdate) {
              trackCalculatorComplete({ estimatedHours: hours, platform: inputs.platform, complexity: inputs.complexity });
            }
          }}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#3A6FB8] bg-[#114B97] py-3 text-sm font-display font-black uppercase tracking-wider text-white transition-all shadow-[0_12px_30px_-10px_rgba(0,0,0,0.26)] hover:scale-[1.02] hover:bg-[#0E4287] hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.32)] active:scale-95 dark:shadow-[0_12px_30px_-10px_rgba(17,75,151,0.6)] dark:hover:shadow-[0_16px_36px_-10px_rgba(17,75,151,0.72)]"
        >
          <Zap size={18} />
          {showResults ? "Update Estimate" : "Calculate Project Scope"}
        </button>
      </div>

      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6 border-t border-[#123040] pt-8">
          <div className="rounded-2xl border border-slate-200 bg-white/96 p-6 shadow-[0_18px_36px_-24px_rgba(0,0,0,0.12)] dark:border-[#3A6FB833] dark:bg-[linear-gradient(180deg,rgba(22,36,52,0.98),rgba(12,20,32,0.99))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_40px_-30px_rgba(17,75,151,0.18)]">
            <div className="text-center mb-6">
              <p className="text-sm font-body font-bold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8] mb-2">Estimated Build Time</p>
              <div className="flex items-baseline justify-center gap-2"><span className="text-5xl font-black text-[var(--site-primary)] dark:text-[#6EA3E6]">{hours}</span><span className="text-2xl font-display font-bold text-slate-950 dark:text-[#F8F8FF]">hours</span></div>
              <p className="text-lg font-display font-bold text-slate-500 dark:text-[#94A3B8] mt-2">~ {weeks} weeks at 40h/week</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"><Code size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[#6EA3E6]" /><p className="mb-1 text-xs font-body font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">Pages</p><p className="text-lg font-black text-slate-950 dark:text-[#F8F8FF]">{inputs.pages * 12}h</p></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"><Zap size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[#6EA3E6]" /><p className="mb-1 text-xs font-body font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">Complexity</p><p className="text-lg font-black text-slate-950 dark:text-[#F8F8FF]">{Math.round(inputs.complexity * 40)}h</p></div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"><Server size={20} className="mx-auto mb-2 text-[var(--site-primary)] dark:text-[#6EA3E6]" /><p className="mb-1 text-xs font-body font-bold uppercase tracking-wider text-slate-500 dark:text-[#BFD1EA]">APIs</p><p className="text-lg font-black text-slate-950 dark:text-[#F8F8FF]">{inputs.apiIntegrations * 15}h</p></div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 py-4 text-center dark:border-[#123040] dark:bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <p className="text-xs font-body font-bold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8] mb-1">Estimated Investment</p>
              <p className="text-3xl font-black text-slate-950 dark:text-[#F8F8FF]">${estimatedCost.toLocaleString()}</p>
              <p className="text-xs font-body text-slate-500 dark:text-[#94A3B8] mt-1">Based on $75/hour average rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button onClick={handleDownloadPDF} className="flex w-full items-center justify-center gap-3 rounded-full border border-[#123040] bg-[linear-gradient(180deg,rgba(20,33,48,0.98),rgba(11,19,31,0.98))] py-4 text-sm font-display font-black uppercase tracking-wider text-[#F8F8FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-[#4A86C8] hover:bg-[linear-gradient(180deg,rgba(24,38,54,0.98),rgba(12,21,34,0.98))]">
              <Download size={18} /> Download Tech Breakdown
            </button>

            <Link href={localePath(locale, "/quote")} className="flex w-full items-center justify-center gap-3 rounded-full border border-[#3A6FB8] bg-[#114B97] py-4 text-sm font-display font-black uppercase tracking-wider text-white transition-all shadow-[0_12px_30px_-10px_rgba(0,0,0,0.26)] hover:scale-[1.02] hover:bg-[#0E4287] hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.32)] active:scale-95 dark:shadow-[0_12px_30px_-10px_rgba(17,75,151,0.6)] dark:hover:shadow-[0_16px_36px_-10px_rgba(17,75,151,0.72)]">
              <Zap size={18} /> Request Industrial Quote
            </Link>
          </div>

          <p className="text-xs text-center font-body text-slate-500 dark:text-[#94A3B8]">This is an AI-generated estimate. Actual scope may vary based on specific requirements.</p>
        </motion.div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #114b97;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #114b97;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }
        :global(.dark) .slider::-webkit-slider-thumb {
          box-shadow: 0 2px 8px rgba(17, 75, 151, 0.6);
        }
        :global(.dark) .slider::-moz-range-thumb {
          box-shadow: 0 2px 8px rgba(17, 75, 151, 0.6);
        }
      `}</style>
    </div>
  );
}

