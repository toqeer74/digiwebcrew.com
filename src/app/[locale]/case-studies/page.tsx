import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { CaseStudiesLibrary } from "@/components/sections/case-studies-library";
import { getCaseStudies } from "@/lib/content-engine";
import { getDictionary } from "@/lib/get-dictionary";
import { localePath } from "@/lib/locale-path";

const categories = [
  "Websites",
  "Funnels",
  "SEO",
  "Automation",
  "Development Systems",
  "Technical and Infrastructure Support",
];

const caseStudyTemplates = [
  {
    title: "[Project Name]",
    industry: "[Industry Type]",
    services: ["Custom Website Development", "Conversion Funnels", "SEO", "Automation", "Technical Support"],
    challenge:
      "The business needed a stronger digital presence, clearer service structure, and a better path for turning visitors into inquiries or leads.",
    solution:
      "We created a more focused website or digital system with improved structure, stronger presentation, clearer user flow, and the right supporting service layers based on the project goals.",
    outcome:
      "The result was a stronger digital foundation with better clarity, improved usability, and a setup that better supported the business goal.",
  },
  {
    title: "[Project Name]",
    industry: "[Industry Type]",
    services: ["Landing Pages", "SEO", "Automation"],
    challenge:
      "The existing page or lead flow was too weak, too broad, or not structured well enough to support conversions.",
    solution:
      "We built a more focused page system with clearer offer presentation, stronger calls to action, and better alignment between the traffic source and the next step.",
    outcome:
      "The business gained a cleaner path to inquiries, bookings, or lead capture with a page system that was more useful and better aligned with the offer.",
  },
  {
    title: "[Project Name]",
    industry: "[Industry Type]",
    services: ["SEO Support", "Website Improvements", "Technical SEO"],
    challenge:
      "The website existed but was not well structured for visibility, page clarity, or continued growth.",
    solution:
      "We improved the structure, updated key areas of the site, and supported visibility and usability through targeted search and website improvements.",
    outcome:
      "The result was a cleaner, more growth-ready website with better foundations for ongoing visibility and performance.",
  },
  {
    title: "[Project Name]",
    industry: "[Industry Type]",
    services: ["Automation", "CRM Integration", "Follow-up Systems"],
    challenge:
      "Lead handling or support flow involved too much manual work, inconsistent follow-up, or unclear routing.",
    solution:
      "We built a more structured automation setup to improve response flow, reduce repeated manual tasks, and support better handling of incoming inquiries.",
    outcome:
      "The business gained a more efficient process with better support for speed, consistency, and internal clarity.",
  },
];

const faqItems = [
  {
    value: "faq-1",
    title: "Will all projects be shown as full case studies?",
    content:
      "Not necessarily. Some projects work best as shorter portfolio entries, while others can be expanded into full case studies over time.",
  },
  {
    value: "faq-2",
    title: "Can one project include more than one service?",
    content:
      "Yes. Many of the strongest projects include a mix of website work, landing pages, SEO, automation, or technical support.",
  },
  {
    value: "faq-3",
    title: "Do you only show visual design work here?",
    content:
      "No. Some projects are more visual, while others reflect structural, technical, or operational improvements that matter just as much.",
  },
  {
    value: "faq-4",
    title: "Can you build a similar project for my industry?",
    content:
      "Yes, if the business need is a strong fit. The approach is always shaped around the specific business, not copied from another client.",
  },
  {
    value: "faq-5",
    title: "What if I do not see a project exactly like mine?",
    content:
      "That is normal. The portfolio is meant to show how we think and build, not list every possible project type.",
  },
];

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const studies = await getCaseStudies();
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8 mb-12">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
              Selected Work Across Websites, Funnels, SEO, and Digital Systems
            </h1>
            <p className="text-lg text-[#94A3B8] mb-6">
              Explore how Digital Web Crew approaches custom websites, landing pages, SEO support, automation, and connected digital systems built around real business goals.
            </p>
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
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Work That Shows How the System Comes Together</h2>
            <p className="text-[#94A3B8] mb-3">A portfolio should do more than display screenshots.</p>
            <p className="text-[#94A3B8] mb-3">
              It should show how the work solved a problem, supported a business goal, or improved the way the digital system functions. That is how Digital Web Crew approaches project presentation.
            </p>
            <p className="text-[#94A3B8]">
              This page brings together selected work across websites, landing pages, SEO improvements, automation systems, and technical builds. Some projects are more visual. Others are more structural or operational behind the scenes. What connects them is the focus on building digital systems that support real business outcomes.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Hybrid Approach to Portfolio and Case Study Content</h2>
            <p className="text-[#94A3B8] mb-3">Not every project needs a long case study, but every project should still communicate value clearly.</p>
            <p className="text-[#94A3B8] mb-3">That is why the work section is built as a hybrid. Each project can be presented with:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              <li>a strong visual preview</li>
              <li>the business or industry context</li>
              <li>the services involved</li>
              <li>the challenge that needed solving</li>
              <li>the approach taken</li>
              <li>the result, improvement, or practical outcome where available</li>
            </ul>
            <p className="text-[#94A3B8]">
              This creates a cleaner and more useful way to present work without forcing every project into the same format.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Project Categories</h2>
            <p className="text-[#94A3B8] mb-3">Our work can be grouped across the main service areas we support.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {categories.map((category) => (
                <div key={category} className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8]">
                  {category}
                </div>
              ))}
            </div>
            <p className="text-[#94A3B8]">Some projects sit in one category. Others combine multiple services into one connected system.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Selected Projects</h2>
            <p className="text-[#94A3B8] mb-3">
              Below is the structure used to present selected work. Replace each section with your actual project details, visuals, and outcomes as you finalize the portfolio.
            </p>
            <p className="text-[#94A3B8]">
              From custom websites to automation workflows, our work is built to support real business objectives with stronger design, clearer structure, and better digital performance.
            </p>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudyTemplates.map((item, idx) => (
              <div key={idx} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#F8F8FF] mb-2">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] mb-3">Industry: {item.industry}</p>
                <p className="text-sm text-[#94A3B8] mb-2">Services Provided:</p>
                <ul className="list-disc list-inside text-sm text-[#94A3B8] mb-3">
                  {item.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <p className="text-sm text-[#94A3B8] mb-2"><strong className="text-[#F8F8FF]">Challenge:</strong> {item.challenge}</p>
                <p className="text-sm text-[#94A3B8] mb-2"><strong className="text-[#F8F8FF]">Solution:</strong> {item.solution}</p>
                <p className="text-sm text-[#94A3B8] mb-4"><strong className="text-[#F8F8FF]">Outcome:</strong> {item.outcome}</p>
                <button className="flex items-center justify-center gap-2 rounded-full bg-[#6366F1] px-4 py-2 text-sm font-semibold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90">
                  <span>View Project</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </Container>

      <CaseStudiesLibrary studies={studies} />

      <Container>
        <div className="max-w-5xl mx-auto space-y-8 mt-12">
          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What to Look For in the Work</h2>
            <p className="text-[#94A3B8] mb-3">When reviewing projects, focus on more than the appearance.</p>
            <p className="text-[#94A3B8] mb-3">Look at:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              <li>how the structure fits the business type</li>
              <li>how clearly the service or offer is presented</li>
              <li>how the page or site guides the next step</li>
              <li>how different services work together</li>
              <li>how the final result supports trust, conversion, or growth</li>
            </ul>
            <p className="text-[#94A3B8]">That gives a much clearer picture of what the work is meant to do.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What the Portfolio Is Meant to Show</h2>
            <p className="text-[#94A3B8] mb-3">
              This work is meant to show the range and depth of Digital Web Crew without making the service model feel scattered.
            </p>
            <p className="text-[#94A3B8] mb-3">It demonstrates:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              <li>custom website capability</li>
              <li>conversion-focused page thinking</li>
              <li>ongoing SEO and growth support</li>
              <li>practical automation use</li>
              <li>broader technical support where needed</li>
            </ul>
            <p className="text-[#94A3B8]">
              The goal is to show that the business can handle both focused projects and broader digital systems while keeping the work clear, useful, and aligned with the real need behind it.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How to Launch This Page Well</h2>
            <p className="text-[#94A3B8] mb-3">
              For launch, it is better to feature a smaller number of stronger projects instead of trying to publish every project at once.
            </p>
            <p className="text-[#94A3B8] mb-3">A good first version usually includes:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              <li>4 to 6 selected projects</li>
              <li>strong screenshots or visuals</li>
              <li>short business context</li>
              <li>clear service tags</li>
              <li>one clear challenge</li>
              <li>one clear solution</li>
              <li>one clear result or practical outcome</li>
            </ul>
            <p className="text-[#94A3B8]">That is enough to build trust while keeping the page polished and focused.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Want Similar Work Built Around Your Business Goals?</h2>
            <p className="text-[#94A3B8] mb-6">
              If you need a website, landing page system, SEO support, automation, or a broader digital setup, the next step is to define the right scope for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold px-8 py-4 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/5">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About the Work</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Ready to Build a Stronger Digital Project of Your Own?</h2>
            <p className="text-[#94A3B8] mb-6">
              If you want a website, funnel, SEO system, or automation setup built around real business goals, the next step is simple. Book a consultation or submit your project scope to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold px-8 py-4 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-white/5">
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
