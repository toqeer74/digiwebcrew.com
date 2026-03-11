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
  "Built for lead generation and action",
  "Designed around the offer and user journey",
  "Structured for clarity, speed, and response",
  "Connected to forms, booking, and follow-up systems",
];

const whoFor = [
  "law firms promoting a specific service or consultation offer",
  "clinics and med spas driving bookings for treatments or offers",
  "home service businesses running local campaigns",
  "consultants and agencies selling strategy calls or service packages",
  "businesses launching a new offer or promotion",
  "companies sending paid traffic to a single targeted page",
  "businesses that need better conversion without rebuilding the entire site",
];

const buildTypes = [
  "Lead generation landing pages",
  "Service offer pages",
  "Consultation booking pages",
  "Campaign landing pages",
  "Local service pages",
  "Sales pages",
  "Multi-step funnel pages",
  "Thank you pages",
  "Form-first conversion pages",
  "Call-first conversion pages",
];

const included = [
  ["Offer-focused page structure", "A page layout built around one clear objective and one strong next step."],
  ["Messaging alignment", "Clearer section flow and copy structure that helps visitors understand the offer faster."],
  ["Conversion-focused design", "Page design that reduces friction and keeps attention on the action that matters."],
  ["Form and booking integration", "Connection with forms, calendars, CRM tools, and lead capture systems where needed."],
  ["Thank you flow planning", "A better post-submit path that supports follow-up, confirmation, and next actions."],
  ["Mobile-friendly layout", "A page experience that works properly across desktop, tablet, and mobile."],
  ["Tracking readiness", "A structure that supports event tracking, campaign analysis, and better performance review."],
  ["Funnel expansion options", "Support for multi-step flows where a single page is not enough."],
];

const problems = [
  "too many distractions on the page",
  "weak or unclear service offer",
  "low form submissions",
  "poor booking rates",
  "confusing section flow",
  "generic design that does not support the offer",
  "no clear path from ad click to action",
  "weak mobile performance",
  "poor follow-up after submission",
  "campaign traffic going to the wrong destination",
];

const bestUseCases = [
  "paid ad campaigns",
  "service-specific lead generation",
  "booking consultations or appointments",
  "local service promotion",
  "offer launches",
  "lead magnets or downloadable resources",
  "webinar or event registration",
  "replacing weak service pages with stronger conversion pages",
];

const integrations = [
  "CRM systems",
  "booking tools",
  "contact forms",
  "email follow-up",
  "SMS or WhatsApp workflows",
  "analytics and conversion tracking",
  "chatbot or qualification systems",
];

const relatedServices = [
  "Custom Website Development",
  "SEO and Growth Retainers",
  "AI Chatbots and Automation",
  "Technical SEO",
  "CRM Integration",
  "Website Maintenance and Support",
];

const faqItems = [
  {
    value: "faq-1",
    title: "What is the difference between a landing page and a funnel?",
    content:
      "A landing page is usually a single focused page built around one goal. A funnel can include multiple connected pages and steps designed to move someone from interest to action more intentionally.",
  },
  {
    value: "faq-2",
    title: "Can you build pages for paid advertising campaigns?",
    content:
      "Yes. This service is a strong fit for ad campaigns where traffic needs to go to a focused page built for conversion.",
  },
  {
    value: "faq-3",
    title: "Can you connect forms and booking tools?",
    content:
      "Yes. We can connect landing pages and funnels with forms, CRM tools, calendars, and follow-up systems depending on the project.",
  },
  {
    value: "faq-4",
    title: "Do I need a full website before getting a landing page?",
    content:
      "No. Some businesses start with a landing page or funnel first, especially when they want to promote a specific offer or service quickly.",
  },
  {
    value: "faq-5",
    title: "Can you improve an existing landing page instead of building a new one?",
    content:
      "Yes. In some cases, improving the current page is the right move. In others, rebuilding it gives a better result.",
  },
];

export default async function ConversionFunnelsPage({
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
                Conversion Funnels and Landing Pages Built to Turn Interest Into Action
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                We build focused page systems that help businesses generate more inquiries, bookings, consultations, and qualified leads through clearer offers, stronger page structure, and better conversion flow.
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
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Better Page Can Change the Result</h2>
              <p className="text-[#94A3B8] mb-3">
                Not every visitor needs a full website experience. In many cases, what works better is a focused page built around one goal, one offer, and one next step.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Digital Web Crew builds conversion funnels and landing pages for businesses that want stronger campaign performance, cleaner service promotion, better lead capture, and less friction between interest and action.
              </p>
              <p className="text-[#94A3B8]">
                Whether the goal is form submissions, booked calls, service inquiries, or local lead generation, the page should guide people clearly and make the next step feel easy.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who This Service Is Built For</h2>
              <p className="text-[#94A3B8] mb-4">
                Conversion funnels and landing pages are a strong fit for businesses that want a more focused path to action than a standard website page usually provides.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What We Can Build</h2>
              <p className="text-[#94A3B8] mb-4">
                Different businesses need different conversion paths. Some need a single landing page. Others need a small funnel with multiple pages and a stronger post-submit flow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {buildTypes.map((item) => (
                  <div key={item} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#94A3B8]">
                The right structure depends on the traffic source, the offer, the audience, and the action you want the visitor to take.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What&apos;s Included in This Service</h2>
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
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What a Better Funnel or Landing Page Can Fix</h2>
              <p className="text-[#94A3B8] mb-4">
                Many businesses send traffic to pages that are too broad, too cluttered, or too weak in structure to convert well. A better conversion page can help solve problems like:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                {problems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">
                The goal is not just to make the page look better. It is to help more of the right visitors take the next step.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How We Approach Funnel and Landing Page Projects</h2>
              <p className="text-[#94A3B8] mb-3">
                We start by understanding the offer, the traffic source, the audience, and the action you want the visitor to take.
              </p>
              <p className="text-[#94A3B8] mb-3">
                From there, we shape the page around conversion. That means simplifying the message, organizing sections more intentionally, improving the user path, and reducing anything that distracts from the main goal.
              </p>
              <p className="text-[#94A3B8]">
                Some projects need one strong landing page. Others need a full funnel with multiple stages, follow-up logic, and connected systems. The structure depends on what will give the business the best result.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Best Use Cases for This Service</h2>
              <p className="text-[#94A3B8] mb-4">
                This service works especially well for businesses that need a focused page system tied to a specific goal.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                {bestUseCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Built to Connect With the Tools You Use</h2>
              <p className="text-[#94A3B8] mb-4">
                Landing pages and funnels often perform best when they are connected to the systems that handle leads after the click.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {integrations.map((item) => (
                  <div key={item} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[#94A3B8]">
                The page should not stop at the submit button. It should fit into the rest of your lead handling process.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Related Services That Pair Well With Funnels and Landing Pages</h2>
              <p className="text-[#94A3B8] mb-4">
                Landing pages often work best when they are supported by the right traffic, follow-up, and website structure.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {relatedServices.map((item) => (
                  <span key={item} className="px-3 py-2 rounded-full border border-[#1E1E2E] bg-[#0F0F18] text-sm text-[#94A3B8]">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-[#94A3B8]">
                These can be added as part of a broader project scope when needed.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <ServiceProcessSteps
                title="What the Process Looks Like"
                steps={[
                  { title: "Discover", description: "We learn about the offer, the audience, the traffic source, and the action you want visitors to take." },
                  { title: "Scope", description: "We define the right page or funnel structure, required integrations, and conversion priorities." },
                  { title: "Design and Build", description: "We create the page system, connect the needed tools, and shape the flow around the target action." },
                  { title: "Launch and Improve", description: "We publish the page, review the experience, and support updates or next-step improvements where needed." },
                ]}
                ctaHref={localePath(locale, "/process")}
                ctaLabel="View Full Process"
              />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Starting Price</h2>
              <p className="text-[#94A3B8] mb-3">
                Landing page and funnel projects vary based on the number of pages, copy requirements, design depth, integrations, and follow-up complexity.
              </p>
              <p className="text-xl font-bold text-[#F8F8FF] mb-2">Conversion Funnels and Landing Pages starting at $2,000</p>
              <p className="text-[#94A3B8] mb-6">
                Larger funnel systems, multi-step campaigns, and connected automation flows are scoped separately based on requirements.
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
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About Funnels and Landing Pages</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Need a Better Path From Click to Conversion?</h2>
              <p className="text-[#94A3B8] mb-6">
                If your current pages are getting traffic but not enough action, a stronger landing page or funnel may be the missing piece. Book a consultation or get a custom project scope to move forward.
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
