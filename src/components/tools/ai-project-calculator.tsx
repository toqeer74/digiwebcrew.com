"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Download, Zap, Code, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolTracking, useFormTracking } from "@/lib/tracking-hooks";
import { useParams } from "next/navigation";
import Link from "next/link";

interface CalculatorInputs {
  platform: "Web" | "Mobile" | "Both";
  pages: number;
  complexity: number;
  apiIntegrations: number;
}

export function AIProjectCalculator() {
  const params = useParams();
  const locale = params?.locale || "en";
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

  return (
    <div className="relative bg-card rounded-3xl p-8 md:p-10 border border-border shadow-lg">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Calculator size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-foreground tracking-tight">AI Project Calculator</h3>
          <p className="text-sm text-muted-foreground font-medium">Get an instant scope estimate</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider">Platform</label>
          <div className="grid grid-cols-3 gap-3">
            {(["Web", "Mobile", "Both"] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setInputs({ ...inputs, platform })}
                className={cn(
                  "px-4 py-3 rounded-xl font-bold text-sm transition-all border-2",
                  inputs.platform === platform
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">Number of Pages/Views</label>
            <span className="text-2xl font-black text-primary">{inputs.pages}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={inputs.pages}
            onChange={(e) => setInputs({ ...inputs, pages: parseInt(e.target.value) })}
            className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer slider"
            style={{ background: `linear-gradient(to right, #024d94 0%, #024d94 ${inputs.pages}%, #E5E7EB ${inputs.pages}%, #E5E7EB 100%)` }}
          />
          <div className="flex justify-between text-xs text-muted-foreground"><span>1</span><span>50</span><span>100</span></div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">Complexity</label>
            <span className="text-sm font-black text-primary">{complexityLabels[inputs.complexity]}</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="2.5"
            step="0.3"
            value={inputs.complexity}
            onChange={(e) => setInputs({ ...inputs, complexity: parseFloat(e.target.value) })}
            className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer slider"
            style={{ background: `linear-gradient(to right, #024d94 0%, #024d94 ${((inputs.complexity - 1) / 1.5) * 100}%, #E5E7EB ${((inputs.complexity - 1) / 1.5) * 100}%, #E5E7EB 100%)` }}
          />
          <div className="flex justify-between text-xs text-muted-foreground"><span>Simple</span><span>Standard</span><span>Enterprise</span></div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-foreground uppercase tracking-wider">API Integrations</label>
            <span className="text-2xl font-black text-primary">{inputs.apiIntegrations}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={inputs.apiIntegrations}
            onChange={(e) => setInputs({ ...inputs, apiIntegrations: parseInt(e.target.value) })}
            className="w-full h-3 bg-secondary rounded-full appearance-none cursor-pointer slider"
            style={{ background: `linear-gradient(to right, #024d94 0%, #024d94 ${(inputs.apiIntegrations / 20) * 100}%, #E5E7EB ${(inputs.apiIntegrations / 20) * 100}%, #E5E7EB 100%)` }}
          />
          <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>10</span><span>20</span></div>
        </div>

        <button
          onClick={() => {
            const isUpdate = showResults;
            setShowResults(!showResults);
            if (!isUpdate) {
              trackCalculatorComplete({ estimatedHours: hours, platform: inputs.platform, complexity: inputs.complexity });
            }
          }}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
        >
          <Zap size={18} />
          {showResults ? "Update Estimate" : "Calculate Project Scope"}
        </button>
      </div>

      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-8 border-t border-border space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
            <div className="text-center mb-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Estimated Build Time</p>
              <div className="flex items-baseline justify-center gap-2"><span className="text-5xl font-black text-primary">{hours}</span><span className="text-2xl font-bold text-foreground">hours</span></div>
              <p className="text-lg font-bold text-muted-foreground mt-2">~ {weeks} weeks at 40h/week</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-card/70 rounded-xl"><Code size={20} className="text-primary mx-auto mb-2" /><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Pages</p><p className="text-lg font-black text-foreground">{inputs.pages * 12}h</p></div>
              <div className="text-center p-3 bg-card/70 rounded-xl"><Zap size={20} className="text-primary mx-auto mb-2" /><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Complexity</p><p className="text-lg font-black text-foreground">{Math.round(inputs.complexity * 40)}h</p></div>
              <div className="text-center p-3 bg-card/70 rounded-xl"><Server size={20} className="text-primary mx-auto mb-2" /><p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">APIs</p><p className="text-lg font-black text-foreground">{inputs.apiIntegrations * 15}h</p></div>
            </div>

            <div className="text-center py-4 bg-card rounded-xl border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Estimated Investment</p>
              <p className="text-3xl font-black text-foreground">${estimatedCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">Based on $75/hour average rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button onClick={handleDownloadPDF} className="w-full py-4 bg-secondary border border-border text-foreground font-black text-sm uppercase tracking-wider rounded-xl transition-all hover:bg-card flex items-center justify-center gap-3">
              <Download size={18} /> Download Tech Breakdown
            </button>

            <Link href={`/${locale}/quote`} className="w-full py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              <Zap size={18} /> Request Industrial Quote
            </Link>
          </div>

          <p className="text-xs text-center text-muted-foreground">This is an AI-generated estimate. Actual scope may vary based on specific requirements.</p>
        </motion.div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #024d94;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(2, 77, 148, 0.35);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #024d94;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(2, 77, 148, 0.35);
        }
      `}</style>
    </div>
  );
}
