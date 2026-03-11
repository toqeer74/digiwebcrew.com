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
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

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
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Inquiry Intake</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Let&apos;s Talk About What <br className="hidden md:block" /> You Need to <span className="text-[var(--site-primary)]">Build.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              Whether you need a custom website, stronger landing pages, SEO support, automation, or a broader digital system, we can help you choose the right next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group"
              >
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>


          <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">Choose the Best Way to Start</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-3">
              Some businesses are ready to talk right away. Others need help defining the project before a call makes sense.
            </p>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-5">
              Book a consultation if you already know you want to discuss the project directly, or submit your project details through the custom project scope flow for a more structured starting point.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5">
                <h3 className="text-base font-semibold text-slate-800 dark:text-[#F8F8FF] mb-2">Book Consultation</h3>
                <p className="text-sm text-slate-500 dark:text-[#94A3B8] mb-3">
                  Best for businesses that already have a clear project need and want to discuss goals, scope, and next steps directly.
                </p>
                <Link href={localePath(locale, "/book-consultation")} className="text-sm font-semibold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] hover:underline">
                  Book Consultation
                </Link>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5">
                <h3 className="text-base font-semibold text-slate-800 dark:text-[#F8F8FF] mb-2">Get Quote</h3>
                <p className="text-sm text-slate-500 dark:text-[#94A3B8] mb-3">
                  Best for businesses that want help defining the right service mix, project priorities, timeline, and budget before booking a call.
                </p>
                <Link href={localePath(locale, "/quote")} className="text-sm font-semibold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] hover:underline">
                  Get Quote
                </Link>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5">
                <h3 className="text-base font-semibold text-slate-800 dark:text-[#F8F8FF] mb-2">Contact Form</h3>
                <p className="text-sm text-slate-500 dark:text-[#94A3B8]">
                  Best for general inquiries, project questions, or businesses that want to send details first and continue from there.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-3">Tell Us a Bit About Your Project</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-6">
              Share a few details about your business, what you need help with, and how you would like us to get back to you.
            </p>
            <form action={sendInquiry} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] text-sm" placeholder="Name" required />
              <input name="company" className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] text-sm" placeholder="Company" />
              <input name="email" type="email" className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] text-sm" placeholder="Email" required />
              <input name="phone" className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] text-sm" placeholder="Phone" />
              <input name="website" className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] text-sm" placeholder="Website" />
              <input name="serviceInterest" className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] text-sm" placeholder="Service Interest" />
              <textarea name="message" className="md:col-span-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-[#F8F8FF] placeholder:text-slate-400 dark:placeholder:text-[#6B7E8E] min-h-28 text-sm" placeholder="Message" required />
              <button type="submit" className="flex items-center justify-center gap-3 md:col-span-2 px-6 py-4 bg-[var(--site-primary)] text-white font-bold rounded-full hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all">
                <span>Send Inquiry</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">What Helps Us Understand the Project Faster</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-4">
              The more clearly you can explain the business need, the easier it is to recommend the right direction.
            </p>
            <ul className="space-y-2.5 mb-4">
              {whatToInclude.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                </li>
              ))}
            </ul>
            <p className="text-slate-600 dark:text-[#94A3B8]">You do not need to have everything figured out. A clear starting point is enough.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
              {gradientTop}
              <h2 className="text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">Who We Work Best With</h2>
              <p className="text-slate-600 dark:text-[#94A3B8] mb-3">We are especially well aligned with:</p>
              <ul className="space-y-2.5 mb-3">
                {bestFit.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
              {gradientTop}
              <h2 className="text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">What Happens After You Reach Out</h2>
              <p className="text-slate-600 dark:text-[#94A3B8] mb-3">Once we receive your inquiry, the next step is to review the details and identify the best path forward.</p>
              <ul className="space-y-2.5">
                {responsePaths.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />{item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-4">Questions About Getting Started</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="site-card overflow-hidden relative text-center p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-3">Ready to Start the Conversation?</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-6 max-w-xl mx-auto">
              Whether you need one focused service or a broader digital system, the next step is simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--site-primary)] text-white font-bold rounded-full hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold rounded-full hover:bg-white dark:hover:bg-white/10 transition-all"
              >
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
