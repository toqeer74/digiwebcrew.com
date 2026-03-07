"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Check, Star } from "lucide-react";
import Link from "next/link";
import { Container } from "../layout/layout-primitives";

interface HeroProps {
  dict: any;
  locale: string;
}

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-background z-10 w-full border-b border-border">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-gradient-to-br from-primary/15 to-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-tr from-primary/12 to-primary/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh] pb-20 pt-4">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/60 border border-border text-primary mb-12 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(2,77,148,0.35)]" />
              <span>{dict.hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05] text-foreground"
            >
              {dict.hero.title1} <br />
              <span className="text-primary">{dict.hero.title2} {dict.hero.title3}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed font-medium max-w-lg"
            >
              {dict.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-8"
            >
              <Link
                href={`/${locale}/quote`}
                className="h-16 px-10 rounded-xl bg-primary text-primary-foreground font-extrabold text-[13px] shadow-md hover:bg-primary/90 hover:scale-[1.05] transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-[0.15em]"
              >
                <span>{dict.hero.ctaPrimary}</span>
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-11 h-11 rounded-full border-4 border-background bg-primary/15 overflow-hidden shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=system${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mt-1.5">100+ Systems Built</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-card/95 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden border border-border flex flex-col min-h-[480px]">
              <div className="flex items-center gap-2 px-6 py-4 bg-gradient-to-b from-muted/40 to-background border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-[0_2px_4px_rgba(239,68,68,0.3)]" />
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-[0_2px_4px_rgba(234,179,8,0.3)]" />
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-[0_2px_4px_rgba(2,77,148,0.3)]" />
                </div>
                <div className="mx-auto h-6 w-52 bg-background rounded-lg border border-border flex items-center px-3 shadow-inner">
                  <div className="h-2 w-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full" />
                </div>
              </div>

              <div className="p-10 space-y-10 flex-1 flex flex-col justify-center">
                <div className="space-y-8">
                  {[
                    { label: dict.hero.stats.efficiency, val: 94, color: "from-primary to-primary/70", glow: "hsl(var(--primary) / 0.35)" },
                    { label: dict.hero.stats.scalability, val: 88, color: "from-primary to-primary/70", glow: "hsl(var(--primary) / 0.35)" },
                    { label: dict.hero.stats.uptime, val: 99, color: "from-primary to-primary/70", glow: "hsl(var(--primary) / 0.35)" }
                  ].map((bar, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        <span>{bar.label}</span>
                        <span className="text-primary font-black">{bar.val}%</span>
                      </div>
                      <div className="h-3.5 w-full bg-muted/50 rounded-full overflow-hidden border border-border p-[3px] shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.val}%` }}
                          transition={{ duration: 1.8, delay: 0.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full bg-gradient-to-r ${bar.color} rounded-full relative`}
                          style={{ boxShadow: `0 0 16px ${bar.glow}` }}
                        >
                          <div className="absolute inset-0 bg-background/20 rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/15 to-muted flex items-center justify-center text-primary shadow-sm">
                      <Rocket size={22} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none mb-2">Total Scale</p>
                      <p className="text-sm font-bold text-foreground leading-none">Global Coverage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary tracking-tight">99.9%</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] leading-none">Industry Lead</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-8 pl-6 pr-10 py-6 bg-card/95 backdrop-blur-xl rounded-[2rem] shadow-lg z-20 flex items-center gap-5 border border-border"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-primary-foreground shrink-0 shadow-md">
                  <Check size={32} strokeWidth={3} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-2xl border-2 border-primary/40"
                />
              </div>
              <div>
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none mb-2">System Status</p>
                <p className="text-xl font-black text-foreground leading-none tracking-tight">Accepting Sprints</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

