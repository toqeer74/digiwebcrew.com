import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const discussionPoints = [
  "what your business needs help with",
  "what is not working in the current setup",
  "whether the project is a good fit",
  "which service or service mix makes the most sense",
  "what the likely scope looks like",
  "timeline expectations",
  "budget range and investment level",
  "the best next step after the call",
];

const shouldBook = [
  "already know they want to discuss a project",
  "have a clear business need but want expert direction",
  "are comparing options and want a clearer view of fit",
  "want to talk through scope before making decisions",
  "may need more than one service working together",
  "are ready for a more serious conversation about the build",
];

const prepareItems = [
  "a short explanation of your business",
  "what you need help with",
  "your main goal",
  "your current website or system if you have one",
  "a rough timeline",
  "any examples or references you like",
  "a rough sense of budget if known",
];

const afterBooking = [
  "a recommended scope",
  "a service direction",
  "next-step advice",
  "a quote or proposal path where relevant",
  "a decision on whether the project is a strong fit",
];

const faqItems = [
  {
    value: "faq-1",
    title: "What should I book a consultation for?",
    content:
      "A consultation is best for discussing a website project, landing page system, SEO support, automation setup, or a broader digital build where you want direct guidance.",
  },
  {
    value: "faq-2",
    title: "Do I need everything figured out before booking?",
    content:
      "No. You only need enough clarity to explain the business need and what kind of help you are looking for.",
  },
  {
    value: "faq-3",
    title: "What if I am not sure which service I need?",
    content:
      "That can still be covered in the consultation. If you want a more structured first step, the custom project scope form is another good option.",
  },
  {
    value: "faq-4",
    title: "Will I get pricing during the consultation?",
    content:
      "You can discuss budget range and likely investment direction. Exact pricing depends on the final project scope.",
  },
  {
    value: "faq-5",
    title: "Is the consultation only for large projects?",
    content:
      "No. It can work for focused projects as well, as long as there is a real business need and a serious interest in moving forward.",
  },
];

export default async function BookConsultationPage({
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
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
              Book a Consultation to Discuss the Right Next Step
            </h1>
            <p className="text-lg text-[#94A3B8] mb-6">
              If you already have a project in mind and want to talk through goals, scope, timeline, and fit, book a consultation and let&apos;s discuss what your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/digiweb/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-full hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-full hover:bg-[#1a1a2e] shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-4 md:p-6">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Book Consultation</h2>
            <p className="text-[#94A3B8] mb-4">
              Select a time directly in the scheduler below. If it does not load, use the direct booking link above.
            </p>
            <div className="rounded-lg overflow-hidden border border-[#1E1E2E] bg-[#0F0F18]">
              <iframe
                title="Calendly Booking"
                src="https://calendly.com/digiweb/consultation"
                className="w-full min-h-[760px]"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Direct Way to Start the Conversation</h2>
            <p className="text-[#94A3B8] mb-3">
              Some businesses already know they are ready to move forward. They may not have every detail finalized, but they know they need the right conversation to shape the next step.
            </p>
            <p className="text-[#94A3B8] mb-3">This consultation page is for that stage.</p>
            <p className="text-[#94A3B8]">
              If you want to discuss a custom website, landing page system, SEO support, automation setup, or a broader digital build, a consultation helps bring the project into clearer focus. It gives space to review the business need, talk through goals, identify the right service direction, and decide what makes sense next.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What We Can Cover in the Consultation</h2>
            <p className="text-[#94A3B8] mb-4">The consultation is meant to help define the project with more clarity and direction.</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8]">
              {discussionPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who Should Book a Consultation</h2>
            <p className="text-[#94A3B8] mb-4">This path is best for businesses that:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {shouldBook.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">
              If you are still very early and need help defining the project from scratch, the custom project scope form may be the better first step.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Helps Before the Call</h2>
            <p className="text-[#94A3B8] mb-4">
              You do not need a perfect brief before booking. But a few details can make the conversation more useful.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {prepareItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">Even if some of this is still unclear, the consultation can help bring structure to it.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Happens Next</h2>
            <p className="text-[#94A3B8] mb-3">Once the consultation is booked, the next step is simple.</p>
            <p className="text-[#94A3B8] mb-3">
              You select a time, share the relevant details, and we review the information before the conversation. From there, the call is used to understand the project, assess fit, and recommend the right direction.
            </p>
            <p className="text-[#94A3B8] mb-3">After the consultation, that may lead to:</p>
            <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
              {afterBooking.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-[#94A3B8]">The purpose is to create clarity, not unnecessary back and forth.</p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Why a Consultation Helps</h2>
            <p className="text-[#94A3B8] mb-3">
              Digital projects often go wrong when people skip the thinking stage and rush straight into execution.
            </p>
            <p className="text-[#94A3B8]">
              A consultation helps avoid that. It creates a chance to look at the business need properly, discuss the options, and shape the right approach before time and money go into the wrong direction. For many businesses, one clear conversation can save weeks of confusion later.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Need Help Defining the Project First?</h2>
            <p className="text-[#94A3B8] mb-4">
              If you are not ready to talk live yet and would rather explain your needs in a more structured way, the custom project scope path is a better fit.
            </p>
            <p className="text-[#94A3B8] mb-6">
              That option helps gather the key details around your business, goals, service needs, timeline, and budget so the project direction becomes easier to define.
            </p>
            <Link
              href={localePath(locale, "/quote")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-full hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300"
            >
              <span>Get Quote</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About Booking a Consultation</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Ready to Talk Through the Project?</h2>
            <p className="text-[#94A3B8] mb-6">
              If you have a clear need and want to discuss the right direction, book a consultation and take the next step with more confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/digiweb/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-full hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-full hover:bg-[#13131e] shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)] transition-all duration-300"
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
