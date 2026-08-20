"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ChevronLeft, ChevronRight, Loader2, Send,
  Layout, Code, MousePointerClick, TrendingUp, Bot, Workflow, ShoppingCart, MonitorSmartphone, Smartphone, Cloud, ShieldCheck, HelpCircle,
  Scale, Stethoscope, Heart, Wrench, Lightbulb, Building2, Server, GraduationCap, ShoppingBag, Grid,
  Target, Rocket, RefreshCw, Zap, Search, Cog, LineChart,
  PenTool, Code2, LayoutTemplate, MessageSquare, Repeat, Database, Calendar, BarChart, Shield,
  FilePlus, RefreshCcw, ArrowRightLeft, LifeBuoy,
  Clock, CalendarDays, CalendarRange, Infinity as InfinityIcon,
  Coins, Wallet, CreditCard, Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submitQuote } from "@/lib/actions/quote-actions";
import type { QuoteFormData } from "@/types/quote";
import { localePath } from "@/lib/locale-path";

type ScopeFormData = {
  needHelp: string;
  businessType: string;
  mainGoal: string;
  servicesNeeded: string[];
  projectStage: string;
  timeline: string;
  budget: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  preferredContact: string;
  message: string;
  honeypot: string;
};

interface QuoteWizardProps {
  dict: any;
  isRtl: boolean;
  locale: string;
  preselectedService?: string;
  allowedHelpOptions?: string[];
}

const STORAGE_KEY = "quote_wizard_draft_v2";

const HELP_OPTIONS = [
  { label: "Website Design or Redesign", icon: Layout },
  { label: "Custom Website Development", icon: Code },
  { label: "Funnel or Landing Pages", icon: MousePointerClick },
  { label: "SEO", icon: TrendingUp },
  { label: "AI Chatbot", icon: Bot },
  { label: "Automation or Workflows", icon: Workflow },
  { label: "E-commerce", icon: ShoppingCart },
  { label: "Web App", icon: MonitorSmartphone },
  { label: "Mobile App", icon: Smartphone },
  { label: "DevOps or Cloud", icon: Cloud },
  { label: "Maintenance or Support", icon: ShieldCheck },
  { label: "Not Sure Yet", icon: HelpCircle },
];

const BUSINESS_OPTIONS = [
  { label: "Law Firm", icon: Scale },
  { label: "Medical, Dental, or Clinic", icon: Stethoscope },
  { label: "Med Spa", icon: Heart },
  { label: "Home Services", icon: Wrench },
  { label: "Consultant or Coach", icon: Lightbulb },
  { label: "Agency", icon: Building2 },
  { label: "SaaS or Tech", icon: Server },
  { label: "Education or Training", icon: GraduationCap },
  { label: "E-commerce", icon: ShoppingBag },
  { label: "Other", icon: Grid },
];

const GOAL_OPTIONS = [
  { label: "Generate more leads", icon: Target },
  { label: "Improve conversions", icon: TrendingUp },
  { label: "Launch a new website", icon: Rocket },
  { label: "Redesign an existing website", icon: RefreshCw },
  { label: "Automate follow-up", icon: Zap },
  { label: "Improve SEO", icon: Search },
  { label: "Build a custom system", icon: Cog },
  { label: "Streamline operations", icon: LineChart },
  { label: "Need expert guidance", icon: HelpCircle },
];

const SERVICE_OPTIONS = [
  { label: "Design", icon: PenTool },
  { label: "Development", icon: Code2 },
  { label: "SEO", icon: Search },
  { label: "Funnel Pages", icon: LayoutTemplate },
  { label: "AI Chatbot", icon: MessageSquare },
  { label: "Workflows", icon: Repeat },
  { label: "CRM Integration", icon: Database },
  { label: "Booking System", icon: Calendar },
  { label: "Analytics or Tracking", icon: BarChart },
  { label: "Hosting or Deployment", icon: Server },
  { label: "Ongoing Support", icon: Shield },
];

const PROJECT_STAGE_OPTIONS = [
  { label: "Starting from scratch", icon: FilePlus },
  { label: "Existing website needs redesign", icon: RefreshCcw },
  { label: "Existing system needs improvement", icon: Wrench },
  { label: "Need migration", icon: ArrowRightLeft },
  { label: "Need support for an existing build", icon: LifeBuoy },
];

const TIMELINE_OPTIONS = [
  { label: "ASAP", icon: Zap },
  { label: "2 to 4 weeks", icon: Clock },
  { label: "1 to 2 months", icon: CalendarDays },
  { label: "2 to 3 months", icon: CalendarRange },
  { label: "Flexible", icon: InfinityIcon },
];

const BUDGET_OPTIONS = [
  { label: "Under $3,500", icon: Coins },
  { label: "$3,500 to $7,500", icon: Wallet },
  { label: "$7,500 to $15,000", icon: CreditCard },
  { label: "$15,000+", icon: Landmark },
  { label: "Not sure yet", icon: HelpCircle },
];

const CONTACT_OPTIONS = ["Email", "Phone", "WhatsApp", "Zoom"];

const steps = [
  "What do you need help with?",
  "What type of business are you?",
  "What is your main goal?",
  "Which services do you think you may need?",
  "What stage is your project in?",
  "What timeline are you working with?",
  "What budget range are you working with?",
  "How can we reach you?",
  "Anything else we should know?",
];

const defaultData: ScopeFormData = {
  needHelp: "",
  businessType: "",
  mainGoal: "",
  servicesNeeded: [],
  projectStage: "",
  timeline: "",
  budget: "",
  fullName: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  country: "",
  preferredContact: "",
  message: "",
  honeypot: "",
};

function mapServiceCategory(value: string): string {
  const v = value.toLowerCase();
  if (v.includes("funnel") || v.includes("landing")) return "conversion-funnels";
  if (v.includes("seo")) return "seo-growth-retainers";
  if (v.includes("ai") || v.includes("automation")) return "ai-chatbots-automation";
  return "custom-software";
}

function mapTimeline(value: string): string {
  if (value === "ASAP") return "urgent";
  if (value === "1 to 2 months" || value === "2 to 3 months") return "1-3-months";
  return "flexible";
}

function mapBudget(value: string): string {
  if (value === "Under $3,500") return "<10k";
  if (value === "$3,500 to $7,500") return "10k-25k";
  if (value === "$7,500 to $15,000") return "10k-25k";
  if (value === "$15,000+") return "25k-50k";
  return "<10k";
}

function mapProjectType(value: string): "new build" | "redesign" | "improvement" {
  if (value.toLowerCase().includes("redesign")) return "redesign";
  if (value.toLowerCase().includes("improvement") || value.toLowerCase().includes("support")) return "improvement";
  return "new build";
}

export function QuoteWizard({ isRtl, locale, preselectedService, allowedHelpOptions }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState<ScopeFormData>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      if (preselectedService) {
        setFormData((prev) => ({
          ...prev,
          servicesNeeded: [preselectedService]
        }));
      }
      return;
    }
    try {
      const parsed = JSON.parse(saved) as ScopeFormData;
      setFormData((prev) => ({ ...prev, ...parsed }));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const progress = useMemo(() => Math.round(((currentStep + 1) / steps.length) * 100), [currentStep]);

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesNeeded: prev.servicesNeeded.includes(service)
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service],
    }));
  };

  const canNext = () => {
    if (currentStep === 0) return Boolean(formData.needHelp);
    if (currentStep === 1) return Boolean(formData.businessType);
    if (currentStep === 2) return Boolean(formData.mainGoal);
    if (currentStep === 3) return formData.servicesNeeded.length > 0;
    if (currentStep === 4) return Boolean(formData.projectStage);
    if (currentStep === 5) return Boolean(formData.timeline);
    if (currentStep === 6) return Boolean(formData.budget);
    if (currentStep === 7) return Boolean(formData.fullName && formData.email && formData.preferredContact);
    return true;
  };

  const submit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload: QuoteFormData = {
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      serviceCategory: mapServiceCategory(formData.needHelp),
      serviceInterest: formData.servicesNeeded.length > 0 ? formData.servicesNeeded.join(", ") : formData.needHelp,
      projectType: mapProjectType(formData.projectStage),
      budgetRange: mapBudget(formData.budget),
      timeline: mapTimeline(formData.timeline),
      message:
        `Need help with: ${formData.needHelp}\n` +
        `Business type: ${formData.businessType}\n` +
        `Main goal: ${formData.mainGoal}\n` +
        `Services needed: ${formData.servicesNeeded.join(", ")}\n` +
        `Project stage: ${formData.projectStage}\n` +
        `Timeline: ${formData.timeline}\n` +
        `Budget: ${formData.budget}\n` +
        `Phone: ${formData.phone || "N/A"}\n` +
        `Website: ${formData.website || "N/A"}\n` +
        `Country: ${formData.country || "N/A"}\n` +
        `Preferred contact: ${formData.preferredContact}\n\n` +
        (formData.message || "No additional details provided."),
      locale,
      honeypot: formData.honeypot,
    };

    const result = await submitQuote(payload);
    setIsSubmitting(false);

    if (!result.success) {
      alert(result.error || "Failed to submit quote");
      return;
    }

    setIsDone(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const OptionCard = ({ icon: Icon, label, selected, onClick }: any) => (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-center p-6 text-center rounded-2xl border transition-all duration-300",
        selected
          ? "border-[var(--site-primary)] bg-[var(--site-primary)]/10 text-foreground shadow-[0_0_20px_rgba(var(--site-primary-rgb),0.15)] ring-1 ring-[var(--site-primary)]/50"
          : "border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-muted-foreground hover:border-[var(--site-primary)]/50 hover:bg-[var(--site-primary)]/5 hover:text-foreground hover:shadow-lg"
      )}
    >
      <div className={cn(
        "mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors",
        selected 
          ? "bg-[var(--site-primary)]/20 text-[var(--site-primary)]" 
          : "bg-slate-100 dark:bg-white/10 text-slate-500 group-hover:bg-[var(--site-primary)]/10 group-hover:text-[var(--site-primary)]"
      )}>
        <Icon size={24} />
      </div>
      <span className="font-semibold text-sm leading-snug">{label}</span>
      {selected && (
        <div className="absolute top-3 right-3 text-[var(--site-primary)]">
          <CheckCircle2 size={18} className="fill-[var(--site-primary)] text-white dark:text-background" />
        </div>
      )}
    </button>
  );

  const cardVariants = {
    hidden: (isRtl: boolean) => ({ opacity: 0, x: isRtl ? -20 : 20 }),
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: (isRtl: boolean) => ({ opacity: 0, x: isRtl ? 20 : -20, transition: { duration: 0.3 } })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  if (isDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 p-12 text-center backdrop-blur-xl shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-[var(--site-primary)] to-emerald-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--site-primary)]/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--site-primary)]/10 text-[var(--site-primary)] ring-8 ring-[var(--site-primary)]/5 relative z-10">
          <CheckCircle2 size={48} className="fill-[var(--site-primary)] text-white dark:text-background" />
        </div>
        <h3 className="mb-4 text-4xl font-display font-black text-foreground relative z-10">Your Scope is Submitted</h3>
        <p className="mb-10 text-lg text-muted-foreground font-medium max-w-md mx-auto relative z-10">Thank you. We have received your project details and will be in touch shortly to discuss the next steps.</p>
        <button
          onClick={() => {
            window.location.href = localePath(locale, "/thank-you");
          }}
          className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Return Home
          <ChevronRight size={18} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10 px-4 md:px-0">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 text-[var(--site-primary)] mb-4">
              <span className="h-2 w-2 rounded-full bg-[var(--site-primary)] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-black text-foreground tracking-tight">{steps[currentStep]}</h3>
          </div>
          <p className="hidden md:block text-sm font-bold uppercase tracking-widest text-muted-foreground">{progress}% Complete</p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10 shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-[var(--site-primary)] to-emerald-400" 
            initial={false} 
            animate={{ width: `${progress}%` }} 
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/85 dark:bg-white/5 p-6 md:p-10 backdrop-blur-xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA] opacity-50" />
        
        <div className="hidden">
          <input
            value={formData.honeypot}
            onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <AnimatePresence mode="wait" custom={isRtl}>
          <motion.div
            key={currentStep}
            custom={isRtl}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentStep === 0 && (() => {
              const options = allowedHelpOptions 
                ? HELP_OPTIONS.filter((opt) => allowedHelpOptions.includes(opt.label))
                : HELP_OPTIONS;
              
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {options.map((option, i) => (
                    <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                      <OptionCard 
                        icon={option.icon} 
                        label={option.label} 
                        selected={formData.needHelp === option.label} 
                        onClick={() => setFormData((prev) => ({ ...prev, needHelp: option.label }))} 
                      />
                    </motion.div>
                  ))}
                </div>
              );
            })()}

            {currentStep === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {BUSINESS_OPTIONS.map((option, i) => (
                  <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <OptionCard 
                      icon={option.icon} 
                      label={option.label} 
                      selected={formData.businessType === option.label} 
                      onClick={() => setFormData((prev) => ({ ...prev, businessType: option.label }))} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {GOAL_OPTIONS.map((option, i) => (
                  <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <OptionCard 
                      icon={option.icon} 
                      label={option.label} 
                      selected={formData.mainGoal === option.label} 
                      onClick={() => setFormData((prev) => ({ ...prev, mainGoal: option.label }))} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="text-muted-foreground font-medium mb-6 text-sm">Select all that apply to your project scope.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {SERVICE_OPTIONS.map((option, i) => (
                    <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                      <OptionCard 
                        icon={option.icon} 
                        label={option.label} 
                        selected={formData.servicesNeeded.includes(option.label)} 
                        onClick={() => toggleService(option.label)} 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROJECT_STAGE_OPTIONS.map((option, i) => (
                  <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <OptionCard 
                      icon={option.icon} 
                      label={option.label} 
                      selected={formData.projectStage === option.label} 
                      onClick={() => setFormData((prev) => ({ ...prev, projectStage: option.label }))} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {TIMELINE_OPTIONS.map((option, i) => (
                  <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <OptionCard 
                      icon={option.icon} 
                      label={option.label} 
                      selected={formData.timeline === option.label} 
                      onClick={() => setFormData((prev) => ({ ...prev, timeline: option.label }))} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {currentStep === 6 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {BUDGET_OPTIONS.map((option, i) => (
                  <motion.div key={option.label} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                    <OptionCard 
                      icon={option.icon} 
                      label={option.label} 
                      selected={formData.budget === option.label} 
                      onClick={() => setFormData((prev) => ({ ...prev, budget: option.label }))} 
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {currentStep === 7 && (
              <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2" initial="hidden" animate="visible" variants={itemVariants} custom={0}>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground px-1">Full Name *</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground px-1">Company</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground px-1">Email Address *</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all"
                    placeholder="jane@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground px-1">Phone Number</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground px-1">Current Website</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-foreground px-1">Country</label>
                  <input
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all"
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-semibold text-foreground px-1">Preferred Contact Method *</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-4 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all appearance-none cursor-pointer"
                    value={formData.preferredContact}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preferredContact: e.target.value }))}
                  >
                    <option value="" disabled>Select a contact method...</option>
                    {CONTACT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {currentStep === 8 && (
              <motion.div initial="hidden" animate="visible" variants={itemVariants} custom={0}>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground px-1">Additional Details</label>
                  <textarea
                    className="min-h-[240px] w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-5 text-foreground focus:ring-2 focus:ring-[var(--site-primary)] outline-none transition-all resize-y text-base leading-relaxed"
                    placeholder="Share any challenges, specific goals, feature needs, integrations, references, examples, or details that would help us understand the project better..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground px-1">This helps us prepare for our first conversation.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-200 dark:border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className={cn(
              "inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 px-6 py-4 text-sm font-bold text-foreground hover:bg-slate-100 dark:hover:bg-white/10 transition-colors",
              currentStep === 0 ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            <ChevronLeft size={18} className={isRtl ? "rotate-180" : ""} />
            Previous Step
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={!canNext()}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-foreground text-background dark:bg-white dark:text-slate-900 px-8 py-4 text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none transition-all"
            >
              Next Step
              <ChevronRight size={18} className={isRtl ? "rotate-180" : ""} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={isSubmitting || !canNext()}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[var(--site-primary)] text-white px-10 py-4 text-base font-black shadow-lg hover:shadow-xl hover:bg-[var(--site-primary)]/90 disabled:opacity-50 disabled:hover:shadow-none transition-all group"
            >
              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
              {isSubmitting ? "Submitting..." : "Submit Project Scope"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
