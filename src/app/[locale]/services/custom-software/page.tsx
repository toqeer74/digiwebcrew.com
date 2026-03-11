import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import { localePath } from "@/lib/locale-path";

const legacyFeatures = [
  "Enterprise Architecture",
  "Microservices Design",
  "Scalable Cloud APIs",
  "Legacy system migration",
];

const legacyTechStack = ["Next.js", "TypeScript", "PostgreSQL", "Docker"];

const legacyOutcomes = [
  "99.9% System Availability",
  "Scalability for 1M+ Users",
  "zero legacy debt architecture",
  "Reduced Operational Costs",
];

const webDevRelatedServices = [
  { label: "Custom Web Apps", href: "/services/custom-web-apps" },
  { label: "Full-Stack Websites", href: "/services/full-stack-websites" },
  { label: "E-commerce Development", href: "/services/ecommerce" },
  { label: "DevOps & Cloud", href: "/services/devops-cloud" },
  { label: "Maintenance & Support", href: "/services/maintenance-support" },
  { label: "Conversion Funnels", href: "/services/conversion-funnels" },
  { label: "AI Chatbots & Automation", href: "/services/ai-chatbots-automation" },
  { label: "SEO & Growth Retainers", href: "/services/seo-growth-retainers" },
];

export default async function CustomSoftwarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8 mb-10">
            <AnimatedSection className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
                Get a Custom Software Scope Built Around Your Business Goals
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                Share your requirements and constraints for custom software, and we will map the right architecture, scope, and next implementation path.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#custom-software-scope" className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Start Custom Software Scope
                </a>
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Book Consultation
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="max-w-5xl mx-auto space-y-8 mb-10">
            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Custom Software Engineering Solutions</h2>
              <p className="text-[#94A3B8]">
                We build industrial-grade applications designed to solve unique business challenges with scalable architecture and clean code.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#F8F8FF] mb-4">Core Engineering Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {legacyFeatures.map((item) => (
                  <div key={item} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#F8F8FF] mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {legacyTechStack.map((item) => (
                  <span key={item} className="px-3 py-2 rounded-full border border-[#1E1E2E] text-sm text-[#94A3B8] bg-[#0F0F18]">
                    {item}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#F8F8FF] mb-4">Expected Outcomes</h3>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {legacyOutcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h3 className="text-xl font-bold text-[#F8F8FF] mb-4">Related Web Development Services</h3>
              <p className="text-[#94A3B8] mb-5">
                Explore other services connected to custom software and web development.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {webDevRelatedServices.map((service) => (
                  <Link
                    key={service.href}
                    href={localePath(locale, service.href)}
                    className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8] hover:text-[#F8F8FF] hover:border-[#6366F1]/50 transition-colors"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
              <Link
                href={localePath(locale, "/services")}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] text-white font-semibold rounded-lg hover:bg-[#6366F1]/90 transition-colors"
              >
                View All Services
              </Link>
            </AnimatedSection>
          </div>

          <div id="custom-software-scope">
            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Tell Us About Your Custom Software Project</h2>
              <p className="text-[#94A3B8]">
                Use the form below to share your objectives, timeline, and technical direction so we can define a clear build scope.
              </p>
            </AnimatedSection>
            <QuoteWizard dict={dict} isRtl={isRtl} locale={locale} preselectedService="Development" />
          </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
