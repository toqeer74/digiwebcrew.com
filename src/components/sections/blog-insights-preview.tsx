import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/content-engine";
import { localePath } from "@/lib/locale-path";
import { Container } from "@/components/layout/layout-primitives";
import { Button } from "@/components/ui/button";

interface BlogInsightsPreviewProps {
  locale: string;
  posts: BlogPost[];
}

export function BlogInsightsPreview({ locale, posts }: BlogInsightsPreviewProps) {
  return (
    <section className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] py-20 dark:border-white/10 dark:bg-midnight dark:bg-none">
      <Container className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                Insights
              </span>
              <h2 className="text-3xl font-display font-black text-foreground md:text-4xl">
                Web & Automation Insights
              </h2>
              <p className="site-card-muted mt-2 text-sm">
                Conversion, SEO, and automation strategy content built for growth-focused businesses.
              </p>
            </div>
            <Button href={localePath(locale, "/blog")} variant="ghost" size="sm" className="!px-0 !h-auto normal-case tracking-normal hover:underline">
              View All Insights <ArrowRight size={14} />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={localePath(locale, `/blog/${post.slug}`)} className="site-card site-card-interactive p-6">
                <span className="mb-3 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  {post.category}
                </span>
                <h3 className="mb-3 text-lg font-display font-bold text-foreground">{post.title}</h3>
                <p className="site-card-muted mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
                <div className="site-card-muted flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {format(new Date(post.date), "MMM dd, yyyy")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User size={12} />
                    {post.author}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="site-card site-card-muted p-8 text-center text-sm">
              Insights will appear here once blog content is published.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}


