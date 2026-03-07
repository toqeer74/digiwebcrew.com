"use client";

import { Section } from "../layout/layout-primitives";
import { ServiceCard } from "../ui/service-card";
import { AnimatedSection } from "../AnimatedSection";

const services = [
  {
    title: "Custom Software",
    description: "Tailor-made applications designed to solve unique business challenges with scalable architecture.",
    iconName: "Code2",
    href: "/services/custom-software"
  },
  {
    title: "Full-Stack Websites",
    description: "Next.js & MERN powered websites optimized for performance, SEO, and user experience.",
    iconName: "Globe",
    href: "/services/full-stack-websites"
  },
  {
    title: "E-commerce Ops",
    description: "Scalable Shopify and custom commerce solutions built to maximize conversion and loyalty.",
    iconName: "ShoppingCart",
    href: "/services/ecommerce"
  },
  {
    title: "Automation & Tools",
    description: "Internal dashboards and n8n/ClickUp workflows that save thousands of manual hours.",
    iconName: "Zap",
    href: "/services/automation-internal-tools"
  },
  {
    title: "DevOps & Cloud",
    description: "Secure, reliable cloud infrastructure and CI/CD pipelines for zero-downtime deployments.",
    iconName: "Cloud",
    href: "/services/devops-cloud"
  },
  {
    title: "SLA & Support",
    description: "Performance monitoring and proactive care plans to keep your systems running 24/7.",
    iconName: "ShieldCheck",
    href: "/services/maintenance-support"
  }
];

interface ServicesOverviewProps {
  dict: any;
}

export function ServicesOverview({ dict }: ServicesOverviewProps) {
  const coreServices = services.slice(0, 3);

  return (
    <Section className="relative z-10 pt-16 bg-background border-b border-border">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-20 px-4 md:px-0">
        {coreServices.map((service, i) => (
          <ServiceCard
            key={service.title}
            {...service}
            index={i}
            isHighlighted={i === 1}
          />
        ))}
      </div>

      <AnimatedSection className="text-center max-w-4xl mx-auto mb-20 px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Our Expertise
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-foreground">
          {dict.servicesOverview.title1} <br />
          <span className="text-primary">{dict.servicesOverview.title2}</span>
        </h2>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          {dict.servicesOverview.description}
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.slice(3).map((service, i) => (
          <ServiceCard key={service.title} {...service} index={i + 3} />
        ))}
      </div>
    </Section>
  );
}
