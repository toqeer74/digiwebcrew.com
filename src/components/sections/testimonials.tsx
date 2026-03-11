"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "../layout/layout-primitives";

const testimonials = [
  {
    name: "Michael Chen",
    role: "CTO @ Fintech Innovators",
    content: "Building an enterprise system with Digi Web Crew was the best decision we made this year. Their engineering standard is unparalleled.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Founder, Bloom AI",
    content: "Toqeer's deep expertise in AI automation transformed our manual pipelines into a scalable asset. Fast, reliable, and truly expert-led development.",
    rating: 5
  },
  {
    name: "David Rodriguez",
    role: "VP Engineering, ScaleUp",
    content: "Zero friction from discovery to deployment. High-performance code that handles our traffic with ease and reliability.",
    rating: 5
  }
];

const credentials = [
  "Upwork Verified",
  "Fiverr Pro",
  "GitHub Verified",
  "Clutch Reviewed",
  "Top Rated Talent",
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] py-16 md:py-20 dark:border-[#12202B] dark:bg-[#0B0F14]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(17,75,151,0.08),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.2),_rgba(248,250,252,0.92))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_32%),radial-gradient(circle_at_85%_18%,_rgba(34,211,238,0.1),_transparent_22%),linear-gradient(180deg,_rgba(9,14,20,0.2),_rgba(9,14,20,0.92))]" />
      <Container className="relative z-10">
        <div className="relative text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.22)] bg-white/88 px-3 py-1 backdrop-blur-md dark:border-[#0EA5B7]/30 dark:bg-[#0C1822]/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_10px_rgba(0,0,0,0.18)] dark:bg-[#06B6D4] dark:shadow-[0_0_10px_rgba(6,182,212,0.9)]" />
            <span className="text-xs font-body font-semibold uppercase tracking-[0.24em] text-[var(--site-primary)] dark:text-[#67E8F9]">
              Trusted by Leaders
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-display font-bold tracking-tight text-slate-950 dark:text-[#F8FBFF] md:text-5xl"
          >
            What Our Clients Say
          </motion.h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-[#8EA3B8]">
            Hear from global leaders who trust Digi Web Crew for their mission-critical infrastructure.
          </p>
        </div>

        <div className="relative mb-12 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="site-card site-card-interactive group relative flex h-full flex-col p-8"
            >
              <div className="absolute right-8 top-7 opacity-30 transition-opacity group-hover:opacity-70">
                <Quote size={28} className="text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]" />
              </div>

              <div className="mb-6 flex items-center gap-1">
                {[...Array(t.rating)].map((_, i) => (
                    <Star
                    key={i}
                    size={14}
                    className="fill-[var(--site-primary)] text-[var(--site-primary)] drop-shadow-[0_0_8px_rgba(0,0,0,0.16)] dark:fill-[var(--site-primary-soft)] dark:text-[var(--site-primary-soft)] dark:drop-shadow-[0_0_10px_rgba(var(--site-primary-rgb),0.55)]"
                  />
                ))}
              </div>

              <p className="mb-8 flex-1 text-sm italic leading-7 text-slate-600 dark:text-[#C2D2E1]">
                "{t.content}"
              </p>

              <div className="pt-2">
                <p className="mb-1 text-sm font-display font-semibold leading-none text-slate-950 dark:text-[#F8FBFF]">
                  {t.name}
                </p>
                <p className="text-xs font-body font-medium uppercase tracking-[0.18em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="relative py-6 md:py-7"
        >
          <p className="mb-6 text-center text-xs font-body font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-[#6B8299]">
            Verified Credentials
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
                  {credentials.map((credential) => (
                    <div
                      key={`${batch}-${credential}`}
                      className="whitespace-nowrap rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-xs font-body font-semibold uppercase tracking-[0.18em] text-[var(--site-primary)] shadow-[0_14px_28px_-20px_rgba(15,23,42,0.14)] transition-all hover:border-[color:rgba(var(--site-primary-rgb),0.4)] hover:text-[var(--site-primary-hover)] dark:border-[#1D4658] dark:bg-[#0C1822]/88 dark:text-[#A8C1D3] dark:shadow-[0_14px_28px_-20px_rgba(6,182,212,0.24)] dark:hover:border-[#67E8F966] dark:hover:text-[#67E8F9]"
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
