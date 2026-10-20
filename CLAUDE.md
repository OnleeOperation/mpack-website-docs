# CLAUDE.md — M-Pack Website Build Instructions

You are acting as a senior product designer, nonprofit digital strategist, UX writer, and frontend engineer.

Your job is to build a polished, trustworthy, presentation-ready website for M-Pack using the documents in this repository as the source of truth.

## Read before coding

Read in this order:

1. `README.md`
2. `docs/00-project-context.md`
3. `docs/01-product-brief.md`
4. `docs/02-source-of-truth.md`
5. `docs/03-information-architecture.md`
6. `docs/04-page-specs.md`
7. `docs/05-content-copy.md`
8. `docs/06-design-system.md`
9. `docs/07-components-and-data.md`
10. `docs/08-integrations-commerce.md`
11. `docs/09-privacy-safeguarding.md`
12. `docs/10-analytics-kpis.md`
13. `docs/11-implementation-plan.md`
14. `docs/12-qa-acceptance.md`
15. `docs/13-presentation-demo.md`
16. `docs/14-open-decisions.md`

Also inspect the local `Info from MPack/` directory. Treat those files as internal source material, not automatically public assets.

Do not copy private addresses, personal phone numbers, bank information, donor information, board contact details, internal budgets, or other sensitive information into the public website.

---

## Core product goal

Build one coherent digital experience that supports the team's funding strategy:

- recurring corporate partnerships,
- recurring monthly giving through the Donors' Club,
- craft sales and M-Pack merchandise,
- newsletter/community engagement.

The site should make M-Pack feel credible, active, human, and easy to support.

---

## Main audiences

Prioritize:

1. prospective individual donors,
2. existing supporters,
3. prospective corporate partners,
4. community members,
5. volunteers,
6. parents/caregivers and families,
7. people discovering M-Pack for the first time.

The website is not primarily designed for children.

---

## Technical direction

If the repository is empty or does not already have a sensible frontend stack, use:

- Next.js App Router,
- TypeScript,
- Tailwind CSS,
- accessible semantic HTML,
- clean open-source icons,
- minimal client-side JavaScript,
- hosted checkout links/adapters rather than custom card collection,
- centralized content/data files for the MVP.

Use current stable versions at implementation time. Do not replace an existing working stack without a strong reason.

---

## Build quality

The site must be:

- fully responsive,
- keyboard accessible,
- readable on small screens,
- visually consistent with the M-Pack presentation,
- polished enough to present live in class,
- fast,
- easy to maintain,
- structured for later integration with real donation/shop/newsletter tools.

Avoid:

- generic SaaS/startup-template aesthetics,
- walls of text,
- childish visual clichés,
- fake impact statistics,
- excessive animation,
- unnecessary complexity.

---

## Content rules

Never invent:

- children served,
- financial totals,
- success rates,
- partner relationships,
- sponsorship commitments,
- legal/tax status language,
- program outcomes,
- staff titles,
- product inventory,
- prices,
- donor counts.

If a fact is not supported by an approved source, use:

- neutral qualitative copy,
- a clearly marked placeholder,
- or `TODO: VERIFY WITH M-PACK`.

Class-project numbers are strategy concepts until M-Pack approves them for public use.

---

## Safeguarding rules

Non-negotiable:

- no public child profiles,
- no child full names on products/stories,
- no unapproved faces,
- no ACE history or private case details,
- no behavioral logs or sensitive program records,
- no messaging that frames children as helpless or as objects of charity,
- no buyer-to-child direct contact,
- M-Pack owns the selling/fulfillment relationship.

Read `docs/09-privacy-safeguarding.md` before implementing any story, image, product, or impact section.

---

## Design direction

Use the presentation as the visual starting point:

- warm cream background,
- deep teal primary,
- soft teal secondary,
- warm orange/coral accent,
- rounded cards,
- thin outlines,
- large condensed or characterful headings,
- generous whitespace,
- simple organic line motifs,
- minimal but confident motion.

The website should still look complete without photography.

---

## Homepage job

The homepage should answer, in order:

1. What is M-Pack?
2. Why does its work matter?
3. What does M-Pack actually do?
4. What does support make possible?
5. How can I help?
6. Can I give monthly?
7. Can I buy something?
8. Can my company partner?
9. How can I stay connected?

Every major path should end with a clear CTA.

---

## Commerce rules

For the prototype:

- build a credible catalog and product-detail experience,
- use demo/sample data where real inventory is unavailable,
- do not collect payment-card details directly,
- use hosted checkout/payment adapters,
- support a future `checkoutUrl` per product,
- keep donations and purchases conceptually separate,
- do not call purchases tax-deductible unless verified.

---

## Newsletter rules

Newsletter signup should have:

- email required,
- first name optional,
- explicit consent copy,
- success/error states,
- no dark patterns,
- no pre-checked marketing boxes.

---

## Development workflow

Before coding:

1. inspect the repo,
2. identify the existing stack and assets,
3. inspect source docs,
4. summarize the implementation plan,
5. list unresolved content/asset questions,
6. then begin coding.

Build in this order:

1. global theme/tokens,
2. layout/header/footer,
3. homepage,
4. Donors' Club,
5. shop/crafts,
6. merch,
7. partners,
8. newsletter,
9. analytics hooks,
10. polish/responsive/accessibility.

After each major phase:

- run lint,
- run typecheck,
- run tests if configured,
- verify no broken routes,
- check mobile layout.

---

## Preserve editability

Centralize copy and data.

Prefer structures like:

```text
src/content/site.ts
src/content/home.ts
src/data/crafts.ts
src/data/merch.ts
src/data/impact.ts
src/data/partners.ts
```

Do not bury important copy across many components.

---

## Presentation mode

This is also a classroom deliverable.

The prototype must be demo-friendly:

- no dead buttons,
- no broken links,
- smooth navigation,
- realistic sample product cards,
- newsletter success state,
- credible Donors' Club flow,
- clear journey from craft discovery to longer-term support.

If a real integration is not configured, use a designed demo state rather than a broken form.

---

## Definition of done

Do not call the build finished until it passes `docs/12-qa-acceptance.md`.
