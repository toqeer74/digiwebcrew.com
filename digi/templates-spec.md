# Digital Web Crew - Template System Specification

## Overview

This document defines the reusable template system for the Digital Web Crew platform. Each template is designed for specific use cases with built-in SEO/AEO optimization and conversion-focused layouts.

---

## 1. Homepage Template

### Purpose
Primary entry point for the website. Must communicate value proposition immediately and guide visitors toward conversion.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ NAVIGATION                                                  │
│ Logo | Services | Case Studies | About | Blog | Contact CTA │
├─────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                │
│ [Headline: Value Proposition]                               │
│ [Subheadline: Key benefit statement]                        │
│ [Primary CTA] [Secondary CTA]                               │
│ [Social Proof: Logos/Stats]                                 │
├─────────────────────────────────────────────────────────────┤
│ SERVICES SECTION                                            │
│ [Section Label: What We Do]                                 │
│ [H2: Service Category Headline]                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│ │ Service  │ │ Service  │ │ Service  │ │ Service  │        │
│ │ Card 1   │ │ Card 2   │ │ Card 3   │ │ Card 4   │        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────────────────┤
│ PROCESS SECTION                                             │
│ [H2: How We Work]                                           │
│ [Step 1] → [Step 2] → [Step 3] → [Step 4]                   │
│ [Brief description of each step]                            │
├─────────────────────────────────────────────────────────────┤
│ CASE STUDIES SECTION                                        │
│ [H2: Featured Work]                                         │
│ ┌─────────────────┐ ┌─────────────────┐                    │
│ │ Featured Case   │ │ Case Study 2    │                    │
│ │ Study (Large)   │ │                 │                    │
│ └─────────────────┘ └─────────────────┘                    │
│ [View All Case Studies Link]                                │
├─────────────────────────────────────────────────────────────┤
│ TESTIMONIALS SECTION                                        │
│ [H2: What Clients Say]                                      │
│ [Quote Carousel/Grid]                                       │
│ [Client Name, Company, Logo]                                │
├─────────────────────────────────────────────────────────────┤
│ CTA SECTION                                                 │
│ [H2: Ready to Get Started?]                                 │
│ [Supporting text]                                           │
│ [Primary CTA Button]                                        │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                      │
│ [Logo + Tagline] [Quick Links] [Services] [Contact]         │
│ [Social Icons] [Copyright]                                  │
└─────────────────────────────────────────────────────────────┘
```

### Content Requirements

| Element | Requirement |
|---------|-------------|
| Headline | 6-10 words, benefit-focused |
| Subheadline | 15-25 words, expands on headline |
| Primary CTA | Action verb + benefit (e.g., "Get Your Free Audit") |
| Secondary CTA | Lower commitment (e.g., "View Our Work") |
| Social Proof | 3-5 client logos OR key stat (e.g., "150+ Projects Delivered") |

### SEO/AEO Blocks
- Schema.org Organization markup
- Service schema for each offering
- FAQ schema (optional, below fold)
- BreadcrumbList

### Conversion Points
1. Hero CTA buttons
2. Service card clicks
3. Case study views
4. Footer contact

---

## 2. Service Page Template

### Purpose
Detail a specific service offering, establish expertise, and drive consultation bookings.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HERO SECTION                                                │
│ [H1: Service Name + Location/Benefit]                       │
│ [Subheadline: What this service delivers]                   │
│ [Primary CTA: Book Consultation]                            │
├─────────────────────────────────────────────────────────────┤
│ PROBLEM SECTION                                             │
│ [H2: The Challenge]                                         │
│ [Pain points this service solves]                           │
│ [Visual: Problem illustration]                              │
├─────────────────────────────────────────────────────────────┤
│ SOLUTION SECTION                                            │
│ [H2: Our Approach]                                          │
│ [Methodology overview]                                      │
│ [Process steps or framework]                                │
├─────────────────────────────────────────────────────────────┤
│ FEATURES SECTION                                            │
│ [H2: What's Included]                                       │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│ │ Feature  │ │ Feature  │ │ Feature  │                     │
│ │ Card 1   │ │ Card 2   │ │ Card 3   │                     │
│ └──────────┘ └──────────┘ └──────────┘                     │
├─────────────────────────────────────────────────────────────┤
│ CASE STUDY SECTION                                          │
│ [H2: Real Results]                                          │
│ [Featured case study with metrics]                          │
│ [Client testimonial]                                        │
├─────────────────────────────────────────────────────────────┤
│ PRICING/CTA SECTION                                         │
│ [H2: Investment] OR [H2: Let's Talk]                        │
│ [Pricing info OR consultation offer]                        │
│ [Contact form or CTA button]                                │
├─────────────────────────────────────────────────────────────┤
│ FAQ SECTION                                                 │
│ [H2: Common Questions]                                      │
│ [Accordion with 4-6 FAQs]                                   │
└─────────────────────────────────────────────────────────────┘
```

### Content Requirements

| Element | Requirement |
|---------|-------------|
| H1 | Include primary keyword + location if GEO page |
| Problem | 2-3 specific pain points |
| Solution | Clear methodology (3-5 steps) |
| Features | 4-6 specific deliverables |
| Case Study | 1 featured with quantified results |
| FAQ | 4-6 questions targeting search queries |

### SEO/AEO Blocks
- Service schema
- HowTo schema (for process)
- FAQPage schema
- BreadcrumbList
- LocalBusiness schema (if GEO page)

### Conversion Points
1. Hero CTA
2. Mid-page CTA
3. Pricing/Contact section
4. FAQ accordion

---

## 3. Case Study Template

### Purpose
Showcase successful projects with measurable results to build credibility and trust.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HERO SECTION                                                │
│ [Client Logo]                                               │
│ [H1: Project Title/Outcome]                                 │
│ [Key Metrics: 3 stats in a row]                             │
├─────────────────────────────────────────────────────────────┤
│ OVERVIEW SECTION                                            │
│ [H2: Project Overview]                                      │
│ [Client industry, size, location]                           │
│ [Project duration, team size]                               │
├─────────────────────────────────────────────────────────────┤
│ CHALLENGE SECTION                                           │
│ [H2: The Challenge]                                         │
│ [What needed solving]                                       │
│ [Business impact of the problem]                            │
├─────────────────────────────────────────────────────────────┤
│ APPROACH SECTION                                            │
│ [H2: Our Approach]                                          │
│ [Strategy and methodology]                                  │
│ [Key decisions made]                                        │
├─────────────────────────────────────────────────────────────┤
│ SOLUTION SECTION                                            │
│ [H2: The Solution]                                          │
│ [What we built]                                             │
│ [Screenshots/mockups]                                       │
│ [Technical highlights]                                      │
├─────────────────────────────────────────────────────────────┤
│ RESULTS SECTION                                             │
│ [H2: Results]                                               │
│ [Quantified outcomes]                                       │
│ [Before/After comparison if applicable]                     │
├─────────────────────────────────────────────────────────────┤
│ TESTIMONIAL SECTION                                         │
│ [Quote from client]                                         │
│ [Client name, title, photo]                                 │
├─────────────────────────────────────────────────────────────┤
│ NEXT STEPS SECTION                                          │
│ [H2: Ready for Similar Results?]                            │
│ [CTA to contact/start project]                              │
│ [Related case studies]                                      │
└─────────────────────────────────────────────────────────────┘
```

### Content Requirements

| Element | Requirement |
|---------|-------------|
| Key Metrics | 3 quantified results (%, numbers, time) |
| Challenge | Specific, relatable problem |
| Approach | Clear methodology explanation |
| Solution | Technical and business description |
| Results | Before/after with metrics |
| Testimonial | Direct quote with attribution |

### SEO/AEO Blocks
- Article schema
- Review schema (testimonial)
- Organization schema
- BreadcrumbList

### Conversion Points
1. Hero contact link
2. Mid-page CTA
3. Next steps section
4. Related case studies

---

## 4. Blog Post Template (AEO Optimized)

### Purpose
Answer search queries directly while providing comprehensive information for SEO/AEO.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ [Category Badge] [Read Time]                                │
│ [H1: Question or Direct Answer Format]                      │
│ [Featured Image]                                            │
├─────────────────────────────────────────────────────────────┤
│ QUICK ANSWER (AEO)                                          │
│ [40-60 word direct answer to the query]                     │
│ [Key takeaway highlighted]                                  │
├─────────────────────────────────────────────────────────────┤
│ TABLE OF CONTENTS                                           │
│ [Jump links to H2 sections]                                 │
├─────────────────────────────────────────────────────────────┤
│ BODY CONTENT                                                │
│ [H2: Main Section 1]                                        │
│ [Detailed content with H3 subsections]                      │
│                                                             │
│ [H2: Main Section 2]                                        │
│ [Detailed content]                                          │
│                                                             │
│ [H2: Main Section 3]                                        │
│ [Detailed content]                                          │
├─────────────────────────────────────────────────────────────┤
│ FAQ SECTION                                                 │
│ [H2: Frequently Asked Questions]                            │
│ [Related questions with answers]                            │
├─────────────────────────────────────────────────────────────┤
│ AUTHOR SECTION                                              │
│ [Author photo, name, bio]                                   │
│ [Social/share links]                                        │
├─────────────────────────────────────────────────────────────┤
│ RELATED CONTENT                                             │
│ [H2: You Might Also Like]                                   │
│ [3 related article cards]                                   │
├─────────────────────────────────────────────────────────────┤
│ CTA SECTION                                                 │
│ [H2: Need Help With [Topic]?]                               │
│ [Brief pitch + CTA button]                                  │
└─────────────────────────────────────────────────────────────┘
```

### Content Requirements

| Element | Requirement |
|---------|-------------|
| H1 | Question format or direct answer format |
| Quick Answer | 40-60 words, featured snippet optimized |
| TOC | Links to all H2 sections |
| Body | 800-2500 words, comprehensive coverage |
| FAQ | 3-5 related questions |
| Author | Credibility-building bio |

### SEO/AEO Blocks
- Article schema
- FAQPage schema
- Author schema
- BreadcrumbList
- HowTo schema (if applicable)

### AEO Optimization Checklist
- [ ] H1 targets a specific query
- [ ] Quick answer in first 100 words
- [ ] Structured with clear H2/H3 hierarchy
- [ ] FAQ section with related questions
- [ ] Internal links to service pages
- [ ] Featured image with alt text

---

## 5. GEO Landing Page Template

### Purpose
Target location-specific searches with locally-relevant content and LocalBusiness schema.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HERO SECTION                                                │
│ [H1: Service in Location]                                   │
│ [Subheadline: Local expertise/benefit]                      │
│ [Location visual or map]                                    │
│ [Primary CTA]                                               │
├─────────────────────────────────────────────────────────────┤
│ LOCAL CONTEXT SECTION                                       │
│ [H2: Why [Location] Businesses Choose Us]                   │
│ [Local market insights]                                     │
│ [Regional expertise]                                        │
├─────────────────────────────────────────────────────────────┤
│ SERVICES SECTION                                            │
│ [H2: [Service] Services in [Location]]                      │
│ [Location-specific service offerings]                       │
├─────────────────────────────────────────────────────────────┤
│ LOCAL PROOF SECTION                                         │
│ [H2: Serving [Location] Businesses]                         │
│ [Local client logos/names]                                  │
│ [Regional case studies]                                     │
├─────────────────────────────────────────────────────────────┤
│ TEAM/LOCATION SECTION                                       │
│ [H2: Your Local [Service] Team]                             │
│ [Team members OR local office info]                         │
│ [Map embed]                                                 │
├─────────────────────────────────────────────────────────────┤
│ CONTACT SECTION                                             │
│ [H2: Get Started in [Location]]                             │
│ [Location-specific contact form]                            │
│ [Phone number with local area code]                         │
│ [Address with location]                                     │
├─────────────────────────────────────────────────────────────┤
│ FAQ SECTION                                                 │
│ [H2: [Location] [Service] FAQs]                             │
│ [Location-specific questions]                               │
└─────────────────────────────────────────────────────────────┘
```

### Content Requirements

| Element | Requirement |
|---------|-------------|
| H1 | Include service + location |
| Local Context | Why this location matters |
| Local Proof | Regional clients/case studies |
| Contact | Local phone, address, map |
| FAQ | Location-specific questions |

### SEO/AEO Blocks
- LocalBusiness schema (required)
- Service schema
- FAQPage schema
- BreadcrumbList
- Geo coordinates in schema

### GEO Optimization Checklist
- [ ] Location in H1, title, meta description
- [ ] LocalBusiness schema with address
- [ ] Embedded map
- [ ] Local phone number
- [ ] Location-specific content
- [ ] Regional case studies/testimonials

---

## 6. Admin Dashboard Template

### Purpose
Internal tool for managing content, leads, analytics, and AI workflows.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER                                                      │
│ [Logo] [Search] [Notifications] [User Menu]                 │
├──────────────┬──────────────────────────────────────────────┤
│              │ MAIN CONTENT                                 │
│  SIDEBAR     │ ┌─────────────────────────────────────────┐ │
│  ──────────  │ │ STATS ROW                               │ │
│  Dashboard   │ │ [Card] [Card] [Card] [Card]             │ │
│  Content     │ └─────────────────────────────────────────┘ │
│  Leads       │ ┌─────────────────────────────────────────┐ │
│  Analytics   │ │ MAIN PANEL                              │ │
│  AI Queue    │ │ [Table/Chart/Form based on page]        │ │
│  Settings    │ └─────────────────────────────────────────┘ │
│              │ ┌─────────────────────────────────────────┐ │
│              │ │ SECONDARY PANEL (optional)              │ │
│              │ │ [Filters, details, or related info]     │ │
│              │ └─────────────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────────────┘
```

### Component Patterns

#### Stats Card
```
┌─────────────────┐
│ [Icon]          │
│ Label           │
│ Value           │
│ ▲ Change %      │
└─────────────────┘
```

#### Data Table
```
┌─────────────────────────────────────────────────────────────┐
│ [Filters]                    [Search] [Export] [Add New]    │
├─────────────────────────────────────────────────────────────┤
│ □ | Column 1 | Column 2 | Column 3 | Column 4 | Actions    │
├─────────────────────────────────────────────────────────────┤
│ □ | Data     | Data     | Data     | Data     | [Edit] […] │
│ □ | Data     | Data     | Data     | Data     | [Edit] […] │
├─────────────────────────────────────────────────────────────┤
│ Showing X of Y results        [<] [1] [2] [3] [>]          │
└─────────────────────────────────────────────────────────────┘
```

#### AI Queue Item
```
┌─────────────────────────────────────────────────────────────┐
│ [Status Badge] Topic Title                    [Priority]   │
│ Type: Blog Post | Created: Date | ETA: Time                │
│ [Progress Bar]                                            │
│ [View] [Edit] [Approve] [Reject]                          │
└─────────────────────────────────────────────────────────────┘
```

### States

| State | Visual Treatment |
|-------|------------------|
| Loading | Skeleton screens, spinners |
| Empty | Illustration + CTA to add |
| Error | Alert banner with retry |
| Success | Toast notification |
| AI Thinking | Pulsing dots animation |
| Score Ready | Animated number count-up |

---

## 7. Email Template

### Purpose
Professional email communications for marketing automation and transactional emails.

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo - centered]                                           │
├─────────────────────────────────────────────────────────────┤
│ [Preheader text]                                            │
├─────────────────────────────────────────────────────────────┤
│ [Hero Image - optional]                                     │
├─────────────────────────────────────────────────────────────┤
│ [H1: Email Subject as Headline]                             │
├─────────────────────────────────────────────────────────────┤
│ [Body Content]                                              │
│ [Paragraphs, lists, etc.]                                   │
├─────────────────────────────────────────────────────────────┤
│ [Primary CTA Button]                                        │
├─────────────────────────────────────────────────────────────┤
│ [Secondary Content - optional]                              │
├─────────────────────────────────────────────────────────────┤
│ [Footer]                                                    │
│ [Social Links]                                              │
│ [Address] [Unsubscribe]                                     │
└─────────────────────────────────────────────────────────────┘
```

### Specifications

| Element | Specification |
|---------|---------------|
| Width | 600px max |
| Font | Arial, Helvetica, sans-serif (email-safe) |
| Primary Color | #0082FF |
| Background | #0A0A0F (dark mode), #FFFFFF (light mode) |
| Button | 44px height, rounded corners |

---

## Template Implementation Checklist

### For Each Template:

- [ ] Responsive design (mobile-first)
- [ ] SEO/AEO schema markup
- [ ] Conversion tracking events
- [ ] Performance optimized (lazy loading)
- [ ] Accessibility (WCAG AA)
- [ ] Dark mode support
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Analytics instrumentation

### Technical Requirements:

- [ ] Next.js App Router compatible
- [ ] TypeScript types defined
- [ ] Component props documented
- [ ] Storybook stories (optional)
- [ ] Unit tests (critical paths)
