"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import type { TestimonialsData } from "@/lib/content-engine";

const fallbackTestimonialsData: TestimonialsData = {
  reviewBadges: [],
  testimonials: [],
  trustSignals: [],
};

export function Testimonials({ data }: { data: TestimonialsData }) {
  const testimonialsData = data || fallbackTestimonialsData;
  const reviewBadges = testimonialsData.reviewBadges || [];
  const testimonials = testimonialsData.testimonials || [];
  const trustSignals = testimonialsData.trustSignals || [];

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-white py-20 text-slate-900 dark:bg-midnight dark:text-white shadow-2xl">
      {/* Decorative Background Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Concentric Circles/Curves */}
        <div className="absolute left-[80%] top-[40%] h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2">
           <svg className="h-full w-full opacity-[0.07]" viewBox="0 0 1000 1000" fill="none">
             <circle cx="500" cy="500" r="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_200s_linear_infinite]" />
             <circle cx="500" cy="500" r="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_160s_linear_infinite_reverse]" />
             <circle cx="500" cy="500" r="320" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_130s_linear_infinite]" />
           </svg>
        </div>
        
        {/* Glow Spots */}
        <div className="absolute left-[-10%] top-[20%] h-96 w-96 rounded-full bg-[#6366F1]/10 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-10%] h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="relative text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-300">
              Client Success Stories
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-display font-black tracking-tight text-foreground md:text-6xl"
          >
            Real Results, <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 dark:from-indigo-300 dark:via-violet-300 dark:to-indigo-300 bg-clip-text text-transparent">Real Feedback</span>
          </motion.h2>
          <p className="text-xl leading-relaxed text-slate-600 dark:text-white/70 font-medium">
            Discover how businesses are scaling to new heights with Digi Web Crew's industrial-grade websites and automation systems.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviewBadges.map((badge) => (
            <a
              key={badge.label}
              href={badge.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:bg-slate-100 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/20 hover:-translate-y-1 shadow-lg"
            >
              <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white transition-colors dark:group-hover:text-indigo-300">{badge.label}</p>
              <p className="text-xs text-slate-500 dark:text-white/60 mt-1 font-medium">{badge.meta}</p>
            </a>
          ))}
        </div>

        <div className="relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group relative flex flex-col rounded-[2.5rem] border border-slate-200 bg-slate-50 p-10 transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25 dark:hover:bg-white/8 hover:translate-y-[-8px] shadow-2xl backdrop-blur-xl isolate"
            >
              {/* Card Glow Icon Overlay */}
              <div className="absolute right-6 top-6 opacity-[0.03] transition-opacity group-hover:opacity-[0.06] dark:opacity-5 dark:group-hover:opacity-10 scale-150">
                <Quote className="h-16 w-16" />
              </div>

              <div className="mb-8 flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4.5 w-4.5 ${i < t.rating ? "fill-indigo-500 text-indigo-500 dark:fill-indigo-400 dark:text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]" : "text-slate-200 dark:text-white/10"}`} 
                  />
                ))}
              </div>
              
              <Quote className="mb-6 h-10 w-10 text-indigo-500/10 dark:text-indigo-400/20 transition-transform group-hover:scale-110" />
              
              <p className="relative mb-10 flex-1 text-xl font-medium italic leading-relaxed text-slate-800 dark:text-white/90">
                "{t.content}"
              </p>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <p className="mb-1.5 text-lg font-display font-black tracking-tight text-foreground">
                  {t.name}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                  {t.role}
                </p>
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-slate-100/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/15 dark:hover:text-white"
                >
                  Verified Registry: {t.source}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative py-8"
        >
          <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-white/60">
            Trusted Accreditation
          </p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-8 whitespace-nowrap"
            >
              {[0, 1].map((batch) => (
                <div
                  key={batch}
                  aria-hidden={batch === 1}
                  className="flex shrink-0 gap-8 pr-8"
                >
                  {trustSignals.map((credential) => (
                    <div
                      key={`${batch}-${credential}`}
                      className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/15 dark:hover:text-white dark:hover:border-white/30 cursor-default"
                    >
                      {credential}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>

  );
}

