import Link from "next/link";
import { 
  ArrowRight, CheckCircle2, Building2, Lightbulb, GraduationCap, Stethoscope, 
  Briefcase, Phone, MessageSquare, Video, ShieldCheck, HelpCircle, FileText,
  Mail, Send, Sparkles, MapPin, Search, Compass, Rocket
} from "lucide-react";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { ContactHowItWorks } from "@/components/sections/contact-how-it-works";
import { createLead } from "@/lib/actions/lead-actions";
import { localePath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const timelineSteps = [
  {
    num: "01",
    title: "Submit Inquiry",
    desc: "Share your project details with our quick contact form.",
    icon: Mail,
  },
  {
    num: "02",
    title: "Schedule a Call",
    desc: "Discuss your specific needs and goals with our expert team.",
    icon: Phone,
  },
  {
    num: "03",
    title: "Free Estimation",
    desc: "Get a tailored, negotiable project scope estimation.",
    icon: Search,
  },
  {
    num: "04",
    title: "Let's Collaborate",
    desc: "Ready to bring your ideas to life? Let's work together!",
    icon: Sparkles,
  },
];

const whatToInclude = [
  { text: "What type of business you run", icon: Building2 },
  { text: "What you need help with", icon: HelpCircle },
  { text: "Your main goal or objective", icon: ShieldCheck },
  { text: "Current website or system in place", icon: Lightbulb },
  { text: "Any timeline expectations", icon: CheckCircle2 },
  { text: "Examples or references", icon: Briefcase },
];

const bestFit = [
  { text: "Law firms & Legal", icon: Briefcase },
  { text: "Clinics & Med Spas", icon: Stethoscope },
  { text: "Home service businesses", icon: Building2 },
  { text: "Consultants & agencies", icon: Lightbulb },
  { text: "SaaS and B2B", icon: CheckCircle2 },
  { text: "Education and training", icon: GraduationCap },
];

const responsePaths = [
  { text: "A consultation call", icon: Phone },
  { text: "A recommended service direction", icon: MessageSquare },
  { text: "A clearer project scope", icon: ShieldCheck },
  { text: "Follow-up questions if needed", icon: HelpCircle },
  { text: "Next-step guidance based on fit", icon: Video },
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: "Contact Digi Web Crew",
    description: "Talk to a senior engineer about your project. Get a response within one business day, with scoping guidance and clear next steps.",
    keywords: ["contact web development agency", "hire software developers"],
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;
  const sectionCardClass = "site-card overflow-hidden relative p-6 md:p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 lg:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/30 dark:border-white/5 dark:bg-white/5 group";

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
    <main className="flex-1 pt-6 pb-24 overflow-hidden relative">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container>
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          
          {/* Professional Hero Section */}
          <AnimatedSection immediate className="pt-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative">
              {/* LEFT: Typography */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="mx-auto lg:mx-0 mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                    <Mail size={12} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Get in Touch</span>
                </div>
                <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black text-foreground leading-[1.05] tracking-tight text-balance mb-6">
                  Let&apos;s Talk! <br className="hidden md:block" />
                  We&apos;re here to <span className="bg-gradient-to-r from-[var(--site-primary)] to-[#3b82f6] bg-clip-text text-transparent">help.</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Whether you need a custom quote, want to discuss a project strategy, or just have a general question, our team is ready to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="#contact-form" variant="primary" size="xl" className="group shadow-md shadow-[var(--site-primary)]/10">
                    <span>Send a Message</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* RIGHT: Professional Contact UI Mockup */}
              <div className="relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto h-[400px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                {/* Main Message Window */}
                <div className="absolute right-0 top-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">New Message</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-8 bg-slate-100 dark:bg-white/5 rounded-lg w-full flex items-center px-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">To: cx@digiwebcrew.com</span>
                    </div>
                    <div className="h-8 bg-slate-100 dark:bg-white/5 rounded-lg w-full flex items-center px-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Subject: Project Inquiry</span>
                    </div>
                    <div className="h-32 bg-slate-50 dark:bg-white/5 rounded-lg w-full p-4 border border-slate-100 dark:border-white/5 shadow-inner">
                      <div className="w-3/4 h-2 bg-slate-200 dark:bg-white/10 rounded mb-3" />
                      <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded mb-3" />
                      <div className="w-5/6 h-2 bg-slate-200 dark:bg-white/10 rounded" />
                    </div>
                    <div className="flex justify-end pt-2">
                      <div className="bg-[var(--site-primary)] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm shadow-[var(--site-primary)]/20 cursor-pointer">
                        <Send size={12} /> Send
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Location Card */}
                <div className="absolute left-0 bottom-4 w-64 bg-white/95 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl backdrop-blur-md p-5 transform -translate-x-4 translate-y-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <MapPin size={20} />
                    </div>
                    <span className="inline-block rounded-full bg-slate-100 dark:bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">HQ</span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm mb-1">Purwokerto Office</h4>
                  <p className="text-xs font-medium text-muted-foreground">Jl. Jend. Gatot Subroto No.42</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Connected Process Pipeline (Replaces basic timeline) */}
          <div className="mx-auto w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden">
            <ContactHowItWorks />
          </div>

          {/* Bento Routing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <AnimatedSection className={cn(interactiveCardClass, "bg-blue-50/50 dark:bg-blue-950/10 hover:border-blue-500/30 text-center")}>
              {gradientTop}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 ring-4 ring-blue-50 dark:ring-blue-500/10 transition-transform duration-500 group-hover:scale-110">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Book Consultation</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Best for businesses that already have a clear project need and want to discuss goals, scope, and next steps directly.
              </p>
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full px-5 py-2.5 transition-all shadow-md">
                Schedule Call <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <AnimatedSection className={cn(interactiveCardClass, "bg-emerald-50/50 dark:bg-emerald-950/10 hover:border-emerald-500/30 text-center")}>
              {gradientTop}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 ring-4 ring-emerald-50 dark:ring-emerald-500/10 transition-transform duration-500 group-hover:scale-110">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Get Custom Quote</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Best for businesses that want help defining the right service mix, project priorities, timeline, and budget.
              </p>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full px-5 py-2.5 transition-all shadow-md">
                Request Quote <ArrowRight size={14} />
              </Link>
            </AnimatedSection>

            <AnimatedSection className={cn(interactiveCardClass, "bg-[var(--site-primary)]/5 border-[var(--site-primary)]/30 text-center")}>
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--site-primary)]" />
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--site-primary)]/20 text-[var(--site-primary)] ring-4 ring-[var(--site-primary)]/10 transition-transform duration-500 group-hover:scale-110">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-[var(--site-primary)] transition-colors">Contact Form</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Best for general inquiries, project questions, or businesses that want to send details first (use the form below).
              </p>
            </AnimatedSection>
          </div>

          {/* Form & Info Section */}
          <AnimatedSection id="contact-form" className={cn(sectionCardClass, "scroll-m-32 p-6 md:p-10")}>
            {gradientTop}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="mb-4 inline-block rounded-full bg-[var(--site-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)] w-fit">Project Details</span>
                <h2 className="text-3xl font-display font-black text-foreground mb-4">Tell Us a Bit About Your Project</h2>
                <p className="text-muted-foreground font-medium mb-8 leading-relaxed">
                  Share a few details about your business, what you need help with, and how you would like us to get back to you.
                </p>
                
                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/5 shadow-inner">
                  <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--site-primary)]/10 text-[var(--site-primary)]">
                      <CheckCircle2 size={16} />
                    </div>
                    What helps us understand faster
                  </h3>
                  <ul className="space-y-4">
                    {whatToInclude.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-semibold">
                        <item.icon size={16} className="text-slate-400" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white dark:bg-[#0f1115] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
                <form action={sendInquiry} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Full Name *</label>
                    <input name="name" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all text-sm font-medium" placeholder="Jane Doe" required />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Email Address *</label>
                    <input name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all text-sm font-medium" placeholder="jane@company.com" required />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Company Name</label>
                    <input name="company" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all text-sm font-medium" placeholder="Acme Corp" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Phone Number</label>
                    <input name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all text-sm font-medium" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Website URL</label>
                    <input name="website" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all text-sm font-medium" placeholder="https://example.com" />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Service Interest</label>
                    <input name="serviceInterest" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all text-sm font-medium" placeholder="e.g. Website Redesign, SEO, Custom App..." />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 ml-1">Project Details *</label>
                    <textarea name="message" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-foreground placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--site-primary)] focus:border-transparent outline-none transition-all min-h-[120px] text-sm font-medium resize-y" placeholder="Tell us about your goals, current challenges, and any specific requirements..." required />
                  </div>

                  <div className="md:col-span-2 mt-4">
                    <Button type="submit" className="w-full bg-[#1746A2] hover:bg-[#123680] text-white shadow-xl shadow-blue-900/20 rounded-xl h-14 flex justify-center items-center gap-2 group transition-all text-base font-bold">
                      <span>Send Inquiry</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </AnimatedSection>

          {/* Deep Redesign: Bento Grid 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <AnimatedSection className={cn(interactiveCardClass, "bg-amber-50/30 dark:bg-amber-950/10 hover:border-amber-500/30")}>
              {gradientTop}
              <div className="flex justify-between items-start mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                  <Building2 size={24} />
                </div>
                <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Industries</span>
              </div>
              <h2 className="text-2xl font-display font-black text-foreground mb-6 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Who We Work Best With</h2>
              <ul className="space-y-3">
                {bestFit.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground font-semibold bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 shadow-sm transition-transform hover:-translate-y-1">
                    <item.icon size={18} className="text-amber-500 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className={cn(interactiveCardClass, "bg-emerald-50/30 dark:bg-emerald-950/10 hover:border-emerald-500/30")}>
              {gradientTop}
              <div className="flex justify-between items-start mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <Compass size={24} />
                </div>
                <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Next Steps</span>
              </div>
              <h2 className="text-2xl font-display font-black text-foreground mb-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">What Happens After</h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Once we receive your inquiry, the next step is to review the details and identify the best path forward.
              </p>
              <ul className="space-y-3">
                {responsePaths.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground font-semibold bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm transition-transform hover:-translate-y-1">
                    <item.icon size={18} className="text-emerald-500 shrink-0" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="inline-block rounded-full bg-slate-100 dark:bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">FAQ</span>
              <h2 className="text-4xl font-display font-black text-foreground tracking-tight">Questions About Getting Started</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </AnimatedSection>

          {/* Consistent Compressed Final CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-6 md:p-8 rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 mx-auto max-w-2xl shadow-lg shadow-[var(--site-primary)]/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[var(--site-primary)]/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-slate-100 dark:ring-white/10">
                <Rocket size={18} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white mb-3 tracking-tight max-w-lg mx-auto leading-tight">
                Ready to Start Your Project?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 max-w-sm mx-auto leading-relaxed">
                If you have a clear need and want to discuss the right direction, let's take the next step with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href={localePath(locale, "/book-consultation")} className="bg-[#1746A2] hover:bg-[#123680] text-white shadow-md rounded-full px-5 h-11 flex items-center gap-2 group transition-all">
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
