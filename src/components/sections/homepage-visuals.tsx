"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

// --- 3D Stat Cube ---
interface StatCubeProps {
  label: string;
  value: string;
  delay?: number;
}

export function StatCube({ label, value, delay = 0 }: StatCubeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ perspective: "1000px" }}
      className="group relative h-32 w-full"
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        className="relative h-full w-full rounded-2xl border border-slate-200 bg-white/80 p-4 transition-all hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 dark:hover:shadow-[0_0_30px_rgba(var(--site-primary-rgb),0.2)]"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--site-primary)]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center translate-z-20">
          <span className="text-3xl font-black text-foreground">{value}</span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-white">{label}</span>
        </div>
        
        {/* Advanced 3D Depth Elements - Hidden in light mode for classic feel */}
        <div className="absolute -bottom-2 -right-2 h-full w-full rounded-2xl border border-slate-200 bg-[var(--site-primary)]/5 opacity-0 dark:opacity-100 blur-[2px] dark:border-white/5" style={{ transform: "translateZ(-20px)" }} />
        <div className="absolute inset-0 rounded-2xl border border-[var(--site-primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
}

// --- Hexagon Grid ---
interface HexagonProps {
  children?: ReactNode;
  className?: string;
  index?: number;
}

export function Hexagon({ children, className, index = 0 }: HexagonProps) {
  return (
    <motion.div 
      animate={{ 
        y: [0, -8, 0],
        rotate: [0, 2, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.2
      }}
      className={cn("relative h-16 w-16 group transition-transform hover:scale-110 z-10", className)}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full dark:filter dark:drop-shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.3)]">
        <path
          d="M50 2L95 25V75L50 98L5 75V25L50 2Z"
          className="fill-slate-100 stroke-[var(--site-primary)] stroke-[1.5] transition-all group-hover:fill-[var(--site-primary)]/30 group-hover:stroke-2 dark:fill-slate-900/90 shadow-none border-none"
        />
      </svg>
      <div className="relative z-10 flex h-full items-center justify-center text-slate-700 scale-90 transition-transform group-hover:scale-100 dark:text-white">
        {children}
      </div>
    </motion.div>
  );
}

// --- Methodology Nodes ---
interface NodeProps {
  label: string;
  icon?: ReactNode;
  isActive?: boolean;
}

export function MethodologyNode({ label, icon, isActive }: NodeProps) {
  return (
    <div className="flex flex-col items-center gap-3 relative z-10">
      <div className="relative">
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          className={cn(
            "absolute -inset-4 rounded-full blur-xl transition-colors hidden dark:block",
            isActive ? "bg-[var(--site-primary)]/40" : "bg-transparent"
          )}
        />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={cn(
            "relative h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all backdrop-blur-md shadow-none",
            isActive 
              ? "border-[var(--site-primary)] bg-white text-slate-900 dark:bg-slate-900/80 dark:text-white dark:shadow-[0_0_15px_rgba(var(--site-primary-rgb),0.3)]"
              : "border-slate-300 bg-slate-100/80 text-slate-500 dark:border-slate-800 dark:bg-slate-900/40"
          )}
        >
          {icon}
        </motion.div>
      </div>
      <span className={cn(
        "text-[10px] font-black uppercase tracking-[0.15em] transition-colors text-center max-w-[60px]",
        isActive ? "text-slate-900 dark:text-white" : "text-slate-500"
      )}>
        {label}
      </span>
    </div>
  );
}

// --- Process Flow Line ---
export function ProcessFlowLine() {
  return (
    <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-[22px] z-0 overflow-hidden px-10">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
        <motion.line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="var(--site-primary)"
          strokeWidth="2"
          strokeDasharray="10, 150"
          animate={{
            strokeDashoffset: [0, -160],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
}

// --- Project Preview Card ---
export function ProjectPreview({ title, category, image, index }: { title: string; category: string; image?: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm transition-all hover:border-[var(--site-primary)]/50 dark:hover:shadow-[0_0_30px_rgba(var(--site-primary-rgb),0.2)] dark:border-white/10 dark:bg-slate-900/40"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-200/60 via-slate-100/5 to-transparent opacity-80 transition-opacity group-hover:opacity-60 dark:from-slate-950 dark:via-slate-950/20" />
      {image ? (
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
      )}
      
      <div className="absolute inset-0 z-20 rounded-2xl border border-slate-200/70 pointer-events-none dark:border-white/5" />
      
      <div className="absolute bottom-4 left-4 z-30 transform transition-transform group-hover:translate-x-1">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--site-primary)] mb-0.5">{category}</p>
        <p className="text-sm font-black text-foreground">{title}</p>
      </div>
      
      <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="h-6 w-6 rounded-full bg-[var(--site-primary)] flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
          <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}

// Needed for ProjectPreview hover icon
import { ArrowRight } from "lucide-react";

// --- Fluid Background ---
export function FluidBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[var(--site-primary)]/20 via-emerald-500/10 to-transparent blur-[100px]" 
      />
      <motion.svg
        viewBox="0 0 800 600"
        className="h-full w-full opacity-40 dark:opacity-30 translate-z-0 filter blur-[1px]"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <defs>
          <linearGradient id="fluid-grad-adv" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--site-primary)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 300 Q200 100 400 300 T800 300 V600 H0 Z"
          fill="url(#fluid-grad-adv)"
          animate={{
            d: [
              "M0 300 Q200 100 400 300 T800 300 V600 H0 Z",
              "M0 400 Q200 200 400 400 T800 400 V600 H0 Z",
              "M0 300 Q200 100 400 300 T800 300 V600 H0 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}

