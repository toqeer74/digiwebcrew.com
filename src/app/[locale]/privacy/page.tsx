import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="flex-1 pt-32 pb-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="site-card p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent opacity-60" />
                        <div className="prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-[#94A3B8] prose-p:leading-relaxed">
                            <h1 className="text-4xl md:text-7xl mb-8 tracking-tighter">Privacy <span className="text-[var(--site-primary)]">Protocol.</span></h1>
                            <p className="lead text-xl mb-12 font-bold opacity-60">Last updated: February 2026</p>
                            
                            <p className="mb-8">At Digi Web Crew, we take data security and privacy with industrial seriousness. This protocol outlines how we handle your laboratory brief and personal identifiers.</p>
        
                            <h2 className="text-2xl mt-12 mb-6">1. Data Collection</h2>
                            <p>We only collect data necessary for project scoping and communication, including your name, secure email channel, and technical requirements provided in the lab brief.</p>
        
                            <h2 className="text-2xl mt-12 mb-6">2. Encryption & Security</h2>
                            <p>All data is transmitted via secure SSL/TLS channels and stored in protected repositories. We utilize the Security Core protocol to ensure zero data leakage.</p>
        
                            <h2 className="text-2xl mt-12 mb-6">3. Third-Party Disclosure</h2>
                            <p>Digi Web Crew does not sell or share your laboratory briefs with external entities unless required by law or explicitly authorized for project execution purposes.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
