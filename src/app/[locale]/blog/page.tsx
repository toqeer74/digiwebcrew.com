import { Container } from "@/components/layout/layout-primitives";
import { getBlogPosts } from "@/lib/content-engine";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionKicker } from "@/components/ui/section-kicker";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/blog",
    title: "Insights on Software, AI & Growth",
    description: "Practical guides on custom software, AI automation, technical SEO, and conversion, written by the engineers who build and ship them.",
    keywords: ["software development blog", "AI automation guides", "technical SEO blog"],
  });
}

export default async function BlogPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale } = await params;
  const { cat } = await searchParams;
  const dict = await getDictionary(locale);
  const allPosts = await getBlogPosts();
  const isRtl = locale === 'ar' || locale === 'ur';

  const categories = ["ALL", ...new Set(allPosts.map(p => p.category.toUpperCase()))];
  const activeCat = cat?.toUpperCase() || "ALL";

  const filteredPosts = activeCat === "ALL"
    ? allPosts
    : allPosts.filter(p => p.category.toUpperCase() === activeCat);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <SectionKicker label="Insights" />

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1] text-balance">
              Digital Systems <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Strategy & Insights.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed mx-auto">
              Deep dives into digital infrastructure, website performance, lead generation funnels, and real-world automation systems.
            </p>
          </AnimatedSection>


        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-20">
          {categories.map((c) => (
            <Link
              key={c}
              href={localePath(locale, `/blog${c === "ALL" ? "" : `?cat=${c.toLowerCase()}`}`)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                activeCat === c
                  ? "bg-[var(--site-primary)] border-[var(--site-primary-border)] text-white shadow-lg shadow-[var(--site-primary)]/20"
                  : "bg-card border-border hover:border-[var(--site-primary)]/50 text-muted-foreground"
              )}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {filteredPosts.map((post, idx) => (
            <AnimatedSection key={post.slug} delay={Math.min(idx, 6) * 0.05}>
              <Link
                href={localePath(locale, `/blog/${post.slug}`)}
                className="site-card site-card-interactive group flex h-full flex-col overflow-hidden p-0"
              >
                <div className="aspect-[16/10] bg-[rgba(var(--site-primary-rgb),0.06)] relative overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--site-primary)]/10 font-bold text-4xl select-none">
                      BLOG
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 rounded-md bg-[rgba(var(--site-primary-rgb),0.1)] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="site-card-muted flex items-center gap-1.5 text-xs font-medium">
                      <Calendar size={12} />
                      {format(new Date(post.date), "MMM dd, yyyy")}
                    </div>
                    <div className="site-card-muted flex items-center gap-1.5 text-xs font-medium">
                      <Clock size={12} />
                      {post.readingTime} min
                    </div>
                  </div>
                  <h3 className="site-card-title text-xl font-bold mb-3 group-hover:text-[var(--site-primary)] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="site-card-muted text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <User size={14} className="text-[var(--site-primary)]" />
                      {post.author}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-[var(--site-primary)] group-hover:text-white group-hover:border-[var(--site-primary-border)] transition-all">
                      <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="site-card site-card-muted text-center py-20 italic">
            No articles published yet. Check back soon!
          </div>
        )}
        </div>
      </Container>
    </main>

  );
}
