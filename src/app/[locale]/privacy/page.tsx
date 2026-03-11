import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return (
        <main className="flex-1 pt-40 pb-20">
            <Container>
                <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-black prose-headings:tracking-tight">
                    <h1>Privacy Policy</h1>
                    <p className="lead">Last updated: February 2026</p>
                    <p>At Digi Web Crew, we take data security and privacy with industrial seriousness. This protocol outlines how we handle your laboratory brief and personal identifiers.</p>

                    <h2>1. Data Collection</h2>
                    <p>We only collect data necessary for project scoping and communication, including your name, secure email channel, and technical requirements provided in the lab brief.</p>

                    <h2>2. Encryption & Security</h2>
                    <p>All data is transmitted via secure SSL/TLS channels and stored in protected repositories. We utilize the Security Core protocol to ensure zero data leakage.</p>

                    <h2>3. Third-Party Disclosure</h2>
                    <p>Digi Web Crew does not sell or share your laboratory briefs with external entities unless required by law or explicitly authorized for project execution purposes.</p>
                </div>
            </Container>
        </main>
    );
}
