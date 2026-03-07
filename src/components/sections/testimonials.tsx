"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "../layout/layout-primitives";

const testimonials = [
  {
    name: "Michael Chen",
    role: "CTO @ Fintech Innovators",
    content: "Building an enterprise system with Digi Web Crew was the best decision we made this year. Their engineering standard is unparalleled. The calculator was spot on with the estimation.",
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
    content: "Zero friction from discovery to deployment. The process visualization is exactly how they deliver. High-performance code that handles our traffic with ease.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20"
          >
            Proof of Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-foreground tracking-tight mb-6"
          >
            Industrial <span className="text-primary">Validation</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground font-medium">
            Hear from global leaders who trust Digi Web Crew for their mission-critical infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border relative group transition-all hover:bg-card hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={40} className="text-primary" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground font-medium leading-relaxed mb-8 italic">
                "{t.content}"
              </p>

              <div>
                <p className="text-foreground font-black uppercase tracking-wider text-sm">{t.name}</p>
                <p className="text-primary text-xs font-bold">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 grayscale opacity-50 contrast-125"
        >
          <div className="text-xl font-black text-muted-foreground select-none">UPWORK VERIFIED</div>
          <div className="text-xl font-black text-muted-foreground select-none">FIVERR PRO</div>
          <div className="text-xl font-black text-muted-foreground select-none">GITHUB PARTNER</div>
        </motion.div>
      </Container>
    </section>
  );
}
