import { Container, Section } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, CheckCircle2, Monitor } from "lucide-react";
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
    <div className="flex flex-col min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32">
        <Container>
            <Link 
                href={localePath(locale, "/case-studies")} 
                className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-12"
            >
                <ChevronLeft size={16} className={isRtl ? "rotate-180" : ""} />
                {dict.caseStudies.back}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-32">
                {/* Main Content */}
                <div className="lg:col-span-8">
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                Case Study
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">{study.industry} • {study.year}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                            {study.title}
                        </h1>
                    </header>
                    
                    <div className="prose dark:prose-invert prose-zinc max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {study.content}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="p-8 rounded-3xl bg-secondary/20 border border-border sticky top-32">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                             <Monitor size={20} className="text-primary" />
                             Project Details
                        </h4>
                        
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Client</p>
                                <p className="font-bold text-xl">{study.client}</p>
                            </div>
                            
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{dict.caseStudies.techStack}</p>
                                <div className="flex flex-wrap gap-2">
                                    {study.techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-lg bg-background border text-xs font-bold">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{dict.caseStudies.outcomes}</p>
                                <ul className="space-y-3">
                                    {study.outcomes.map(outcome => (
                                        <li key={outcome} className="flex items-start gap-3 text-sm font-medium">
                                            <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Get Similar Results
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
