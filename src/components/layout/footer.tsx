import Link from "next/link";
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
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
    ];

    const trustLinks = [
        { label: "Google Reviews", href: "https://www.google.com/search?q=Digi+Web+Crew+reviews" },
        { label: "Clutch", href: "https://clutch.co" },
        { label: "LinkedIn", href: "https://pk.linkedin.com/in/toqeer-shafique" },
        { label: "GitHub", href: "https://github.com/toqeer74" },
    ];

    const socials = [
        { icon: FaLinkedin, href: "https://pk.linkedin.com/in/toqeer-shafique", label: "LinkedIn" },
        { icon: FaFacebook, href: "https://www.facebook.com", label: "Facebook" },
        { icon: FaInstagram, href: "https://www.instagram.com", label: "Instagram" },
        { icon: FaXTwitter, href: "https://x.com", label: "X" },
        { icon: FaGithub, href: "https://github.com/toqeer74", label: "GitHub" },
    ];

    const linkClass =
        "text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white";
    const headingClass =
        "mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500";

    return (
        <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-midnight">
            <div className="mx-auto max-w-6xl px-6 py-14">
                {/* Top: link columns + CTA */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr]">
                    {/* Link columns */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        <div>
                            <p className={headingClass}>Company</p>
                            <ul className="space-y-2.5">
                                {companyLinks.map((item) => (
                                    <li key={item.href + item.label}>
                                        <Link href={localePath(locale, item.href)} className={linkClass}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className={headingClass}>Resources</p>
                            <ul className="space-y-2.5">
                                {resourceLinks.map((item) => (
                                    <li key={item.href + item.label}>
                                        <Link href={localePath(locale, item.href)} className={linkClass}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className={headingClass}>Services</p>
                            <ul className="space-y-2.5">
                                {serviceLinks.map((item) => (
                                    <li key={item.href}>
                                        <Link href={localePath(locale, item.href)} className={linkClass}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col justify-start gap-5">
                        <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                            Elevate your business with{" "}
                            <span className="text-[var(--site-primary)]">creative</span> solutions.
                        </h2>
                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href={localePath(locale, "/contact")}
                                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                            >
                                Start Your Project <ArrowRight size={15} />
                            </Link>
                            <Link
                                href={localePath(locale, "/book-consultation")}
                                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                            >
                                Book Consultation <ArrowRight size={15} />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                            {socials.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                        className="transition-colors hover:text-slate-900 dark:hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                        <a
                            href="mailto:admin@digiwebcrew.com"
                            className="w-fit text-sm font-medium text-slate-600 underline underline-offset-4 transition-colors hover:text-[var(--site-primary)] dark:text-slate-300"
                        >
                            admin@digiwebcrew.com
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-400 dark:border-white/10 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>© {new Date().getFullYear()} {siteName || "Digi Web Crew"}. All rights reserved.</span>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <span className="font-bold uppercase tracking-[0.18em] text-slate-300 dark:text-slate-600">
                            Reviews:
                        </span>
                        {trustLinks.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium transition-colors hover:text-slate-900 dark:hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
