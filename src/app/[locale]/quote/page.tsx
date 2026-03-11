import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const whenBetter = [
  "you need help defining the project",
  "you may need more than one service",
  "the project has a few moving parts",
  "you want to explain things clearly before a call",
  "you are comparing priorities, timeline, or budget",
  "you are not fully sure what should be built first",
];

const scopeNeeds = [
  "what type of help you need",
  "what kind of business you run",
  "your main goal",
  "what services may be involved",
  "what stage the project is in",
  "your timeline",
  "your budget range",
  "how to contact you",
  "anything else important about the project",
];

const fitItems = [
  "want help defining the project properly",
  "may need website work plus SEO, funnels, or automation",
  "prefer to think through the details before a call",
  "have a project with multiple moving parts",
  "want to share budget and timeline upfront",
  "need a more structured starting point",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Should I use this instead of booking a consultation?",
    content:
      "Use this path if you want help defining the project more clearly before a call. If you already know you want to discuss it directly, booking a consultation may be the faster option.",
  },
  {
    value: "faq-2",
    title: "Do I need to know exactly which service I need?",
    content:
      "No. You can still complete the scope even if you are not fully sure yet. That is part of what the process is meant to help with.",
  },
  {
    value: "faq-3",
    title: "Can I choose more than one service?",
    content:
      "Yes. This path is especially useful for projects that may involve multiple services working together.",
  },
  {
    value: "faq-4",
    title: "Will I get a final quote immediately after submitting?",
    content:
      "Not always. The scope helps define the direction first. Final pricing depends on how clear and complete the project requirements are.",
  },
  {
    value: "faq-5",
    title: "What if my project is still early?",
    content:
      "That is fine. As long as you can explain the business need and the direction you are considering, the scope can still be useful.",
  },
];

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8 mb-10">
            <AnimatedSection className="text-center">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#F8F8FF]">
                Get a Custom Project Scope Built Around What Your Business Actually Needs
              </h1>
              <p className="text-lg text-[#94A3B8] mb-6">
                Tell us what you need help with, what goals you are working toward, and where your project stands. We will use that information to shape the right service direction and a clearer next step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#scope-form" className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Start Project Scope
                </a>
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Book Consultation
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Better Way to Start When the Project Needs More Definition</h2>
              <p className="text-[#94A3B8] mb-3">
                Not every business is ready to jump straight into a consultation.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Sometimes the need is clear, but the exact project is not. You may know that the current website is weak, the lead flow is not working well, or the business needs better structure, but you may not know exactly which service mix makes the most sense yet.
              </p>
              <p className="text-[#94A3B8] mb-3">That is what this project scope path is for.</p>
              <p className="text-[#94A3B8]">
                Instead of forcing you into a call too early, it gives you a structured way to explain your business, your goals, your timeline, and the kind of help you may need. From there, the project becomes easier to understand and the next step becomes easier to recommend.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">When This Is the Better First Step</h2>
              <p className="text-[#94A3B8] mb-3">The custom project scope path is usually the better choice when:</p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                {whenBetter.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">It creates a stronger starting point for both focused projects and larger multi-service work.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What We Need to Learn From the Scope</h2>
              <p className="text-[#94A3B8] mb-3">
                The goal of the scope flow is to collect the information that matters most before recommending a direction.
              </p>
              <p className="text-[#94A3B8] mb-3">That usually includes:</p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                {scopeNeeds.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">This helps us move from vague ideas to a more useful scope with better direction.</p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">How It Works</h2>
              <div className="space-y-3 text-[#94A3B8]">
                <p><strong className="text-[#F8F8FF]">Step 1 Share the basics</strong> Tell us what you need help with and what kind of business you run.</p>
                <p><strong className="text-[#F8F8FF]">Step 2 Define the goal</strong> Explain what you are trying to improve, launch, fix, or grow.</p>
                <p><strong className="text-[#F8F8FF]">Step 3 Add project details</strong> Select the services, timeline, stage, and budget range that best fit your situation.</p>
                <p><strong className="text-[#F8F8FF]">Step 4 Submit your information</strong> Send the scope so the project can be reviewed and the right next step can be identified.</p>
              </div>
            </AnimatedSection>
          </div>

          <div id="scope-form">
            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Tell Us About the Project</h2>
              <p className="text-[#94A3B8]">
                Use the form below to share the key details around your business, goals, timeline, and service needs. The more clearly you describe the situation, the easier it is to recommend the right direction.
              </p>
            </AnimatedSection>
            <QuoteWizard dict={dict} isRtl={isRtl} locale={locale} />
          </div>

          <div className="max-w-5xl mx-auto space-y-8 mt-10">
            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Why This Is a Strong Conversion Path</h2>
              <p className="text-[#94A3B8] mb-3">A custom project scope does more than collect contact details.</p>
              <p className="text-[#94A3B8]">
                It helps clarify the project, qualify the lead, surface the right service mix, and create a better starting point for a useful conversation. It also makes the experience easier for businesses that are serious about moving forward but not ready to book a call immediately. This is especially helpful for projects that involve multiple services or need a bit more thought before the scope becomes clear.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Who This Is Best For</h2>
              <p className="text-[#94A3B8] mb-3">This path is best for businesses that:</p>
              <ul className="list-disc list-inside space-y-2 text-[#94A3B8] mb-4">
                {fitItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">
                If you already know exactly what you want and are ready to talk, the consultation path may be faster.
              </p>
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Want to Talk Through It Directly Instead?</h2>
              <p className="text-[#94A3B8] mb-4">
                If you already have enough clarity and would rather discuss the project live, you can book a consultation instead.
              </p>
              <p className="text-[#94A3B8] mb-6">
                That path works best for businesses ready to talk through fit, scope, and next steps directly.
              </p>
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-6 py-3 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                Book Consultation
              </Link>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Questions About the Project Scope Process</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Ready to Define the Right Project Scope?</h2>
              <p className="text-[#94A3B8] mb-6">
                If you want a clearer view of what your project needs before moving forward, start the custom scope process and take the next step with more structure and less guesswork.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#scope-form" className="inline-flex items-center justify-center px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors">
                  Start Project Scope
                </a>
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors">
                  Book Consultation
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
