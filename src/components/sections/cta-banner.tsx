"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { Button } from "@/components/ui/button";
import { localePath } from "@/lib/locale-path";

interface CtaBannerProps {
  dict: any;
  locale: string;
}

export function CtaBanner({ dict, locale }: CtaBannerProps) {
  return (
    <section className="bg-white dark:bg-midnight py-20 transition-colors">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(241,245,249,0.98))] p-12 text-center shadow-none md:p-16 dark:border-[var(--site-primary)]/20 dark:bg-gradient-to-br dark:from-midnight dark:to-midnight-950"
        >
          {/* Decorative orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="hidden dark:block h-[500px] w-[500px] rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] blur-[80px] dark:bg-[rgba(var(--site-primary-rgb),0.1)]"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.25)] bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1"
            >
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-[var(--site-primary)]">
                Ready to Transform?
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-3xl font-display font-bold leading-tight text-foreground md:text-5xl"
            >
              Let's Build Something<br />
              <span className="bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)] bg-clip-text text-transparent">
                Extraordinary Together
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl font-body text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Join hundreds of companies trusting us with their mission-critical infrastructure. Get started today with a custom scope assessment.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button href={localePath(locale, "/quote")} variant="primary" size="lg">
                Get Custom Scope
                <ArrowRight size={20} />
              </Button>
              <Button href={localePath(locale, "/book-consultation")} variant="outline" size="lg">
                Schedule Call
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

