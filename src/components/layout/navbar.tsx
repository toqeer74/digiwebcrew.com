"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { 
  PiGlobeDuotone, 
  PiMagicWandDuotone, 
  PiBracketsCurlyDuotone, 
  PiChartLineUpDuotone, 
  PiTrendUpDuotone, 
  PiLightningDuotone, 
  PiToolboxDuotone, 
  PiShieldCheckDuotone, 
  PiShoppingCartDuotone, 
  PiStackDuotone 
} from "react-icons/pi";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
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
  const { isDark, toggleTheme } = useTheme();
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

  // Left column — Main Services (icon + title + description)
  const mainServices = [
    {
      icon: PiGlobeDuotone,
      color: "#6366F1",
      bg: "#EEF2FF",
      title: "Custom Software",
      desc: "Bespoke platforms, web apps, and high-performance websites built to scale.",
      href: localePath(locale, "/services/custom-software"),
    },
    {
      icon: PiLightningDuotone,
      color: "#D97706",
      bg: "#FFFBEB",
      title: "AI Chatbots & Automation",
      desc: "Intelligent systems to automate workflows and enhance customer support.",
      href: localePath(locale, "/services/ai-chatbots-automation"),
    },
    {
      icon: PiShoppingCartDuotone,
      color: "#DC2626",
      bg: "#FFF1F2",
      title: "E-Commerce Solutions",
      desc: "High-conversion storefronts from custom platforms to Shopify.",
      href: localePath(locale, "/services/ecommerce"),
    },
    {
      icon: PiChartLineUpDuotone,
      color: "#059669",
      bg: "#ECFDF5",
      title: "SEO & Growth",
      desc: "Compound rankings and organic traffic month over month.",
      href: localePath(locale, "/services/seo-growth-retainers"),
    },
    {
      icon: PiTrendUpDuotone,
      color: "#7C3AED",
      bg: "#F5F3FF",
      title: "Conversion Funnels",
      desc: "High-converting funnels that turn visitors into buyers.",
      href: localePath(locale, "/services/conversion-funnels"),
    },
  ];

  // Right column — Additional Services (icon + title only)
  const additionalServices = [
    {
      icon: PiToolboxDuotone,
      color: "#0369A1",
      bg: "#F0F9FF",
      title: "Internal Tools",
      href: localePath(locale, "/services/automation-internal-tools"),
    },
    {
      icon: PiShieldCheckDuotone,
      color: "#2563EB",
      bg: "#EFF6FF",
      title: "DevOps & Cloud",
      href: localePath(locale, "/services/devops-cloud"),
    },
    {
      icon: PiStackDuotone,
      color: "#9333EA",
      bg: "#FAF5FF",
      title: "Case Studies",
      href: localePath(locale, "/case-studies"),
    },
  ];

  const allServiceItems = [...mainServices, ...additionalServices];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-transparent">
      <div className="container mx-auto h-full px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href={localePath(locale, "/")} className="flex items-center gap-2">
          {logoDataUrl ? (
            <img src={logoDataUrl} alt={siteName || "Logo"} className="h-8 w-auto object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--site-primary)] to-[var(--site-primary-soft)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">{siteName ? siteName.charAt(0) : "D"}</span>
            </div>
          )}
          <span className="font-display font-bold text-foreground hidden sm:inline">
            {siteName || "Digital Web Crew"}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
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
                    "inline-flex items-center gap-1.5 py-6 text-sm font-semibold transition-all hover:text-[var(--site-primary)]",
                    pathname.startsWith(link.href) || servicesOpen
                      ? "text-[var(--site-primary)]"
                      : "text-muted-foreground"
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform duration-300", servicesOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>

                {/* ── Classic two-column dropdown card ── */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-12px)] w-[660px] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1f38] shadow-xl shadow-slate-200/60 dark:shadow-black/60 overflow-hidden"
                    >
                      {/* Top colour bar */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />

                      <div className="grid grid-cols-[1fr_auto_1fr]">
                        {/* LEFT — Main Services */}
                        <div className="p-5">
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Main Services
                          </p>
                          <div className="space-y-0.5">
                            {mainServices.map((svc) => {
                              const Icon = svc.icon;
                              return (
                                <Link
                                  key={svc.title}
                                  href={svc.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 group"
                                >
                                  <span
                                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                    style={{ background: svc.bg }}
                                  >
                                    <Icon size={15} style={{ color: svc.color }} />
                                  </span>
                                  <span>
                                    <span className="block text-[13px] font-semibold text-slate-800 dark:text-white group-hover:text-[var(--site-primary)] transition-colors leading-snug">
                                      {svc.title}
                                    </span>
                                    <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                      {svc.desc}
                                    </span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="w-px bg-slate-100 dark:bg-white/8 my-5" />

                        {/* RIGHT — Additional Services */}
                        <div className="p-5">
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                            Additional Services
                          </p>
                          <div className="space-y-0.5 mb-4">
                            {additionalServices.map((svc) => {
                              const Icon = svc.icon;
                              return (
                                <Link
                                  key={svc.title}
                                  href={svc.href}
                                  onClick={() => setServicesOpen(false)}
                                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 group"
                                >
                                  <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                                    style={{ background: svc.bg }}
                                  >
                                    <Icon size={15} style={{ color: svc.color }} />
                                  </span>
                                  <span className="text-[13px] font-semibold text-slate-800 dark:text-white group-hover:text-[var(--site-primary)] transition-colors">
                                    {svc.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed px-2">
                            Complete your project with expert automation, cloud infrastructure, and e-commerce solutions.
                          </p>
                        </div>
                      </div>

                      {/* Footer link */}
                      <div className="border-t border-slate-100 dark:border-white/8 bg-slate-50/70 dark:bg-white/[0.02]">
                        <Link
                          href={localePath(locale, "/services")}
                          onClick={() => setServicesOpen(false)}
                          className="block py-2.5 text-center text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400 hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary)] transition-colors"
                        >
                          View all services →
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
                  "text-sm text-slate-600 hover:text-slate-950 transition-colors dark:text-slate-400 dark:hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-950 transition-colors dark:border-white/10 dark:bg-transparent dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a href="#" className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-foreground">
            <FaLinkedin size={14} />
          </a>
          <a href="#" className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-foreground">
            <FaXTwitter size={14} />
          </a>
          <a href="#" className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-foreground">
            <FaGithub size={14} />
          </a>
          <Link
            href={localePath(locale, "/book-consultation")}
            className="px-4 py-2 rounded-full bg-[var(--site-primary)] text-white text-sm font-semibold hover:bg-[var(--site-primary-hover)] dark:shadow-[0_10px_20px_-10px_rgba(var(--site-primary-rgb),0.4)] transition-all"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden text-foreground p-2"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1f38] px-6 py-6 overflow-y-auto">
          <div className="space-y-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="space-y-2">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full py-3 text-lg font-bold text-slate-900 dark:text-white"
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
                        className="overflow-hidden space-y-1 pl-4 border-l-2 border-slate-100 dark:border-white/5"
                      >
                        {allServiceItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="flex items-center gap-2.5 py-2.5 text-sm text-muted-foreground hover:text-slate-900 dark:hover:text-white transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              <span
                                className="flex h-6 w-6 items-center justify-center rounded-md"
                                style={{ background: item.bg }}
                              >
                                <Icon size={12} style={{ color: item.color }} />
                              </span>
                              {item.title}
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
          <div className="pt-6 space-y-2 border-t border-white/10 mt-6">
            <button
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-white/10 text-muted-foreground hover:text-slate-950 dark:hover:text-foreground hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
            <Link
              href={localePath(locale, "/book-consultation")}
              className="block w-full px-4 py-2 rounded-full bg-[var(--site-primary)] text-white text-sm text-center font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

