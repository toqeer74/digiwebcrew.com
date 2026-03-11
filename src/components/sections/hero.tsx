"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "../layout/layout-primitives";
import { localePath } from "@/lib/locale-path";

interface HeroProps {
  dict: any;
  locale: string;
}

const trustedCompanies = [
  "TechFlow",
  "Global Legal Partners",
  "Apex Clinics",
  "Elevate SaaS",
  "ProHome Services",
  "Nexus Consulting",
];

const heroHeadline = [
  "Custom Websites,",
  "Funnels & AI Automation",
  "That Turn Traffic Into Qualified Leads",
];

const headlineContainer = {
  hidden: { opacity: 1 },
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.16,
    },
  },
};

const headlineLine = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const categories = [
  "Websites",
  "Funnels",
  "SEO",
  "Automation",
  "Dev Systems",
  "Technical",
];

const stats = [
  { label: "Systems Built", value: "100+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Efficiency", value: "94%" },
];

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] pt-10 pb-8 dark:bg-[#0A0A0F]">
      {/* Gradient mesh orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden dark:block absolute top-[-10%] left-[5%] h-[600px] w-[600px] rounded-full bg-[rgba(var(--site-primary-rgb),0.12)] blur-[130px]" />
        <div className="hidden dark:block absolute bottom-[-20%] right-[10%] h-[700px] w-[700px] rounded-full bg-[rgba(var(--site-primary-rgb),0.09)] blur-[150px]" />
        <div className="hidden dark:block absolute top-[50%] left-[40%] h-[500px] w-[500px] rounded-full bg-[rgba(var(--site-primary-rgb),0.06)] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Column: Text Content (50%) */}
          <div className="flex flex-col items-start text-left space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span>Philosophy & Detail</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance"
            >
              Custom Websites, Funnels & <span className="text-[var(--site-primary)]">AI Automation</span>
            </motion.h1>

            <div className="space-y-4 max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm md:text-base font-medium text-slate-600 dark:text-[#94A3B8] leading-relaxed italic border-l-4 border-[var(--site-primary)] pl-4"
              >
                This lab brings together engineering-first solutions across high-performance websites and automated sales systems.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                href={localePath(locale, "/book-consultation")}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all duration-300 hover:bg-[var(--site-primary-hover)]"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] transition-all duration-300 hover:bg-white dark:hover:bg-white/10"
              >
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Premium Card Section (50%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="site-card p-4 lg:p-6 overflow-hidden relative border-2 border-[var(--site-primary)]/10 shadow-[0_40px_80px_-40px_rgba(var(--site-primary-rgb),0.4)] bg-slate-50/50 dark:bg-slate-900/60 dark:border-slate-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA] opacity-90" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)] dark:bg-[var(--site-primary)]/20 dark:border-[var(--site-primary-soft)]/30 dark:text-[var(--site-primary-soft)] mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] animate-pulse" />
                Industrial Proof
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-950 dark:text-slate-100 leading-tight text-balance mb-6">
                Selected Works & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--site-primary)] via-[#818CF8] to-violet-400">Engineering Outcomes</span>
              </h2>

              {/* Stats Row Integrated into Card */}
              <div className="grid grid-cols-3 gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-left">
                    <p className="text-2xl font-black text-slate-950 dark:text-slate-100">{stat.value}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-all hover:border-[var(--site-primary)] hover:scale-[1.02]"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{category}</span>
                  </div>
                ))}
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-[var(--site-primary)]/15 blur-[60px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
