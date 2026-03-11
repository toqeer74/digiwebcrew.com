import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const industrySections = [
  {
    heading: "Law Firms",
    body: "Law firms need trust, clarity, and strong service presentation. A legal website has to communicate credibility quickly, explain practice areas clearly, and make it easy for potential clients to take the next step. In many cases, visibility in local and service-related search also plays a major role in lead generation.",
    points: [
      "custom websites built for trust and structure",
      "service and practice area pages",
      "landing pages for focused campaigns",
      "local and on-page SEO improvements",
      "consultation-focused conversion paths",
      "cleaner lead handling and intake support",
    ],
    closing:
      "This is a strong fit for firms that want a more professional online presence and better support for qualified consultations.",
  },
  {
    heading: "Dental, Medical, Clinics, and Med Spas",
    body: "Healthcare and treatment-based businesses depend heavily on trust, local visibility, and a smooth path to booking or inquiry. The website needs to present services clearly, reduce confusion, and help visitors feel confident enough to take action. In many cases, local search, treatment pages, and booking flow also play a major role in growth.",
    points: [
      "professional websites with stronger patient-facing structure",
      "treatment and service pages",
      "booking-focused landing pages",
      "local SEO support",
      "conversion improvements",
      "lead handling and response support",
    ],
    closing:
      "This is a strong fit for practices that want to improve presentation, visibility, and patient acquisition flow.",
  },
  {
    heading: "Home Services",
    body: "Home service businesses often depend on strong local visibility, fast lead flow, clear service pages, and a website that works well on mobile. When someone needs roofing, HVAC, plumbing, remodeling, solar, or restoration services, the website has to make the offer clear and help them act quickly. Service-area structure, page clarity, and better call or inquiry flow can make a major difference.",
    points: [
      "custom service-focused websites",
      "landing pages for local lead generation",
      "stronger mobile experience",
      "local SEO support",
      "clearer service and location page structure",
      "lead capture and follow-up systems",
    ],
    closing:
      "This is a strong fit for businesses that want more qualified local inquiries and a stronger digital foundation for growth.",
  },
  {
    heading: "Consultants, Coaches, and Agencies",
    body: "Service-based businesses that sell through authority, positioning, and consultations need more than a decent-looking website. They need a site that presents the offer clearly, builds trust, supports discovery calls or inquiries, and gives potential clients a reason to move forward. Landing pages, service structure, and a stronger digital presence can directly improve how these businesses convert attention into conversations.",
    points: [
      "authority-focused websites",
      "landing pages for services or offers",
      "consultation-focused page flow",
      "clearer service messaging structure",
      "stronger conversion paths",
      "support for ongoing growth and optimization",
    ],
    closing:
      "This is a strong fit for businesses that want better positioning and a clearer path from visitor to lead.",
  },
  {
    heading: "SaaS and B2B Service Companies",
    body: "SaaS and B2B businesses often need stronger front-end presentation, clearer messaging, and a site structure that supports both product understanding and lead generation. The website needs to explain value clearly, reduce friction, and support the kind of next step that matters most, whether that is a demo request, inquiry, contact, or deeper product exploration.",
    points: [
      "modern front-end website builds",
      "clearer website structure and messaging support",
      "landing pages for campaigns or offers",
      "conversion-focused user flow",
      "technical website implementation",
      "support for future growth and expansion",
    ],
    closing:
      "This is a strong fit for companies that need a cleaner and more capable digital presence to support growth.",
  },
  {
    heading: "Education, Training, and eLearning",
    body: "Education and training businesses often need structured content, clearer user journeys, stronger offer presentation, and a website that can support both information and action. Whether the goal is course promotion, lead generation, program awareness, or a better content experience, the digital system needs to guide users clearly and support the right next step.",
    points: [
      "structured websites for education-focused content",
      "landing pages for programs, offers, or campaigns",
      "clearer page flow and navigation",
      "support for growth and visibility",
      "funnel support for lead generation",
      "connected systems for better user experience",
    ],
    closing:
      "This is a strong fit for businesses that want a more organized and growth-ready digital setup.",
  },
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do you only work with these industries?",
    content:
      "No. These are the strongest-fit industries, but we can also work with other businesses where the project and business need are a strong match.",
  },
  {
    value: "faq-2",
    title: "Which industries are the best fit for your services?",
    content:
      "Law firms, clinics, home services, consultants, SaaS, and education-related businesses are the most natural fit because they depend heavily on trust, visibility, and lead flow.",
  },
  {
    value: "faq-3",
    title: "Can one service work across different industries?",
    content:
      "Yes. The same service category can apply across industries, but the structure, messaging, and priorities should still be tailored to the business model.",
  },
  {
    value: "faq-4",
    title: "Do you tailor the website or funnel structure by industry?",
    content:
      "Yes. The way a site or funnel is built should reflect how that type of business earns trust, explains services, and moves people toward action.",
  },
  {
    value: "faq-5",
    title: "What if my business is not listed here?",
    content:
      "You can still reach out. If the project is a strong fit and the business need matches what we do well, we can still define the right direction.",
  },
];

export default async function IndustriesPage({
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
                Built for Industries Where Trust, Lead Quality, and Digital Performance Matter
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                We help growth-focused businesses build stronger websites, better conversion systems, improved search visibility, and cleaner lead handling across industries where digital performance has a direct impact on results.
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
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Better Fit for Businesses That Need More Than a Basic Online Presence</h2>
              <p className="text-[#94A3B8] mb-3">
                Not every industry needs the same kind of digital system.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Some businesses need stronger trust at first impression. Others need better local visibility, cleaner booking flow, more focused service pages, or better handling of incoming leads. Digital Web Crew works best with industries where these things have a clear effect on growth.
              </p>
              <p className="text-[#94A3B8]">
                That means businesses where the website is not just there to exist online. It needs to support credibility, attract the right traffic, guide people toward action, and make the next step easier.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Why Industry Fit Changes the Right Solution</h2>
              <p className="text-[#94A3B8] mb-3">
                A law firm does not need the same structure as a med spa. A home service business does not need the same page flow as a SaaS company.
              </p>
              <p className="text-[#94A3B8]">
                The right website, landing page, SEO, or automation setup depends on how the business sells, how customers search, what creates trust, and what action matters most. That is why the work should be shaped around the business model and the decision-making path behind it. Digital Web Crew focuses on industries where stronger digital systems can make a real difference in inquiries, bookings, consultations, and long-term growth.
              </p>
            </AnimatedSection>

            {industrySections.map((section, idx) => (
              <AnimatedSection key={section.heading} delay={idx * 0.04} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">{section.heading}</h2>
                <p className="text-[#94A3B8] mb-4">{section.body}</p>
                <p className="text-[#94A3B8] mb-3">Digital Web Crew helps these businesses with:</p>
                <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="text-[#94A3B8]">{section.closing}</p>
              </AnimatedSection>
            ))}

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Other Strong-Fit Businesses</h2>
              <p className="text-[#94A3B8] mb-3">
                While the industries above are our strongest fit, we can also work with other businesses that depend on trust, qualified leads, a better digital presence, and more structured systems.
              </p>
              <p className="text-[#94A3B8] mb-3">The best fit usually comes down to this:</p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                <li>the business values quality and clarity</li>
                <li>the website or digital setup plays a real role in growth</li>
                <li>there is a serious business need behind the project</li>
                <li>the scope and budget support custom work</li>
              </ul>
              <p className="text-[#94A3B8]">
                If your business depends on trust, visibility, inquiries, or structured lead flow, there is a good chance we can help.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Different Industries Need Different Service Mixes</h2>
              <p className="text-[#94A3B8] mb-3">
                Some businesses need a full website rebuild. Others need landing pages, SEO support, or a better lead handling setup. The right combination depends on the business model, the customer journey, and where the biggest gaps are today.
              </p>
              <p className="text-[#94A3B8] mb-3">
                That is why Digital Web Crew does not force every client into the same service path. We help define the right mix based on what will actually support the business best.
              </p>
              <p className="text-[#94A3B8] mb-3">This may include:</p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
                <li>custom website development</li>
                <li>conversion funnels and landing pages</li>
                <li>SEO and growth support</li>
                <li>chatbot and automation systems</li>
                <li>ongoing support and improvement work</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About Industry Fit</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">
                Need a Digital System Built Around Your Industry and Business Goals?
              </h2>
              <p className="text-[#94A3B8] mb-6">
                If your business depends on trust, leads, consultations, bookings, or stronger digital performance, the next step is to define the right scope. Book a consultation or submit your project details to get started.
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
