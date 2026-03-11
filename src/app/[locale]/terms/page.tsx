import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="flex-1 pt-32 pb-20">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="site-card p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent opacity-60" />
                        <div className="prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-[#94A3B8] prose-p:leading-relaxed">
                            <h1 className="text-4xl md:text-7xl mb-8 tracking-tighter">Terms of <span className="text-[var(--site-primary)]">Service.</span></h1>
                            <p className="lead text-xl mb-12 font-bold opacity-60">Last updated: February 2026</p>
                            
                            <p className="mb-8">By engaging with the Digi Web Crew digital environment, you agree to the following terms and operational protocols.</p>
        
                            <h2 className="text-2xl mt-12 mb-6">1. Engagement Protocol</h2>
                            <p>All laboratory briefs are subject to technical review. Digi Web Crew reserves the right to decline projects that do not align with our engineering standards or ethical guidelines.</p>
        
                            <h2 className="text-2xl mt-12 mb-6">2. Intellectual Property</h2>
                            <p>Upon final project delivery and full investment allocation, all custom code assets transfer to the client, unless otherwise specified in the project roadmap.</p>
        
                            <h2 className="text-2xl mt-12 mb-6">3. Liability Limits</h2>
                            <p>Digi Web Crew provides industrial-grade solutions but is not liable for indirect losses resulting from system usage beyond the scope defined in the technical agreement.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
