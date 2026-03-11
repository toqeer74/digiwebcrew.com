import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8">
            <AnimatedSection className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                Answers to common questions about services, pricing, process, fit, and what it is like to work with Digital Web Crew.
              </p>
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
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Clear Answers for Businesses Comparing the Right Next Step</h2>
              <p className="text-[#94A3B8] mb-3">Choosing the right digital partner usually comes with a lot of questions.</p>
              <p className="text-[#94A3B8] mb-3">
                You may want to know what services make the most sense, how pricing works, whether your business is a good fit, or what happens after you reach out. This page answers the most common questions businesses ask before starting a project with Digital Web Crew.
              </p>
              <p className="text-[#94A3B8]">
                If you still need help after reviewing the answers below, the next best step is to book a consultation or submit a custom project scope.
              </p>
            </AnimatedSection>

            {groups.map((group, groupIdx) => (
              <AnimatedSection key={group.heading} delay={groupIdx * 0.03}>
                <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">{group.heading}</h2>
                <Accordion
                  items={group.items.map(([title, content], itemIdx) => ({
                    value: `${group.heading}-${itemIdx}`,
                    title,
                    content,
                  }))}
                />
              </AnimatedSection>
            ))}

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Still Have Questions About the Right Next Step?</h2>
              <p className="text-[#94A3B8] mb-6">
                If you need help deciding what fits your business, the next step is simple. Book a consultation or submit your project scope and move forward with more clarity.
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
