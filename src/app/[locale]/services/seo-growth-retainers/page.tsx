import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { ServiceProcessSteps } from "@/components/sections/service-process-steps";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for long-term visibility and growth",
  "Focused on search, structure, and ongoing improvement",
  "Designed to support websites after launch",
  "Suitable for local and service-based businesses",
];

const whoFor = [
  "law firms that want stronger local and service-related visibility",
  "clinics, dental practices, and med spas that need better search presence and local discovery",
  "home service businesses that rely on local searches and service pages",
  "consultants, coaches, and agencies improving authority and inbound leads",
  "businesses that launched a new site and need continued support",
  "companies that want ongoing improvements without rebuilding from scratch",
  "businesses that want search growth tied to real service pages and user experience",
];

const serviceAreas = [
  "On-page SEO",
  "Local SEO",
  "Technical SEO",
  "Content optimization",
  "Page improvements",
  "Internal linking improvements",
  "Metadata updates",
  "Performance checks",
  "Website updates",
  "Reporting and review",
];

const included = [
  ["On-page SEO improvements", "Better page structure, headings, metadata, and content alignment across key pages."],
  ["Local SEO support", "Improvements that help location-based businesses appear more clearly for relevant local searches."],
  ["Technical SEO foundations", "Support for crawlability, indexing health, structure, and other technical details that affect visibility."],
  ["Content refinement", "Updates that improve clarity, keyword alignment, usefulness, and page quality over time."],
  ["Website updates", "Ongoing adjustments to keep pages current, accurate, and aligned with changing offers or business goals."],
  ["Performance review", "Checks on site quality, usability, and areas that may be affecting results."],
  ["Growth-focused recommendations", "Practical direction on where the site can improve next based on what matters most."],
  ["Reporting and support", "Regular visibility into what is being worked on and where improvements are being made."],
];

const problems = [
  "weak search visibility",
  "poor local presence",
  "service pages that are not structured well",
  "missing or weak metadata",
  "outdated content",
  "technical issues affecting search performance",
  "no clear internal linking strategy",
  "no consistent website improvements after launch",
  "low traffic to important pages",
  "no plan for continued digital growth",
];

const bestUseCases = [
  "improving local search visibility",
  "strengthening service pages after launch",
  "updating weak or outdated content",
  "fixing technical SEO issues",
  "improving page structure and internal linking",
  "supporting a new site with ongoing search work",
  "combining updates, optimization, and ongoing support in one retainer",
  "maintaining growth momentum without needing a full rebuild",
];

const relatedServices = [
  "Custom Website Development",
  "Conversion Funnels and Landing Pages",
  "Technical SEO",
  "Local SEO",
  "Website Maintenance and Support",
  "AI Chatbots and Automation",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do you offer SEO as a standalone service?",
    content:
      "Yes, depending on fit. In some cases SEO works best as part of a broader website or growth engagement, but standalone support can also make sense.",
  },
  {
    value: "faq-2",
    title: "What kind of SEO do you provide?",
    content:
      "We support on-page SEO, local SEO, technical SEO, and content-focused improvements based on the needs of the site.",
  },
  {
    value: "faq-3",
    title: "Do you only work on websites you built?",
    content:
      "No. We can also work on existing websites if the project is a good fit and the site allows for meaningful improvement.",
  },
  {
    value: "faq-4",
    title: "Will this include website updates too?",
    content:
      "Yes. Depending on the retainer scope, website updates and ongoing improvements can be part of the service.",
  },
  {
    value: "faq-5",
    title: "How long should a business stay on SEO support?",
    content:
      "That depends on the business, market, and goals. SEO and growth support usually works best as an ongoing effort rather than a one-time task.",
  },
];

export default async function SEOGrowthRetainersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8">
            <AnimatedSection className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
                SEO and Growth Support Built to Improve Visibility, Traffic, and Ongoing Performance
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                We help businesses improve search visibility, strengthen website performance, and keep their digital systems moving forward through ongoing SEO, updates, and optimization support.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {supportingPoints.map((point) => (
                  <div key={point} className="rounded-lg border border-[#1E1E2E] bg-[#13131E] px-4 py-3 text-sm text-[#94A3B8]">
                    {point}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Get Custom Project Scope
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Launch Is Only the Start</h2>
              <p className="text-[#94A3B8] mb-3">
                A website can look strong on day one and still underperform over time if no one is improving it.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Digital Web Crew offers ongoing SEO and growth support for businesses that want better visibility, stronger page structure, more consistent updates, and continued improvement after launch.
              </p>
              <p className="text-[#94A3B8] mb-3">
                This service is built for businesses that want their website to keep working as a real growth asset, not sit untouched after it goes live.
              </p>
              <p className="text-[#94A3B8]">
                The focus is simple. Improve search performance, support lead generation, and keep the site aligned with business goals as things evolve.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who This Service Is Built For</h2>
              <p className="text-[#94A3B8] mb-4">
                SEO and growth support is a strong fit for businesses that depend on search visibility, local presence, service discovery, or ongoing website performance.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What This Service Can Include</h2>
              <p className="text-[#94A3B8] mb-4">
                SEO and growth support can cover a mix of visibility work, content improvements, technical fixes, and ongoing website updates depending on what the business needs most.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {serviceAreas.map((item) => (
                  <div key={item} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#94A3B8]">
                Some businesses need focused SEO support. Others need a broader ongoing service that combines search, content, website updates, and conversion improvement.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What&apos;s Included in SEO and Growth Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {included.map(([title, desc]) => (
                  <div key={title} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] p-4">
                    <h3 className="font-semibold text-[#F8F8FF] mb-2">{title}</h3>
                    <p className="text-sm text-[#94A3B8]">{desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Ongoing SEO and Growth Support Can Fix</h2>
              <p className="text-[#94A3B8] mb-4">
                Many businesses have a decent website but still struggle with visibility, weak service pages, outdated content, or lack of consistent improvement. This service can help solve problems like:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                {problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">
                The goal is not just to add SEO tasks. It is to improve the parts of the website that affect visibility, trust, and performance.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How We Approach SEO and Growth Support</h2>
              <p className="text-[#94A3B8] mb-3">We start by looking at the current state of the site.</p>
              <p className="text-[#94A3B8] mb-3">
                That means reviewing page structure, service presentation, search-readiness, content quality, and the areas most likely to affect visibility or user experience. From there, we set priorities based on what can make the biggest difference.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Some businesses need foundational cleanup. Others need ongoing support with content, local SEO, technical improvements, and page refinement over time.
              </p>
              <p className="text-[#94A3B8]">
                We keep the work practical and tied to the business. Better pages, better structure, better visibility, and better support for growth.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Best Use Cases for This Service</h2>
              <p className="text-[#94A3B8] mb-4">
                This service works especially well for businesses that want their website to improve steadily instead of staying static.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {bestUseCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A More Practical Growth Retainer</h2>
              <p className="text-[#94A3B8] mb-3">
                This service is not built around vague monthly activity or inflated promises.
              </p>
              <p className="text-[#94A3B8]">
                It is meant for businesses that want real website improvement, stronger visibility, and ongoing support tied to how the site actually performs and develops over time. That means focusing on useful updates, search structure, content quality, and the parts of the website that support trust and lead generation.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Related Services That Pair Well With SEO and Growth Support</h2>
              <p className="text-[#94A3B8] mb-4">
                Ongoing growth work becomes stronger when the website, page structure, and lead flow are built properly from the start.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {relatedServices.map((item) => (
                  <span key={item} className="px-3 py-2 rounded-full border border-[#1E1E2E] bg-[#0F0F18] text-sm text-[#94A3B8]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-[#94A3B8]">These can be added into a broader project scope when the business needs a more complete growth system.</p>
            </AnimatedSection>

            <AnimatedSection>
              <ServiceProcessSteps
                title="What the Process Looks Like"
                steps={[
                  { title: "Review", description: "We assess the current website, page quality, structure, and the main visibility or performance gaps." },
                  { title: "Prioritize", description: "We identify what should be improved first based on impact, business goals, and current weaknesses." },
                  { title: "Improve", description: "We implement updates across SEO, content, structure, and website performance as needed." },
                  { title: "Monitor and Refine", description: "We continue improving over time based on progress, opportunities, and changing business needs." },
                ]}
                ctaHref={localePath(locale, "/process")}
                ctaLabel="View Full Process"
              />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Starting Price</h2>
              <p className="text-[#94A3B8] mb-3">
                SEO and growth retainers vary based on website size, current condition, content needs, local competition, and the level of support required.
              </p>
              <p className="text-xl font-bold text-[#F8F8FF] mb-2">SEO and Growth Retainers starting at $1,000 per month</p>
              <p className="text-[#94A3B8] mb-6">
                Broader support, higher-content demands, and more advanced optimization work are scoped based on requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Get Custom Project Scope
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About SEO and Growth Support</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Need Ongoing Support to Improve Visibility and Keep Your Website Moving Forward?</h2>
              <p className="text-[#94A3B8] mb-6">
                If your website is live but not improving, the right growth support can help you strengthen visibility, refine key pages, and create better long-term performance. Book a consultation or get a custom project scope to move forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Book Consultation
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Get Custom Project Scope
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
