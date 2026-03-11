import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for businesses that need more than a basic website",
  "Focused on clarity, performance, and growth",
  "Structured for real business use, not just visual presentation",
  "Designed to support both launch and long-term improvement",
];

const values = [
  ["Clarity over confusion", "A website or digital system should make the business easier to understand, not harder."],
  ["Quality over shortcuts", "Good work needs structure, thought, and proper execution. Quick fixes usually create bigger problems later."],
  ["Strategy over guesswork", "The build should reflect real goals, real priorities, and the actual needs of the business."],
  ["Custom work over generic setups", "Different businesses need different solutions. One-size-fits-all work rarely supports growth well."],
  ["Modern systems over outdated approaches", "Businesses need digital tools and structures that match how people search, browse, decide, and contact today."],
];

const builds = [
  "custom websites",
  "landing pages and funnels",
  "SEO improvements and growth support",
  "chatbot and automation systems",
  "technical support and connected digital infrastructure",
];

const fit = [
  "law firms",
  "clinics, dental practices, and med spas",
  "home service businesses",
  "consultants, coaches, and agencies",
  "SaaS and B2B service companies",
  "education and training businesses",
];

const reasons = [
  "they have outgrown a basic website",
  "their current site does not reflect the quality of the business",
  "they need better conversion paths",
  "they want one partner who understands both build and growth",
  "they need support that goes beyond design alone",
  "they want cleaner systems for leads, content, and next steps",
];

const faqItems = [
  {
    value: "faq-1",
    title: "What kind of agency is Digital Web Crew?",
    content: "Digital Web Crew is a web, funnels, SEO, and automation agency focused on helping businesses build stronger digital systems for growth.",
  },
  {
    value: "faq-2",
    title: "Do you only work on websites?",
    content: "No. We also work on landing pages, SEO support, chatbot systems, automation, and broader digital infrastructure depending on the project.",
  },
  {
    value: "faq-3",
    title: "Do you work with businesses in the US and Canada?",
    content: "Yes. Those are the primary target markets, with room to work with other strong-fit clients as well.",
  },
  {
    value: "faq-4",
    title: "Are you focused on certain industries?",
    content: "Yes. We are especially well aligned with law firms, clinics, home services, consultants, SaaS, and education-related businesses.",
  },
  {
    value: "faq-5",
    title: "Can I start with one service and expand later?",
    content: "Yes. Many projects begin with one focused service and grow into a broader digital system over time.",
  },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
              A Modern Digital Partner for Growth-Focused Businesses
            </h1>
            <p className="text-lg text-[#94A3B8] mb-6">
              Digital Web Crew helps businesses build stronger websites, sharper conversion systems, better search visibility, and more efficient lead handling through custom development, funnels, SEO, and automation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {supportingPoints.map((point) => (
                <div key={point} className="rounded-lg border border-[#1E1E2E] bg-[#13131E] px-4 py-3 text-sm text-[#94A3B8]">
                  {point}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold px-8 py-4 transition-all duration-300 hover:bg-[#1a1a2e] shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Built for Businesses That Need Stronger Digital Infrastructure</h2>
            <p className="text-[#94A3B8] mb-3">Digital Web Crew was created for businesses that want more than a website that simply looks modern.</p>
            <p className="text-[#94A3B8] mb-3">Many businesses need a stronger system behind their online presence. They need better presentation, clearer service structure, stronger lead paths, improved visibility, and more practical support for how inquiries and customers are handled.</p>
            <p className="text-[#94A3B8]">That is where Digital Web Crew fits. We combine custom website development, landing pages, SEO support, and automation into digital systems designed to help businesses present themselves better and operate more effectively.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What We Value</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map(([title, desc]) => (
                <div key={title} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] p-4">
                  <h3 className="font-semibold text-[#F8F8FF] mb-2">{title}</h3>
                  <p className="text-sm text-[#94A3B8]">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What We Build</h2>
            <p className="text-[#94A3B8] mb-3">Digital Web Crew helps businesses build digital systems that support both presentation and performance.</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {builds.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">Some clients need one focused service. Others need a broader setup that combines multiple parts into one clearer system.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who We Work Best With</h2>
            <p className="text-[#94A3B8] mb-3">We work best with businesses that depend on trust, inquiries, bookings, consultations, or ongoing lead flow.</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {fit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">These are the kinds of businesses where stronger digital presentation, better conversion, and cleaner systems can make a direct difference.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">More Than Design. More Than Traffic.</h2>
            <p className="text-[#94A3B8] mb-3">Some providers focus only on building websites. Others focus only on traffic. Others talk about automation without connecting it to how the business actually works.</p>
            <p className="text-[#94A3B8] mb-3">Digital Web Crew takes a more connected approach.</p>
            <p className="text-[#94A3B8]">We look at how the website presents the business, how the pages guide action, how visibility improves over time, and how lead handling can become more efficient. That creates better alignment between design, structure, search, and follow-up.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Why Businesses Choose to Work With Us</h2>
            <p className="text-[#94A3B8] mb-3">Businesses usually come to us because they want a stronger digital setup with more clarity and better execution.</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {reasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">The value is not just in making things look better. It is in building digital systems that support the business more effectively.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Clear and Practical Approach</h2>
            <p className="text-[#94A3B8] mb-4">We keep the process structured so projects stay aligned with business goals and actual priorities.</p>
            <p className="text-[#94A3B8] mb-5">We start by understanding the business and the problem that needs to be solved. From there, we define the right scope, build the system carefully, and support the next stage after launch where needed.</p>
            <Link href={localePath(locale, "/process")} className="text-[#6366F1] font-semibold">View Full Process</Link>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Better Fit for Businesses That Want Something More Thoughtful</h2>
            <p className="text-[#94A3B8] mb-3">Digital Web Crew is not positioned as a low-cost website service or a generic all-in-one vendor.</p>
            <p className="text-[#94A3B8]">We are built for businesses that want a more thoughtful level of design, development, structure, and support. That includes businesses that care about how they present themselves, how they generate inquiries, and how their digital system supports growth over time.</p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About Digital Web Crew</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Looking for a Stronger Digital Partner?</h2>
            <p className="text-[#94A3B8] mb-6">If your business needs more than a basic website and you want a clearer, more capable digital system, we can help define the right next step.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold px-8 py-4 transition-all duration-300 hover:bg-[#1a1a2e] shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
