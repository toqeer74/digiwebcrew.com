import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

  const supportingPoints = [
    "Your details are now in review",
    "Built to make the next step clearer",
    "Helpful for both focused and multi-service projects",
    "You can still book a consultation if you want to move faster",
  ];

  const nextSteps = [
    "a recommendation on the right service direction",
    "a consultation path",
    "follow-up questions if more detail is needed",
    "a clearer scope direction",
    "next-step guidance based on the project",
  ];

  const fasterReasons = [
    "you already know the project is a strong priority",
    "you want to discuss the scope live",
    "you need help deciding between service options",
    "you want a more direct conversation about fit and next steps",
  ];

  const secondaryLinks = [
    { label: "View Services", href: localePath(locale, "/services") },
    { label: "View Pricing", href: localePath(locale, "/pricing") },
    { label: "View Full Process", href: localePath(locale, "/process") },
    { label: "Explore Industries", href: localePath(locale, "/industries") },
    { label: "Back to Home", href: localePath(locale, "/") },
  ];

  const faqItems = [
    {
      value: "faq-1",
      title: "Do I need to do anything else right now?",
      content: "No. Your submission has already been received. The next step is to review the details and identify the best direction.",
    },
    {
      value: "faq-2",
      title: "Can I still book a consultation after submitting the form?",
      content: "Yes. If you want to discuss the project directly, booking a consultation is still a good option.",
    },
    {
      value: "faq-3",
      title: "What if I forgot to include something important?",
      content: "That can usually be clarified in the next step if more detail is needed.",
    },
    {
      value: "faq-4",
      title: "Will every submission lead to the same next step?",
      content: "No. The next step depends on the type of project, how clear the scope is, and what kind of support makes the most sense.",
    },
    {
      value: "faq-5",
      title: "Can I explore the site while waiting?",
      content: "Yes. You can review services, pricing, process, and other pages to get a better sense of how Digital Web Crew works.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0F]" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      
      <main className="flex-1 pt-32 pb-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="mb-12">
              <div className="w-20 h-20 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-8">
                <Check size={48} className="text-[#22C55E]" strokeWidth={1.5} />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-[#F8F8FF] text-center">
                Thank You. Your Details Have Been Received.
              </h1>
              
              <p className="text-xl text-[#94A3B8] mb-8 text-center">
                We have received your submission and will review the details to identify the best next step based on your project, goals, and service needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {supportingPoints.map((point) => (
                  <div key={point} className="rounded-lg border border-[#1E1E2E] bg-[#13131E] px-4 py-3 text-sm text-[#94A3B8]">
                    {point}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={localePath(locale, "/book-consultation")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors"
                >
                  Book Consultation
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href={localePath(locale, "/")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Your Submission Is In</h2>
              <p className="text-[#94A3B8] mb-3">
                Thank you for taking the time to share your project details.
              </p>
              <p className="text-[#94A3B8] mb-3">
                Whether you submitted a custom project scope, an inquiry, or another form on the site, this gives us a clearer view of what your business needs and how to recommend the right direction.
              </p>
              <p className="text-[#94A3B8]">
                The goal now is simple. Review the information, understand the need, and identify the most useful next step based on fit, scope, and project type.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">What Happens Next</h2>
              <p className="text-[#94A3B8] mb-4">After reviewing your submission, the next step may include:</p>
              <ul className="space-y-2 text-[#94A3B8] mb-4">
                {nextSteps.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 text-[#6366F1]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#94A3B8]">This helps make the process more useful and more focused from the start.</p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Want to Move Faster?</h2>
              <p className="text-[#94A3B8] mb-4">
                If you are ready to talk through the project directly, you can book a consultation now instead of waiting for the next step to be shaped from the form alone.
              </p>
              <p className="text-[#94A3B8] mb-3">This is especially useful if:</p>
              <ul className="space-y-2 text-[#94A3B8] mb-6">
                {fasterReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <span className="mt-1 text-[#6366F1]">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors"
              >
                Book Consultation
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">A Better Starting Point for the Right Project</h2>
              <p className="text-[#94A3B8] mb-3">
                A clear submission helps create a clearer project.
              </p>
              <p className="text-[#94A3B8] mb-3">
                By sharing your goals, needs, and timeline upfront, you have already made the next stage easier. This helps reduce confusion, improve fit, and create a stronger path toward the right service direction.
              </p>
              <p className="text-[#94A3B8]">
                Whether the project turns into a focused build or a broader multi-service system, this is a better way to begin than starting without context.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.5} className="bg-[#13131E] border border-[#1E1E2E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">You Can Also Explore</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg border border-[#1E1E2E] bg-[#0F0F18] px-4 py-3 text-[#94A3B8] hover:text-[#F8F8FF] hover:border-[#6366F1]/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6} className="mb-8">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-4">Common Questions After Submitting</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection delay={0.7} className="p-8 rounded-xl border border-[#1E1E2E] bg-[#13131E] text-center">
              <h2 className="text-2xl font-bold text-[#F8F8FF] mb-3">Ready to Keep Moving?</h2>
              <p className="text-[#94A3B8] mb-6">
                If you want to take the next step right away, book a consultation now. Or continue exploring the site to learn more about the services, pricing, and process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={localePath(locale, "/book-consultation")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg hover:bg-[#6366F1]/90 transition-colors"
                >
                  Book Consultation
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href={localePath(locale, "/")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#1E1E2E] bg-[#0F0F18] text-[#F8F8FF] font-bold rounded-lg hover:border-[#6366F1]/50 transition-colors"
                >
                  Back to Home
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
