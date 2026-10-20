# 08 — Integrations and Commerce

The prototype should be built so real integrations can be added later without redesigning the site.

# Phase 1 — Presentation-safe prototype

Implement:

- product catalog from local data,
- optional local cart state,
- demo checkout behavior,
- newsletter form with clean success state,
- donor tier buttons with placeholder/hosted URLs,
- partner inquiry form with demo submission state.

No real payments are required for the class demo.

# Newsletter integration

Possible providers:
- Mailchimp,
- ConvertKit,
- Brevo,
- HubSpot,
- whatever M-Pack already uses.

Requirements:
- email required,
- first name optional,
- consent copy,
- server-side call where possible,
- error handling,
- no API keys in client bundle,
- unsubscribe handled by provider.

Example env vars:

```text
NEWSLETTER_PROVIDER=
NEWSLETTER_API_KEY=
NEWSLETTER_LIST_ID=
```

# Donations

Recommended approach:
use a hosted donation platform or hosted Stripe Checkout rather than custom payment processing.

Possible patterns:
- Donorbox,
- Givebutter,
- Stripe Payment Links,
- another approved nonprofit platform.

Requirements:
- recurring payment support,
- receipts,
- secure hosted checkout,
- cancel/update path,
- configurable amount,
- no card data stored by this app.

# Craft / merch checkout

## Option A — Stripe Payment Links
Each product has a `checkoutUrl`.

Pros:
- fast,
- secure,
- no custom card handling.

Cons:
- basic inventory/shipping UX.

## Option B — Shopify/storefront integration
Useful if inventory grows.

Pros:
- inventory,
- shipping,
- tax,
- fulfillment.

Cons:
- more setup and recurring cost.

## Option C — Reservation/inquiry flow
Potentially best for one-of-one or tiny craft inventory.

Example:
`Reserve this craft` → contact form → M-Pack confirms payment/fulfillment.

# Donation vs purchase

Keep these legally and conceptually separate.

A donation is not the same as a purchase.

Do not say a purchase is tax deductible unless M-Pack's accounting/legal guidance confirms it.

# Shipping

Do not invent shipping promises.

Before public launch, define:
- shipping regions,
- shipping fee,
- processing time,
- carrier,
- lost package policy,
- returns/refunds,
- one-of-one inventory rules.

Prototype copy can say:
`Shipping details confirmed at checkout.`

# Inventory

MVP fields:

```ts
inStock: true | false
inventoryLabel: "Limited"
```

For one-of-one crafts, production checkout must prevent duplicate sale.

# Corporate inquiry

Fields:
- name,
- work email,
- company,
- role,
- interest,
- message.

Interest options:
- Sponsorship
- Employee Giving
- Volunteer / Event
- Matching Gifts
- Other

# Form security for production

- rate limiting,
- bot protection,
- server-side validation,
- input sanitization,
- no exposed secrets.
