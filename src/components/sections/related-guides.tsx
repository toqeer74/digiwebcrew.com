import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { getBlogPosts } from "@/lib/content-engine";
import { localePath } from "@/lib/locale-path";

/**
 * Renders the guides that support this page's topic.
 *
 * Slugs that do not resolve to a real post are dropped rather than rendered as
 * dead links, so a typo in the cluster map degrades quietly instead of shipping
 * a 404 into the internal link graph.
 */
export async function RelatedGuides({
  locale,
  slugs,
  heading = "Related guides",
  intro,
}: {
  locale: string;
  slugs: string[];
  heading?: string;
  intro?: string;
}) {
  const all = await getBlogPosts();
  const posts = slugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-slate-200 py-20 dark:border-white/10">
      <Container>
        <AnimatedSection className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center gap-2 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
            <BookOpen size={17} />
            <span className="text-xs font-bold uppercase tracking-[0.18em]">Further reading</span>
          </div>

          <h2 className="font-display text-2xl font-black tracking-tight text-midnight md:text-3xl dark:text-white">
            {heading}
          </h2>
          {intro && (
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">
              {intro}
            </p>
          )}

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group block"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                  {post.category}
                </p>
                <h3 className="mt-3 text-[17px] font-bold leading-snug text-midnight transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-primary)]">
                  {post.readingTime} min read
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
