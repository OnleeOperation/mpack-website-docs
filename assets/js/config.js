/* ==========================================================================
   M-Pack site configuration — the one file to edit when real services exist.
   Leave a value empty ('') and that feature runs in friendly DEMO mode.
   ========================================================================== */
window.MPACK_CONFIG = {
  // Hide the dashed "Prototype / Sample" explainer boxes (handy when presenting). Sample badges on products stay.
  showPrototypeNotices: true,

  // Public contact email. Leave empty to show the contact form instead of an address.
  // TODO: VERIFY WITH M-PACK — approved public email.
  contactEmail: '',

  // Social links shown in the footer. Add { label, href } objects once approved.
  social: [],

  // Announcement bar (top of every page). Set text to '' to hide it.
  announcement: {
    label: 'New',
    text: "The Donors' Club: monthly giving that helps M-Pack plan ahead.",
    linkText: 'See how it works',
    href: 'donors-club.html'
  },

  // Form endpoints. Works with any service that accepts a POST (Formspree, Getform, Basin, Netlify Forms...).
  // Example: 'https://formspree.io/f/xxxxxxx'. Empty = demo mode (shows a success state, sends nothing).
  forms: {
    newsletter: '',
    partner: '',
    contact: ''
  },

  // Hosted checkout links. Create these in your donation platform (Donorbox, Givebutter, Stripe Payment Links...).
  // The site never collects card details itself.
  checkout: {
    monthly: { 10: '', 25: '', 50: '', 75: '', 100: '' }, // recurring link per preset amount
    monthlyCustom: '',                                    // recurring link that lets the donor type an amount
    oneTime: { 10: '', 25: '', 50: '', 75: '', 100: '' },
    oneTimeCustom: ''
  },

  // Optional privacy-friendly analytics (https://plausible.io). Put your domain here, e.g. 'mpackids.com'.
  analytics: { plausibleDomain: '' }
};
