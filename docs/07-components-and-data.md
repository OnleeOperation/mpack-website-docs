# 07 — Components and Data Model

Keep the codebase modular and content-driven.

# Suggested component tree

```text
components/
├── layout/
│   ├── Header
│   ├── MobileNav
│   ├── Footer
│   └── Section
├── home/
│   ├── Hero
│   ├── WorkPillars
│   ├── ImpactPreview
│   ├── SupportPaths
│   ├── FeaturedCrafts
│   ├── DonorsClubPreview
│   ├── PartnersPreview
│   └── NewsletterSignup
├── shop/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductDetail
│   ├── CartDrawer
│   ├── QuantityControl
│   └── ShopMissionCallout
├── donors/
│   ├── TierCard
│   ├── MonthlyGivingExplainer
│   └── DonorFAQ
├── partners/
│   ├── PartnershipPathCard
│   └── PartnershipForm
├── impact/
│   ├── ImpactMetric
│   ├── ProgramHighlight
│   └── StoryCard
└── ui/
    ├── Button
    ├── Card
    ├── Badge
    ├── Input
    ├── Textarea
    ├── Accordion
    └── Modal
```

# Suggested content/data structure

```text
src/
├── content/
│   ├── site.ts
│   ├── homepage.ts
│   └── legal.ts
└── data/
    ├── crafts.ts
    ├── merch.ts
    ├── donorTiers.ts
    ├── impact.ts
    ├── partners.ts
    └── updates.ts
```

# TypeScript models

## Product

```ts
export type ProductCategory = "craft" | "merch";

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  currency: "USD";
  imageUrls: string[];
  inStock: boolean;
  inventoryLabel?: string;
  activityStory?: string;
  materials?: string[];
  checkoutUrl?: string;
  featured?: boolean;
  status: "draft" | "published";
}
```

Do not add:
- child name,
- child age,
- personal adversity history.

## Donor tier

```ts
export interface DonorTier {
  id: string;
  name: string;
  monthlyAmountCents: number;
  description: string;
  benefits: string[];
  checkoutUrl?: string;
  featured?: boolean;
  status: "draft" | "published";
}
```

Do not treat class-project tier amounts as final until approved.

## Impact metric

```ts
export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  timeframe?: string;
  source: string;
  verified: boolean;
  publicApproved: boolean;
}
```

Render only if both `verified` and `publicApproved` are true.

## Program highlight

```ts
export interface ProgramHighlight {
  id: string;
  title: string;
  date?: string;
  summary: string;
  category: string;
  imageUrl?: string;
  privacyApproved: boolean;
  published: boolean;
}
```

## Partner

```ts
export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  approvedForPublicDisplay: boolean;
}
```

# Demo product data

Sample names for prototype use:

- Woven Color Bracelet
- Painted Keepsake Card
- Workshop Print
- M-Pack Tote
- M-Pack Supporter Tee

Mark these as sample/demo unless verified as real products.

# CTA tracking attributes

Use stable IDs such as:

```html
data-track="donors-club-cta"
data-track="newsletter-submit"
data-track="craft-view"
data-track="craft-checkout"
data-track="partner-inquiry"
```
