"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GlobalDecorativeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden dark:block hidden">
      {/* Premium Navy Base (Fallback/Layer) */}
      <div className="absolute inset-0 bg-[#1a1f38]" />

      {/* Large Decorative Curves - Top Right */}
      <div className="absolute right-[-10%] top-[-10%] h-[1200px] w-[1200px] opacity-[0.05]">
        <svg className="h-full w-full" viewBox="0 0 1000 1000" fill="none">
          <circle cx="500" cy="500" r="480" stroke="white" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_240s_linear_infinite]" />
          <circle cx="500" cy="500" r="400" stroke="white" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_200s_linear_infinite_reverse]" />
          <circle cx="500" cy="500" r="320" stroke="white" strokeWidth="0.5" strokeDasharray="12 16" className="animate-[spin_160s_linear_infinite]" />
        </svg>
      </div>

      {/* Large Decorative Curves - Bottom Left */}
      <div className="absolute left-[-20%] bottom-[-20%] h-[1000px] w-[1000px] opacity-[0.03]">
        <svg className="h-full w-full" viewBox="0 0 1000 1000" fill="none">
          <circle cx="500" cy="500" r="480" stroke="white" strokeWidth="0.5" strokeDasharray="10 15" className="animate-[spin_180s_linear_infinite]" />
          <circle cx="500" cy="500" r="380" stroke="white" strokeWidth="0.5" strokeDasharray="10 15" className="animate-[spin_140s_linear_infinite_reverse]" />
        </svg>
      </div>

      {/* Global Glow Accents */}
      <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute right-[15%] bottom-[30%] h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[140px]" />
      <div className="absolute left-[40%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
    </div>
  );
}

