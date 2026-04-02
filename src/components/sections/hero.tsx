"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, Filter, Cpu, TrendingUp, Smartphone, Workflow } from "lucide-react";
import Link from "next/link";
import { localePath } from "@/lib/locale-path";
import { NetworkBackground } from "@/components/ui/network-background";
import { Button } from "@/components/ui/button";

interface HeroProps {
  locale: string;
}

const WORDS = ["WEBSITES", "FUNNELS", "AUTOMATION", "GROWTH"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const serviceLinks = [
  { 
    title: "WEB SYSTEMS", 
    icon: Monitor, 
    color: "#00d4ff", 
    href: "/services/custom-software",
    glow: "rgba(0, 212, 255, 0.15)"
  },
  { 
    title: "FUNNELS", 
    icon: Filter, 
    color: "#a78bfa", 
    href: "/services/ecommerce-solutions",
    glow: "rgba(167, 139, 250, 0.15)"
  },
  { 
    title: "AI AUTOMATION", 
    icon: Cpu, 
    color: "#6366f1", 
    href: "/services/ai-integrations",
    glow: "rgba(99, 102, 241, 0.15)"
  },
  { 
    title: "SEO & GROWTH", 
    icon: TrendingUp, 
    color: "#34d399", 
    href: "/services/data-driven-seo",
    glow: "rgba(52, 211, 153, 0.15)"
  },
  { 
    title: "CUSTOM APPS", 
    icon: Smartphone, 
    color: "#f87171", 
    href: "/services/custom-software",
    glow: "rgba(248, 113, 113, 0.15)"
  },
  { 
    title: "WORKFLOWS", 
    icon: Workflow, 
    color: "#f59e0b", 
    href: "/services/ai-integrations",
    glow: "rgba(245, 158, 11, 0.15)"
  },
];

const tags = [
  "NEXT.JS",
  "WORDPRESS",
  "AI AGENTS",
  "FUNNELS",
  "SEO",
  "DEVOPS",
  "AUTOMATION",
];

export function Hero({ locale }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [scrambledText, setScrambledText] = useState(WORDS[0]);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scramble effect
  useEffect(() => {
    let iteration = 0;
    let scrambleInterval: NodeJS.Timeout;

    const startScramble = (target: string) => {
      iteration = 0;
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        setScrambledText(
          target
            .split("")
            .map((char, index) => {
              if (index < iteration - 2) return target[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        iteration += 1 / 3;
        if (iteration > target.length) {
          clearInterval(scrambleInterval);
          setScrambledText(target);
        }
      }, 30);
    };

    // Initial scramble
    startScramble(WORDS[wordIndex]);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        const next = (prev + 1) % WORDS.length;
        startScramble(WORDS[next]);
        return next;
      });
    }, 2800);

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(wordInterval);
    };
  }, []); // Run only once on mount

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative w-full min-h-screen overflow-hidden bg-black text-white font-sans"
    >
      {/* Interactive Network Background */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
      </div>

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-[1px] z-[5] pointer-events-none bg-gradient-to-r from-transparent via-[var(--site-primary)]/40 to-transparent animate-scan-line" />

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col justify-between px-8 md:px-12 pt-10 md:pt-20 pb-10 min-h-screen max-w-7xl mx-auto w-full">
        
        <div className="flex-1 flex flex-col justify-center">
          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <div className="w-7 h-[1px] bg-[var(--site-primary)]/60 shrink-0" />
            <span className="font-plex text-[10px] tracking-[0.2em] text-[var(--site-primary)] uppercase font-bold">
              Engineering-First Digital Agency
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-16">
            {/* Headline column */}
            <div className="space-y-1 lg:flex-1">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block font-inter font-[900] italic leading-[0.82] tracking-tight text-[clamp(50px,8vw,110px)] text-white"
              >
                WE BUILD
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block font-inter font-[900] italic leading-[0.82] tracking-tight text-[clamp(50px,8vw,110px)] text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.9)" }}
              >
                DIGITAL
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="block font-plex font-bold leading-[0.82] tracking-tight text-[clamp(50px,8vw,110px)] text-[var(--site-primary)]"
              >
                {scrambledText}
              </motion.span>

              {/* Description directly below heading */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 text-sm md:text-base leading-relaxed text-white/55 font-normal max-w-xl"
              >
                From high-performance custom websites to AI-powered sales automation — we engineer digital systems that convert visitors into revenue. 100+ systems built. 99.9% uptime.
              </motion.p>
            </div>

            {/* CTA and Tags column */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:max-w-md w-full"
            >
              <div className="hidden lg:block w-full h-[1px] bg-white/12 mb-8" />
              
              <div className="flex flex-row items-center gap-3 lg:mt-4">
                <Link href={localePath(locale, "/quote")}>
                  <Button variant="primary" size="lg" className="px-6 py-3 whitespace-nowrap">
                    Start Your Project
                    <ArrowRight className="stroke-[3]" />
                  </Button>
                </Link>
                <Link href={localePath(locale, "/case-studies")}>
                  <Button variant="outline" size="lg" className="px-6 py-3 bg-white !text-black hover:bg-white/90 border-transparent whitespace-nowrap">
                    View Our Work
                  </Button>
                </Link>
              </div>

              {/* Tags section */}
              <div className="flex flex-wrap items-center gap-2 mt-8 md:mt-10">
                {tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-[9px] md:text-[10px] tracking-widest uppercase font-semibold px-3.5 py-2 border border-white/12 rounded-full text-white/45 bg-white/5 transition-all hover:border-[var(--site-primary)]/40 hover:text-[var(--site-primary)] hover:bg-[var(--site-primary)]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Service Links */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-auto pt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {serviceLinks.map((service, idx) => (
              <Link 
                key={service.title}
                href={localePath(locale, service.href)}
                className="group relative flex flex-col items-center justify-center p-3 rounded-lg border border-white/5 bg-white/[0.01] transition-all hover:scale-[1.02] hover:bg-white/[0.04]"
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0"
                  style={{ background: service.glow }}
                />
                
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <service.icon 
                    className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" 
                    style={{ color: service.color }}
                    strokeWidth={1.5}
                  />
                  <span className="text-[9px] tracking-[0.15em] font-plex font-bold text-white/40 group-hover:text-white transition-colors">
                    {service.title}
                  </span>
                </div>

                {/* Corner accent */}
                <div 
                  className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-40 group-hover:opacity-100"
                  style={{ background: service.color }}
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
