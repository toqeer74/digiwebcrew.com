import { Container, Section } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getBlogPosts } from "@/lib/content-engine";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/locale-path";

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
    <div className="flex flex-col min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-6">{dict.blog.hubTitle}</h1>
            <p className="text-xl text-muted-foreground">
              {dict.blog.hubDesc}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-20">
            {categories.map((c) => (
              <Link
                key={c}
                href={localePath(locale, `/blog${c === "ALL" ? "" : `?cat=${c.toLowerCase()}`}`)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                  activeCat === c 
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "bg-card border-border hover:border-primary/50 text-muted-foreground"
                )}
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
            {filteredPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all active:scale-[0.98]"
              >
                <div className="aspect-[16/10] bg-secondary/50 relative overflow-hidden">
                    {/* Placeholder for real images */}
                    <div className="absolute inset-0 flex items-center justify-center text-primary/10 font-bold text-4xl select-none">
                        BLOG
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <Calendar size={12} />
                            {format(new Date(post.date), "MMM dd, yyyy")}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-2 text-xs font-bold">
                            <User size={14} className="text-primary" />
                            {post.author}
                         </div>
                         <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                         </div>
                    </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-dashed">
                <p className="text-muted-foreground italic">No articles published yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
