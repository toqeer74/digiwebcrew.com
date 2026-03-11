import { Container, Section } from "@/components/layout/layout-primitives";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { Calendar, User, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import { locales } from "@/types/i18n";
import { getBlogPosts, getBlogPost } from "@/lib/content-engine";
import { Metadata } from "next";
import { localePath } from "@/lib/locale-path";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    }
  };
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
  const dict = await getDictionary(locale);
  const post = await getBlogPost(slug);
  const isRtl = locale === 'ar' || locale === 'ur';

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 pt-32">
      <article>
        <Container className="max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <Link
              href={localePath(locale, "/blog")}
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ChevronLeft size={16} className={isRtl ? "rotate-180" : ""} />
              {dict.blog.back}
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Clock size={12} />
                5 {dict.common.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-8">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 pb-12 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none mb-1">{post.author}</p>
                  <p className="text-xs text-muted-foreground">Lab Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar size={14} />
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose dark:prose-invert prose-zinc max-w-none pb-32">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </Container>
      </article>
    </main>
  );
}
