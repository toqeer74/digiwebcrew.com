"use client";

import { motion } from "framer-motion";
import { Container } from "../layout/layout-primitives";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import { useToolTracking } from "@/lib/tracking-hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { CaseStudy } from "@/lib/content-engine";
import { localePath } from "@/lib/locale-path";

const categories = [
    "Websites",
    "Funnels",
    "SEO",
    "Automation",
    "Dev Systems",
    "Technical"
];

function toCategory(industry?: string) {
    const ind = (industry || "").toLowerCase();
    if (ind.includes("automation") || ind.includes("ai")) return "Automation";
    if (ind.includes("seo")) return "SEO";
    if (ind.includes("funnel") || ind.includes("landing")) return "Funnels";
    if (ind.includes("devops") || ind.includes("cloud") || ind.includes("infrastructure")) return "Technical";
    if (ind.includes("saas") || ind.includes("fintech")) return "Dev Systems";
    return "Websites";
}

export function CaseStudiesLibrary({ studies }: { studies: CaseStudy[] }) {
    const params = useParams();
    const locale = (params as any)?.locale || "en";

    const [activeCategory, setActiveCategory] = useState("Websites");
    const { trackPortfolioProjectInteraction } = useToolTracking();

    const items = (studies || []).map((s) => {
        const category = toCategory(`${s.industry} ${s.title} ${(s.techStack || []).join(" ")}`);
        return {
            slug: s.slug,
            title: s.title,
            category,
            metrics: s.outcomes?.[0] || "",
            description: s.excerpt,
            image: s.coverImage,
            tags: s.techStack || [],
        };
    });

    const filtered = items.filter(cs => cs.category === activeCategory);

    return (
        <section className="py-24 bg-[#0A0A0F] border-b border-[#1E1E2E]">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/30 mb-4"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
                            <span className="text-xs font-body font-semibold uppercase tracking-widest text-[#6366F1]">
                                Industrial Proof
                            </span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-[#F8F8FF] tracking-tight leading-tight">
                            Selected Works & <br />
                            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Engineering Outcomes</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-xs font-body font-semibold uppercase tracking-wider transition-all border ${activeCategory === cat
                                    ? "bg-[#6366F1] border-[#6366F1] text-white shadow-lg"
                                    : "bg-[#13131E] border-[#1E1E2E] text-[#94A3B8] hover:border-[#6366F1]/30 hover:text-[#F8F8FF]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filtered.map((cs, idx) => (
                        <motion.div
                            key={cs.title}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link
                                href={localePath(locale, `/case-studies/${cs.slug}`)}
                                onClick={() => {
                                    trackPortfolioProjectInteraction(
                                        cs.slug,
                                        'view_details',
                                        cs.tags.join(', ')
                                    );
                                }}
                                className="block"
                            >
                            <div className="relative aspect-[16/10] bg-[#13131E] rounded-xl overflow-hidden border border-[#1E1E2E] mb-8 transition-all group-hover:border-[#6366F1]/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-12">
                                    <div className="text-white">
                                        <p className="text-xs font-body font-semibold uppercase tracking-widest text-[#6366F1] mb-2">KPI METRIC</p>
                                        <p className="text-4xl font-display font-bold">{cs.metrics}</p>
                                    </div>
                                </div>

                                {cs.image ? (
                                    <Image
                                        src={cs.image}
                                        alt={cs.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#13131E] transition-transform duration-700 group-hover:scale-110">
                                        <div className="flex flex-col items-center gap-4 opacity-30">
                                            <Search size={64} className="text-[#94A3B8]" />
                                            <p className="font-body font-semibold uppercase tracking-widest text-sm text-[#94A3B8]">Project Snapshot</p>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-8 right-8 z-20">
                                    <div className="w-12 h-12 rounded-lg bg-[#6366F1]/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </div>

                            </Link>

                            <div className="px-4 space-y-4">
                                <div className="flex gap-2 flex-wrap">
                                    {cs.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-body font-semibold text-[#94A3B8] uppercase tracking-widest border border-[#1E1E2E] px-2 py-0.5 rounded bg-[#13131E]/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-display font-black text-[#F8F8FF] group-hover:text-[#6366F1] transition-colors">{cs.title}</h3>
                                <p className="text-[#94A3B8] font-body leading-relaxed max-w-lg">{cs.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
