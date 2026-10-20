# M-Pack Website (plain HTML, GitHub Pages)

A static, no-build website for M-Pack: plain HTML, CSS, and JavaScript. Open `index.html` in a browser to preview, or publish with GitHub Pages.

> The original documentation pack (goals, page specs, safeguarding rules) follows below. The stack decision here is **plain HTML**, not the Next.js default in `CLAUDE.md`.

## Publish on GitHub Pages

1. Put this folder's contents at the **root** of a GitHub repo (the `.html` files must sit next to `assets/`).
2. **Do not commit `Info from MPack/`, the `.pptx`, or the PDFs.** GitHub Pages publishes every file in the repo, and those contain board addresses, budgets, and student information. The included `.gitignore` already excludes them.
3. Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)`**.
4. Your site appears at `https://<username>.github.io/<repo>/`. All links are relative, so a repo sub-path works. For a custom domain (e.g. mpackids.com), add it under Pages settings.

## What's where

| Path | What it is |
|---|---|
| `index.html`, `our-work.html`, `impact.html`, `shop.html`, `product.html`, `donors-club.html`, `give.html`, `partners.html`, `updates.html`, `update.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`, `404.html` | The pages. Edit the HTML directly. |
| `assets/js/config.js` | **Start here for real services**: form endpoints, hosted-checkout links, contact email, social links, announcement bar, analytics. Empty values = friendly demo mode. |
| `assets/js/data.js` | Products, Donors' Club tiers, gift-impact lines, sample updates, events. |
| `assets/js/layout.js` | Header, footer, navigation, and icons (edit once, applies to every page). |
| `assets/js/app.js`, `art.js` | Cart, shop, donation widget, forms; product illustrations. |
| `assets/css/main.css` | The whole design system (colors are CSS variables at the top). |
| `assets/img/` | Logo, mascot, and `photos/` (no photos of identifiable students). |
| `CONTENT-TO-VERIFY.md` | Every fact and placeholder M-Pack must confirm before launch. |

## Going live with real services (no code needed)

- **Forms** (newsletter, partner inquiry, contact): create a form at Formspree/Getform/Basin, paste its URL into `config.js` → `forms`.
- **Donations**: create recurring + one-time links in Donorbox, Givebutter, or Stripe Payment Links, paste them into `config.js` → `checkout`.
- **Shop**: replace the sample products in `data.js`; add a `checkoutUrl` (e.g. a Stripe Payment Link) to a product to send single-item buyers straight to hosted checkout.
- **Photos**: add approved images to `assets/img/photos/` and reference them. Only use faces with documented guardian consent.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

---

# M-Pack Website Prototype — Repository Guide

This documentation pack is designed to be copied into the root of the M-Pack website repository and used as the source of truth for Claude Code.

## Goal

Build a polished, presentation-ready M-Pack website that turns the team's funding strategy into a real digital experience.

The website should do four things well:

1. **Explain M-Pack clearly** — what the organization does, why the work matters, and what experiences M-Pack creates.
2. **Convert attention into ongoing support** — newsletter signups and a clear path into the M-Pack Donors' Club.
3. **Create a storefront for the Craft Initiative** — supporters can browse crafts connected to M-Pack activities and purchase them to support the organization.
4. **Support the broader funding strategy** — corporate partners, recurring donors, and craft sales all have visible, credible paths on the site.

The website should visually feel related to the class presentation: warm, modern, community-focused, clean, and not overly corporate.

## Important product principle

This is **not** a children's e-commerce marketplace.

M-Pack is the seller and storyteller. Crafts may be created during M-Pack activities, but product pages should not identify individual minors, expose private information, or imply that individual children are responsible for sales or fulfillment.

## Recommended repo structure

```text
mpack/
├── CLAUDE.md
├── START_HERE_PROMPT.md
├── README.md
├── Info from MPack/              # existing source docs; internal unless explicitly approved
├── docs/
│   ├── 00-project-context.md
│   ├── 01-product-brief.md
│   ├── 02-source-of-truth.md
│   ├── 03-information-architecture.md
│   ├── 04-page-specs.md
│   ├── 05-content-copy.md
│   ├── 06-design-system.md
│   ├── 07-components-and-data.md
│   ├── 08-integrations-commerce.md
│   ├── 09-privacy-safeguarding.md
│   ├── 10-analytics-kpis.md
│   ├── 11-implementation-plan.md
│   ├── 12-qa-acceptance.md
│   ├── 13-presentation-demo.md
│   └── 14-open-decisions.md
└── [application files created by Claude]
```

## How to use this pack

1. Copy the contents of this folder into the root of your website repo.
2. Keep the existing `Info from MPack/` folder in the repo.
3. Open Claude Code from the repo root.
4. Paste the contents of `START_HERE_PROMPT.md`.
5. Claude should inspect the source documents before publishing any factual claim.
6. Build the frontend prototype first.
7. Connect real payments, email, forms, or analytics only after the layout and copy are approved.

## MVP definition

The first presentation-ready version should include:

- responsive homepage,
- Our Work / About section or page,
- Donors' Club section or page,
- Craft storefront with sample or verified product data,
- M-Pack merch area,
- newsletter signup,
- corporate partnership CTA,
- impact section using only verified information,
- privacy/safeguarding language,
- working navigation,
- demo-safe checkout behavior or hosted checkout placeholders,
- mobile, tablet, and desktop layouts.

## Not required for the first prototype

- user accounts,
- a custom CMS,
- custom payment-card handling,
- complex shipping automation,
- donor database,
- child profiles,
- custom authentication,
- advanced inventory backend.

Those can be added later if M-Pack wants to operationalize the prototype.

---

## Running the prototype

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm run build
```

Content lives in `src/content/` and `src/data/`. Everything marked `sample`, "Proposed", or `TODO: VERIFY WITH M-PACK` is placeholder. Copy `.env.example` to `.env.local` to configure integrations later.
