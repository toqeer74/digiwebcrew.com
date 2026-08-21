---
title: "Why We Build on Next.js — and Where It's the Wrong Choice"
metaTitle: "Next.js for Business Websites: When It Fits"
metaDescription: "An honest assessment of Next.js for business sites: what Server Components and Turbopack actually change, and the four cases where WordPress is the better call."
date: "2026-01-05"
updated: "2026-08-16"
author: "Toqeer Shafique"
authorRole: "Founder & Lead Engineer, Digi Web Crew"
category: "Technology"
excerpt: "Next.js is our default for client work, and it's the wrong tool for a meaningful minority of projects. Here's how we decide — and when we recommend WordPress instead."
coverImage: "/images/mockups/ui-web-dev.jpg"
keywords:
  - Next.js for business websites
  - Next.js vs WordPress
  - React Server Components
  - Next.js development agency
---

Most agency posts about their tech stack are recruitment adverts dressed as analysis. This one tries to be useful instead: what Next.js actually buys a business, and the specific situations where we recommend something else.

## What actually changed

Two things in the recent Next.js releases matter commercially rather than just technically.

### Server Components reduce what the browser downloads

The traditional React problem was that building a rich interface meant shipping a large JavaScript bundle, and every kilobyte cost load time on the mobile devices where most traffic lives.

React Server Components let most of the page render on the server and arrive as HTML, with JavaScript sent only for the parts that are genuinely interactive. In practice, on the marketing sites we build, this cuts client-side JavaScript substantially compared with the equivalent single-page-app approach.

That shows up in [Core Web Vitals](/blog/core-web-vitals-guide), and more importantly in conversion on slow connections.

### Turbopack shortens the feedback loop

Turbopack is dramatically faster than the older toolchain on large applications. This is a developer-experience improvement, and it's fair to ask why a client should care.

The honest answer: it doesn't change what you get, it changes how many iterations fit in the budget. When a change takes two seconds to see instead of twenty, more things get tried and refined within the same hours. The benefit is real but indirect — treat claims that it makes *your site* faster with suspicion. It affects build time, not runtime.

## Where Next.js genuinely wins

- **Content-heavy sites that need to rank.** Server rendering with good caching gives fast first paint and clean HTML for crawlers.
- **Sites that will grow into applications.** Client portals, dashboards, booking systems — starting here avoids a rebuild later.
- **Anything with a performance requirement.** The tooling for image optimisation, font loading, and bundle control is the best available.
- **Complex integrations.** Talking to several APIs with server-side logic is straightforward.

## Where it's the wrong choice

This is the part most agencies skip.

### 1. Your team needs to change layouts without a developer

This is the big one. Next.js gives you excellent *content* editing through a CMS, but changing page structure usually means a developer and a deploy. If your marketing team expects to drag blocks around and publish landing pages unaided, a mature page builder on WordPress or Webflow will make them far more productive — and productive marketers are worth more than technically elegant code.

### 2. The budget is genuinely tight

A well-built Next.js site starts around $3,500 with us. If the realistic budget is $1,200, a good WordPress theme, properly configured and genuinely optimised, is a better outcome than a cheap custom build. We'd rather say that than sell you a stripped-down version of the wrong thing.

### 3. You depend on a specific WordPress plugin ecosystem

Some industries have mature, well-maintained WordPress plugins encoding years of domain knowledge — certain booking, membership, and compliance tools. Rebuilding that from scratch is expensive and worse. Use the ecosystem.

### 4. Nobody will maintain it

A custom application needs occasional dependency updates. If there's no plan and no budget for that, you'll have an aging codebase nobody can safely touch in three years. This is the same trap we describe in [build vs buy](/blog/build-vs-buy-custom-software), and it applies to marketing sites too.

## How we decide

Four questions, in order:

1. Will this need to do things a CMS can't? → Next.js
2. Does a non-technical team need structural control? → WordPress or Webflow
3. Is performance a competitive requirement? → Next.js
4. Is there a maintenance budget? → If no, choose the option with the least maintenance

Most client projects land on Next.js, but that's a property of the clients who seek us out, not a universal verdict. The tool follows the requirement.

If you're weighing this for a specific project, [book a call](/book-consultation) — we'll tell you which way we'd go and why, including when the answer is "not us."
