import { 
  ArrowRight, CalendarDays, CheckCircle2, MessageSquare, Briefcase, Target, Clock,
  FileText, Lightbulb, Workflow, HelpCircle, ShieldCheck, Zap, Rocket, CheckCircle, Video
} from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { localePath } from "@/lib/locale-path";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const discussionPoints = [
  { text: "What your business needs help with", icon: Briefcase },
  { text: "What is not working in the current setup", icon: HelpCircle },
  { text: "Whether the project is a good fit", icon: ShieldCheck },
  { text: "Which service or mix makes sense", icon: Workflow },
  { text: "What the likely scope looks like", icon: Target },
  { text: "Timeline expectations", icon: Clock },
  { text: "Budget range and investment level", icon: Zap },
  { text: "The best next step after the call", icon: ArrowRight },
];

const shouldBook = [
  { text: "Already know you want to discuss a project", icon: CalendarDays },
  { text: "Have a clear business need but want direction", icon: Target },
  { text: "Are comparing options and want a view of fit", icon: ShieldCheck },
  { text: "Want to talk through scope before decisions", icon: MessageSquare },
  { text: "May need more than one service working together", icon: Workflow },
  { text: "Ready for a serious conversation about the build", icon: Zap },
];

const prepareItems = [
  { text: "A short explanation of your business", icon: Briefcase },
  { text: "What you need help with", icon: HelpCircle },
  { text: "Your main goal", icon: Target },
  { text: "Your current website or system", icon: Workflow },
  { text: "A rough timeline", icon: Clock },
  { text: "Any examples or references you like", icon: FileText },
  { text: "A rough sense of budget if known", icon: Zap },
];

const afterBooking = [
  { step: "01", title: "A recommended scope", text: "We'll define exactly what needs to be done.", icon: Target },
  { step: "02", title: "A service direction", text: "Clear guidance on the services that fit best.", icon: Workflow },
  { step: "03", title: "Next-step advice", text: "Actionable steps you can take immediately.", icon: Lightbulb },
  { step: "04", title: "A quote or proposal", text: "Pricing and timelines where relevant.", icon: FileText },
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/book-consultation",
    title: "Book a Free Consultation",
    description: "Book a free 30-minute call with a senior engineer to scope your project, pressure-test the approach, and map out the right next step.",
    keywords: ["free development consultation", "book software consultation"],
  });
}

export default async function BookConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 lg:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/30 dark:border-white/5 dark:bg-white/5 group";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

  return (
    <main className="flex-1 pt-6 pb-24 overflow-hidden relative">
      {/* Deep Redesign: Complex Background Glow & Grid */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container>
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Professional Relevant Hero Section */}
          <AnimatedSection className="pt-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              {/* LEFT: Typography */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="mx-auto lg:mx-0 mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                    <Video size={12} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">1-on-1 Strategy Session</span>
                </div>
                <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black text-foreground leading-[1.05] tracking-tight text-balance mb-6">
                  Discuss the Right <br className="hidden md:block" />
                  <span className="text-[var(--site-primary)]">Next Step.</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  If you already have a project in mind and want to talk through goals, scope, timeline, and fit, book a consultation and let&apos;s discuss exactly what your business needs to succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="#scheduler" variant="primary" size="xl" className="group shadow-md shadow-[var(--site-primary)]/10">
                    <span>Book Consultation</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* RIGHT: Professional Calendar & Meeting Mockup */}
              <div className="relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto h-[400px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                {/* Main Calendar Card */}
                <div className="absolute right-0 top-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Schedule</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-foreground">August 2026</span>
                      <div className="flex gap-2 text-slate-400">
                        <div className="h-6 w-6 rounded flex items-center justify-center bg-slate-100 dark:bg-white/5">&lt;</div>
                        <div className="h-6 w-6 rounded flex items-center justify-center bg-slate-100 dark:bg-white/5">&gt;</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-slate-400 mb-2">
                      <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div key={i} className={cn("h-8 w-8 flex items-center justify-center rounded-full", i === 14 ? "bg-[var(--site-primary)] text-white shadow-md shadow-[var(--site-primary)]/30" : "text-slate-700 dark:text-slate-300")}>
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Meeting Card */}
                <div className="absolute left-0 bottom-4 w-72 bg-white/95 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl backdrop-blur-md p-5 transform -translate-x-4 translate-y-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      <Video size={20} />
                    </div>
                    <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm mb-1">Project Strategy Session</h4>
                  <p className="text-xs font-medium text-muted-foreground mb-4">30 Min Video Call • Zoom</p>
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold">U</div>
                    <div className="h-7 w-7 rounded-full bg-[var(--site-primary)] text-white border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold">E</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Interactive Calendly Container */}
          <AnimatedSection id="scheduler" className="scroll-m-32">
            <div className="relative mx-auto max-w-4xl p-2 md:p-4 rounded-3xl bg-slate-200/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl">
              {/* macOS style window dots */}
              <div className="absolute top-6 left-6 flex gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-inner" />
              </div>
              <div className="absolute top-4 w-full text-center z-10 pointer-events-none">
                <span className="text-xs font-semibold text-slate-400">Select Your Time</span>
              </div>
              
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#0f1115] mt-10 shadow-inner relative z-10">
                <iframe
                  title="Calendly Booking"
                  src="https://calendly.com/digiweb/consultation"
                  className="w-full min-h-[760px] dark:invert dark:hue-rotate-180 dark:contrast-125 transition-opacity duration-1000"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Deep Redesign: Bento Grid 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-12 lg:col-span-7 flex flex-col justify-center min-h-[400px]")}>
              <FluidBackground />
              <div className="relative z-10">
                <div className="mx-auto lg:mx-0 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--site-primary)]/10 text-[var(--site-primary)] shadow-sm ring-1 ring-[var(--site-primary)]/20">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tight">A Direct Way to Start the Conversation</h2>
                <div className="space-y-4 text-muted-foreground font-medium text-lg leading-relaxed max-w-xl">
                  <p>Some businesses already know they are ready to move forward. They may not have every detail finalized, but they know they need the right conversation to shape the next step.</p>
                  <p>If you want to discuss a custom website, landing page system, SEO support, automation setup, or a broader digital build, a consultation helps bring the project into clearer focus.</p>
                </div>
              </div>
            </AnimatedSection>

            <div className="md:col-span-12 lg:col-span-5 h-full">
              <AnimatedSection className={cn(interactiveCardClass, "h-full bg-blue-50/50 dark:bg-blue-950/10 hover:border-blue-500/30")}>
                {gradientTop}
                <span className="mb-4 inline-block rounded-full bg-blue-100 dark:bg-blue-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Discussion</span>
                <h2 className="text-2xl font-display font-black text-foreground mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">What We Cover</h2>
                <ul className="grid grid-cols-1 gap-3">
                  {discussionPoints.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground font-medium bg-white/60 dark:bg-white/5 p-3.5 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm hover:-translate-y-0.5 transition-transform">
                      <item.icon size={16} className="text-blue-500 shrink-0" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>

          {/* Deep Redesign: Bento Grid 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <AnimatedSection className={cn(interactiveCardClass, "bg-emerald-50/30 dark:bg-emerald-950/10 hover:border-emerald-500/30")}>
              {gradientTop}
              <div className="flex justify-between items-start mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Best Fit</span>
              </div>
              <h2 className="text-2xl font-display font-black text-foreground mb-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Who Should Book</h2>
              <ul className="space-y-3">
                {shouldBook.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground font-semibold bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm transition-transform hover:-translate-y-1">
                    <item.icon size={18} className="text-emerald-500 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className={cn(interactiveCardClass, "bg-amber-50/30 dark:bg-amber-950/10 hover:border-amber-500/30")}>
              {gradientTop}
              <div className="flex justify-between items-start mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <FileText size={24} />
                </div>
                <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Preparation</span>
              </div>
              <h2 className="text-2xl font-display font-black text-foreground mb-6 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">What Helps Before</h2>
              <ul className="space-y-3">
                {prepareItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground font-semibold bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 shadow-sm transition-transform hover:-translate-y-1">
                    <item.icon size={18} className="text-amber-500 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection className={cn(sectionCardClass, "p-6 md:p-10 border-t-4 border-t-violet-500 overflow-visible")}>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--site-primary)]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            
            <div className="text-center mb-12 relative z-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 dark:bg-violet-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700 dark:text-violet-400 shadow-sm ring-1 ring-violet-500/20">
                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                Outcome
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tight">What Happens Next</h2>
              <p className="text-lg text-muted-foreground font-medium mt-4 max-w-2xl mx-auto">
                Once the consultation is booked, the next step is simple. You select a time, share the relevant details, and we review the information before the conversation.
              </p>
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-[50px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-violet-200 via-blue-200 to-emerald-200 dark:from-violet-500/20 dark:via-blue-500/20 dark:to-emerald-500/20 z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                {afterBooking.map((item, idx) => {
                  const colors = [
                    "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-500/20 ring-violet-500/30 shadow-violet-500/20",
                    "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20 ring-blue-500/30 shadow-blue-500/20",
                    "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20 ring-emerald-500/30 shadow-emerald-500/20",
                    "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/20 ring-amber-500/30 shadow-amber-500/20"
                  ];
                  const borderColors = [
                    "hover:border-violet-500/50",
                    "hover:border-blue-500/50",
                    "hover:border-emerald-500/50",
                    "hover:border-amber-500/50"
                  ];
                  return (
                    <div key={idx} className={cn("group flex flex-col items-center text-center p-6 rounded-3xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 backdrop-blur-xl relative mt-4 lg:mt-0", borderColors[idx])}>
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 lg:-top-4 lg:-right-4 lg:left-auto lg:translate-x-0 w-8 h-8 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center font-black text-xs shadow-lg z-20 group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      
                      {/* Icon Container */}
                      <div className={cn("flex h-20 w-20 items-center justify-center rounded-2xl mb-6 shadow-lg ring-1 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10", colors[idx])}>
                        <item.icon size={32} strokeWidth={1.5} />
                      </div>
                      
                      <h4 className="font-display font-bold text-foreground text-xl mb-3">{item.title}</h4>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 text-center max-w-4xl mx-auto relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
              <Lightbulb size={32} className="mx-auto text-amber-500 mb-6 drop-shadow-md" />
              <p className="text-slate-700 dark:text-slate-300 font-medium italic leading-relaxed text-lg lg:text-xl text-balance">
                "Digital projects often go wrong when people skip the thinking stage and rush straight into execution. A consultation creates a chance to look at the business need properly, discuss options, and shape the right approach."
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="inline-block rounded-full bg-slate-100 dark:bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">FAQ</span>
              <h2 className="text-4xl font-display font-black text-foreground tracking-tight">Questions About Booking</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card overflow-hidden relative text-center p-6 md:p-8 rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 mx-auto max-w-2xl shadow-lg shadow-[var(--site-primary)]/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[var(--site-primary)]/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-slate-100 dark:ring-white/10">
                <Rocket size={18} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white mb-3 tracking-tight max-w-lg mx-auto leading-tight">
                Ready to Talk Through the Project?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 max-w-sm mx-auto leading-relaxed">
                If you have a clear need and want to discuss the right direction, book a consultation and take the next step with more confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="#scheduler" className="bg-[#1746A2] hover:bg-[#123680] text-white shadow-md rounded-full px-5 h-11 flex items-center gap-2 group transition-all">
                  <span className="font-semibold text-sm">Pick a Time</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Button>
                <Button href={localePath(locale, "/quote")} className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm rounded-full px-5 h-11 flex items-center gap-2 group transition-all dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10">
                  <span className="font-semibold text-sm">Get Custom Quote</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 dark:bg-white/10 dark:text-slate-300">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
