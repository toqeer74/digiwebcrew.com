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
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-emerald-500/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Success</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Submission <span className="text-emerald-500">Received.</span> <br className="hidden md:block" /> Thank You.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              We have received your custom scope submission. Our team will review the laboratory details to identify the best next step and reach out with a clear direction for your project.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {supportingPoints.map((point) => (
                <div key={point} className="site-card p-4 flex items-center justify-center text-center text-xs font-bold text-slate-700 dark:text-[#94A3B8] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                  {point}
                </div>
              ))}
            </div>
          </AnimatedSection>


          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
             <AnimatedSection className="md:col-span-12 lg:col-span-7 site-card p-10 lg:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent opacity-60" />
                <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Want to Move Faster?</h2>
                <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-8 leading-relaxed">
                  If you are ready to talk through the project directly, you can book a consultation now instead of waiting for the next step to be shaped from the form alone.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10 text-slate-600 dark:text-[#94A3B8]">
                  {fasterReasons.map((reason) => (
                    <div key={reason} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shrink-0" />
                      <span className="text-sm font-medium leading-snug">{reason}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={localePath(locale, "/book-consultation")}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group"
                >
                  <span>Book Consultation</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
             </AnimatedSection>

             <AnimatedSection className="md:col-span-12 lg:col-span-5 site-card p-10 lg:p-12 relative overflow-hidden flex flex-col justify-center border-emerald-500/10 hover:border-emerald-500/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-60" />
                <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-8">Quick Navigation</h2>
                <div className="grid grid-cols-1 gap-3">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-[var(--site-primary)]/20 hover:bg-white dark:hover:bg-white/10 transition-all font-bold text-slate-700 dark:text-[#94A3B8] hover:text-[var(--site-primary)]"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
             </AnimatedSection>
          </div>

          <AnimatedSection className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] text-center mb-12">Common Questions After Submitting</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 lg:p-16 text-center space-y-8 relative overflow-hidden border-2 border-[var(--site-primary)]/20 shadow-[0_40px_80px_-40px_rgba(var(--site-primary-rgb),0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <h2 className="text-3xl md:text-6xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-tight">
               Build Something Great Together
            </h2>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8] max-w-2xl mx-auto">
               We're looking forward to reviewing your project brief. In the meantime, feel free to explore our latest case studies.
            </p>
            <div className="flex justify-center pt-4">
               <Link href={localePath(locale, "/case-studies")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-12 py-6 text-lg text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.6)] group">
                  <span>View Case Studies</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
