"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Globe, ShoppingCart, Zap, Cloud, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  href: string;
  index: number;
  isHighlighted?: boolean;
}

const icons: Record<string, any> = {
  Code2, Globe, ShoppingCart, Zap, Cloud, ShieldCheck
};

export function ServiceCard({
  title,
  description,
  href,
  iconName,
  index,
  isHighlighted
}: ServiceCardProps) {
  const Icon = icons[iconName] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "group relative p-8 rounded-3xl bg-card border border-border transition-all duration-500 shadow-sm hover:shadow-lg hover:-translate-y-1 overflow-hidden flex flex-col items-center text-center h-full",
        isHighlighted && "ring-4 ring-primary/10 border-primary/40 z-10"
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6 shadow-sm">
        <Icon size={32} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-bold mb-4 tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-medium flex-1">
        {description}
      </p>

      <div className="mt-auto relative z-20">
        <span className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-primary font-bold text-xs uppercase tracking-widest group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all border border-border group-hover:border-primary">
          <span>Explore</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </span>
      </div>

      <Link href={href} className="absolute inset-0 z-10" aria-label={`Explore ${title}`} />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
    </motion.div>
  );
}
