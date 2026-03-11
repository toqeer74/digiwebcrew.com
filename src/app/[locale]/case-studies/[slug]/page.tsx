import { Container, Section } from "@/components/layout/layout-primitives";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, CheckCircle2, Monitor, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { locales } from "@/types/i18n";
import { getCaseStudies, getCaseStudy } from "@/lib/content-engine";
import { Metadata } from "next";
import { localePath } from "@/lib/locale-path";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const study = await getCaseStudy(slug);

    if (!study) return {};

    return {
        title: `${study.client} | ${study.title}`,
        description: study.excerpt,
        openGraph: {
            title: `${study.client} | ${study.title}`,
            description: study.excerpt,
            type: "website",
        }
    };
}

export async function generateStaticParams() {
    const studies = await getCaseStudies();
    return locales.flatMap((locale) =>
        studies.map((study) => ({
            locale,
            slug: study.slug,
        }))
    );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
    const { slug, locale } = await params;
    const dict = await getDictionary(locale);
    const study = await getCaseStudy(slug);
    const isRtl = locale === 'ar' || locale === 'ur';

    if (!study) {
        notFound();
    }

    return (
        <main className="flex-1 pt-32 pb-24">
            <Container>
                <Link
                    href={localePath(locale, "/case-studies")}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#94A3B8] hover:text-[#6366F1] transition-colors mb-12"
                >
                    <ChevronLeft size={16} className={isRtl ? "rotate-180" : ""} />
                    {dict.caseStudies.back}
                </Link>

                <div className="flex flex-col items-center text-center pb-24 max-w-4xl mx-auto">
                    {/* Main Content */}
                    <header className="mb-16 space-y-6">
                        <div className="flex items-center justify-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-[#6366F1]/20 text-[#6366F1] text-xs font-bold uppercase tracking-widest">
                                Industrial Case Study
                            </span>
                            <span className="text-sm font-semibold text-[#94A3B8]">{study.industry} • {study.year}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#F8F8FF]">
                            {study.title}
                        </h1>
                    </header>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
                    <div className="lg:col-span-8">

                        <div className="prose prose-invert prose-zinc max-w-none text-[#94A3B8]">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {study.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="site-card p-10 sticky top-32 space-y-10">
                            <h4 className="font-bold text-2xl flex items-center gap-3 text-[#F8F8FF]">
                                <Monitor size={24} className="text-[#6366F1]" />
                                Project Scope
                            </h4>

                            <div className="space-y-8">
                                <div className="site-card-divider pt-2">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] mb-3">Client Partnership</p>
                                    <p className="font-black text-2xl text-[#F8F8FF] leading-tight">{study.client}</p>
                                </div>

                                <div className="site-card-divider pt-2">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] mb-4">{dict.caseStudies.techStack}</p>
                                    <div className="flex flex-wrap gap-3">
                                        {study.techStack.map(tech => (
                                            <span key={tech} className="site-card px-3 py-1.5 text-xs font-bold text-[#94A3B8]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="site-card-divider pt-2">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#94A3B8] mb-4">{dict.caseStudies.outcomes}</p>
                                    <ul className="space-y-4">
                                        {study.outcomes.map(outcome => (
                                            <li key={outcome} className="flex items-start gap-4 text-[15px] font-medium text-[#94A3B8] leading-relaxed">
                                                <CheckCircle2 size={18} className="text-[#6366F1] shrink-0 mt-0.5" />
                                                {outcome}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button className="flex w-full items-center justify-center gap-4 rounded-full bg-[#6366F1] py-5 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.6)] transition-all duration-300 hover:bg-[#6366F1]/90">
                                    <span>Get Similar Results</span>
                                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
