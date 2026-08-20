---
title: "Global Commerce Transformation"
client: "ShopGlobal"
industry: "E-commerce"
categories: ["E-commerce", "Conversion Funnels"]
role: "Headless replatform and performance engineering"
year: "2023"
excerpt: "Scaling a legacy Shopify store to handle 100k+ concurrent users during peak flash sales."
metrics:
  - value: "300%"
    label: "Faster page loads"
  - value: "40%"
    label: "Higher conversion rate"
  - value: "100k+"
    label: "Concurrent users handled"
  - value: "75%"
    label: "Less JavaScript execution"
outcomes:
  - "300% increase in page load speed"
  - "40% higher conversion rate"
  - "Zero downtime during Black Friday"
  - "Native-feeling mobile experience"
techStack: ["Hydrogen", "Oxygen", "TypeScript", "TailwindCSS"]
gallery:
  - "/images/work/g-ui-4.jpg"
  - "/images/work/g-ui-1.jpg"
testimonial:
  quote: "Flash sales used to be something we braced for. Now they are just a good day. The store simply does not fall over any more."
  author: "Director of E-commerce"
  role: "ShopGlobal"
---

ShopGlobal was struggling with a bloated legacy theme that crashed every time they ran a marketing campaign. They needed a headless solution that could scale instantly.

## The challenge

The storefront was carrying years of accumulated theme customisation, third-party scripts, and app integrations. On an ordinary day it was merely slow. During a flash sale it fell over.

That created a perverse dynamic: the more successful a campaign was, the more likely it was to take the store down at exactly the moment demand peaked.

## Our approach

We separated the storefront from the platform. Going headless meant rendering could scale independently of Shopify's theme layer, and we could be ruthless about what actually shipped to the browser.

Performance work here was not cosmetic. Every kilobyte of JavaScript removed from the critical path was a direct contribution to surviving peak load.

## What we built

We implemented a custom Hydrogen storefront and moved their logic to Oxygen edges, putting rendering close to customers rather than routing everything through a single origin.

We optimised every image, audited and removed unused third-party scripts, and reduced JavaScript execution time by 75%. The result behaves like a progressive web app rather than a themed storefront.

## The outcome

Page load speed improved threefold and conversion rate rose 40%. The new site feels native on mobile, which drove a marked spike in returning customers — and Black Friday passed with zero downtime.
