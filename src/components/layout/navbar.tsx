"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Code2,
  Zap,
  ShoppingCart,
  TrendingUp,
  Target,
  Wrench,
  Server,
  FolderOpen,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { localePath } from "@/lib/locale-path";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  dict: any;
  locale: string;
  siteName?: string;
  logoDataUrl?: string;
}

export function Navbar({ locale, siteName, logoDataUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const pathname = usePathname();
  let leaveTimeout: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  const navLinks = [
    { label: "Home", href: localePath(locale, "/") },
    { label: "Services", href: localePath(locale, "/services"), dropdown: true },
    { label: "Pricing", href: localePath(locale, "/pricing") },
    { label: "Work", href: localePath(locale, "/case-studies") },
    { label: "Process", href: localePath(locale, "/process") },
    { label: "About", href: localePath(locale, "/about") },
    { label: "Contact", href: localePath(locale, "/contact") },
  ];

  // Main Services list
  const mainServices = [
    {
      icon: Code2,
      title: "Custom Software",
      desc: "Bespoke platforms, web apps, and high-performance websites built to scale.",
      href: localePath(locale, "/services/custom-software"),
    },
    {
      icon: Zap,
      title: "AI Chatbots & Automation",
      desc: "Intelligent systems to automate workflows and enhance customer support.",
      href: localePath(locale, "/services/ai-chatbots-automation"),
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      desc: "High-conversion storefronts from custom platforms to Shopify.",
      href: localePath(locale, "/services/ecommerce"),
    },
    {
      icon: TrendingUp,
      title: "SEO & Growth",
      desc: "Compound rankings and organic traffic month over month.",
      href: localePath(locale, "/services/seo-growth-retainers"),
    },
    {
      icon: Target,
      title: "Conversion Funnels",
      desc: "High-converting funnels that turn visitors into buyers.",
      href: localePath(locale, "/services/conversion-funnels"),
    },
  ];

  // Additional Services list
  const additionalServices = [
    {
      icon: Wrench,
      title: "Internal Tools",
      desc: "Tailored digital dashboards and portals to streamline operations.",
      href: localePath(locale, "/services/automation-internal-tools"),
    },
    {
      icon: Server,
      title: "DevOps & Cloud",
      desc: "Secure hosting, database scaling, and automated deployment pipelines.",
      href: localePath(locale, "/services/devops-cloud"),
    },
    {
      icon: FolderOpen,
      title: "Case Studies",
      desc: "Read about our client success stories and project walkthroughs.",
      href: localePath(locale, "/case-studies"),
    },
  ];

  const allServiceItems = [...mainServices, ...additionalServices];

  const linkBase =
    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      {/* Backdrop overlay to dim background and focus on dropdown */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[-1] bg-slate-900/15 dark:bg-black/50 backdrop-blur-[1.5px] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative flex w-full max-w-5xl items-center justify-center">
        {/* Centered pill */}
        <nav className="hidden lg:flex items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/90 px-1.5 py-1.5 shadow-[0_2px_12px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    linkBase,
                    "inline-flex items-center gap-1",
                    pathname.startsWith(link.href) || servicesOpen
                      ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    size={13}
                    className={cn("transition-transform duration-300", servicesOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>

                {/* ── Single-grid layout clean dropdown card ── */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ type: "spring", damping: 22, stiffness: 320 }}
                      className="absolute left-1/2 top-[calc(100%+14px)] w-[540px] -translate-x-1/2 overflow-hidden rounded-[20px] border border-slate-200 bg-white/98 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-midnight/98 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
                    >
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 p-5 bg-transparent">
                        {allServiceItems.map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <Link
                              key={svc.title}
                              href={svc.href}
                              onClick={() => setServicesOpen(false)}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-100/50 dark:hover:bg-white/[0.03]"
                            >
                              <div className="mt-0.5 text-slate-500 group-hover:text-[var(--site-primary)] dark:text-slate-400 group-hover:dark:text-[var(--site-primary-soft)] transition-colors">
                                <Icon size={16} strokeWidth={2} />
                              </div>
                              <div className="flex-1">
                                <span className="block text-[13px] font-bold text-slate-950 transition-colors group-hover:text-[var(--site-primary)] dark:text-white dark:group-hover:text-[var(--site-primary-soft)] leading-tight">
                                  {svc.title}
                                </span>
                                <span className="mt-0.5 block text-[11px] leading-snug text-slate-600 dark:text-slate-400 font-medium">
                                  {svc.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-slate-200/60 bg-slate-50/80 p-4 dark:border-white/8 dark:bg-white/[0.02] backdrop-blur-md">
                        <Link
                          href={localePath(locale, "/services")}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 transition-colors hover:text-[var(--site-primary)] dark:text-slate-200 dark:hover:text-white group"
                        >
                          <BookOpen size={14} className="text-slate-400 group-hover:text-[var(--site-primary)] dark:text-slate-500 transition-colors" />
                          <span>Learn more about our services & build process →</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  linkBase,
                  pathname === link.href
                    ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            )
          )}
          {/* Separator & CTA buttons inside the pill */}
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />
          
          <Link
            href={localePath(locale, "/book-consultation")}
            className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 flex items-center gap-1.5"
          >
            <span>Book Consultation</span>
            <ArrowRight size={11} />
          </Link>
          <Link
            href={localePath(locale, "/quote")}
            className="rounded-full bg-[var(--site-primary)] px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98] flex items-center gap-1.5 ml-1"
          >
            <span>Get Custom Quote</span>
            <ArrowRight size={11} />
          </Link>
        </nav>

        {/* Mobile pill */}
        <div className="flex w-full items-center justify-between rounded-full border border-slate-200/80 bg-white/90 px-3 py-2 shadow-[0_2px_12px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] lg:hidden">
          <Link href={localePath(locale, "/")} className="px-2 text-sm font-bold text-slate-900 dark:text-white">
            Digi Web Crew
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-700 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-24 bottom-0 overflow-y-auto border-t border-slate-200 bg-white px-6 py-6 dark:border-white/10 dark:bg-midnight lg:hidden">
          <div className="space-y-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="space-y-2">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex w-full items-center justify-between py-3 text-lg font-bold text-slate-900 dark:text-white"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={20}
                      className={cn("transition-transform", mobileServicesOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-1 overflow-hidden border-l-2 border-slate-100 pl-4 dark:border-white/5"
                      >
                        {allServiceItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center gap-3 py-3 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                              onClick={() => setMobileOpen(false)}
                            >
                              <Icon size={18} className="text-slate-400 dark:text-slate-500" />
                              <span>{item.title}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-3 text-lg font-bold text-slate-900 dark:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div className="mt-6 border-t border-slate-200 pt-6 dark:border-white/10 space-y-3">
            <Link
              href={localePath(locale, "/book-consultation")}
              className="block w-full rounded-full bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              Book Consultation
            </Link>
            <Link
              href={localePath(locale, "/quote")}
              className="block w-full rounded-full bg-[var(--site-primary)] px-4 py-2.5 text-center text-sm font-semibold text-white hover:brightness-110 active:scale-[0.98]"
              onClick={() => setMobileOpen(false)}
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
