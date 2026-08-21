import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { Calendar, User, Clock, ChevronLeft, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/get-dictionary";
import { locales } from "@/types/i18n";
import { getBlogPosts, getBlogPost } from "@/lib/content-engine";
import { Metadata } from "next";
import { localePath } from "@/lib/locale-path";
import { buildPageMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCta } from "@/components/sections/blog-cta";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPost(slug);

  if (!post) return {};

  return buildPageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    ogImage: post.coverImage,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: [post.author],
  });
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return locales.flatMap((locale) =>
    posts.map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const [dict, post, allPosts] = await Promise.all([
    getDictionary(locale),
    getBlogPost(slug),
    getBlogPosts(),
  ]);
  const isRtl = locale === "ar" || locale === "ur";

  if (!post) {
    notFound();
  }

  // Same-category posts first, so "keep reading" stays topically relevant.
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);

  const schemas = [
    articleSchema({
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      path: `/blog/${post.slug}`,
      locale,
      datePublished: post.date,
      dateModified: post.updated,
      authorName: post.author,
      image: post.coverImage,
    }),
    breadcrumbSchema(locale, [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <main className="relative flex-1 overflow-hidden pt-32">
      <JsonLd schema={schemas} />

      {/* Ambient brand wash, consistent with the rest of the site */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px]">
        <div className="absolute left-1/2 top-0 h-[620px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/[0.10] via-[var(--site-primary)]/[0.03] to-transparent" />
      </div>

      <article>
        <Container className="max-w-4xl">
          {/* Header */}
          <AnimatedSection>
            <header className="mb-12">
              <Link
                href={localePath(locale, "/blog")}
                className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-[var(--site-primary)]"
              >
                <ChevronLeft size={16} className={isRtl ? "rotate-180" : ""} />
                {dict.blog.back}
              </Link>

              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-[rgba(var(--site-primary-rgb),0.1)] px-2 py-1 text-xs font-bold uppercase tracking-wider text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock size={12} />
                  {post.readingTime} {dict.common.readTime}
                </div>
              </div>

              <h1 className="mb-6 font-display text-4xl font-black leading-[1.1] tracking-tight text-midnight md:text-5xl lg:text-6xl dark:text-white">
                {post.title}
              </h1>

              <p className="mb-8 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 border-b pb-12">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-[var(--site-primary)]">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold leading-none">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.authorRole || "Engineer, Digi Web Crew"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </div>
                {post.updated && post.updated !== post.date && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <RefreshCw size={13} />
                    Updated {format(new Date(post.updated), "MMMM d, yyyy")}
                  </div>
                )}
              </div>
            </header>
          </AnimatedSection>

          {/* Cover */}
          {post.coverImage && (
            <AnimatedSection delay={0.05} className="mb-14">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-black/5 dark:bg-white/5">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          )}

          {/* Content */}
          <AnimatedSection delay={0.1} className="prose prose-zinc max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </AnimatedSection>

          {/* Conversion block */}
          <BlogCta locale={locale} />
        </Container>

        {/* Keep reading */}
        {related.length > 0 && (
          <Container className="max-w-6xl pb-32">
            <AnimatedSection className="border-t border-slate-200 pt-14 dark:border-white/10">
              <h2 className="mb-10 font-display text-2xl font-black tracking-tight text-midnight md:text-3xl dark:text-white">
                Keep reading
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={localePath(locale, `/blog/${p.slug}`)}
                    className="group block"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                      {p.category}
                    </p>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-midnight transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {p.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-primary)]">
                      Read
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </Container>
        )}
      </article>
    </main>
  );
}
