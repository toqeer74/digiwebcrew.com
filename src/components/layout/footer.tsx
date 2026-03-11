"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaFacebook, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import { localePath } from "@/lib/locale-path";

interface FooterProps {
  dict: any;
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-t-[2px] border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,1))] dark:border-[#123040] dark:bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_28%),linear-gradient(180deg,_rgba(9,14,20,0.98),_rgba(9,14,20,1))]">
      <div className="container px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="site-card site-card-interactive p-6">
            <span className="site-card-accent inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
              Studio
            </span>
            <h4 className="site-card-title mt-3 mb-3 font-display text-lg font-bold">
              Digital Web Crew
            </h4>
            <p className="site-card-muted mb-4 text-sm">
              Custom websites, funnels, SEO systems, and automation for growth-focused businesses.
            </p>
            <div className="site-card-muted flex items-center gap-3">
              <a href="#" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                <FaXTwitter size={16} />
              </a>
              <a href="#" className="hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]">
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          <div className="site-card site-card-interactive p-6">
            <h4 className="site-card-title mb-4 font-display text-lg font-bold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={localePath(locale, "/services/custom-software")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Custom Website Dev
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/services/conversion-funnels")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Conversion Funnels
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/services/ai-chatbots-automation")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  AI Chatbots
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/services/seo-growth-retainers")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  SEO & Growth
                </Link>
              </li>
            </ul>
          </div>

          <div className="site-card site-card-interactive p-6">
            <h4 className="site-card-title mb-4 font-display text-lg font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={localePath(locale, "/pricing")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/process")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/case-studies")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Work / Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/industries")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Industries
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/faqs")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/about")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/contact")}
                  className="site-card-muted hover:text-[var(--site-primary)] dark:hover:text-[var(--site-primary-soft)]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="site-card site-card-interactive p-6">
            <h4 className="site-card-title mb-4 font-display text-lg font-bold">Get Started</h4>
            <div className="space-y-3">
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-[color:var(--site-primary-border)] bg-[var(--site-primary)] px-4 py-2 text-sm font-semibold text-white shadow-[0_26px_60px_-36px_rgba(0,0,0,0.6)] transition-colors hover:bg-[var(--site-primary-hover)]"
              >
                <span>Get Custom Project Scope</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex w-full items-center justify-between gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.45)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--site-primary)] transition-colors hover:bg-[rgba(var(--site-primary-rgb),0.08)] hover:border-[color:rgba(var(--site-primary-rgb),0.7)] dark:text-white dark:hover:bg-[rgba(var(--site-primary-rgb),0.14)] dark:hover:border-[color:rgba(var(--site-primary-rgb),0.8)]"
              >
                <span>Book Consultation</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[rgba(var(--site-primary-rgb),0.12)] ring-1 ring-[rgba(var(--site-primary-rgb),0.18)] dark:bg-white/10 dark:ring-white/15">
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="site-card-divider flex flex-col gap-3 border-t border-t-[2px] pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between dark:text-white">
          <span>© 2026 Digital Web Crew</span>
          <div className="flex items-center gap-4">
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

