"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceCatalog } from "@/lib/services-data";
import { submitQuote } from "@/lib/actions/quote-actions";
import type { QuoteFormData } from "@/types/quote";
import { localePath } from "@/lib/locale-path";

interface LegacyQuoteWizardProps {
  dict: any;
  isRtl: boolean;
  locale: string;
}

const STORAGE_KEY = "quote_wizard_draft_legacy";

export function LegacyQuoteWizard({ dict, isRtl, locale }: LegacyQuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const steps = [
    { id: "category", title: "Laboratory Selection" },
    { id: "subservice", title: "Specific Solution" },
    { id: "project", title: dict.quote.wizard.steps.project },
    { id: "scope", title: dict.quote.wizard.steps.details },
    { id: "contact", title: dict.quote.wizard.steps.contact },
  ];

  const [formData, setFormData] = useState<Partial<QuoteFormData>>({
    serviceCategory: "",
    serviceInterest: "",
    projectType: "new build",
    budgetRange: "",
    timeline: "",
    fullName: "",
    email: "",
    message: "",
    honeypot: "",
    locale,
  });

  // Force a clean start for this restored legacy flow.
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const result = await submitQuote(formData as QuoteFormData);
    setIsSubmitting(false);
    if (result.success) {
      setIsDone(true);
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    alert(result.error || "Failed to submit quote");
  };

  const updateForm = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const activeCategory = serviceCatalog.find((c) => c.slug === formData.serviceCategory);

  if (isDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 bg-card border rounded-[3rem] p-12 dark:shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tighter mb-6">{dict.quote.wizard.successTitle}</h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">{dict.quote.wizard.successDesc}</p>
        <button
          onClick={() => {
            window.location.href = localePath(locale, "/");
          }}
          className="group inline-flex h-16 items-center justify-center rounded-full bg-primary px-10 font-black text-xs text-primary-foreground uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
        >
          {dict.quote.wizard.backHome}
          <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Step 0{currentStep + 1}</p>
            <h4 className="text-xl font-bold tracking-tight">{steps[currentStep].title}</h4>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={false}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[2.5rem] p-8 md:p-12 min-h-[500px] flex flex-col dark:shadow-xl relative overflow-hidden">
        <div className="hidden">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => updateForm("honeypot", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1"
          >
            {currentStep === 0 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">{dict.quote.wizard.questions.service}</h3>
                  <p className="text-muted-foreground font-medium">Select the primary laboratory for your project.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceCatalog.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        updateForm("serviceCategory", cat.slug);
                        handleNext();
                      }}
                      className={cn(
                        "p-6 rounded-2xl border text-left transition-all dark:hover:shadow-lg group relative overflow-hidden",
                        formData.serviceCategory === cat.slug
                          ? "border-[#3B82F6] bg-[#EFF6FF] ring-1 ring-[#3B82F6]"
                          : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                      )}
                    >
                      <span className="block font-bold text-lg mb-2 group-hover:text-primary transition-colors">{cat.title}</span>
                      <span className="text-xs text-muted-foreground leading-relaxed block pr-6">{cat.description}</span>
                      <div
                        className={cn(
                          "absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                          formData.serviceCategory === cat.slug ? "bg-primary border-primary text-white" : "border-border"
                        )}
                      >
                        {formData.serviceCategory === cat.slug && <CheckCircle2 size={12} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">Specific Solution</h3>
                  <p className="text-muted-foreground font-medium">Refine your project scope within {activeCategory?.title}.</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {activeCategory?.subServices.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={() => {
                        updateForm("serviceInterest", sub.slug);
                        handleNext();
                      }}
                      className={cn(
                        "p-6 rounded-2xl border text-left transition-all flex items-center justify-between group",
                        formData.serviceInterest === sub.slug
                          ? "border-[#3B82F6] bg-[#EFF6FF] ring-1 ring-[#3B82F6]"
                          : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                      )}
                    >
                      <div>
                        <span className="block font-bold group-hover:text-primary transition-colors">{sub.title}</span>
                        <span className="text-xs text-muted-foreground">{sub.techStack.join(" • ")}</span>
                      </div>
                      <ChevronRight
                        size={18}
                        className={cn(
                          "transition-transform",
                          formData.serviceInterest === sub.slug ? "text-primary" : "text-muted-foreground group-hover:translate-x-1"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">{dict.quote.wizard.questions.project}</h3>
                  <p className="text-muted-foreground font-medium">Are we building from scratch or evolving an existing system?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["new build", "redesign", "improvement"].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        updateForm("projectType", type);
                        handleNext();
                      }}
                      className={cn(
                        "p-8 rounded-2xl border text-center transition-all flex flex-col items-center gap-4",
                        formData.projectType === type
                          ? "border-[#3B82F6] bg-[#EFF6FF] ring-1 ring-[#3B82F6]"
                          : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                          formData.projectType === type ? "bg-primary text-white" : "bg-secondary"
                        )}
                      >
                        {type === "new build" && <Sparkles size={24} />}
                        {type === "redesign" && <ChevronRight size={24} className="rotate-90" />}
                        {type === "improvement" && <ChevronRight size={24} />}
                      </div>
                      <span className="font-bold capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">{dict.quote.wizard.questions.scope}</h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Provide investment and timeline specifications.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      {dict.quote.wizard.fields.budget}
                    </label>
                    <select
                      id="budget"
                      className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-4 font-bold outline-none transition-all"
                      value={formData.budgetRange}
                      onChange={(e) => updateForm("budgetRange", e.target.value)}
                    >
                      <option value="">Select range</option>
                      <option value="<10k">$5k - $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k+">$50k+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                      {dict.quote.wizard.fields.timeline}
                    </label>
                    <select
                      id="timeline"
                      className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-4 font-bold outline-none transition-all"
                      value={formData.timeline}
                      onChange={(e) => updateForm("timeline", e.target.value)}
                    >
                      <option value="">Timeline</option>
                      <option value="urgent">Urgent (&lt; 1 month)</option>
                      <option value="1-3-months">Standard (1-3 months)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="brief" className="text-[10px] font-black uppercase tracking-widest text-primary">
                    {dict.quote.wizard.fields.brief}
                  </label>
                  <textarea
                    id="brief"
                    className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 min-h-[120px] font-medium outline-none transition-all resize-none"
                    placeholder={dict.quote.wizard.fields.briefPlaceholder}
                    value={formData.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <h3 className="text-3xl font-black tracking-tight">{dict.quote.wizard.questions.connect}</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{dict.quote.wizard.fields.name}</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-4 font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateForm("fullName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">{dict.quote.wizard.fields.email}</label>
                    <input
                      type="email"
                      className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-4 font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]">
                  <p className="text-xs text-muted-foreground leading-relaxed">{dict.quote.wizard.fields.privacyNotice}</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={handleBack}
            className={cn(
              "flex items-center justify-center gap-2 h-14 px-8 text-sm font-black uppercase tracking-widest transition-all glass border-none rounded-2xl hover:bg-secondary",
              currentStep === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ChevronLeft size={20} className={isRtl ? "rotate-180" : ""} />
            {dict.quote.wizard.back}
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.email || !formData.fullName || !formData.message}
              className="flex items-center justify-center gap-3 h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] dark:shadow-xl dark:shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              {isSubmitting ? dict.quote.wizard.submitting : dict.quote.wizard.submit}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !formData.serviceCategory) ||
                (currentStep === 1 && !formData.serviceInterest) ||
                (currentStep === 3 && (!formData.budgetRange || !formData.timeline || !formData.message))
              }
              className="flex items-center justify-center gap-2 h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] dark:shadow-xl dark:shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all"
            >
              {dict.quote.wizard.next}
              <ChevronRight size={20} className={isRtl ? "rotate-180" : ""} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

