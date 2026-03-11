import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const groups = [
  {
    heading: "General",
    items: [
      ["What does Digital Web Crew do?", "Digital Web Crew helps businesses build stronger digital systems through custom websites, conversion funnels, SEO support, and chatbot or automation setups."],
      ["What kind of businesses do you work with?", "We work with growth-focused businesses that depend on trust, leads, calls, bookings, or consultations. Our strongest fit includes law firms, clinics, home services, consultants, SaaS, and education-related businesses."],
      ["Do you only build websites?", "No. Website development is one part of the service model. We also build landing pages, funnels, SEO support systems, and automation setups depending on what the business needs."],
      ["Do you work with clients in the US and Canada?", "Yes. Those are the main target markets, along with other strong-fit opportunities where the project and budget make sense."],
      ["Can I hire you for one service only?", "Yes. Some clients need one focused service, while others need a broader setup that combines multiple services."],
    ],
  },
  {
    heading: "Website Development",
    items: [
      ["Do you build custom websites or use templates?", "We focus on custom website work shaped around business goals, content structure, and the way the business actually needs the site to function."],
      ["Can you redesign my current website?", "Yes. We can redesign, improve, or rebuild an existing website depending on its condition and what the business needs."],
      ["Do you work with WordPress and Next.js?", "Yes. We support both WordPress and Next.js, along with other front-end and CMS-based website needs where relevant."],
      ["Will the website be mobile-friendly?", "Yes. Responsive behavior across desktop, tablet, and mobile is a standard part of the build process."],
      ["Can the website support future SEO and growth?", "Yes. We build with structure, scalability, and technical foundations that support future improvements over time."],
    ],
  },
  {
    heading: "Funnels and Landing Pages",
    items: [
      ["Can you build landing pages for lead generation?", "Yes. We build focused pages and funnel systems designed to support inquiries, consultations, bookings, and qualified lead capture."],
      ["What is the difference between a landing page and a funnel?", "A landing page is usually a single focused page built around one action. A funnel can include multiple steps or pages designed to guide the visitor through a more intentional path."],
      ["Can you build landing pages for advertising campaigns?", "Yes. This is one of the strongest use cases for focused landing page work."],
      ["Can you connect forms and booking systems?", "Yes. We can connect pages to forms, calendar tools, CRM systems, and related follow-up tools depending on the project."],
      ["Do I need a full website before getting a landing page?", "No. Some businesses start with a landing page or funnel first if that is the most practical move."],
    ],
  },
  {
    heading: "SEO and Growth Support",
    items: [
      ["Do you offer SEO as a standalone service?", "Yes, depending on fit. In some cases SEO works best as part of a broader website or growth engagement, but standalone support can also make sense."],
      ["What type of SEO do you support?", "We support on-page SEO, local SEO, technical SEO, and content-focused improvement based on the needs of the website."],
      ["Do you only provide SEO for websites you built?", "No. We can also work on existing websites if the project is a good fit and there is room for meaningful improvement."],
      ["Do SEO retainers include website updates?", "They can, depending on the retainer scope and the kind of ongoing support required."],
      ["How long should SEO support continue?", "That depends on the business, market, and goals. In most cases, SEO and growth support work best as an ongoing effort."],
    ],
  },
  {
    heading: "Chatbots and Automation",
    items: [
      ["Do you build chatbots?", "Yes. We build chatbot and automation setups that help businesses handle inquiries, qualify leads, and improve response flow."],
      ["Can automation connect with CRM and booking tools?", "Yes. We can support CRM, forms, booking tools, follow-up workflows, and related system connections where needed."],
      ["Will automation replace human support?", "Not fully. The goal is usually to reduce repetitive work, improve response speed, and make lead handling more efficient while keeping human support where it still matters."],
      ["Can I start with a simple automation setup first?", "Yes. Many businesses begin with a smaller setup and expand later as the need grows."],
      ["What kind of automation can help most businesses first?", "The most common starting points are lead follow-up, inquiry routing, qualification logic, and repeated communication tasks."],
    ],
  },
  {
    heading: "Pricing",
    items: [
      ["What are your starting prices?", "Our core starting prices are $3,500 for custom website development, $2,000 for funnels and landing pages, $2,500 for chatbot and automation projects, and $1,000 per month for SEO and growth retainers."],
      ["Do you use fixed packages?", "No. We use starting prices instead of rigid fixed packages so the work can be scoped around what the business actually needs."],
      ["Will I get an exact quote before starting?", "Yes. Once the scope is clear, pricing can be defined based on the actual requirements of the project."],
      ["What makes the price go up?", "The main factors are scope, number of pages, design depth, integrations, automation complexity, technical requirements, and the overall service mix."],
      ["Do you handle larger custom projects too?", "Yes. Larger websites, multi-service systems, advanced automation setups, and custom technical projects can be scoped separately."],
    ],
  },
  {
    heading: "Process",
    items: [
      ["How does the process work?", "The process usually moves through discovery, scope, build, and launch or growth support. The exact depth of each stage depends on the type of project."],
      ["What if I am not fully sure what I need yet?", "That is a common starting point. The custom project scope path is especially useful when the direction still needs definition."],
      ["Can one project include more than one service?", "Yes. Many businesses need a mix of website work, landing pages, SEO, or automation rather than one isolated service."],
      ["Do you provide support after launch?", "Yes. Ongoing support can include maintenance, SEO work, updates, refinements, and future expansion depending on the project."],
      ["How long does a project take?", "That depends on the scope, complexity, and timeline. Smaller focused projects move faster, while larger builds take more planning and implementation time."],
    ],
  },
  {
    heading: "Getting Started",
    items: [
      ["Should I book a consultation or use the custom project scope form?", "Book a consultation if you already want to talk through the project directly. Use the custom project scope form if you want help defining the direction more clearly first."],
      ["Can I reach out even if the project is still early?", "Yes. You do not need a finished brief. A clear explanation of the business need is enough to begin."],
      ["What should I prepare before reaching out?", "It helps to know your main goal, what kind of help you need, your timeline, your current setup, and any examples or references you want to share."],
      ["What happens after I contact you?", "The next step may be a consultation, a recommendation on service direction, follow-up questions, or a scoped path based on your submission and fit."],
      ["Can I start with one service and expand later?", "Yes. Many businesses begin with one focused project and grow into a broader digital system over time."],
    ],
  },
];

export default async function FAQsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Knowledge Base</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Frequently Asked <span className="text-[var(--site-primary)]">Questions.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              Answers to common questions about services, pricing, process, fit, and what it is like to work with Digital Web Crew.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all hover:bg-[var(--site-primary-hover)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-10 py-5 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>


          <AnimatedSection className="site-card overflow-hidden relative p-8 lg:p-10 border-2 border-[var(--site-primary)]/10">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Clear Answers for Businesses Comparing the Right Next Step</h2>
            <div className="space-y-4 text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed">
              <p>Choosing the right digital partner usually comes with a lot of questions.</p>
              <p>
                You may want to know what services make the most sense, how pricing works, whether your business is a good fit, or what happens after you reach out.
              </p>
              <p>
                If you still need help after reviewing the answers below, the next best step is to book a consultation or submit a custom project scope.
              </p>
            </div>
          </AnimatedSection>


          {groups.map((group, groupIdx) => (
            <AnimatedSection key={group.heading} delay={groupIdx * 0.03} className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">{group.heading}</h2>

              <Accordion
                items={group.items.map(([title, content], itemIdx) => ({
                  value: `${group.heading}-${itemIdx}`,
                  title,
                  content,
                }))}
              />
            </AnimatedSection>
          ))}

          <AnimatedSection className="site-card overflow-hidden relative text-center p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] via-[var(--site-primary)] to-[#34D399]" />
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-3">Still Have Questions About the Right Next Step?</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-6 max-w-xl mx-auto">
              If you need help deciding what fits your business, the next step is simple. Book a consultation or submit your project scope and move forward with more clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all hover:bg-[var(--site-primary-hover)]">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] transition-all hover:bg-white dark:hover:bg-white/10">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
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
