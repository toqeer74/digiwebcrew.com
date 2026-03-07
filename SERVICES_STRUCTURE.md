# Service Architecture - 4 Domain Structure

## Overview
The services have been restructured from a flat catalog into 4 main service domains, creating a more organized and intuitive navigation experience.

## Navigation Flow

```
/services (Overview Page)
│
├── Click "Web Development" Card
│   └── /services/web (Domain Detail)
│       ├── Custom Software (Category)
│       │   └── Web App Development (Service) → /services/custom-software/web-app-development
│       └── Full-Stack Websites (Category)
│           ├── Next.js Performance Sites
│           └── MERN Stack Solutions
│
├── Click "Mobile & SaaS" Card
│   └── /services/mobile-saas (Domain Detail)
│       ├── Mobile App Development
│       └── SaaS Development
│
├── Click "E-commerce" Card
│   └── /services/ecommerce (Domain Detail)
│       └── Shopify Elite Themes
│
└── Click "Automation & Tools" Card
    └── /services/automation (Domain Detail)
        └── n8n Workflow Automation
```

## Service Domains

### 1. Web Development (`/services/web`)
- **Icon**: Globe
- **Color**: Blue to Cyan (from-blue-500 to-cyan-500)
- **Categories**: 2
  - Custom Software
  - Full-Stack Websites

### 2. Mobile & SaaS (`/services/mobile-saas`)
- **Icon**: Smartphone
- **Color**: Purple to Pink (from-purple-500 to-pink-500)
- **Categories**: 2
  - Mobile App Development
  - SaaS Development

### 3. E-commerce (`/services/ecommerce`)
- **Icon**: ShoppingCart
- **Color**: Green to Emerald (from-green-500 to-emerald-500)
- **Categories**: 1
  - E-commerce Development

### 4. Automation & Tools (`/services/automation`)
- **Icon**: Zap
- **Color**: Orange to Red (from-orange-500 to-red-500)
- **Categories**: 1
  - Automation & Tools

## Files Created/Modified

### Created Files
- `src/components/sections/service-domains-overview.tsx` - Overview component showing 4 domain cards
- `src/app/[locale]/services/[domain]/page.tsx` - Dynamic domain detail page

### Modified Files
- `src/lib/services-data.ts` - Added `ServiceDomain` type, restructured data into `serviceDomains` array
- `src/app/[locale]/services/page.tsx` - Updated to use `ServiceDomainsOverview` component

## Component Details

### ServiceDomainsOverview
**Location**: `src/components/sections/service-domains-overview.tsx`

Displays 4 domain cards in a responsive grid:
- **Desktop**: 4 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column

Features:
- Gradient-colored icon backgrounds
- Hover animations (scale, rotate)
- Service count display
- Link to domain detail page
- Premium CTA section

### Domain Detail Page
**Location**: `src/app/[locale]/services/[domain]/page.tsx`

Shows all categories within a domain:
- Breadcrumb navigation
- Domain title and description
- Grid of service category cards
- Premium CTA section
- RTL support (AR/UR)
- 404 handling for invalid domains

## Data Structure

```typescript
type ServiceDomain = {
  title: string;           // "Web Development"
  slug: string;            // "web"
  description: string;     // "Custom web applications..."
  icon: string;            // "Globe"
  color: string;           // "from-blue-500 to-cyan-500"
  categories: ServiceCategory[];
};

// In serviceCatalog exported for backward compatibility
export const serviceCatalog = serviceDomains.flatMap(d => d.categories);
```

## Helper Functions

### `getDomainBySlug(slug: string)`
Returns a `ServiceDomain` object by slug, or `null` if not found.

```typescript
const domain = getDomainBySlug('web');
// Returns { title: "Web Development", slug: "web", ... }
```

### `getCategoriesByDomainSlug(domainSlug: string)`
Returns array of categories in a domain.

```typescript
const categories = getCategoriesByDomainSlug('web');
// Returns [{ title: "Custom Software", ... }, { title: "Full-Stack Websites", ... }]
```

## Testing Checklist

- [x] Build compiles without TypeScript errors
- [ ] Navigation links work correctly
  - [ ] `/services` shows 4 domain cards
  - [ ] Click domain card navigates to `/services/{domain}`
  - [ ] Breadcrumb links work
  - [ ] Category cards link to service detail page
- [ ] Responsive design verified
  - [ ] Desktop (4-column grid)
  - [ ] Tablet (2-column grid)
  - [ ] Mobile (1-column grid)
- [ ] RTL support (Arabic/Urdu)
  - [ ] `/ar/services` displays correctly
  - [ ] `/ur/services` displays correctly
- [ ] Icon rendering works
- [ ] Gradient colors display properly

## Migration Notes

### Backward Compatibility
The old `serviceCatalog` export is preserved by flattening `serviceDomains`:
```typescript
export const serviceCatalog = serviceDomains.flatMap(d => d.categories);
```

This ensures existing code using `serviceCatalog` continues to work without changes.

### URL Changes
- **Old**: `/services?category=custom-software`
- **New**: `/services/web` (shows domain), then `/services/custom-software` (category detail)

The category detail routes remain unchanged, so direct links to individual services are unaffected.

## Future Enhancements

1. Add analytics tracking for domain/category clicks
2. Implement search across domains
3. Add "related services" suggestions
4. Create comparison view between domains
5. Add video demos per domain
6. Implement live chat for domain-specific queries
