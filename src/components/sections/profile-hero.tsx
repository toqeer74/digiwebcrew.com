import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { localePath } from "@/lib/locale-path";
import { ScrambleText } from "@/components/ui/scramble-text";
import { HeroShowcase } from "@/components/sections/hero-showcase";

const ROTATING_WORDS = ["WEBSITES", "FUNNELS", "AUTOMATION", "GROWTH"];

interface ProfileHeroProps {
  locale: string;
  siteName?: string;
  logoDataUrl?: string;
  heading: string;
  description: string;
  ctaLabel: string;
}

const socials = [
  { icon: FaLinkedin, href: "https://pk.linkedin.com/in/toqeer-shafique", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com/toqeer74", label: "GitHub" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaInstagram, href: "https://www.instagram.com", label: "Instagram" },
];

export function ProfileHero({ locale, siteName, logoDataUrl, heading, description, ctaLabel }: ProfileHeroProps) {
  return (
    <section className="relative pt-28 pb-16">
      {/* Background Image with overlays & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Strong Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1746A2]/20 via-blue-500/10 to-transparent blur-[80px]" />
        
        {/*
          Purely decorative: 20% opacity, overlay blend, under three gradient
          washes. It was still the LCP element at ~20s on throttled mobile
          because `fill` makes it the largest paint. It is empty alt (decorative,
          not content), explicitly sized, and heavily compressed — at this
          opacity the quality drop is not perceptible but the bytes are.
        */}
        <Image
          src="/images/hero-bg.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={45}
          className="object-cover object-center opacity-20 dark:opacity-60 mix-blend-overlay"
          priority
        />
        {/* Bottom fade → white/dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-[#090b11] dark:via-[#090b11]/60 dark:to-transparent" />
        {/* Left-side content readability fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent dark:from-[#090b11] dark:via-[#090b11]/50 dark:to-transparent" />
        {/* Subtle top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent dark:from-[#090b11]/50 dark:to-transparent" />
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-4">
          <div className="max-w-3xl">
            {/* Avatar */}
            <div className="mb-8 h-20 w-20 overflow-hidden rounded-full border-2 border-white bg-white shadow-md dark:border-slate-800 dark:bg-slate-900">
              {logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoDataUrl} alt={siteName || "Logo"} className="h-full w-full object-contain p-2" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--site-primary)] to-[var(--site-primary-soft)] text-3xl font-black text-white">
                  {siteName ? siteName.charAt(0) : "D"}
                </div>
              )}
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-[3.25rem] font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white md:text-[4rem] drop-shadow-sm">
              {heading}
              <span className="mt-2 block font-[family-name:var(--font-inter)] font-black tracking-tight bg-gradient-to-r from-[#1746A2] via-blue-500 to-blue-400 bg-clip-text text-transparent pb-1">
                <ScrambleText words={ROTATING_WORDS} />
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium drop-shadow-sm">
              {description}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="inline-flex items-center rounded-full bg-slate-900 px-7 py-3.5 text-[15px] font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                {ctaLabel}
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center rounded-full border-2 border-slate-200 bg-white/50 backdrop-blur-md px-7 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm transition-all hover:bg-white hover:border-slate-300 hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:hover:bg-slate-800 dark:hover:border-white/20"
              >
                Get Custom Quote
              </Link>
            </div>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-5 text-slate-400 dark:text-slate-500">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="transition-colors hover:text-[var(--site-primary)] dark:hover:text-white"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <HeroShowcase />
        </div>
      </div>
    </section>
  );
}
