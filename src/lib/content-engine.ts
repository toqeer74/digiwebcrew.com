import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_PATH = path.join(process.cwd(), "content");

function resolveContentFilePath(fileName: string, locale?: string): string {
    if (locale) {
        const localizedPath = path.join(CONTENT_PATH, "locales", locale, fileName);
        if (fs.existsSync(localizedPath)) {
            return localizedPath;
        }
    }

    return path.join(CONTENT_PATH, fileName);
}

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage?: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
    const blogDir = path.join(CONTENT_PATH, "blog");
    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);
    const posts = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const filePath = path.join(blogDir, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            
            return {
                slug: file.replace(".md", ""),
                title: data.title,
                date: data.date,
                author: data.author,
                excerpt: data.excerpt,
                category: data.category,
                coverImage: data.coverImage,
                content,
            };
        });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const filePath = path.join(CONTENT_PATH, "blog", `${slug}.md`);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
            slug,
            title: data.title,
            date: data.date,
            author: data.author,
            excerpt: data.excerpt,
            category: data.category,
            coverImage: data.coverImage,
            content,
        };
    } catch {
        return null;
    }
}

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  excerpt: string;
  outcomes: string[];
  techStack: string[];
  content: string;
  coverImage?: string;
};

export type ReviewBadge = {
  label: string;
  meta: string;
  href: string;
};

export type TestimonialReview = {
  name: string;
  role: string;
  content: string;
  rating: number;
  source: string;
  sourceUrl: string;
};

export type TestimonialsData = {
  reviewBadges: ReviewBadge[];
  testimonials: TestimonialReview[];
  trustSignals: string[];
};

export type ClientLogosData = {
  heading: string;
  logos: string[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
};

export type TeamData = {
  heading: string;
  members: TeamMember[];
};

export type TrustedPlatformsData = {
  eyebrow: string;
  heading: string;
  platformsTitle: string;
  trustSignalsTitle: string;
  platforms: string[];
  trustSignals: string[];
  note: string;
};

export type PricingPackage = {
  label: string;
  price: string;
  timeline: string;
  fit: string;
};

export type PricingComparisonRow = {
  label: string;
  value: string;
};

export type HomePricingData = {
  title: string;
  packages: PricingPackage[];
  comparisonTitle: string;
  comparisonRows: PricingComparisonRow[];
};

export type HomepageProofStat = {
  num: string;
  label: string;
};

export type HomepageFaqItem = {
  value: string;
  title: string;
  content: string;
};

export type HomepageData = {
  selectedWork: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  methodology: {
    eyebrow: string;
    title: string;
    steps: string[];
    ctaLabel: string;
  };
  capabilitiesSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  proofCaption: string;
  industriesSection: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
  };
  aiSection: {
    eyebrow: string;
    title: string;
    bullets: string[];
  };
  enterpriseBlock: {
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
  };
  finalCta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  capabilities: string[];
  industries: string[];
  proofStats: HomepageProofStat[];
  faq: HomepageFaqItem[];
};

export async function getCaseStudies(): Promise<CaseStudy[]> {
    const studiesDir = path.join(CONTENT_PATH, "case-studies");
    if (!fs.existsSync(studiesDir)) return [];

    const files = fs.readdirSync(studiesDir);
    const studies = files
        .filter((file) => file.endsWith(".md"))
        .map((file) => {
            const filePath = path.join(studiesDir, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);
            
            return {
                slug: file.replace(".md", ""),
                title: data.title,
                client: data.client,
                industry: data.industry,
                year: data.year,
                excerpt: data.excerpt,
                outcomes: data.outcomes || [],
                techStack: data.techStack || [],
                coverImage: data.coverImage,
                content,
            };
        });

    return studies.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
    try {
        const filePath = path.join(CONTENT_PATH, "case-studies", `${slug}.md`);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        return {
            slug,
            title: data.title,
            client: data.client,
            industry: data.industry,
            year: data.year,
            excerpt: data.excerpt,
            outcomes: data.outcomes || [],
            techStack: data.techStack || [],
            coverImage: data.coverImage,
            content,
        };
    } catch {
        return null;
    }
}

export async function getTestimonialsData(locale?: string): Promise<TestimonialsData> {
    const filePath = resolveContentFilePath("testimonials.json", locale);
    const fallback: TestimonialsData = {
        reviewBadges: [],
        testimonials: [],
        trustSignals: [],
    };

    try {
        if (!fs.existsSync(filePath)) return fallback;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent) as Partial<TestimonialsData>;

        return {
            reviewBadges: Array.isArray(parsed.reviewBadges) ? parsed.reviewBadges : [],
            testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : [],
            trustSignals: Array.isArray(parsed.trustSignals) ? parsed.trustSignals : [],
        };
    } catch {
        return fallback;
    }
}

export async function getClientLogosData(locale?: string): Promise<ClientLogosData> {
    const filePath = resolveContentFilePath("client-logos.json", locale);
    const fallback: ClientLogosData = {
        heading: "Trusted by growing brands and ambitious businesses",
        logos: [],
    };

    try {
        if (!fs.existsSync(filePath)) return fallback;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent) as Partial<ClientLogosData>;

        return {
            heading: typeof parsed.heading === "string" ? parsed.heading : fallback.heading,
            logos: Array.isArray(parsed.logos) ? parsed.logos : [],
        };
    } catch {
        return fallback;
    }
}

export async function getTeamData(locale?: string): Promise<TeamData> {
    const filePath = resolveContentFilePath("team.json", locale);
    const fallback: TeamData = {
        heading: "Meet the Team Behind DigiWebCrew",
        members: [],
    };

    try {
        if (!fs.existsSync(filePath)) return fallback;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent) as Partial<TeamData>;

        return {
            heading: typeof parsed.heading === "string" ? parsed.heading : fallback.heading,
            members: Array.isArray(parsed.members)
                ? parsed.members.filter(
                    (member): member is TeamMember =>
                        !!member &&
                        typeof member.name === "string" &&
                        typeof member.role === "string" &&
                        typeof member.bio === "string" &&
                        Array.isArray(member.expertise)
                  )
                : [],
        };
    } catch {
        return fallback;
    }
}

export async function getTrustedPlatformsData(locale?: string): Promise<TrustedPlatformsData> {
    const filePath = resolveContentFilePath("trusted-platforms.json", locale);
    const fallback: TrustedPlatformsData = {
        eyebrow: "Credibility",
        heading: "Trusted Platforms & Verified Expertise",
        platformsTitle: "Platforms & Ecosystems We Build With",
        trustSignalsTitle: "Verified Trust Signals",
        platforms: [],
        trustSignals: [],
        note: "Tools we use are listed separately from formal credentials to keep trust claims accurate.",
    };

    try {
        if (!fs.existsSync(filePath)) return fallback;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent) as Partial<TrustedPlatformsData>;

        return {
            eyebrow: typeof parsed.eyebrow === "string" ? parsed.eyebrow : fallback.eyebrow,
            heading: typeof parsed.heading === "string" ? parsed.heading : fallback.heading,
            platformsTitle: typeof parsed.platformsTitle === "string" ? parsed.platformsTitle : fallback.platformsTitle,
            trustSignalsTitle: typeof parsed.trustSignalsTitle === "string" ? parsed.trustSignalsTitle : fallback.trustSignalsTitle,
            platforms: Array.isArray(parsed.platforms) ? parsed.platforms.filter((item): item is string => typeof item === "string") : [],
            trustSignals: Array.isArray(parsed.trustSignals) ? parsed.trustSignals.filter((item): item is string => typeof item === "string") : [],
            note: typeof parsed.note === "string" ? parsed.note : fallback.note,
        };
    } catch {
        return fallback;
    }
}

export async function getHomePricingData(locale?: string): Promise<HomePricingData> {
    const filePath = resolveContentFilePath("pricing-home.json", locale);
    const fallback: HomePricingData = {
        title: "Transparent Starting Prices",
        packages: [],
        comparisonTitle: "Quick Package Comparison",
        comparisonRows: [],
    };

    try {
        if (!fs.existsSync(filePath)) return fallback;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent) as Partial<HomePricingData>;

        return {
            title: typeof parsed.title === "string" ? parsed.title : fallback.title,
            packages: Array.isArray(parsed.packages)
                ? parsed.packages.filter(
                    (item): item is PricingPackage =>
                        !!item &&
                        typeof item.label === "string" &&
                        typeof item.price === "string" &&
                        typeof item.timeline === "string" &&
                        typeof item.fit === "string"
                  )
                : [],
            comparisonTitle: typeof parsed.comparisonTitle === "string" ? parsed.comparisonTitle : fallback.comparisonTitle,
            comparisonRows: Array.isArray(parsed.comparisonRows)
                ? parsed.comparisonRows.filter(
                    (item): item is PricingComparisonRow =>
                        !!item &&
                        typeof item.label === "string" &&
                        typeof item.value === "string"
                  )
                : [],
        };
    } catch {
        return fallback;
    }
}

export async function getHomepageData(locale?: string): Promise<HomepageData> {
    const filePath = resolveContentFilePath("homepage.json", locale);
    const fallback: HomepageData = {
        selectedWork: {
            eyebrow: "Portfolio",
            title: "Selected Work",
            description: "",
            ctaLabel: "View Work",
        },
        methodology: {
            eyebrow: "Methodology",
            title: "A Clear Process from Strategy to Launch",
            steps: [],
            ctaLabel: "View Full Process",
        },
        capabilitiesSection: {
            eyebrow: "Our Stack",
            title: "Built for More Than Basic Websites",
            description: "",
        },
        proofCaption: "",
        industriesSection: {
            eyebrow: "Industries",
            title: "Built for High-Value, Growth-Focused Industries",
            description: "",
            ctaLabel: "View Industries We Serve",
        },
        aiSection: {
            eyebrow: "AI Automation",
            title: "AI Where It Actually Improves Growth",
            bullets: [],
        },
        enterpriseBlock: {
            titlePrefix: "Architect Your",
            titleAccent: "Enterprise",
            titleSuffix: "Future",
            description: "",
        },
        finalCta: {
            title: "Ready to turn your website into a growth system?",
            description: "",
            primaryLabel: "Book Consultation",
            secondaryLabel: "Get Custom Quote",
        },
        capabilities: [],
        industries: [],
        proofStats: [],
        faq: [],
    };

    try {
        if (!fs.existsSync(filePath)) return fallback;
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(fileContent) as Partial<HomepageData>;

        return {
            selectedWork: {
                eyebrow:
                    typeof parsed.selectedWork?.eyebrow === "string"
                        ? parsed.selectedWork.eyebrow
                        : fallback.selectedWork.eyebrow,
                title:
                    typeof parsed.selectedWork?.title === "string"
                        ? parsed.selectedWork.title
                        : fallback.selectedWork.title,
                description:
                    typeof parsed.selectedWork?.description === "string"
                        ? parsed.selectedWork.description
                        : fallback.selectedWork.description,
                ctaLabel:
                    typeof parsed.selectedWork?.ctaLabel === "string"
                        ? parsed.selectedWork.ctaLabel
                        : fallback.selectedWork.ctaLabel,
            },
            methodology: {
                eyebrow:
                    typeof parsed.methodology?.eyebrow === "string"
                        ? parsed.methodology.eyebrow
                        : fallback.methodology.eyebrow,
                title:
                    typeof parsed.methodology?.title === "string"
                        ? parsed.methodology.title
                        : fallback.methodology.title,
                steps:
                    Array.isArray(parsed.methodology?.steps)
                        ? parsed.methodology.steps.filter((item): item is string => typeof item === "string")
                        : [],
                ctaLabel:
                    typeof parsed.methodology?.ctaLabel === "string"
                        ? parsed.methodology.ctaLabel
                        : fallback.methodology.ctaLabel,
            },
            capabilitiesSection: {
                eyebrow:
                    typeof parsed.capabilitiesSection?.eyebrow === "string"
                        ? parsed.capabilitiesSection.eyebrow
                        : fallback.capabilitiesSection.eyebrow,
                title:
                    typeof parsed.capabilitiesSection?.title === "string"
                        ? parsed.capabilitiesSection.title
                        : fallback.capabilitiesSection.title,
                description:
                    typeof parsed.capabilitiesSection?.description === "string"
                        ? parsed.capabilitiesSection.description
                        : fallback.capabilitiesSection.description,
            },
            proofCaption: typeof parsed.proofCaption === "string" ? parsed.proofCaption : fallback.proofCaption,
            industriesSection: {
                eyebrow:
                    typeof parsed.industriesSection?.eyebrow === "string"
                        ? parsed.industriesSection.eyebrow
                        : fallback.industriesSection.eyebrow,
                title:
                    typeof parsed.industriesSection?.title === "string"
                        ? parsed.industriesSection.title
                        : fallback.industriesSection.title,
                description:
                    typeof parsed.industriesSection?.description === "string"
                        ? parsed.industriesSection.description
                        : fallback.industriesSection.description,
                ctaLabel:
                    typeof parsed.industriesSection?.ctaLabel === "string"
                        ? parsed.industriesSection.ctaLabel
                        : fallback.industriesSection.ctaLabel,
            },
            aiSection: {
                eyebrow:
                    typeof parsed.aiSection?.eyebrow === "string"
                        ? parsed.aiSection.eyebrow
                        : fallback.aiSection.eyebrow,
                title:
                    typeof parsed.aiSection?.title === "string"
                        ? parsed.aiSection.title
                        : fallback.aiSection.title,
                bullets:
                    Array.isArray(parsed.aiSection?.bullets)
                        ? parsed.aiSection.bullets.filter((item): item is string => typeof item === "string")
                        : [],
            },
            enterpriseBlock: {
                titlePrefix:
                    typeof parsed.enterpriseBlock?.titlePrefix === "string"
                        ? parsed.enterpriseBlock.titlePrefix
                        : fallback.enterpriseBlock.titlePrefix,
                titleAccent:
                    typeof parsed.enterpriseBlock?.titleAccent === "string"
                        ? parsed.enterpriseBlock.titleAccent
                        : fallback.enterpriseBlock.titleAccent,
                titleSuffix:
                    typeof parsed.enterpriseBlock?.titleSuffix === "string"
                        ? parsed.enterpriseBlock.titleSuffix
                        : fallback.enterpriseBlock.titleSuffix,
                description:
                    typeof parsed.enterpriseBlock?.description === "string"
                        ? parsed.enterpriseBlock.description
                        : fallback.enterpriseBlock.description,
            },
            finalCta: {
                title:
                    typeof parsed.finalCta?.title === "string"
                        ? parsed.finalCta.title
                        : fallback.finalCta.title,
                description:
                    typeof parsed.finalCta?.description === "string"
                        ? parsed.finalCta.description
                        : fallback.finalCta.description,
                primaryLabel:
                    typeof parsed.finalCta?.primaryLabel === "string"
                        ? parsed.finalCta.primaryLabel
                        : fallback.finalCta.primaryLabel,
                secondaryLabel:
                    typeof parsed.finalCta?.secondaryLabel === "string"
                        ? parsed.finalCta.secondaryLabel
                        : fallback.finalCta.secondaryLabel,
            },
            capabilities: Array.isArray(parsed.capabilities)
                ? parsed.capabilities.filter((item): item is string => typeof item === "string")
                : [],
            industries: Array.isArray(parsed.industries)
                ? parsed.industries.filter((item): item is string => typeof item === "string")
                : [],
            proofStats: Array.isArray(parsed.proofStats)
                ? parsed.proofStats.filter(
                    (item): item is HomepageProofStat =>
                        !!item && typeof item.num === "string" && typeof item.label === "string"
                  )
                : [],
            faq: Array.isArray(parsed.faq)
                ? parsed.faq.filter(
                    (item): item is HomepageFaqItem =>
                        !!item &&
                        typeof item.value === "string" &&
                        typeof item.title === "string" &&
                        typeof item.content === "string"
                  )
                : [],
        };
    } catch {
        return fallback;
    }
}

