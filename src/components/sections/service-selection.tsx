"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Code2, Globe, Settings, Zap, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { localePath } from "@/lib/locale-path";

interface ServiceSelectionProps {
  locale: string;
}

const services = [
  {
    id: "custom-development",
    title: "Custom Software Development",
    description: "Enterprise-grade web applications built with modern technology stack",
    icon: Code2,
    color: "from-indigo-500 to-purple-500",
    features: ["Full-Stack Next.js", "Custom Architecture", "Scalable Design"],
    href: "/services/custom-software"
  },
  {
    id: "conversion-funnels",
    title: "Conversion Funnels",
    description: "High-converting landing pages and sales funnels optimized for ROI",
    icon: Globe,
    color: "from-amber-500 to-orange-500",
    features: ["Landing Page Design", "Payment Integration", "Lead Capture"],
    href: "/services/conversion-funnels"
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description: "AI-powered solutions and intelligent process automation",
    icon: Zap,
    color: "from-emerald-500 to-teal-500",
    features: ["AI Chatbots", "Process Automation", "LLM Integration"],
    href: "/services/ai-chatbots-automation"
  },
  {
    id: "seo-retainer",
    title: "SEO & Growth",
    description: "Comprehensive SEO strategy and ongoing growth optimization",
    icon: Settings,
    color: "from-rose-500 to-pink-500",
    features: ["SEO Optimization", "Content Strategy", "Monthly Analysis"],
    href: "/services/seo-growth-retainers"
  }
];

export function ServiceSelection({ locale }: ServiceSelectionProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-bold tracking-tight mb-4 text-foreground">
          What service are you interested in?
        </h2>
        <p className="text-lg text-muted-foreground font-body">
          Select a service to get a detailed quote tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.id}
              href={localePath(locale, service.href)}
              className="group"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                      <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body font-medium text-[#6366F1] group-hover:translate-x-1 transition-transform">
                    Get Custom Quote
                  </span>
                  <ChevronRight 
                    size={16} 
                    className="text-[#6366F1] group-hover:translate-x-1 transition-transform" 
                  />
                </div>

                {/* Hover Effect */}
                {hoveredService === service.id && (
                  <motion.div
                    layoutId="serviceHover"
                    className="absolute inset-0 rounded-2xl border-2 border-[#6366F1]/20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 p-6 rounded-2xl bg-secondary/30 border border-border">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Shield className="text-primary" size={20} />
          <span className="font-semibold">Not sure which service you need?</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Contact us for a free consultation and we'll help you find the perfect solution
        </p>
        <Link
          href={localePath(locale, "/contact")}
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#6366F1] text-foreground rounded-lg hover:bg-[#6366F1]/90 transition-colors"
        >
          Get Consultation
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

