/* ==========================================================================
   M-Pack content data. Everything marked sample:true is placeholder content.
   ========================================================================== */
window.MPACK_DATA = {

  /* ---- Shop ------------------------------------------------------------
     SAMPLE PRODUCTS. Names come from the project docs; prices and stock are
     placeholders until M-Pack confirms real inventory. Add `checkoutUrl`
     (e.g. a Stripe Payment Link) to send a single-item buyer to hosted checkout.
     Stories are activity-level only: never name or describe an individual child. */
  products: [
    {
      slug: 'woven-color-bracelet', category: 'craft', name: 'Woven Color Bracelet',
      short: 'A hand-woven friendship bracelet in bright chevrons.',
      description: 'A woven bracelet made from colored cord with a hand-tied closure and a small tassel.',
      price: 1200, stock: 'limited', featured: true, art: 'bracelet',
      story: "Created during an M-Pack workshop centered on creativity, patience, and working together. Your purchase supports M-Pack's broader programming and helps create more opportunities for young people to participate.",
      materials: ['Cotton embroidery cord', 'Hand-tied closure'], checkoutUrl: '', sample: true
    },
    {
      slug: 'painted-keepsake-card', category: 'craft', name: 'Painted Keepsake Card',
      short: 'A small hand-painted card, blank inside.',
      description: 'A hand-painted card with an envelope, ready for a note to someone you appreciate.',
      price: 800, stock: 'limited', featured: true, art: 'card',
      story: "Created during an M-Pack art activity focused on color, experimentation, and focus. Your purchase supports M-Pack's broader programming.",
      materials: ['Watercolor paper', 'Non-toxic paint', 'Envelope included'], checkoutUrl: '', sample: true
    },
    {
      slug: 'workshop-print', category: 'craft', name: 'Workshop Print',
      short: 'A small-batch print from a group workshop.',
      description: 'A block print made during a group printmaking session. Each workshop produces one small run.',
      price: 1800, stock: 'out', featured: true, art: 'print',
      story: "Created during an M-Pack workshop where the group practiced following a process from start to finish. Your purchase supports M-Pack's broader programming.",
      materials: ['Cotton paper', 'Water-based block-print ink'], checkoutUrl: '', sample: true
    },
    {
      slug: 'm-pack-tote', category: 'merch', name: 'M-Pack Tote',
      short: 'A sturdy canvas tote with the M-Pack mark.',
      description: 'An everyday canvas tote. Placeholder design until M-Pack approves its merch line.',
      price: 2200, stock: 'in', featured: false, art: 'tote',
      story: '', materials: ['Cotton canvas'], checkoutUrl: '', sample: true
    },
    {
      slug: 'm-pack-supporter-tee', category: 'merch', name: 'M-Pack Supporter Tee',
      short: 'A soft tee for people who show up for M-Pack.',
      description: 'A supporter tee. Design, sizing, and supplier to be confirmed by M-Pack.',
      price: 2800, stock: 'limited', featured: false, art: 'tee',
      story: '', materials: ['Cotton'], checkoutUrl: '', sample: true
    },
    {
      slug: 'm-pack-sticker-pack', category: 'merch', name: 'M-Pack Sticker Pack',
      short: 'Three vinyl stickers for laptops and water bottles.',
      description: 'A small pack of durable stickers. Placeholder designs until merch is approved.',
      price: 600, stock: 'in', featured: false, art: 'stickers',
      story: '', materials: ['Weatherproof vinyl'], checkoutUrl: '', sample: true
    }
  ],

  /* ---- Donors' Club tiers --------------------------------------------------
     PROPOSED in the team's funding plan (Supporter $10 / Champion $25 / Partner $50).
     Not final until M-Pack approves amounts and perks. */
  tiers: [
    { id: 'supporter', name: 'Supporter', amount: 10, note: 'Keeps the club accessible to everyone.',
      benefits: ['Digital impact reports', 'Member newsletter'] },
    { id: 'champion', name: 'Champion', amount: 25, featured: true, note: 'For supporters who want to feel closer to the work.',
      benefits: ['Everything in Supporter', 'A digital thank-you from the M-Pack community', 'Early access to events'] },
    { id: 'partner', name: 'Partner', amount: 50, note: 'For supporters who want something to hold.',
      benefits: ['Everything in Champion', 'Exclusive crafts', 'M-Pack merch'] }
  ],

  /* What a monthly gift can help cover. Source: M-Pack's sponsorship letter (levels $25-$100).
     TODO: VERIFY WITH M-PACK before launch. */
  giftImpact: {
    10: 'A steady foundation. Every monthly gift helps M-Pack plan meals, materials, and field trips with confidence.',
    25: 'Can help cover <strong>weekly enrichment lessons</strong> for a student.',
    50: 'Can help cover <strong>weekly enrichment lessons</strong> plus access during school breaks, with meals provided.',
    75: 'Can help cover <strong>weekly enrichment, field trips</strong>, and school-break access with meals.',
    100: 'Can help cover <strong>all-access</strong>: weekly enrichment, field trips, break-time access with meals, and transportation to the program.',
    other: 'Every gift, in any amount, helps M-Pack keep consistent programs running for young people.'
  },

  /* ---- Updates (SAMPLE posts — replace with real M-Pack news) --------------- */
  updates: [
    {
      slug: 'welcome-to-the-new-m-pack-website', category: 'Donor update', date: 'October 2026',
      title: 'Welcome to the new M-Pack website',
      summary: 'One place to understand the work, give monthly, shop crafts and merch, and stay in touch.',
      body: [
        'This site brings together every way to support M-Pack: monthly giving through the Donors’ Club, crafts and merch from our activities, corporate partnerships, and regular updates.',
        'We’ll use this space to share what your support makes possible, always in a way that protects the privacy of the young people we serve.'
      ],
      cta: { label: 'Explore the Donors’ Club', href: 'donors-club.html' }, sample: true
    },
    {
      slug: 'inside-the-tunnel-a-garden-built-by-hand', category: 'Program highlight', date: 'Sample post',
      title: 'Inside The Tunnel: a garden built by hand',
      summary: 'Raised beds, a greenhouse, and a lot of dirt under fingernails: how a garden became a classroom.',
      body: [
        'The Tunnel is M-Pack’s garden project. Students help build raised beds, fill them with soil, start seeds, water, and eventually harvest what they grew.',
        'It’s hands-on practice in patience, teamwork, and follow-through, and the produce is a reward everyone can see.'
      ],
      cta: { label: 'See our work', href: 'our-work.html' }, sample: true
    },
    {
      slug: 'meet-mul-t-m-packs-mascot', category: 'Program highlight', date: 'Sample post',
      title: 'Meet Mul-T, M-Pack’s mascot',
      summary: 'Mul-T stands in for the young people in our stories, so we can share the experience without sharing anyone’s details.',
      body: [
        'Mul-T represents an archetype of our participants. When we tell stories about what M-Pack feels like, Mul-T lets us do that while keeping every young person’s privacy intact.',
        'It’s one small way we hold ourselves to a simple rule: tell the story of the work, never the private histories of individual children.'
      ],
      cta: { label: 'How we protect privacy', href: 'privacy.html' }, sample: true
    },
    {
      slug: 'the-craft-initiative-is-taking-shape', category: 'Craft drop', date: 'Sample post',
      title: 'The Craft Initiative is taking shape',
      summary: 'Crafts grow out of field trips, workshops, and program activities and help fund more of them.',
      body: [
        'Many M-Pack activities already involve making things with our hands. The Craft Initiative turns some of that work into pieces supporters can hold, with a short note about the activity behind each one.',
        'Every purchase helps fund future experiences, and every buyer is invited to follow along.'
      ],
      cta: { label: 'Browse the shop', href: 'shop.html' }, sample: true
    }
  ],

  /* ---- Events (dates to be announced — nothing invented) --------------------- */
  events: [
    { title: 'Community craft pop-up', text: 'Meet the makers’ work in person at a local community event.' },
    { title: 'Volunteer & supporter day', text: 'Spend a few hours with M-Pack and see the program in action.' },
    { title: 'Donors’ Club kickoff', text: 'A first gathering for monthly supporters.' }
  ]
};
