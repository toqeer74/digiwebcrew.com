import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="flex-1 pt-40 pb-20">
            <Container>
                <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-black prose-headings:tracking-tight">
                    <h1>Terms of Service</h1>
                    <p className="lead">Last updated: February 2026</p>
                    <p>By engaging with the Digi Web Crew digital environment, you agree to the following terms and operational protocols.</p>

                    <h2>1. Engagement Protocol</h2>
                    <p>All laboratory briefs are subject to technical review. Digi Web Crew reserves the right to decline projects that do not align with our engineering standards or ethical guidelines.</p>

                    <h2>2. Intellectual Property</h2>
                    <p>Upon final project delivery and full investment allocation, all custom code assets transfer to the client, unless otherwise specified in the project roadmap.</p>

                    <h2>3. Liability Limits</h2>
                    <p>Digi Web Crew provides industrial-grade solutions but is not liable for indirect losses resulting from system usage beyond the scope defined in the technical agreement.</p>
                </div>
            </Container>
        </main>
    );
}
