# 06 — Design System

The website should visually connect to the current class presentation while feeling more polished and web-native.

# Design principles

1. Warm, not childish.
2. Modern, not corporate-generic.
3. Mission-led, not donation-heavy.
4. Readable, not dense.
5. Distinctive without depending on photography.
6. Trustworthy enough for donors and partners.

# Visual cues from the deck

The current presentation uses:

- warm off-white / cream backgrounds,
- deep teal headlines,
- soft teal linework,
- coral/orange accents,
- rounded rectangles,
- thin outlines,
- playful organic loops,
- bold condensed headings,
- generous negative space.

Carry these into the website.

# Suggested color tokens

Starting values only; adjust to match official assets if available.

```css
:root {
  --bg: #F4F3EA;
  --surface: #FAF9F3;
  --ink: #214B4A;
  --teal-900: #245E5D;
  --teal-700: #347977;
  --teal-500: #5F9D98;
  --teal-200: #CFE0DC;
  --orange-500: #E7835F;
  --orange-200: #F1C4AA;
  --border: #5F8F8B;
  --muted: #657B79;
}
```

Check contrast before finalizing.

# Typography

## Headings
Use a condensed, confident sans similar to the deck.

Good options:
- Barlow Condensed,
- Archivo Narrow,
- Roboto Condensed.

## Body
Use a highly readable sans:
- Inter,
- Source Sans 3,
- system sans.

Suggested pairing:
- Barlow Condensed for headings,
- Inter for body/UI.

Use official brand fonts instead if M-Pack provides them.

# Type scale

Desktop starting point:

```text
Hero: 64–80px
H1: 52–64px
H2: 38–48px
H3: 26–32px
Body large: 20–22px
Body: 16–18px
Small: 14px
Micro: 12px
```

Mobile:
- hero ~44–52px,
- body at least 16px.

# Layout

Use:
- max content width around 1200px,
- generous section padding,
- 12-column desktop grid,
- 1-column mobile stack,
- 24–32px card padding,
- 16–24px gaps,
- 20–28px rounded corners.

Avoid:
- heavy drop shadows,
- glassmorphism,
- excessive gradients,
- generic SaaS layouts,
- tiny text.

# Buttons

## Primary
- deep teal fill,
- cream text,
- rounded pill/soft rectangle.

## Secondary
- cream/transparent background,
- teal border,
- teal text.

## Text link
- teal,
- underline or arrow motion on hover.

All interactive controls need visible focus states.

# Cards

Use thin teal borders with cream/light surfaces.

Keep consistent:
- corner radius,
- padding,
- heading scale,
- icon treatment.

# Organic line motif

Reuse the deck's looping line language in:
- hero corners,
- section separators,
- empty space,
- footer.

Keep subtle and never interfere with text.

# Icons

Use simple outline icons with consistent stroke width.

Useful categories:
- heart/support,
- hands/community,
- calendar/events,
- shopping bag/shop,
- repeat/monthly giving,
- building/corporate,
- mail/newsletter,
- sparkles/creativity.

# Imagery strategy

The website must look complete with zero photography.

Default visual system:
- craft/product thumbnails,
- abstract shapes,
- icons,
- line motifs,
- typography,
- metrics,
- activity cards.

If approved imagery exists:
- prefer activities, materials, hands, spaces, crafts,
- use faces only with documented consent.

# Motion

Use restrained motion:
- 150–250ms hover transitions,
- gentle card lift,
- subtle arrow/underline movement,
- optional small entrance transitions.

Respect `prefers-reduced-motion`.

# Shop style

Product cards:
- 4:5 visual area,
- product name,
- short descriptor,
- price,
- minimal badge,
- `View` / `Add to Cart`.

Do not create child seller profiles, ratings, or marketplace mechanics.

# Accessibility

- WCAG AA contrast target,
- 44px touch targets,
- visible focus styles,
- semantic heading order,
- labels for forms,
- alt text where needed,
- motion reduction,
- never use color alone to convey state.
