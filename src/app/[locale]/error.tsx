"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/layout-primitives";
import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.08),transparent_70%)]" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_-12px_rgba(239,68,68,0.3)] ring-2 ring-red-500/20">
            <AlertTriangle size={48} />
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-black mb-6 tracking-tight text-slate-950 dark:text-[#F8F8FF]">Critical System Fault</h2>
          <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 leading-relaxed">
            An unexpected error occurred during processing. This lab sequence has been interrupted. The development team has been notified.
          </p>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => reset()}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_20px_40px_-20px_rgba(var(--site-primary-rgb),0.5)]"
            >
              <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              <span>Initialize Reset Sequence</span>
            </button>
            <div className="py-2 px-4 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-[#94A3B8]/50">
                    System Protocol: {error.digest || 'SWL-CRIT-ERR-777'}
                </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
