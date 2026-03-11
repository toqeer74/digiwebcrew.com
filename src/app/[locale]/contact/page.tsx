import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { createLead } from "@/lib/actions/lead-actions";
import { localePath } from "@/lib/locale-path";

const whatToInclude = [
  "what type of business you run",
  "what you need help with",
  "your main goal",
  "whether you already have a website or system in place",
  "any timeline expectations",
  "examples or references if you have them",
];

const bestFit = [
  "law firms",
  "clinics, dental practices, and med spas",
  "home service businesses",
  "consultants, coaches, and agencies",
  "SaaS and B2B service companies",
  "education and training businesses",
];

const responsePaths = [
  "a consultation call",
  "a recommended service direction",
  "a clearer project scope",
  "follow-up questions if needed",
  "next-step guidance based on fit",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Should I book a consultation or submit the project scope form?",
    content:
      "If you already know you want to talk through the project, book a consultation. If you want help defining the right direction first, the project scope form is the better option.",
  },
  {
    value: "faq-2",
    title: "Can I contact you even if I am not fully sure what I need?",
    content:
      "Yes. Many businesses start before everything is fully defined. A clear description of the problem or goal is enough to begin.",
  },
  {
    value: "faq-3",
    title: "Do you work with businesses in the US and Canada?",
    content:
      "Yes. Those are the primary markets, along with other strong-fit opportunities where the scope and budget make sense.",
  },
  {
    value: "faq-4",
    title: "Can I ask about more than one service?",
    content:
      "Yes. Many businesses need a mix of website work, landing pages, SEO, or automation support.",
  },
  {
    value: "faq-5",
    title: "Do you offer ongoing support after the project starts or launches?",
    content:
      "Yes. Ongoing support can include SEO, updates, maintenance, optimization, and further expansion work depending on the project.",
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  async function sendInquiry(formData: FormData) {
    "use server";

    const fullName = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const website = String(formData.get("website") || "").trim();
    const serviceInterest = String(formData.get("serviceInterest") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!fullName || !email || !message) {
      return;
    }

    await createLead({
      fullName,
      email,
      company,
      serviceCategory: "contact",
      serviceInterest: serviceInterest || "General Inquiry",
      projectType: "contact-form",
      budgetRange: "Not specified",
      timeline: "Not specified",
      message: [message, phone ? `Phone: ${phone}` : "", website ? `Website: ${website}` : ""]
        .filter(Boolean)
        .join("\n"),
      source: "contact-form",
      status: "NEW",
    });

    redirect(localePath(locale, "/thank-you"));
  }

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
              Let&apos;s Talk About What You Need to Build
            </h1>
            <p className="text-lg text-[#94A3B8] mb-6">
              Whether you need a custom website, stronger landing pages, SEO support, automation, or a broader digital system, we can help you choose the right next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-full hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-full hover:bg-[#1a1a2eb] transition-all duration-300 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]"
              >
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Choose the Best Way to Start</h2>
            <p className="text-[#94A3B8] mb-3">
              Some businesses are ready to talk right away. Others need help defining the project before a call makes sense.
            </p>
            <p className="text-[#94A3B8] mb-3">
              That is why Digital Web Crew gives you more than one way to get started. You can book a consultation if you already know you want to discuss the project directly, or you can submit your project details through the custom project scope flow if you want a more structured starting point.
            </p>
            <p className="text-[#94A3B8]">
              If your business needs a stronger website, a focused landing page system, better search support, or more efficient lead handling, this is where the conversation begins.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How You Can Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0F0F18] border border-[#1E1E2E] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F8F8FF] mb-2">Book Consultation</h3>
                <p className="text-sm text-[#94A3B8] mb-4">
                  Best for businesses that already have a clear project need and want to discuss goals, scope, and next steps directly.
                </p>
                <Link href={localePath(locale, "/book-consultation")} className="text-[#6366F1] font-semibold">
                  Book Consultation
                </Link>
              </div>
              <div className="bg-[#0F0F18] border border-[#1E1E2E] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F8F8FF] mb-2">Get Quote</h3>
                <p className="text-sm text-[#94A3B8] mb-4">
                  Best for businesses that want help defining the right service mix, project priorities, timeline, and budget before booking a call.
                </p>
                <Link href={localePath(locale, "/quote")} className="text-[#6366F1] font-semibold">
                  Get Quote
                </Link>
              </div>
              <div className="bg-[#0F0F18] border border-[#1E1E2E] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F8F8FF] mb-2">Contact Form</h3>
                <p className="text-sm text-[#94A3B8]">
                  Best for general inquiries, project questions, or businesses that want to send details first and continue from there.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Tell Us a Bit About Your Project</h2>
            <p className="text-[#94A3B8] mb-6">
              Share a few details about your business, what you need help with, and how you would like us to get back to you.
            </p>
            <form action={sendInquiry} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" className="px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF]" placeholder="Name" required />
              <input name="company" className="px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF]" placeholder="Company" />
              <input name="email" type="email" className="px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF]" placeholder="Email" required />
              <input name="phone" className="px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF]" placeholder="Phone" />
              <input name="website" className="md:col-span-2 px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF]" placeholder="Website" />
              <input name="serviceInterest" className="md:col-span-2 px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF]" placeholder="Service Interest" />
              <textarea name="message" className="md:col-span-2 px-4 py-3 rounded-lg bg-[#0F0F18] border border-[#1E1E2E] text-[#F8F8FF] min-h-28" placeholder="Message" required />
              <button type="submit" className="flex items-center justify-center gap-3 md:col-span-2 px-6 py-4 bg-[#6366F1] text-white font-bold rounded-full hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300">
                <span>Send Inquiry</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Helps Us Understand the Project Faster</h2>
            <p className="text-[#94A3B8] mb-4">
              The more clearly you can explain the business need, the easier it is to recommend the right direction.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {whatToInclude.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">You do not need to have everything figured out. A clear starting point is enough.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who We Work Best With</h2>
            <p className="text-[#94A3B8] mb-3">
              Digital Web Crew is best suited for businesses that want stronger digital presentation, better conversion systems, ongoing growth support, or more efficient lead handling.
            </p>
            <p className="text-[#94A3B8] mb-3">We are especially well aligned with:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {bestFit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">
              If your business depends on trust, leads, bookings, or consultations, there is a strong chance we are a good fit.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Happens After You Reach Out</h2>
            <p className="text-[#94A3B8] mb-4">
              Once we receive your inquiry, consultation request, or project scope submission, the next step is to review the details and identify the best path forward.
            </p>
            <p className="text-[#94A3B8] mb-3">Depending on how you contacted us, that may lead to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {responsePaths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">The goal is to make the process clear and useful from the first interaction.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Future Support Direction</h2>
            <p className="text-[#94A3B8] mb-4">
              Over time, call handling will be expanded with smarter intake and routing support to improve response speed and make it easier to direct inquiries to the right next step.
            </p>
            <p className="text-[#94A3B8]">
              The focus will stay on making contact and lead handling more efficient without making the experience feel cold or confusing.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About Getting Started</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Ready to Start the Conversation?</h2>
            <p className="text-[#94A3B8] mb-6">
              Whether you need one focused service or a broader digital system, the next step is simple. Book a consultation, submit your project scope, or send an inquiry to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-full hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-full hover:bg-[#13131e] transition-all duration-300 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]"
              >
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
