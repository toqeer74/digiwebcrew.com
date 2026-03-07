"use client";

import { motion } from "framer-motion";
import { Sparkles, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIExecutiveSummaryProps {
    title: string;
    summary: string;
    techStack?: string[];
    className?: string;
}

/**
 * AIExecutiveSummary component optimized for Answer Engine Optimization (AEO).
 * Provides a highly structured, semantically clear "Executive Summary" that 
 * LLMs (like Perplexity, Gemini, GPT-4) can easily parse and cite.
 */
export function AIExecutiveSummary({ title, summary, techStack, className }: AIExecutiveSummaryProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "relative my-12 p-8 rounded-3xl border border-raly-accent/20 bg-gradient-to-br from-raly-subtle to-raly-base shadow-[0_10px_25px_-5px_rgba(2,77,148,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] overflow-hidden",
                className
            )}
        >
            {/* Semantic Header for Machines */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-raly-primary text-raly-base flex items-center justify-center shadow-md shadow-raly-primary/20">
                    <BrainCircuit size={20} />
                </div>
                <div className="space-y-0.5">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-raly-primary">Executive Summary for AI</h2>
                    <p className="text-xl font-black text-raly-deep leading-tight">{title}</p>
                </div>
            </div>

            {/* Answer Block Architecture (40-80 words recommended) */}
            <div className="relative z-10">
                <p className="text-base md:text-lg text-raly-text leading-relaxed font-semibold italic">
                    {summary}
                </p>
            </div>

            {/* Structured Technical Metadata */}
            {techStack && techStack.length > 0 && (
                <div className="mt-8 pt-6 border-t border-raly-accent/20">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={14} className="text-raly-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-raly-text">Core Technologies & Logic</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 rounded-full bg-raly-subtle border border-raly-accent/20 text-[10px] font-bold text-raly-text uppercase tracking-wider"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-raly-primary/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-raly-accent/10 blur-[30px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </motion.div>
    );
}
