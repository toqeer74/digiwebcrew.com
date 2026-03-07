export type ServiceSubItem = {
  title: string;
  slug: string;
  description: string;
  features: string[];
  outcomes: string[];
  deliverables: string[];
  techStack: string[];
  faqs: { q: string; a: string }[];
};

export type ServiceCategory = {
  title: string;
  slug: string;
  description: string;
  iconName: string;
  subServices: ServiceSubItem[];
};

export type ServiceDomain = {
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  categories: ServiceCategory[];
};

export type TechLab = {
  title: string;
  slug: string;
  description: string;
  iconName: string;
  capabilities: string[];
  relatedServices: string[];
};

// 5 Core Service Domains from PRD
export const serviceDomains: ServiceDomain[] = [
  {
    title: "Custom Software Development",
    slug: "custom-software",
    description: "Enterprise-grade custom solutions engineered for complex business challenges.",
    icon: "Code2",
    color: "from-indigo-500 to-blue-500",
    categories: [
      {
        title: "Custom Software",
        slug: "custom-software",
        description: "Bespoke software systems built for unique business requirements.",
        iconName: "Code2",
        subServices: [
          {
            title: "Web App Development",
            slug: "web-app-development",
            description: "High-performance applications with reactive frameworks and real-time data.",
            features: ["SPA/SSR architecture", "Real-time synchronization", "Advanced security", "Microservices"],
            outcomes: ["100% custom logic", "Scalable infrastructure", "Zero technical debt"],
            deliverables: ["Full source code", "Documentation", "CI/CD setup"],
            techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
            faqs: [
              { q: "Do you use templates?", a: "No, every line is custom-written for your requirements." },
              { q: "How scalable are your apps?", a: "We build stateless architectures that scale horizontally." }
            ]
          },
          {
            title: "Mobile App Development",
            slug: "mobile-app-development",
            description: "Native-quality iOS and Android apps from a single codebase.",
            features: ["React Native", "Native modules", "Offline-first sync", "App Store-ready"],
            outcomes: ["Faster time-to-market", "Near-native performance", "Cross-platform parity"],
            deliverables: ["App Store builds", "API backend", "Push notifications"],
            techStack: ["React Native", "Expo", "Firebase"],
            faqs: []
          },
          {
            title: "SaaS Development",
            slug: "saas-development",
            description: "Multi-tenant platforms with subscription management and analytics.",
            features: ["Multi-tenancy", "Billing engines", "Analytics", "Scalable onboarding"],
            outcomes: ["Investor-ready", "Revenue-generating", "Scalable globally"],
            deliverables: ["Boilerplate core", "Billing dashboard", "Analytics"],
            techStack: ["Next.js", "Stripe", "Prisma", "AWS"],
            faqs: []
          },
          {
            title: "API Development",
            slug: "api-development",
            description: "Robust REST and GraphQL APIs designed for performance and security.",
            features: ["REST & GraphQL", "Rate limiting", "OAuth 2.0", "Versioning"],
            outcomes: ["Fast responses", "Enterprise-secure", "Scalable"],
            deliverables: ["API documentation", "SDKs", "Authentication"],
            techStack: ["Node.js", "Express", "PostgreSQL"],
            faqs: []
          },
          {
            title: "Legacy System Modernization",
            slug: "legacy-modernization",
            description: "Transform outdated systems into modern, maintainable platforms.",
            features: ["Incremental migration", "Zero downtime", "Data preservation", "Tech debt removal"],
            outcomes: ["Reduced costs", "Better performance", "Future-ready"],
            deliverables: ["Modernized codebase", "Migration plan", "Staff training"],
            techStack: ["Modern frameworks", "Cloud platforms"],
            faqs: []
          }
        ]
      }
    ]
  },
  {
    title: "Full-Stack Website Development",
    slug: "full-stack-websites",
    description: "High-performance websites and comprehensive SEO services for search dominance.",
    icon: "Globe",
    color: "from-blue-500 to-cyan-500",
    categories: [
      {
        title: "Website Development",
        slug: "website-development",
        description: "Conversion-optimized websites with elite design and performance.",
        iconName: "Globe",
        subServices: [
          {
            title: "Next.js Performance Sites",
            slug: "nextjs-websites",
            description: "Blazing fast SEO-dominant websites with SSR and edge computing.",
            features: ["PageSpeed optimization", "Static generation", "Edge computing", "Image optimization"],
            outcomes: ["Higher Google rankings", "Lower bounce rates", "User engagement"],
            deliverables: ["Vercel setup", "CMS integration", "SEO engine"],
            techStack: ["Next.js", "Sanity", "TailwindCSS", "Vercel"],
            faqs: []
          },
          {
            title: "MERN Stack Websites",
            slug: "mern-websites",
            description: "Data-intensive websites with complex backends and real-time features.",
            features: ["NoSQL databases", "GraphQL APIs", "Complex state", "Real-time updates"],
            outcomes: ["High flexibility", "Modular architecture", "Scalable"],
            deliverables: ["Full-stack repository", "Database schema", "API docs"],
            techStack: ["MongoDB", "Express", "React", "Node.js"],
            faqs: []
          },
          {
            title: "Landing Pages & Funnels",
            slug: "landing-pages",
            description: "High-conversion landing pages and sales funnels engineered for results.",
            features: ["A/B testing", "Trust signals", "Multi-step forms", "Analytics"],
            outcomes: ["Higher conversions", "Lower CAC", "Better ROI"],
            deliverables: ["Landing pages", "Funnel setup", "Analytics dashboard"],
            techStack: ["Next.js", "Framer Motion", "Analytics"],
            faqs: []
          },
          {
            title: "CMS Integration",
            slug: "cms-integration",
            description: "Headless CMS integration for flexible content management.",
            features: ["Headless CMS", "API-first", "Content versioning", "Multi-channel"],
            outcomes: ["Easy content updates", "Faster releases", "Scalable content"],
            deliverables: ["CMS setup", "Content models", "Admin training"],
            techStack: ["Sanity", "Contentful", "Strapi"],
            faqs: []
          }
        ]
      },
      {
        title: "SEO & Technical Services",
        slug: "seo-services",
        description: "Comprehensive SEO strategy and technical optimization for search dominance.",
        iconName: "Search",
        subServices: [
          {
            title: "Technical SEO Audit",
            slug: "technical-seo-audit",
            description: "Deep-dive analysis of site structure, indexability, and technical issues.",
            features: ["Crawl analysis", "Index coverage report", "Core Web Vitals assessment", "Structured data check"],
            outcomes: ["Identified technical issues", "Prioritized fix roadmap", "Baseline metrics"],
            deliverables: ["Comprehensive audit report", "Priority action items", "Technical recommendations"],
            techStack: ["SEO tools", "Google Search Console", "Lighthouse"],
            faqs: []
          },
          {
            title: "Keyword Research & Strategy",
            slug: "keyword-research",
            description: "Comprehensive keyword research and content strategy development.",
            features: ["Volume analysis", "Competitor research", "Intent mapping", "Content calendar"],
            outcomes: ["Ranked keywords", "Qualified traffic growth", "Lead generation"],
            deliverables: ["Master keyword list", "Content strategy document", "Editorial calendar"],
            techStack: ["Ahrefs", "SEMrush", "Google Keyword Planner"],
            faqs: []
          },
          {
            title: "On-Page SEO Optimization",
            slug: "on-page-seo",
            description: "Optimize content, metadata, and structure for search engines.",
            features: ["Title/meta tags", "Heading optimization", "Content structure", "Internal linking strategy"],
            outcomes: ["Better CTR", "Higher rankings", "Improved relevance"],
            deliverables: ["Optimized content", "Implementation guide", "Best practices doc"],
            techStack: ["Yoast", "SEO tools"],
            faqs: []
          },
          {
            title: "Technical SEO Implementation",
            slug: "technical-seo-impl",
            description: "Implement technical SEO improvements for crawlability and indexation.",
            features: ["Site speed optimization", "Mobile optimization", "Core Web Vitals fix", "XML sitemaps"],
            outcomes: ["Faster site", "Better indexing", "Passed Core Web Vitals"],
            deliverables: ["Implementation", "Monitoring setup", "Performance guide"],
            techStack: ["Next.js", "Lighthouse", "PageSpeed Insights"],
            faqs: []
          },
          {
            title: "Link Building & Authority Development",
            slug: "link-building",
            description: "Strategic link building to establish domain authority and topical relevance.",
            features: ["Link research", "Outreach campaign", "Competitor backlink analysis", "Authority strategy"],
            outcomes: ["Domain authority growth", "Referral traffic", "Rankings improvement"],
            deliverables: ["Outreach prospect list", "Campaign strategy", "Monthly reports"],
            techStack: ["Ahrefs", "Moz", "Outreach tools"],
            faqs: []
          },
          {
            title: "SEO Consulting & Strategy",
            slug: "seo-consulting",
            description: "Expert guidance and long-term SEO strategy for sustainable growth.",
            features: ["Quarterly strategy reviews", "Algorithm update guidance", "Competitive analysis", "Goal setting"],
            outcomes: ["Consistent growth", "Market leadership", "Qualified traffic"],
            deliverables: ["Strategy documents", "Quarterly reviews", "Actionable insights"],
            techStack: ["Analytics", "SEO tools"],
            faqs: []
          },
          {
            title: "Local SEO Services",
            slug: "local-seo",
            description: "Dominate local search results with Google My Business and local optimization.",
            features: ["GMB optimization", "Local citations", "Reviews management", "Local schema markup"],
            outcomes: ["Local search dominance", "In-person traffic", "Qualified leads"],
            deliverables: ["GMB optimization setup", "Citation building", "Local strategy"],
            techStack: ["Google My Business", "Yext", "Local SEO tools"],
            faqs: []
          },
          {
            title: "International SEO & Localization",
            slug: "international-seo",
            description: "Multi-language and multi-region SEO for global expansion.",
            features: ["hreflang implementation", "Language targeting", "Geo-targeting", "Regional optimization"],
            outcomes: ["Global rankings", "Multi-region traffic", "Proper localization"],
            deliverables: ["International setup", "Multi-language implementation", "Regional strategy"],
            techStack: ["Next.js i18n", "hreflang tool", "Analytics"],
            faqs: []
          }
        ]
      }
    ]
  },
  {
    title: "E-commerce Development",
    slug: "ecommerce",
    description: "High-conversion commerce engines and custom e-commerce solutions.",
    icon: "ShoppingCart",
    color: "from-green-500 to-emerald-500",
    categories: [
      {
        title: "E-commerce Solutions",
        slug: "ecommerce-solutions",
        description: "Complete e-commerce platforms from Shopify to custom builds.",
        iconName: "ShoppingCart",
        subServices: [
          {
            title: "Shopify Development",
            slug: "shopify-development",
            description: "Custom Shopify themes and apps that drive conversions.",
            features: ["Custom themes", "Shopify apps", "Payment integration", "Inventory sync"],
            outcomes: ["Unique brand identity", "Higher conversion rates", "Easy management"],
            deliverables: ["Custom Shopify theme", "App configuration", "Staff training"],
            techStack: ["Shopify", "Liquid", "Hydrogen"],
            faqs: []
          },
          {
            title: "WooCommerce Development",
            slug: "woocommerce-development",
            description: "Powerful WordPress e-commerce with custom functionality.",
            features: ["Custom plugins", "Payment gateways", "Shipping setup", "Inventory management"],
            outcomes: ["Full control", "Lower fees", "High customization"],
            deliverables: ["WooCommerce setup", "Custom plugins", "Documentation"],
            techStack: ["WordPress", "WooCommerce", "PHP"],
            faqs: []
          },
          {
            title: "Custom E-commerce Platforms",
            slug: "custom-ecommerce",
            description: "Bespoke e-commerce platforms for unique business models.",
            features: ["Custom payment logic", "Subscription models", "Multi-vendor support", "Advanced analytics"],
            outcomes: ["Perfect fit solution", "Unlimited scalability", "Competitive advantage"],
            deliverables: ["Full platform", "API", "Analytics dashboard"],
            techStack: ["Next.js", "Stripe", "PostgreSQL"],
            faqs: []
          },
          {
            title: "Conversion Rate Optimization",
            slug: "cro-ecommerce",
            description: "Systematic A/B testing and optimization to maximize revenue.",
            features: ["A/B testing", "User testing", "Heatmaps", "Checkout optimization"],
            outcomes: ["Higher AOV", "Lower cart abandonment", "Increased revenue"],
            deliverables: ["CRO audit", "Test plan", "Implementation"],
            techStack: ["Optimizely", "Hotjar", "Google Analytics"],
            faqs: []
          }
        ]
      }
    ]
  },
  {
    title: "Automation & Internal Tools",
    slug: "automation",
    description: "Workflow automation and internal tools that scale operations.",
    icon: "Zap",
    color: "from-orange-500 to-red-500",
    categories: [
      {
        title: "Automation Solutions",
        slug: "automation-solutions",
        description: "n8n automation and custom workflow solutions.",
        iconName: "Zap",
        subServices: [
          {
            title: "n8n Workflow Automation",
            slug: "n8n-automation",
            description: "Self-hosted workflow automation connecting your entire stack.",
            features: ["Complex logic workflows", "1000+ integrations", "Self-hosted control", "Webhook triggers"],
            outcomes: ["Thousands of hours saved", "Zero manual errors", "Unified operations"],
            deliverables: ["Custom workflows", "Self-hosting config", "Monitoring setup"],
            techStack: ["n8n", "Docker", "PostgreSQL"],
            faqs: []
          },
          {
            title: "API Integrations & Connectors",
            slug: "api-integrations",
            description: "Custom integrations connecting disparate business systems.",
            features: ["API development", "Real-time sync", "Error handling", "Data mapping"],
            outcomes: ["Unified data", "Eliminated manual work", "Better insights"],
            deliverables: ["Custom integration", "API wrapper", "Documentation"],
            techStack: ["Node.js", "APIs", "Webhooks"],
            faqs: []
          },
          {
            title: "Custom Dashboards & Analytics",
            slug: "dashboards",
            description: "Real-time dashboards for operational visibility and insights.",
            features: ["Real-time data", "Custom visualizations", "Drill-down analysis", "Alerts"],
            outcomes: ["Data-driven decisions", "Operational visibility", "Proactive management"],
            deliverables: ["Dashboard application", "Data pipeline", "Training"],
            techStack: ["React", "D3", "PostgreSQL"],
            faqs: []
          },
          {
            title: "Notion & ClickUp Systems",
            slug: "productivity-systems",
            description: "Custom Notion and ClickUp systems to organize teams.",
            features: ["Database design", "Automation rules", "Templates", "Process documentation"],
            outcomes: ["Better organization", "Team efficiency", "Knowledge management"],
            deliverables: ["System setup", "Automation rules", "Training"],
            techStack: ["Notion", "ClickUp", "Zapier"],
            faqs: []
          }
        ]
      }
    ]
  },
  {
    title: "DevOps & Cloud Services",
    slug: "devops",
    description: "Cloud infrastructure and deployment excellence.",
    icon: "Server",
    color: "from-slate-500 to-gray-500",
    categories: [
      {
        title: "Infrastructure & Deployment",
        slug: "infrastructure",
        description: "CI/CD pipelines and cloud infrastructure management.",
        iconName: "Server",
        subServices: [
          {
            title: "CI/CD & Deployment",
            slug: "cicd-deployment",
            description: "Automated testing and deployment pipelines for reliability.",
            features: ["GitHub Actions", "Docker containers", "Automated testing", "Zero-downtime deploys"],
            outcomes: ["Faster releases", "Fewer bugs", "Confident shipping"],
            deliverables: ["CI/CD pipeline", "Container setup", "Documentation"],
            techStack: ["GitHub Actions", "Docker", "Vercel"],
            faqs: []
          },
          {
            title: "Cloud Migration",
            slug: "cloud-migration",
            description: "Seamless migration from on-premise to cloud platforms.",
            features: ["Zero downtime", "Data integrity", "Security configuration", "Cost optimization"],
            outcomes: ["Lower costs", "Better reliability", "Global scalability"],
            deliverables: ["Migration plan", "Implementation", "Optimization"],
            techStack: ["AWS", "Azure", "GCP"],
            faqs: []
          },
          {
            title: "Monitoring & Observability",
            slug: "monitoring",
            description: "Comprehensive monitoring and logging for production systems.",
            features: ["Log aggregation", "Metrics collection", "Alerting", "Custom dashboards"],
            outcomes: ["Fast incident response", "Proactive issue detection", "Performance insights"],
            deliverables: ["Monitoring setup", "Dashboards", "Alert configuration"],
            techStack: ["Datadog", "LogRocket", "NewRelic"],
            faqs: []
          },
          {
            title: "Security & Hardening",
            slug: "security",
            description: "Security audits and hardening of applications and infrastructure.",
            features: ["Penetration testing", "Vulnerability scanning", "SSL/TLS setup", "WAF configuration"],
            outcomes: ["Reduced risk", "Compliance", "Customer trust"],
            deliverables: ["Security audit", "Hardening guide", "Implementation"],
            techStack: ["Security tools", "Cloudflare"],
            faqs: []
          }
        ]
      }
    ]
  }
];

// Flatten for backward compatibility
export const serviceCatalog: ServiceCategory[] = serviceDomains.flatMap(d => d.categories);

export const techLabs: TechLab[] = [
  {
    title: "The Next.js Hub",
    slug: "nextjs",
    description: "Our core laboratory for building high-performance, SEO-optimized web experiences.",
    iconName: "Zap",
    capabilities: ["SSR & SSG Optimization", "Edge Function Deployment", "Middleware Security"],
    relatedServices: ["full-stack-websites", "custom-software"]
  },
  {
    title: "The Shopify Lab",
    slug: "shopify",
    description: "Specialized engineering for high-growth merchants requiring custom commerce logic.",
    iconName: "ShoppingCart",
    capabilities: ["Liquid Engineering", "Hydrogen/Headless", "Private App Development"],
    relatedServices: ["ecommerce"]
  },
  {
    title: "The Automation Studio",
    slug: "n8n",
    description: "Where we architect complex workflows and integrate disparate systems.",
    iconName: "Code2",
    capabilities: ["Workflow Design", "Custom Nodes", "Self-hosted Infra"],
    relatedServices: ["automation"]
  }
];

export function getServiceBySlug(catSlug: string, subSlug?: string) {
  const category = serviceCatalog.find(c => c.slug === catSlug);
  if (!subSlug) return { category, subService: null };
  const subService = category?.subServices.find(s => s.slug === subSlug);
  return { category, subService: subService || null };
}

export function getDomainBySlug(slug: string) {
  return serviceDomains.find(d => d.slug === slug) || null;
}

export function getCategoriesByDomainSlug(domainSlug: string) {
  const domain = getDomainBySlug(domainSlug);
  return domain?.categories || [];
}

export function getTechLabBySlug(slug: string) {
  return techLabs.find(t => t.slug === slug) || null;
}
