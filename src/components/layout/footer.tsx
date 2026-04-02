"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import { localePath } from "@/lib/locale-path";

interface FooterProps {
    dict: any;
    locale: string;
    siteName?: string;
    logoDataUrl?: string;
}

export function Footer({ locale, siteName, logoDataUrl }: FooterProps) {
    const serviceLinks = [
        { label: "Custom Website Development", href: "/services/custom-software" },
        { label: "Funnel / Landing Pages", href: "/services/conversion-funnels" },
        { label: "AI Chatbots", href: "/services/ai-chatbots-automation" },
        { label: "SEO & Growth", href: "/services/seo-growth-retainers" },
        { label: "DevOps / Cloud", href: "/services/devops-cloud" },
        { label: "Maintenance & Support", href: "/services/maintenance-support" },
    ];

    const companyLinks = [
        { label: "Portfolio", href: "/case-studies" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Pricing", href: "/pricing" },
        { label: "Process", href: "/process" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ];

    const resourceLinks = [
        { label: "Insights / Blog", href: "/blog" },
        { label: "FAQs", href: "/faqs" },
        { label: "Industries", href: "/industries" },
        { label: "Get Custom Quote", href: "/quote" },
        { label: "Book Consultation", href: "/book-consultation" },
    ];

    const trustLinks = [
        { label: "Google Reviews", href: "https://www.google.com/search?q=Digi+Web+Crew+reviews" },
        { label: "Clutch", href: "https://clutch.co" },
        { label: "LinkedIn", href: "https://pk.linkedin.com/in/toqeer-shafique" },
        { label: "GitHub", href: "https://github.com/toqeer74" },
    ];

    return (
        <footer className="relative overflow-hidden border-t border-t-[2px] border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,1))] dark:border-white/10 dark:bg-midnight dark:bg-none pt-10 pb-6 z-0">
            {/* Decorative background stroke */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[80%] xl:w-[60%] z-[-1] opacity-60 dark:opacity-30 flex items-center justify-end overflow-hidden text-[var(--site-primary)] dark:text-white">
                <svg 
                    viewBox="0 0 1000 400" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[120%] min-w-[900px] h-auto translate-x-12 translate-y-[5%]"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path 
                        d="M 50,350 C 250,250 450,50 350,250 C 280,390 550,380 600,250 C 650,120 530,100 550,200 C 570,300 750,250 1000,80" 
                        stroke="currentColor" 
                        strokeWidth="28" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                    />
                </svg>
            </div>

            <div className="container relative z-10 px-6 md:px-12">

                {/* ── TOP: Nav links (left) + CTA (right) ── */}
                <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 mb-10">

                    {/* LEFT: 3-column nav grid + social icons + email */}
                    <div className="flex-1 flex flex-col gap-6">

                        {/* 3-column nav links */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm">
                            {/* Col 1 – Company */}
                            <ul className="space-y-2">
                                {companyLinks.map((item) => (
                                    <li key={item.href + item.label}>
                                        <Link
                                            href={localePath(locale, item.href)}
                                            className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Col 2 – Legal + Resources */}
                            <ul className="space-y-2">
                                <li>
                                    <Link href={localePath(locale, "/privacy")} className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localePath(locale, "/terms")} className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                                        Terms of Use
                                    </Link>
                                </li>
                                <li>
                                    <Link href={localePath(locale, "/blog")} className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                                        Insights
                                    </Link>
                                </li>
                                {resourceLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={localePath(locale, item.href)}
                                            className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Col 3 – Services */}
                            <ul className="space-y-2">
                                {serviceLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={localePath(locale, item.href)}
                                            className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social icons */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
                                Follow us on
                            </p>
                            <div className="site-card-muted flex items-center gap-4 text-base">
                                <a href="https://pk.linkedin.com/in/toqeer-shafique" target="_blank" rel="noreferrer" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]" aria-label="LinkedIn">
                                    <FaLinkedin size={18} />
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]" aria-label="Facebook">
                                    <FaFacebook size={18} />
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]" aria-label="Instagram">
                                    <FaInstagram size={18} />
                                </a>
                                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]" aria-label="X">
                                    <FaXTwitter size={18} />
                                </a>
                                <a href="https://github.com/toqeer74" target="_blank" rel="noreferrer" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]" aria-label="GitHub">
                                    <FaGithub size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <a
                            href="mailto:admin@digiwebcrew.com"
                            className="text-sm font-medium underline underline-offset-4 text-slate-700 dark:text-white hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)] w-fit"
                        >
                            admin@digiwebcrew.com
                        </a>
                    </div>

                    {/* RIGHT: CTA headline + button */}
                    <div className="xl:w-[42%] flex flex-col justify-center gap-6">
                        <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight text-slate-800 dark:text-white dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                            Elevate{" "}
                            <span className="text-slate-900 dark:text-white">your business now,</span>
                            <br />
                            with{" "}
                            <span className="text-[var(--site-primary)]">creative</span>{" "}
                            solutions!
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 relative z-10">
                            <Link
                                href={localePath(locale, "/contact")}
                                className="inline-flex items-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity dark:drop-shadow-lg"
                            >
                                Start Your Project <ArrowRight size={16} />
                            </Link>
                            <Link
                                href={localePath(locale, "/book-consultation")}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md dark:border-white/20 dark:bg-midnight/80 dark:backdrop-blur-md dark:text-white dark:hover:bg-white/20"
                            >
                                Book Consultation <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM: Original single-row sub-footer ── */}
                <div className="site-card-divider flex flex-col gap-6 border-t border-t-[2px] pt-6 text-[10px] md:text-xs text-slate-500 xl:flex-row xl:items-center xl:justify-between dark:text-white/80">
                    <span className="flex-1">© {new Date().getFullYear()} {siteName || "Digital Web Crew"}</span>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 flex-1 justify-center py-2 xl:py-0">
                        <span className="font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40 whitespace-nowrap">Review Platforms:</span>
                        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
                            {trustLinks.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="site-card-muted flex items-center gap-1.5 transition-all hover:text-[var(--site-primary)] dark:hover:text-white font-bold whitespace-nowrap"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-1 items-center gap-4 xl:justify-end">
                        <Link
                            href={localePath(locale, "/blog")}
                            className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                        >
                            Insights
                        </Link>
                        <Link
                            href={localePath(locale, "/privacy")}
                            className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                        >
                            Privacy Protocol
                        </Link>
                        <Link
                            href={localePath(locale, "/terms")}
                            className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                        >
                            Terms of Use
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

