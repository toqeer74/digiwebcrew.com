"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Code2, ShoppingCart, Globe, Settings, Smartphone, Zap, Shield, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ServiceSelectionProps {
  dict: any;
  isRtl: boolean;
  locale: string;
}

const services = [
  {
    id: "custom-web-apps",
    title: "Custom Web Applications",
    description: "Bespoke web applications tailored to your unique business requirements",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
    features: ["Custom-tailored solutions", "Scalable architecture", "Modern tech stack"],
    href: "/services/custom-web-apps"
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Complete online stores with payment processing and inventory management",
    icon: ShoppingCart,
    color: "from-purple-500 to-pink-500",
    features: ["Payment integration", "Inventory management", "Mobile commerce"],
    href: "/services/ecommerce"
  },
  {
    id: "full-stack-websites",
    title: "Full-Stack Websites",
    description: "Complete web solutions from frontend to backend with CMS integration",
    icon: Globe,
    color: "from-green-500 to-emerald-500",
    features: ["CMS integration", "API development", "Database design"],
    href: "/services/full-stack-websites"
  },
  {
    id: "automation-tools",
    title: "Automation Tools",
    description: "Internal tools and automation to streamline your business processes",
    icon: Settings,
    color: "from-orange-500 to-red-500",
    features: ["Process automation", "Workflow optimization", "Custom dashboards"],
    href: "/services/automation-internal-tools"
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: Smartphone,
    color: "from-indigo-500 to-purple-500",
    features: ["Cross-platform", "Native performance", "App store deployment"],
    href: "/services/custom-software"
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    description: "Cloud infrastructure setup, CI/CD pipelines, and deployment automation",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    features: ["CI/CD pipelines", "Cloud deployment", "Monitoring setup"],
    href: "/services/devops-cloud"
  }
];

export function ServiceSelection({ dict, isRtl, locale }: ServiceSelectionProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          What service are you interested in?
        </h2>
        <p className="text-lg text-muted-foreground">
          Select a service to get a detailed quote tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.id}
              href={`/${locale}${service.href}`}
              className="group"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative p-6 rounded-2xl border transition-all duration-300",
                  "bg-background hover:shadow-xl hover:scale-105",
                  "border-border hover:border-primary/50",
                  "cursor-pointer"
                )}
              >
                {/* Gradient Background */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                  "bg-gradient-to-br", service.color
                )} />

                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  "bg-gradient-to-br", service.color,
                  "text-white shadow-lg"
                )}>
                  <Icon size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Get Quote
                  </span>
                  <ChevronRight 
                    size={16} 
                    className="text-primary group-hover:translate-x-1 transition-transform" 
                  />
                </div>

                {/* Hover Effect */}
                {hoveredService === service.id && (
                  <motion.div
                    layoutId="serviceHover"
                    className="absolute inset-0 rounded-2xl border-2 border-primary/20 pointer-events-none"
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
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Get Consultation
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
