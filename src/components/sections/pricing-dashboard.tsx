"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";

type Tier = {
  title: string;
  price: string;
  desc: string;
  factors: string[];
  cta: string;
  href: string;
  badge: string;
};

export function PricingDashboard({ tiers, locale }: { tiers: Tier[], locale: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeTier = tiers[activeIdx];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Side: Navigation Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {tiers.map((tier, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={tier.title}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative flex flex-col items-start p-5 rounded-3xl transition-all duration-300 border text-left overflow-hidden group",
                  isActive 
                    ? "bg-white dark:bg-white/10 border-[var(--site-primary)]/40 shadow-lg shadow-[var(--site-primary)]/5" 
                    : "bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-[var(--site-primary)]/20 hover:bg-white/80 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pricing-tab"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--site-primary)]/5 to-transparent pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex w-full justify-between items-center mb-2">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-colors",
                    isActive ? "text-[var(--site-primary)]" : "text-slate-500 dark:text-slate-400"
                  )}>
                    {tier.badge}
                  </span>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-2 w-2 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.6)]"
                    />
                  )}
                </div>
                <h3 className={cn(
                  "relative z-10 text-xl font-display font-black transition-colors leading-tight",
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
                )}>
                  {tier.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Tier Details */}
        <div className="lg:col-span-7">
          <div className="relative h-full min-h-[450px] rounded-3xl border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-white/5 backdrop-blur-xl shadow-xl overflow-hidden p-8 md:p-10 flex flex-col">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--site-primary)]/20 via-[var(--site-primary)] to-transparent" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight mb-2">
                      {activeTier.title}
                    </h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      Starting Investment
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl md:text-5xl font-display font-black text-[var(--site-primary)] leading-none tracking-tighter">
                      {activeTier.price}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 font-medium text-base leading-relaxed mb-8">
                  {activeTier.desc}
                </p>

                <div className="space-y-6 mb-10 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      CORE COMPONENTS
                    </p>
                    <span className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {activeTier.factors.map((factor, i) => (
                      <motion.div 
                        key={factor}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (i * 0.05) }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 size={16} className="text-[var(--site-primary)] shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">
                          {factor}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href={localePath(locale, activeTier.href)}
                    className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 font-bold overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--site-primary)]/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--site-primary)] to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-sm uppercase tracking-widest">
                      {activeTier.cta}
                    </span>
                    <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
