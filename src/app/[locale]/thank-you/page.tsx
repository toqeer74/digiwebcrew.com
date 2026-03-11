import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const supportingPoints = [
    "Your details are now in review",
    "Built to make the next step clearer",
    "Helpful for both focused and multi-service projects",
    "You can still book a consultation if you want to move faster",
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
    <main className="flex-1 pt-16 pb-16">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
              <Check className="h-10 w-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-[#F8F8FF] leading-[1.1]">
              Thank You. Your Project Details Have Been Received.
            </h1>
            <p className="text-lg text-[#94A3B8] mb-10 max-w-3xl">
              We have received your custom scope submission. We will review the information to identify the best next step and reach out with a clear direction for your project.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full max-w-4xl">
              {supportingPoints.map((point) => (
                <div key={point} className="site-card flex items-center justify-center p-4 text-center text-sm font-medium text-[#94A3B8]">
                  {point}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">Want to Move Faster?</h2>
            <p className="text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">
              If you are ready to talk through the project directly, you can book a consultation now instead of waiting for the next step to be shaped from the form alone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
              {fasterReasons.map((reason) => (
                <div key={reason} className="flex items-center gap-3 text-left p-2 text-[#94A3B8]">
                  <div className="h-2 w-2 rounded-full bg-[#6366F1] shrink-0" />
                  <span className="text-[15px]">{reason}</span>
                </div>
              ))}
            </div>
            <Link
              href={localePath(locale, "/book-consultation")}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-[#6366F1]/90"
            >
              <span>Book Consultation</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">You Can Also Explore</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="site-card flex items-center justify-center p-4 text-center text-sm font-semibold text-[#94A3B8] hover:text-[#F8F8FF] hover:border-[#6366F1]/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h2 className="text-2xl font-bold text-[#F8F8FF] mb-6">Common Questions After Submitting</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
