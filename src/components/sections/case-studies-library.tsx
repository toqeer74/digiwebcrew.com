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

const categories = ["All", "Fintech", "AI & Automation", "E-commerce", "SaaS"];

function toCategory(industry?: string) {
    const ind = (industry || "").toLowerCase();
    if (ind.includes("fintech")) return "Fintech";
    if (ind.includes("e-commerce") || ind.includes("ecommerce") || ind.includes("shop")) return "E-commerce";
    if (ind.includes("saas")) return "SaaS";
    if (ind.includes("ai") || ind.includes("automation")) return "AI & Automation";
    return "All";
}

export function CaseStudiesLibrary({ studies }: { studies: CaseStudy[] }) {
    const params = useParams();
    const locale = (params as any)?.locale || "en";

    const [activeCategory, setActiveCategory] = useState("All");
    const { trackPortfolioProjectInteraction } = useToolTracking();

    const items = (studies || []).map((s) => {
        const category = toCategory(s.industry);
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

    const filtered = activeCategory === "All"
        ? items
        : items.filter(cs => cs.category === activeCategory);

    return (
        <section className="py-24 bg-white dark:bg-midnight-950">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raly-accent/20 text-raly-primary text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            Industrial Proof
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                            Selected Works & <br />
                            <span className="text-raly-primary">Engineering Outcomes</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat
                                    ? "bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900 shadow-xl"
                                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-200 dark:bg-midnight-900 dark:border-midnight-800 dark:text-gray-500"
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
                                href={`/${locale}/case-studies/${cs.slug}`}
                                onClick={() => {
                                    trackPortfolioProjectInteraction(
                                        cs.slug,
                                        'view_details',
                                        cs.tags.join(', ')
                                    );
                                }}
                                className="block"
                            >
                            <div className="relative aspect-[16/10] bg-gray-100 dark:bg-midnight-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-midnight-800 mb-8 transition-all group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-12">
                                    <div className="text-white">
                                        <p className="text-xs font-black uppercase tracking-widest text-raly-accent mb-2">KPI METRIC</p>
                                        <p className="text-4xl font-black">{cs.metrics}</p>
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
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-midnight-800 transition-transform duration-700 group-hover:scale-110">
                                        <div className="flex flex-col items-center gap-4 opacity-20 dark:opacity-40">
                                            <Search size={64} className="text-gray-400" />
                                            <p className="font-black uppercase tracking-widest text-sm text-gray-400">Project Snapshot</p>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute top-8 right-8 z-20">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </div>

                            </Link>

                            <div className="px-4 space-y-4">
                                <div className="flex gap-2">
                                    {cs.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 dark:border-midnight-800 px-2 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-raly-primary transition-colors">{cs.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-lg">{cs.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
