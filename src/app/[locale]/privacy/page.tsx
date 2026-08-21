import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: "Privacy Policy",
    description: "How Digi Web Crew collects, uses, and protects your personal data, and the choices and rights you have over it.",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="flex-1 pt-32 pb-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="site-card p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent opacity-60" />
                        <div className="prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-muted-foreground prose-p:leading-relaxed">
                            <h1 className="text-4xl md:text-7xl mb-8 tracking-tighter">Privacy <span className="text-[var(--site-primary)]">Policy.</span></h1>
                            <p className="lead text-xl mb-12 font-bold opacity-60">Last updated: February 2026</p>

                            <p className="mb-8">At Digi Web Crew, we take data security and privacy seriously. This policy outlines how we handle your project details and personal information.</p>

                            <h2 className="text-2xl mt-12 mb-6">1. Data Collection</h2>
                            <p>We only collect data necessary for project scoping and communication, including your name, email address, and the project details you provide.</p>

                            <h2 className="text-2xl mt-12 mb-6">2. Encryption & Security</h2>
                            <p>All data is transmitted via secure SSL/TLS channels and stored in protected repositories, following industry-standard security practices.</p>

                            <h2 className="text-2xl mt-12 mb-6">3. Third-Party Disclosure</h2>
                            <p>Digi Web Crew does not sell or share your project details with external entities unless required by law or explicitly authorized for project execution purposes.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
