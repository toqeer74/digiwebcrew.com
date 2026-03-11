import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const supportPoints = [
  "Clear project direction from the start",
  "Built around goals, scope, and fit",
  "Designed to reduce confusion and wasted effort",
  "Structured for both focused and multi-service projects",
];

const step1 = [
  "business goals",
  "audience needs",
  "service priorities",
  "current website or system gaps",
  "lead generation needs",
  "timeline expectations",
  "scope direction",
];
const step2 = [
  "recommended service mix",
  "page and content requirements",
  "feature needs",
  "technical direction",
  "integrations and tools",
  "project timeline",
  "budget alignment",
];
const step3 = [
  "website design and development",
  "landing page and funnel creation",
  "content structure implementation",
  "automation setup",
  "CRM or booking integration",
  "SEO foundation work",
  "testing and refinement",
];
const step4 = [
  "launch support",
  "deployment",
  "quality checks",
  "post-launch fixes",
  "SEO and growth support",
  "maintenance",
  "conversion improvements",
  "future expansion planning",
];

const fitProjects = [
  "custom website projects",
  "website redesigns",
  "landing page and funnel builds",
  "SEO support engagements",
  "chatbot and automation setups",
  "multi-service digital systems",
  "businesses that need help defining the right direction before building",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do all projects go through the same process?",
    content:
      "The overall structure stays consistent, but the depth of each stage can vary depending on the size and type of project.",
  },
  {
    value: "faq-2",
    title: "What if I am not fully sure what I need yet?",
    content:
      "That is exactly what the custom project scope path is for. It helps define the direction before anything is built.",
  },
  {
    value: "faq-3",
    title: "Can a project include more than one service?",
    content:
      "Yes. Many projects include a mix of website work, landing pages, SEO, or automation depending on what the business needs.",
  },
  {
    value: "faq-4",
    title: "Do you provide support after launch?",
    content:
      "Yes. Post-launch support can include updates, SEO, maintenance, improvements, and future expansion work.",
  },
  {
    value: "faq-5",
    title: "How long does the process take?",
    content:
      "That depends on the scope, complexity, and timeline of the project. Smaller projects move faster, while larger builds need more planning and implementation time.",
  },
];

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
              A Clear Process for Building Smarter Digital Systems
            </h1>
            <p className="text-lg text-[#94A3B8] mb-6">
              We use a structured process to make sure every website, funnel, SEO, and automation project is aligned with real business goals, clear priorities, and the right level of implementation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {supportPoints.map((point) => (
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
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Better Process Leads to Better Work</h2>
            <p className="text-[#94A3B8] mb-3">Strong digital work does not come from jumping straight into design or development without direction.</p>
            <p className="text-[#94A3B8] mb-3">Digital Web Crew follows a process built to keep projects clear, practical, and aligned with the real needs of the business.</p>
            <p className="text-[#94A3B8]">Some projects are focused and simple. Others include multiple services and a broader implementation path.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Step 1 Discover</h2>
            <p className="text-[#94A3B8] mb-3">Every project starts by understanding the business behind it.</p>
            <p className="text-[#94A3B8] mb-4">What this stage helps define:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
              {step1.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Step 2 Scope</h2>
            <p className="text-[#94A3B8] mb-3">Once the direction is clear, we shape the project around what is actually needed.</p>
            <p className="text-[#94A3B8] mb-4">What this stage helps define:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
              {step2.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Step 3 Build</h2>
            <p className="text-[#94A3B8] mb-3">With the scope in place, we move into design, development, and implementation.</p>
            <p className="text-[#94A3B8] mb-4">What this stage can include:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
              {step3.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Step 4 Launch and Grow</h2>
            <p className="text-[#94A3B8] mb-3">Once the project is ready, we move into launch, review, and continued support where needed.</p>
            <p className="text-[#94A3B8] mb-4">What this stage can include:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
              {step4.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Why This Process Works</h2>
            <p className="text-[#94A3B8]">A clear process helps avoid the most common problems in digital projects. It reduces guesswork, keeps the work tied to actual business needs, and creates a better path from idea to execution.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Good Fit for Focused Projects and Broader Builds</h2>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {fitProjects.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">Whether the project is simple or more complex, the process creates a clearer path forward.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How to Enter the Process</h2>
            <p className="text-[#94A3B8] mb-2"><strong className="text-[#F8F8FF]">Option 1 Book Consultation:</strong> This is best for businesses that already know they want to talk through the project directly.</p>
            <p className="text-[#94A3B8] mb-4"><strong className="text-[#F8F8FF]">Option 2 Get Quote:</strong> This is best for businesses that want to define the need more clearly before booking a call.</p>
            <p className="text-[#94A3B8]">Both options are designed to help you start from the right place based on your current level of clarity.</p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About the Process</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Want a Clearer Path From Idea to Launch?</h2>
            <p className="text-[#94A3B8] mb-6">If you want a project that is shaped around business goals, clear scope, and practical execution, the next step is simple.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold px-8 py-4 transition-all duration-300 hover:bg-white/5 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
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
