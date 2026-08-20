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
        <div className="bg-transparent flex flex-col h-full min-h-[500px]">
            {/* Compact Header & Filters */}
            <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-4">
                    <Search size={14} className="text-[var(--site-primary)]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Project Explorer</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                ? "bg-[var(--site-primary)] border-[var(--site-primary)] text-white shadow-md shadow-[var(--site-primary)]/20"
                                : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-[var(--site-primary)]/30 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Results Grid */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[600px] custom-scrollbar">
                <div className="grid grid-cols-1 gap-6">
                    {filtered.map((cs, idx) => (
                        <motion.div
                            key={cs.title}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group cursor-pointer block rounded-2xl bg-white dark:bg-midnight border border-slate-100 dark:border-white/5 overflow-hidden hover:border-[var(--site-primary)]/30 transition-all shadow-sm"
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
                                <div className="relative aspect-[16/9] bg-slate-100 dark:bg-white/5 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                                        <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 mb-1">KPI METRIC</p>
                                            <p className="text-lg font-display font-black">{cs.metrics || "View Project"}</p>
                                        </div>
                                    </div>

                                    {cs.image ? (
                                        <Image
                                            src={cs.image}
                                            alt={cs.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                         <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-white/5 transition-transform duration-700 group-hover:scale-105">
                                            <div className="flex flex-col items-center gap-2 opacity-30">
                                                <Search size={32} className="text-muted-foreground" />
                                                <p className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Snapshot</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 z-20">
                                        <div className="w-8 h-8 rounded-full bg-[var(--site-primary)]/90 backdrop-blur-sm flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-md">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="p-4 space-y-3">
                                <div className="flex gap-1.5 flex-wrap">
                                    {cs.tags.slice(0,3).map(tag => (
                                         <span key={tag} className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="text-sm font-display font-black text-foreground group-hover:text-[var(--site-primary)] transition-colors leading-tight mb-1">{cs.title}</h3>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2">{cs.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-slate-400 text-xs font-medium">
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

