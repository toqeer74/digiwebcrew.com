---
title: "Core Web Vitals in 2026: The Fixes That Actually Move the Numbers"
metaTitle: "Core Web Vitals in 2026: A Practical Fix Guide"
metaDescription: "INP replaced FID and broke a lot of sites quietly. A practical guide to diagnosing and fixing LCP, INP, and CLS — with the fixes that produce real gains."
date: "2026-04-16"
updated: "2026-08-20"
author: "Toqeer Shafique"
authorRole: "Founder & Lead Engineer, Digi Web Crew"
category: "Technical SEO"
excerpt: "INP replaced FID and quietly broke a lot of sites that thought they were fine. Here's how to diagnose each metric and the fixes that actually produce gains."
coverImage: "/images/mockups/service-seo.jpg"
keywords:
  - Core Web Vitals
  - improve INP score
  - largest contentful paint optimisation
  - page speed SEO
---

Core Web Vitals is one of the few ranking topics where the guidance is public, the measurement is standardised, and the fixes are engineering rather than guesswork. It's also where most "SEO audits" stop at running PageSpeed Insights and pasting the screenshot.

Here's what each metric actually measures, how to find the real cause, and which fixes are worth the effort.

## First: lab data is not your score

PageSpeed Insights gives you two things and people constantly conflate them.

- **Lab data** (Lighthouse) is a simulated load on a throttled connection. Useful for debugging. Not your ranking input.
- **Field data** (CrUX) is real Chrome users over 28 days, at the 75th percentile. This is what Google uses.

A perfect Lighthouse score with failing field data is common and means your real users are on worse devices and networks than the simulation. Always fix against field data. If you have no field data, you don't have enough traffic for CWV to be your bottleneck — go build content and links instead.

## LCP — Largest Contentful Paint

**Target: under 2.5s.** Measures when the biggest above-the-fold element finishes rendering. Usually a hero image or headline.

The mistake is treating this as "make the image smaller." Break the number down instead — LCP has four sub-parts, and you need to know which one is fat:

1. **Time to first byte** — server/hosting problem
2. **Resource load delay** — the browser didn't know it needed the image yet
3. **Resource load time** — the image is too big
4. **Render delay** — something is blocking paint, usually JavaScript or a font

Fixes, in order of how often they're the actual answer:

- **Preload the LCP image and never lazy-load it.** Lazy-loading a hero image is self-sabotage — it guarantees the browser discovers it late. This single mistake is the most common cause of bad LCP we find.
- **Serve modern formats at correct dimensions.** AVIF or WebP, sized to the viewport. A 3000px-wide hero on a phone is wasted bytes.
- **Fix font loading.** `font-display: swap` and preloading the font file stops text from being invisible while the font downloads.
- **Then look at hosting.** If TTFB is over ~600ms, no front-end work will save you.

## INP — Interaction to Next Paint

**Target: under 200ms.** This replaced First Input Delay in 2024, and it's stricter in a way that caught a lot of sites out.

FID only measured the delay before your handler started. INP measures the whole thing: input delay, processing, *and* the next paint. Sites that scored well on FID because their handlers started fast — then blocked the main thread for 400ms doing work — now fail.

What causes bad INP, in rough order:

- **Heavy JavaScript on the main thread.** Third-party tags are the usual culprit. Chat widgets, analytics, A/B testing tools, and heat-mapping scripts all compete for the same thread your buttons need.
- **Large React re-renders.** A state change that re-renders a big tree on every keystroke. Debounce the input or narrow the subscription.
- **Expensive work inside event handlers.** Break it up, or move it off the main thread.

The highest-leverage fix is usually the least technical: **audit your third-party scripts and delete the ones nobody looks at.** Most sites are carrying two or three tags from campaigns that ended years ago. Load whatever survives with `next/script` at `lazyOnload` or `worker` strategy.

## CLS — Cumulative Layout Shift

**Target: under 0.1.** Measures unexpected movement of visible content.

This one has the clearest fixes:

- **Set explicit width and height on every image and video.** The browser then reserves the space. In Next.js, `next/image` handles this if you give it dimensions or `fill` with a sized parent.
- **Reserve space for anything injected later** — ad slots, cookie banners, embedded widgets. If it appears after load, it must not push content.
- **Never insert content above existing content** after paint. Announcement bars that load late are a classic offender.
- **Preload fonts** to avoid the reflow when a fallback font swaps for the real one at a different size.

## The diagnosis order that saves time

1. Pull field data from CrUX or Search Console — find which metric actually fails, on which template, on which device type. Mobile is usually the problem; desktop usually passes.
2. Reproduce it on a throttled mobile profile in DevTools.
3. Use the Performance panel to find the specific long task or the LCP sub-part.
4. Fix one thing, redeploy, and wait. **Field data moves on a 28-day rolling window** — you will not see the result tomorrow. This is the step where most people give up and conclude it didn't work.

## What this is worth

Be realistic. Core Web Vitals is a tiebreaker, not a primary ranking factor. Fixing LCP will not outrank a competitor with better content and more authority.

What it does do reliably is affect conversion. Every additional second of load time costs conversions, and that effect is direct revenue regardless of what Google thinks. The SEO benefit is real but secondary — the business case is that fast sites make more money.

If you want this handled continuously rather than as a one-off audit, that's what our [SEO and growth retainers](/services/seo-growth-retainers) cover. If the underlying build is the problem — and often it is — a [rebuild](/services/custom-software) is usually cheaper than indefinitely patching a slow foundation.
