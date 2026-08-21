---
title: "Headless vs Standard Shopify: Which Ecommerce Stack You Actually Need"
metaTitle: "Headless vs Shopify: Choosing an Ecommerce Stack"
metaDescription: "Headless commerce costs three times more and is right for a minority of stores. A revenue-based framework for choosing between standard Shopify and headless."
date: "2026-07-21"
updated: "2026-08-19"
author: "Toqeer Shafique"
authorRole: "Founder & Lead Engineer, Digi Web Crew"
category: "Ecommerce"
excerpt: "Headless is the default recommendation in agency pitches and the right answer for maybe one store in five. Here's how to tell which one you are."
coverImage: "/images/mockups/ui-funnels.jpg"
keywords:
  - headless commerce vs shopify
  - headless shopify
  - ecommerce platform choice
  - shopify hydrogen
---

Headless commerce gets recommended far more often than it's warranted, because it's the more interesting build and the larger invoice. For most stores it adds cost and operational friction in exchange for benefits they won't use.

Here's the honest version.

## What "headless" actually means

Standard Shopify: the platform runs your storefront. You pick a theme, customise it, and Shopify serves the pages.

Headless: Shopify keeps handling products, checkout, inventory, and payments, but the storefront is a separate application you build — usually Next.js — talking to Shopify through its Storefront API.

The checkout stays with Shopify either way. That matters, because checkout is the hardest and most regulated part, and nobody sensible rebuilds it.

## The cost difference is real

| | Standard Shopify | Headless |
|---|---|---|
| Build | $5,000 – $20,000 | $25,000 – $80,000+ |
| Timeline | 4–10 weeks | 3–6 months |
| Ongoing maintenance | Low — Shopify handles it | You own the frontend forever |
| Apps | Install and go | Many need custom integration |
| Content edits | Merchant does it | Depends what you built |

That last row is the one people underestimate. On standard Shopify, your marketing team rearranges the homepage themselves. Headless, unless you invest specifically in building that capability, means a developer ticket for a banner change.

## When standard Shopify is right

Almost certainly you, if:

- **Revenue is under roughly $5M/year.** The performance gains headless offers won't return the investment at that volume.
- **You depend on Shopify apps.** Subscriptions, reviews, loyalty, upsells — the app ecosystem is Shopify's real moat, and many apps assume a standard theme.
- **Your team needs to change the site themselves.** This is the most common reason headless projects are regretted.
- **You're selling a fairly conventional catalogue.** Standard themes handle this extremely well now.

Modern Shopify themes are also much faster than the reputation suggests. A well-optimised standard theme frequently beats a poorly-built headless site.

## When headless earns its cost

Build headless if **two or more** apply:

### 1. Content and commerce are deeply intertwined

If your store is really a publication with a buy button — editorial, guides, extensive lookbooks — you'll want a real CMS driving complex layouts, and Shopify's templating fights you.

### 2. You need a genuinely custom buying experience

Product configurators, complex bundling, B2B pricing tiers, quote-to-order flows. Things the theme system wasn't built for.

### 3. Performance is a measurable competitive factor

At high traffic volumes, tenths of a second measurably move revenue. If you're at the scale where a 0.3s improvement is worth six figures, headless gives you control that themes don't. Below that scale, this argument is theoretical — and worth reading our [Core Web Vitals guide](/blog/core-web-vitals-guide) before assuming it applies to you.

### 4. You're serving multiple brands or regions from one backend

One Shopify backend feeding several distinct storefronts is a genuine headless strength.

## The middle option nobody mentions

Shopify's own **Hydrogen and Oxygen** sit between the two: a React framework purpose-built for Shopify storefronts, hosted by Shopify. You get most of headless's flexibility with less infrastructure to own.

It's a narrower path than fully custom headless — you're inside Shopify's opinions — but for teams that want custom frontend control without running their own hosting, it's frequently the right compromise and it rarely gets proposed.

## The question that decides it

Not "which is better." Ask:

> **What can't we do today that's costing us money?**

If you can answer that specifically — "we can't build product bundles the way our customers buy them, and we estimate that's 15% of potential order value" — headless might be justified. Model it.

If the answer is "our site feels a bit dated," that's a theme and a design project, at a tenth of the price.

## What we'd do

We build both, and we recommend standard Shopify more often. When a store is genuinely constrained by the platform, headless is a strong answer — and when it isn't, headless is an expensive way to make your marketing team dependent on developers.

See our [ecommerce development work](/services/ecommerce), read [build vs buy](/blog/build-vs-buy-custom-software) for the general version of this decision, or [book a call](/book-consultation) and we'll tell you which side you're on.
