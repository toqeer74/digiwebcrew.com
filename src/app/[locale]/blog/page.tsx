import { Container } from "@/components/layout/layout-primitives";
import { getBlogPosts } from "@/lib/content-engine";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowRight, BookOpen, Calendar, Clock, PenLine, Rss, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { buildPageMetadata, itemListSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const meta = buildPageMetadata({
    locale,
    path: "/blog",
    title: "Insights on Software, AI & Growth",
    description: "Practical guides on custom software, AI automation, technical SEO, and conversion, written by the engineers who build and ship them.",
    keywords: ["software development blog", "AI automation guides", "technical SEO blog"],
  });

  // RSS autodiscovery, so feed readers and aggregators can find the feed.
  meta.alternates = {
    ...meta.alternates,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  };
  return meta;
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
  const allPosts = await getBlogPosts();
  const isRtl = locale === 'ar' || locale === 'ur';

  // Categories keep their authored casing for display ("AI & Automation") and
  // are matched case-insensitively, so the filter pills read like prose rather
  // than shouting in caps.
  const categoryLabels = new Map<string, string>();
  for (const post of allPosts) {
    const key = post.category.toUpperCase();
    if (!categoryLabels.has(key)) categoryLabels.set(key, post.category);
  }

  const activeCat = cat?.trim().toUpperCase() || "ALL";
  const activeLabel = categoryLabels.get(activeCat);

  const filters = [
    { key: "ALL", label: "All articles", href: "/blog" },
    ...[...categoryLabels].map(([key, label]) => ({
      key,
      label,
      // encodeURIComponent matters here: categories such as "AI & Automation"
      // contain an ampersand, which would otherwise terminate the query string
      // and silently break the filter.
      href: `/blog?cat=${encodeURIComponent(label.toLowerCase())}`,
    })),
  ];

  const filteredPosts = activeCat === "ALL"
    ? allPosts
    : allPosts.filter((p) => p.category.toUpperCase() === activeCat);

  // The hero spotlights an editor's pick, falling back to the newest post so
  // the layout never collapses when nothing is flagged as featured.
  const spotlight = allPosts.find((p) => p.featured) ?? allPosts[0];

  const avgReadingTime = allPosts.length
    ? Math.round(allPosts.reduce((sum, p) => sum + (p.readingTime ?? 0), 0) / allPosts.length)
    : 0;

  const heroStats = [
    { value: `${allPosts.length}`, label: "Articles" },
    { value: `${categoryLabels.size}`, label: "Topics" },
    { value: `${avgReadingTime} min`, label: "Avg. read" },
  ];

  return (
    <main className="flex-1 pt-6 pb-24 overflow-hidden relative">
      <JsonLd
        schema={itemListSchema(
          locale,
          filteredPosts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }))
        )}
      />

      {/* Background Visuals — the same ambient wash the other top-level pages use */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container>
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">

          {/* Professional Hero Section */}
          <AnimatedSection immediate className="pt-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative">
              {/* LEFT: Typography */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="mx-auto lg:mx-0 mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                    <BookOpen size={12} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Insights</span>
                </div>

                <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black text-foreground leading-[1.05] tracking-tight text-balance mb-6">
                  Digital Systems <br className="hidden md:block" /> Strategy &amp; <span className="bg-gradient-to-r from-[var(--site-primary)] to-[#3b82f6] bg-clip-text text-transparent">Insights.</span>
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Deep dives into digital infrastructure, website performance, lead generation funnels, and real-world automation systems — written by the engineers who build and ship them.
                </p>

                {/* Signal strip, so a first-time reader can size up the library at a glance */}
                <dl className="mb-10 flex items-center justify-center divide-x divide-slate-200 lg:justify-start dark:divide-white/10">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="px-5 first:pl-0 last:pr-0">
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-display text-2xl font-black tracking-tight text-foreground">{stat.value}</dd>
                      <dd className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{stat.label}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="#articles" variant="primary" size="xl" className="group shadow-md shadow-[var(--site-primary)]/10">
                    <span>Browse Articles</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Button>
                  {/*
                    A plain anchor, not <Button>/next/link: the feed is a Route
                    Handler, so client-side navigation would fetch an RSC
                    payload that does not exist and fall back to a hard reload.
                  */}
                  <a
                    href="/blog/rss.xml"
                    className="inline-flex h-16 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-11 text-lg font-display font-semibold tracking-[0.01em] text-slate-900 shadow-sm outline-none transition-all hover:-translate-y-0.5 hover:bg-slate-50 focus:ring-2 focus:ring-[color:rgba(var(--site-primary-rgb),0.25)] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <Rss size={18} aria-hidden="true" />
                    <span>RSS Feed</span>
                  </a>
                </div>
              </div>

              {/* RIGHT: Editor's pick, framed in the window chrome the other hero visuals use */}
              {spotlight && (
                <div className="relative z-10 mx-auto w-full max-w-[520px] lg:ml-auto">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px] dark:bg-blue-500/5" />

                  <Link
                    href={localePath(locale, `/blog/${spotlight.slug}`)}
                    className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/50">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Editor&apos;s Pick
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-white/5">
                      {spotlight.coverImage && (
                        <Image
                          src={spotlight.coverImage}
                          alt={spotlight.title}
                          fill
                          priority
                          sizes="(min-width: 1024px) 520px, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                        {spotlight.category}
                      </span>
                    </div>

                    {/* pb-14 keeps the floating badge below from covering the "Read article" link */}
                    <div className="p-6 pb-14">
                      <div className="mb-3 flex flex-wrap items-center gap-2.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={12} aria-hidden="true" />
                          {format(new Date(spotlight.date), "MMM dd, yyyy")}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-current opacity-40" aria-hidden="true" />
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={12} aria-hidden="true" />
                          {spotlight.readingTime} min read
                        </span>
                      </div>

                      <h2 className="font-display text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                        {spotlight.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {spotlight.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                        Read article
                        <ArrowRight size={15} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180")} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>

                  {/* Floating badge, mirroring the about and contact hero visuals */}
                  <div className="absolute -bottom-8 -left-8 hidden w-60 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md lg:block dark:border-white/10 dark:bg-white/10">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                        <PenLine size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold leading-tight text-foreground">Written In-House</h3>
                        <p className="mt-0.5 text-[10px] font-medium text-muted-foreground">
                          By the engineers who ship the work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Filter toolbar */}
          <AnimatedSection id="articles" className="scroll-mt-32">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <nav
                  aria-label="Filter articles by topic"
                  className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
                >
                  {filters.map((f) => {
                    const isActive = activeCat === f.key;
                    return (
                      <Link
                        key={f.key}
                        href={localePath(locale, f.href)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-all",
                          isActive
                            ? "bg-[var(--site-primary)] text-white shadow-sm shadow-[var(--site-primary)]/25"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                        )}
                      >
                        {f.label}
                      </Link>
                    );
                  })}
                </nav>

                <p className="shrink-0 px-2 text-[13px] font-medium text-slate-500 lg:pl-4 dark:text-slate-400">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Article grid */}
          {filteredPosts.length > 0 ? (
            <section aria-label={activeLabel ? `${activeLabel} articles` : "All articles"}>
              <h2 className="mb-8 font-display text-2xl font-black tracking-tight text-foreground md:text-3xl">
                {activeLabel ?? "Latest articles"}
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {filteredPosts.map((post, idx) => (
                  <AnimatedSection key={post.slug} delay={Math.min(idx, 6) * 0.05} className="h-full">
                    <Link
                      href={localePath(locale, `/blog/${post.slug}`)}
                      className="site-card site-card-interactive group flex h-full flex-col overflow-hidden p-0"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[rgba(var(--site-primary-rgb),0.06)]">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex select-none items-center justify-center font-display text-4xl font-black text-[var(--site-primary)]/10">
                            BLOG
                          </div>
                        )}
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                          {post.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="site-card-muted mb-3 flex flex-wrap items-center gap-2.5 text-xs font-medium">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={12} aria-hidden="true" />
                            {format(new Date(post.date), "MMM dd, yyyy")}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-current opacity-40" aria-hidden="true" />
                          <span className="inline-flex items-center gap-1.5">
                            <Clock size={12} aria-hidden="true" />
                            {post.readingTime} min read
                          </span>
                        </div>

                        <h3 className="site-card-title mb-3 font-display text-[19px] font-bold leading-snug transition-colors group-hover:text-[var(--site-primary)]">
                          {post.title}
                        </h3>
                        <p className="site-card-muted mb-6 line-clamp-3 text-[15px] leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="site-card-divider mt-auto flex items-center justify-between border-t pt-4">
                          <span className="site-card-muted flex min-w-0 items-center gap-2 text-xs font-semibold">
                            <User size={14} className="shrink-0 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]" aria-hidden="true" />
                            <span className="truncate">{post.author}</span>
                          </span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-all group-hover:border-[var(--site-primary-border)] group-hover:bg-[var(--site-primary)] group-hover:text-white dark:border-white/10">
                            <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 py-20 text-center dark:border-white/10">
              <p className="text-[15px] text-slate-500 dark:text-slate-400">
                No articles in {activeLabel ?? "this topic"} yet.
              </p>
              <Link
                href={localePath(locale, "/blog")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]"
              >
                View all articles
                <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} aria-hidden="true" />
              </Link>
            </div>
          )}

          {/* Closing CTA, consistent with the case studies page */}
          <AnimatedSection className="overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center md:px-16 dark:bg-white/5">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              Want this applied to your business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300">
              Book a free 30-minute call with a senior engineer. We will pressure-test your approach and tell you what it would realistically take.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-slate-900 transition-all hover:-translate-y-0.5"
              >
                Book Consultation
                <ArrowRight size={16} className={cn("transition-transform group-hover:translate-x-1", isRtl && "rotate-180")} aria-hidden="true" />
              </Link>
              <Link
                href={localePath(locale, "/case-studies")}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                See Client Results
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
