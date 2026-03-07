# DigiWebCrew Architecture Diagrams

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Web App    │  │  Mobile Web  │  │  Chatbot UI  │  │  Admin Panel │   │
│  │  (Next.js)   │  │  (Next.js)   │  │  (React)     │  │  (React)     │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└─────────┼─────────────────┼─────────────────┼─────────────────┼───────────┘
          │                 │                 │                 │
          └─────────────────┴────────┬────────┴─────────────────┘
                                     │
                              ┌──────┴──────┐
                              │   Vercel    │
                              │   Edge CDN  │
                              └──────┬──────┘
                                     │
┌────────────────────────────────────┼─────────────────────────────────────────┐
│                         API LAYER  │                                          │
├────────────────────────────────────┼─────────────────────────────────────────┤
│                                    │                                         │
│  ┌─────────────────────────────────┴─────────────────────────────────────┐  │
│  │                         Next.js API Routes                             │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │  │
│  │  │   /auth    │ │  /content  │ │   /leads   │ │   /chat    │        │  │
│  │  │  NextAuth  │ │    CRUD    │ │   CRUD     │ │   AI Bot   │        │  │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘        │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │  │
│  │  │   /seo     │ │   /ai      │ │ /analytics │ │  /admin    │        │  │
│  │  │  Analyze   │ │  Generate  │ │   Data     │ │   APIs     │        │  │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│  ┌─────────────────────────────────┴─────────────────────────────────────┐  │
│  │                         Middleware Layer                               │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │  │
│  │  │    Auth    │ │ Rate Limit │ │   i18n     │ │   CORS     │        │  │
│  │  │   Check    │ │  (Redis)   │ │ Routing    │ │  Config    │        │  │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
┌────────────────────────────────────┼─────────────────────────────────────────┐
│                    SERVICES LAYER  │                                          │
├────────────────────────────────────┼─────────────────────────────────────────┤
│                                    │                                         │
│  ┌─────────────────────────────────┴─────────────────────────────────────┐  │
│  │                         AI Services                                    │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │  │
│  │  │  OpenAI    │ │ Anthropic  │ │  DALL-E    │ │ Embeddings │        │  │
│  │  │   GPT-4    │ │   Claude   │ │   Images   │ │  (Pinecone)│        │  │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│  ┌─────────────────────────────────┴─────────────────────────────────────┐  │
│  │                         External Integrations                          │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │  │
│  │  │  HubSpot   │ │  Vercel    │ │  Cloudflare│ │  GitHub    │        │  │
│  │  │    CRM     │ │   Hosting  │ │    WAF     │ │    CI/CD   │        │  │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
┌────────────────────────────────────┼─────────────────────────────────────────┐
│                      DATA LAYER    │                                          │
├────────────────────────────────────┼─────────────────────────────────────────┤
│                                    │                                         │
│  ┌─────────────────────────────────┴─────────────────────────────────────┐  │
│  │                         Primary Database                               │  │
│  │                    ┌──────────────────────┐                           │  │
│  │                    │      MongoDB         │                           │  │
│  │                    │  ┌────────────────┐  │                           │  │
│  │                    │  │   users        │  │                           │  │
│  │                    │  │   contents     │  │                           │  │
│  │                    │  │   leads        │  │                           │  │
│  │                    │  │   chatsessions │  │                           │  │
│  │                    │  │   analytics    │  │                           │  │
│  │                    │  └────────────────┘  │                           │  │
│  │                    └──────────────────────┘                           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│  ┌─────────────────────────────────┴─────────────────────────────────────┐  │
│  │                         Caching & Storage                              │  │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │  │
│  │  │   Redis    │ │    S3      │ │  Pinecone  │ │  Vercel    │        │  │
│  │  │   Cache    │ │  Storage   │ │  Vector DB │ │    KV      │        │  │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Content Publishing Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Admin   │────▶│  AI      │────▶│  Human   │────▶│  SEO     │────▶│ Publish  │
│  Input   │     │  Draft   │     │  Review  │     │  Optimize│     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └────┬─────┘
                                                                          │
                                                                          ▼
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Social  │◀────│  Notify  │◀────│  Index   │◀────│  Build   │◀────│  Deploy  │
│  Share   │     │  Teams   │     │  Search  │     │  Static  │     │  to CDN  │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### Lead Capture Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Visitor │────▶│ Chatbot  │────▶│  Form    │────▶│  Lead    │────▶│  CRM     │
│  Arrives │     │  Chat    │     │  Submit  │     │  Created │     │  Sync    │
└──────────┘     └──────────┘     └──────────┘     └────┬─────┘     └────┬─────┘
                                                        │                │
                                                        ▼                ▼
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Convert │◀────│  Nurture │◀────│  Segment │◀────│  Score   │     │  Alert   │
│          │     │  Emails  │     │  Lead    │     │          │     │  Sales   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### Chatbot Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  User    │────▶│  Intent  │────▶│  Route   │────▶│ Generate │
│  Message │     │  Detect  │     │  Decision│     │ Response │
└──────────┘     └──────────┘     └────┬─────┘     └────┬─────┘
                                       │                │
                              ┌────────┴────────┐       │
                              │                 │       │
                              ▼                 ▼       ▼
                        ┌──────────┐      ┌──────────┐
                        │ Rule-    │      │  AI      │
                        │ Based    │      │  GPT-4   │
                        └────┬─────┘      └────┬─────┘
                             │                 │
                             └────────┬────────┘
                                      ▼
                               ┌──────────┐
                               │  Log &   │
                               │  Return  │
                               └──────────┘
```

## Component Architecture

### Frontend Components

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   └── contact/
│   ├── (content)/
│   │   └── blog/
│   │       ├── page.tsx          # Blog listing
│   │       └── [slug]/
│   │           └── page.tsx      # Blog post
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout
│   │   ├── page.tsx              # Dashboard
│   │   ├── content/
│   │   ├── leads/
│   │   ├── analytics/
│   │   └── settings/
│   └── api/
│       ├── auth/[...nextauth]/
│       ├── content/
│       ├── leads/
│       ├── chat/
│       └── ai/
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── chat/                     # Chatbot components
│   │   ├── ChatWidget.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── MessageList.tsx
│   │   └── MessageInput.tsx
│   ├── admin/                    # Admin components
│   │   ├── Sidebar.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── ContentEditor.tsx
│   │   └── LeadTable.tsx
│   └── sections/                 # Page sections
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── Testimonials.tsx
│       └── CTA.tsx
├── lib/
│   ├── ai/                       # AI integrations
│   │   ├── openai.ts
│   │   ├── prompts.ts
│   │   └── workflows.ts
│   ├── chatbot/                  # Chatbot logic
│   │   ├── intents.ts
│   │   ├── flows.ts
│   │   └── responses.ts
│   ├── seo/                      # SEO utilities
│   │   ├── metadata.ts
│   │   ├── structured-data.ts
│   │   └── analyzer.ts
│   ├── crm/                      # CRM integrations
│   │   └── hubspot.ts
│   ├── auth.ts
│   ├── db.ts
│   └── utils.ts
├── hooks/
│   ├── useChat.ts
│   ├── useAuth.ts
│   └── useAnalytics.ts
└── types/
    ├── content.ts
    ├── lead.ts
    └── chat.ts
```

### Backend API Structure

```
API Routes (/app/api/)
│
├── auth/[...nextauth]/route.ts    # Authentication
│   ├── GET    - Session check
│   └── POST   - Login/logout
│
├── content/route.ts               # Content management
│   ├── GET    - List/filter content
│   ├── POST   - Create content (admin)
│   ├── PUT    - Update content (admin)
│   └── DELETE - Delete content (admin)
│
├── content/[id]/route.ts
│   └── GET    - Get single content
│
├── leads/route.ts                 # Lead management
│   ├── GET    - List leads (admin)
│   └── POST   - Create lead
│
├── chat/route.ts                  # Chatbot
│   └── POST   - Process message
│
├── chat/session/route.ts
│   ├── POST   - Create session
│   └── GET    - Get session history
│
├── ai/generate/route.ts           # AI generation
│   └── POST   - Generate content (admin)
│
├── seo/analyze/route.ts           # SEO analysis
│   └── POST   - Analyze content (admin)
│
└── analytics/route.ts             # Analytics
    └── GET    - Get analytics data (admin)
```

## Database Schema

### Collections

```
users
├── _id: ObjectId
├── email: string (unique)
├── name: string
├── role: enum ['admin', 'editor', 'user']
├── image: string (optional)
├── createdAt: Date
└── updatedAt: Date

contents
├── _id: ObjectId
├── title: string
├── slug: string (unique)
├── content: string (markdown)
├── excerpt: string
├── coverImage: string (optional)
├── author: ObjectId (ref: users)
├── tags: string[]
├── category: string
├── status: enum ['draft', 'review', 'published', 'archived']
├── seo: {
│   ├── title: string
│   ├── description: string
│   └── keywords: string[]
│}
├── publishedAt: Date (optional)
├── createdAt: Date
└── updatedAt: Date

leads
├── _id: ObjectId
├── name: string
├── email: string
├── phone: string (optional)
├── company: string (optional)
├── message: string
├── source: string
├── status: enum ['new', 'contacted', 'qualified', 'converted']
├── tags: string[]
├── notes: string[]
├── hubspotContactId: string (optional)
├── score: number
├── createdAt: Date
└── updatedAt: Date

chatsessions
├── _id: ObjectId
├── sessionId: string (unique)
├── messages: [{
│   ├── role: enum ['user', 'assistant']
│   ├── content: string
│   ├── timestamp: Date
│   └── intent: string (optional)
│}]
├── metadata: {
│   ├── userAgent: string
│   ├── ip: string (hashed)
│   └── referrer: string
│}
├── leadId: ObjectId (ref: leads, optional)
├── createdAt: Date
└── updatedAt: Date

contentversions
├── _id: ObjectId
├── contentId: ObjectId (ref: contents)
├── content: string
├── metadata: {
│   ├── author: string
│   ├── timestamp: Date
│   ├── changeType: string
│   └── diff: object
│}
└── createdAt: Date

analytics
├── _id: ObjectId
├── event: string
├── page: string
├── sessionId: string
├── userId: ObjectId (optional)
├── metadata: object
└── timestamp: Date
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Security Layers                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Layer 1: Infrastructure                                │   │
│  │  - Cloudflare WAF (DDoS, SQL injection, XSS)           │   │
│  │  - SSL/TLS 1.3 encryption                              │   │
│  │  - Rate limiting at edge                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │  Layer 2: Application                                    │   │
│  │  - Input validation (Zod schemas)                       │   │
│  │  - CSRF protection                                      │   │
│  │  - XSS protection (helmet)                              │   │
│  │  - Security headers                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │  Layer 3: Authentication                                 │   │
│  │  - NextAuth.js with JWT                                 │   │
│  │  - OAuth providers (Google)                             │   │
│  │  - Session management                                   │   │
│  │  - Password policies                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │  Layer 4: Authorization                                  │   │
│  │  - Role-based access control (RBAC)                     │   │
│  │  - Resource-level permissions                           │   │
│  │  - API route protection                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────┐   │
│  │  Layer 5: Data                                           │   │
│  │  - AES-256 encryption at rest                           │   │
│  │  - PII masking in logs                                  │   │
│  │  - Data retention policies                              │   │
│  │  - GDPR compliance                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Deployment Pipeline                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Developer                                                      │
│     │                                                           │
│     ▼                                                           │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐               │
│  │  Local   │────▶│   Git    │────▶│  GitHub  │               │
│  │  Dev     │     │  Commit  │     │  Actions │               │
│  └──────────┘     └──────────┘     └────┬─────┘               │
│                                         │                       │
│                              ┌──────────┴──────────┐           │
│                              │                     │           │
│                              ▼                     ▼           │
│                       ┌──────────┐          ┌──────────┐       │
│                       │  Lint &  │          │  Deploy  │       │
│                       │  Test    │          │  Staging │       │
│                       └────┬─────┘          └────┬─────┘       │
│                            │                     │             │
│                            ▼                     ▼             │
│                       ┌──────────┐          ┌──────────┐       │
│                       │  Build   │          │  Smoke   │       │
│                       │          │          │  Tests   │       │
│                       └────┬─────┘          └────┬─────┘       │
│                            │                     │             │
│                            └──────────┬──────────┘             │
│                                       │                        │
│                                       ▼                        │
│                                ┌──────────┐                   │
│                                │  Deploy  │                   │
│                                │Production│                   │
│                                └────┬─────┘                   │
│                                     │                         │
│                                     ▼                         │
│                              ┌────────────┐                   │
│                              │   Vercel   │                   │
│                              │   Edge     │                   │
│                              │   Network  │                   │
│                              └────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────────┐
│                    Performance Strategy                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Rendering Strategy                                      │   │
│  │  - Static Generation (SSG) for marketing pages         │   │
│  │  - Server Components for dynamic content               │   │
│  │  - Client Components for interactivity                 │   │
│  │  - ISR for blog posts (revalidate: 3600)               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Asset Optimization                                      │   │
│  │  - Next.js Image component (WebP, responsive)          │   │
│  │  - Font optimization (next/font)                       │   │
│  │  - Code splitting (dynamic imports)                    │   │
│  │  - Tree shaking                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Caching Strategy                                        │   │
│  │  - CDN caching at edge (Vercel)                        │   │
│  │  - Redis for API response caching                      │   │
│  │  - SWR for client-side data fetching                   │   │
│  │  - MongoDB query result caching                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Core Web Vitals Targets                                 │   │
│  │  - LCP (Largest Contentful Paint): < 1.2s              │   │
│  │  - FID (First Input Delay): < 100ms                    │   │
│  │  - CLS (Cumulative Layout Shift): < 0.1                │   │
│  │  - FCP (First Contentful Paint): < 0.8s                │   │
│  │  - TTFB (Time to First Byte): < 200ms                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```
