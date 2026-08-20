"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Rocket, Search, ExternalLink } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: Code2,
    ordinal: "01",
    title: "Custom Website Development",
    description: "Premium websites engineered for credibility, speed, and long-term business performance.",
    image: "/images/mockups/ui-web-dev.jpg",
    href: "/services",
    accentFrom: "from-blue-500",
    accentTo: "to-indigo-400",
    glowColor: "bg-blue-500",
  },
  {
    icon: Zap,
    ordinal: "02",
    title: "Conversion Funnels & Pages",
    description: "Focused page systems architected to convert traffic into qualified leads and bookings.",
    image: "/images/mockups/ui-funnels.jpg",
    href: "/services/conversion-funnels",
    accentFrom: "from-violet-500",
    accentTo: "to-fuchsia-400",
    glowColor: "bg-violet-500",
  },
  {
    icon: Rocket,
    ordinal: "03",
    title: "AI Chatbots & Automation",
    description: "AI-powered workflows that eliminate manual follow-up and accelerate response times.",
    image: "/images/mockups/ui-ai.jpg",
    href: "/services/ai-chatbots-automation",
    accentFrom: "from-amber-500",
    accentTo: "to-orange-400",
    glowColor: "bg-amber-500",
  },
  {
    icon: Search,
    ordinal: "04",
    title: "SEO & Growth Retainers",
    description: "Ongoing technical SEO and performance optimization to compound search visibility.",
    image: "/images/mockups/ui-seo.jpg",
    href: "/services/seo-growth-retainers",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-400",
    glowColor: "bg-emerald-500",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function FeaturesRow() {
  return (
    <section className="relative bg-slate-50 py-24 lg:py-32 dark:bg-slate-950 overflow-hidden">
      {/* Ambient background image and glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image 
          src="/images/features-bg.png" 
          alt="Enterprise Solutions Background" 
          fill 
          className="object-cover object-center opacity-[0.4] dark:opacity-[0.15] mix-blend-multiply dark:mix-blend-screen"
        />
        {/* Soft edge fading only at the very top and bottom border to blend with other sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-slate-50/60 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
        
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--site-primary)]/5 blur-[120px] dark:bg-[var(--site-primary)]/10" />
        <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-violet-400/5 blur-[100px] dark:bg-violet-600/10" />
        <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-sky-400/5 blur-[100px] dark:bg-sky-500/10" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative z-10 mx-auto mb-16 max-w-3xl text-center"
        >
          {/* Eyebrow badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Our Services
            </span>
          </div>

          <h2 className="mb-5 font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Enterprise{" "}
            <span className="bg-gradient-to-r from-[var(--site-primary)] via-emerald-500 to-sky-500 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
            Comprehensive services designed to transform your business — from infrastructure to visibility to intelligent automation.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:max-w-[1200px] mx-auto">
          {features.map((feature, i) => {
            return (
              <Link key={i} href={feature.href} className="relative group block h-[480px]">
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-500 cursor-pointer hover:border-[var(--site-primary)]/40 hover:shadow-xl dark:border-white/10 dark:bg-[#0a0a0c] dark:shadow-none dark:hover:border-white/20 dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative flex flex-col p-7 pb-0 z-20 h-[220px]">
                    <div className="flex items-center justify-between mb-4">
                      {/* Icon */}
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accentFrom} ${feature.accentTo} p-[1.5px] shadow-sm`}>
                        <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-white dark:bg-slate-900">
                          <feature.icon size={16} className="text-slate-700 dark:text-white" strokeWidth={2} />
                        </div>
                      </div>
                      
                      {/* Faded ordinal number */}
                      <div className="select-none font-display text-4xl font-black text-slate-900/[0.08] dark:text-white/[0.08]">
                        {feature.ordinal}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-display text-lg font-bold leading-snug text-slate-900 dark:text-white group-hover:text-[var(--site-primary)] transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>

                  {/* Image Container with seamless blend */}
                  <div className="absolute inset-x-0 bottom-0 h-[260px] pointer-events-none overflow-hidden rounded-b-[20px]">
                    {/* The soft gradient background behind the image */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.glowColor} to-transparent opacity-0 dark:opacity-10 group-hover:opacity-10 transition-opacity duration-500 mix-blend-multiply dark:mix-blend-screen`} />
                    
                    {/* The Image/Screenshot flawlessly comped via multiply and fade */}
                    <div 
                      className="absolute inset-0 z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ 
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)"
                      }}
                    >
                      <Image 
                        src={feature.image} 
                        alt={feature.title} 
                        fill 
                        className="object-cover object-top mix-blend-multiply dark:invert opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 mt-14 flex items-center justify-center gap-6"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-slate-300 dark:to-white/15" />
          <Button href="/services" variant="ghost" size="sm" className="group !px-0 !h-auto normal-case tracking-normal hover:bg-transparent">
            View all services
            <ExternalLink
              size={14}
              className="ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Button>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-slate-300 dark:to-white/15" />
        </motion.div>
      </Container>
    </section>
  );
}

