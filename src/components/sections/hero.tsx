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

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] pt-20 pb-12 dark:bg-[#0A0A0F]">
      {/* Gradient mesh orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden dark:block absolute top-[-10%] left-[5%] h-[600px] w-[600px] rounded-full bg-[rgba(var(--site-primary-rgb),0.12)] blur-[130px]" />
        <div className="hidden dark:block absolute bottom-[-20%] right-[10%] h-[700px] w-[700px] rounded-full bg-[rgba(var(--site-primary-rgb),0.09)] blur-[150px]" />
        <div className="hidden dark:block absolute top-[50%] left-[40%] h-[500px] w-[500px] rounded-full bg-[rgba(var(--site-primary-rgb),0.06)] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
          {/* Main Headline */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="mb-6 max-w-3xl font-display text-[1.95rem] font-bold leading-[1.06] tracking-[-0.04em] text-slate-950 dark:text-[#F8F8FF] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.55rem]"
          >
            {heroHeadline.map((line, lineIndex) => (
              <motion.span
                key={line}
                variants={headlineLine}
                className="block md:whitespace-nowrap"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-10 max-w-lg text-[0.9rem] leading-relaxed text-slate-600 dark:text-[#94A3B8] sm:text-[0.95rem] md:text-base"
          >
            We design and build custom digital systems that help growth-focused businesses launch faster, convert better, and automate lead capture with websites, funnels, SEO, and AI-powered workflows.
          </motion.p>

          {/* CTA Buttons and Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-12 w-full"
          >
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-body font-bold text-white shadow-[0_26px_60px_-36px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-[var(--site-primary-hover)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)]"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-body font-bold text-slate-950 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-white dark:border-[#1E1E2E] dark:bg-[#13131E] dark:text-[#F8F8FF] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.06)] dark:hover:bg-[#1a1a2e]"
              >
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200/50 ring-1 ring-slate-300/50 transition-transform duration-300 group-hover:translate-x-1 dark:bg-white/5 dark:ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-col items-center justify-center gap-8 border-y border-slate-200 py-8 sm:flex-row sm:gap-12 dark:border-[#1E1E2E]">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] md:text-4xl">100+</p>
                <p className="mt-2 font-body text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">Systems Built</p>
              </div>
              <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-[#1E1E2E] sm:block" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] md:text-4xl">99.9%</p>
                <p className="mt-2 font-body text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">Uptime</p>
              </div>
              <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-[#1E1E2E] sm:block" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] md:text-4xl">94%</p>
                <p className="mt-2 font-body text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">Efficiency</p>
              </div>
            </div>

            {/* Logo Marquee */}
            <div className="w-full overflow-hidden">
              <p className="mb-6 text-center font-body text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">
                Trusted by Industry Leaders
              </p>
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="flex w-max gap-6 whitespace-nowrap"
                >
                  {[0, 1].map((batch) => (
                    <div
                      key={batch}
                      aria-hidden={batch === 1}
                      className="flex shrink-0 gap-6 pr-6"
                    >
                      {trustedCompanies.map((company) => (
                        <div
                          key={`${batch}-${company}`}
                          className="whitespace-nowrap rounded-full border border-slate-200 bg-white/95 px-6 py-3 font-body text-sm text-slate-700 shadow-[0_14px_28px_-20px_rgba(15,23,42,0.14)] transition-all hover:border-[color:rgba(var(--site-primary-rgb),0.4)] hover:text-[var(--site-primary)] dark:border-[#1D4658] dark:bg-[#0C1822]/88 dark:text-[#A8C1D3] dark:shadow-[0_14px_28px_-20px_rgba(6,182,212,0.24)] dark:hover:border-[#67E8F966] dark:hover:text-[#67E8F9]"
                        >
                          {company}
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
