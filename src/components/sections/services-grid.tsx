"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, BarChart3, Zap, Code2, ShieldCheck, Layers, ChevronRight } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    desc: "Blazing-fast, SEO-ready websites and web apps built to convert.",
    color: "#114b97",
    glow: "rgba(17,75,151,0.25)",
  },
  {
    icon: BarChart3,
    title: "SEO & Growth Retainers",
    desc: "Compound rankings and organic traffic that grow month over month.",
    color: "#34D399",
    glow: "rgba(52,211,153,0.25)",
  },
  {
    icon: Zap,
    title: "AI Chatbots & Automation",
    desc: "24/7 AI agents that qualify leads and handle ops without human touch.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.25)",
  },
  {
    icon: Code2,
    title: "Custom Software & SaaS",
    desc: "Bespoke platforms engineered to your exact business logic.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.25)",
  },
  {
    icon: ShieldCheck,
    title: "DevOps & Cloud Infrastructure",
    desc: "Scalable, secure cloud architecture with zero-downtime deployments.",
    color: "#60A5FA",
    glow: "rgba(96,165,250,0.25)",
  },
  {
    icon: Layers,
    title: "E-Commerce Solutions",
    desc: "High-converting stores powered by cutting-edge headless tech.",
    color: "#A78BFA",
    glow: "rgba(167,139,250,0.25)",
  },
];

export function ServicesGrid() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="mb-8 mt-12 w-full"
    >
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-black font-display text-midnight-950 dark:text-white tracking-tight">
          Everything You Need.{" "}
          <span className="bg-gradient-to-r from-[#F59E0B] to-[#EC4899] bg-clip-text text-transparent">
            Under One Roof.
          </span>
        </h3>
        <p className="mt-2 text-midnight-500 dark:text-slate-300 text-sm">
          Hover over a service to see what's included
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          const isActive = activeService === i;
          return (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.07 }}
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative rounded-2xl border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 p-6 cursor-pointer overflow-hidden transition-all duration-300 shadow-none dark:shadow-sm dark:hover:shadow-md"
              style={{
                borderColor: isActive ? `${svc.color}50` : undefined,
                boxShadow: isActive ? `var(--site-glow-shadow, none)` : undefined,
                //@ts-ignore
                "--site-glow-color": svc.glow,
              }}
            >
              {/* Glow overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${svc.glow} 0%, transparent 60%)`,
                  opacity: isActive ? 1 : 0,
                }}
              />
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)`,
                  opacity: isActive ? 1 : 0,
                }}
              />
              <div className="relative z-10">
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300"
                    style={{
                      background: `${svc.color}18`,
                      borderColor: `${svc.color}30`,
                      boxShadow: isActive ? `var(--site-glow-shadow, none)` : "none",
                      //@ts-ignore
                      "--site-glow-color": svc.glow,
                    }}
                >
                  <Icon size={20} style={{ color: svc.color }} />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 leading-snug">{svc.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-200 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                  {svc.desc}
                </p>
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-semibold transition-all duration-300"
                  style={{ color: svc.color, opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(-8px)" }}
                >
                  Learn more <ChevronRight size={12} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
