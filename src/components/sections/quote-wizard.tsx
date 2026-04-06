"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
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
}

const STORAGE_KEY = "quote_wizard_draft_v2";

const HELP_OPTIONS = [
  "Website Design or Redesign",
  "Custom Website Development",
  "Funnel or Landing Pages",
  "SEO",
  "AI Chatbot",
  "Automation or Workflows",
  "E-commerce",
  "Web App",
  "Mobile App",
  "DevOps or Cloud",
  "Maintenance or Support",
  "Not Sure Yet",
];

const BUSINESS_OPTIONS = [
  "Law Firm",
  "Medical, Dental, or Clinic",
  "Med Spa",
  "Home Services",
  "Consultant or Coach",
  "Agency",
  "SaaS or Tech",
  "Education or Training",
  "E-commerce",
  "Other",
];

const GOAL_OPTIONS = [
  "Generate more leads",
  "Improve conversions",
  "Launch a new website",
  "Redesign an existing website",
  "Automate follow-up",
  "Improve SEO",
  "Build a custom system",
  "Streamline operations",
  "Need expert guidance",
];

const SERVICE_OPTIONS = [
  "Design",
  "Development",
  "SEO",
  "Funnel Pages",
  "AI Chatbot",
  "Workflows",
  "CRM Integration",
  "Booking System",
  "Analytics or Tracking",
  "Hosting or Deployment",
  "Ongoing Support",
];

const PROJECT_STAGE_OPTIONS = [
  "Starting from scratch",
  "Existing website needs redesign",
  "Existing system needs improvement",
  "Need migration",
  "Need support for an existing build",
];

const TIMELINE_OPTIONS = ["ASAP", "2 to 4 weeks", "1 to 2 months", "2 to 3 months", "Flexible"];
const BUDGET_OPTIONS = ["Under $3,500", "$3,500 to $7,500", "$7,500 to $15,000", "$15,000+", "Not sure yet"];
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

export function QuoteWizard({ isRtl, locale, preselectedService }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState<ScopeFormData>(defaultData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // If preselectedService is provided, use it to initialize the form
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

  if (isDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-white/10 bg-slate-100 dark:bg-white/5 p-10 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#6366F1]/10 text-[#6366F1]">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="mb-3 text-3xl font-display font-bold text-foreground">Your Submission Is In</h3>
        <p className="mb-7 text-muted-foreground">Thank you. Your project scope details have been received.</p>
        <button
          onClick={() => {
            window.location.href = localePath(locale, "/thank-you");
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#6366F1] px-6 py-3 font-semibold text-foreground"
        >
          Continue
          <ChevronRight size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366F1]">Step {currentStep + 1} of {steps.length}</p>
            <h3 className="text-2xl font-display font-bold text-foreground">{steps[currentStep]}</h3>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{progress}% Complete</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/5">
          <motion.div className="h-full bg-[#6366F1]" initial={false} animate={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
        <div className="hidden">
          <input
            value={formData.honeypot}
            onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 16 : -16 }}
            className="min-h-[280px]"
          >
            {currentStep === 0 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {HELP_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData((prev) => ({ ...prev, needHelp: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      formData.needHelp === option
                        ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {BUSINESS_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData((prev) => ({ ...prev, businessType: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      formData.businessType === option
                        ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {GOAL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData((prev) => ({ ...prev, mainGoal: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      formData.mainGoal === option
                        ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {SERVICE_OPTIONS.map((option) => {
                  const active = formData.servicesNeeded.includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => toggleService(option)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                        active
                          ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                          : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {PROJECT_STAGE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData((prev) => ({ ...prev, projectStage: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      formData.projectStage === option
                        ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 5 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {TIMELINE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData((prev) => ({ ...prev, timeline: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      formData.timeline === option
                        ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 6 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {BUDGET_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData((prev) => ({ ...prev, budget: option }))}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      formData.budget === option
                        ? "border-[#6366F1] bg-[#6366F1]/10 text-foreground"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 7 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground"
                  placeholder="Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground"
                  placeholder="Website"
                  value={formData.website}
                  onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                />
                <input
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                />

                <select
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-foreground md:col-span-2"
                  value={formData.preferredContact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, preferredContact: e.target.value }))}
                >
                  <option value="">Preferred contact method</option>
                  {CONTACT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentStep === 8 && (
              <div>
                <textarea
                  className="min-h-[200px] w-full rounded-lg border border-white/10 bg-white/5 p-4 text-foreground"
                  placeholder="Share any challenges, goals, feature needs, integrations, references, examples, or details that would help us understand the project better."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground",
              currentStep === 0 ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            <ChevronLeft size={16} className={isRtl ? "rotate-180" : ""} />
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
              disabled={!canNext()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-semibold text-foreground disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} className={isRtl ? "rotate-180" : ""} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={isSubmitting || !canNext()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366F1] px-6 py-3 text-sm font-semibold text-foreground disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {isSubmitting ? "Submitting" : "Submit Project Scope"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

