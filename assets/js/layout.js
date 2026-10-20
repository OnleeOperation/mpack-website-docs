/* ==========================================================================
   Shared layout: icon sprite, header, footer and mobile action bar.
   Loaded synchronously in <head> so the custom elements exist before the
   page body is parsed (no flash). Edit navigation here, once, for every page.
   ========================================================================== */
(function () {
  var C = window.MPACK_CONFIG || {};
  document.documentElement.classList.add('js');
  if (C.showPrototypeNotices === false) document.documentElement.classList.add('hide-notices');

  /* ---- Icon set (24px grid, 1.75 stroke) --------------------------------- */
  var ICONS = {
    heart: ['M12 20.5s-8-4.9-8-10.6A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8 2.7c0 5.7-8 10.6-8 10.6z'],
    repeat: ['M17 2l4 4-4 4', 'M3 11v-1a4 4 0 0 1 4-4h14', 'M7 22l-4-4 4-4', 'M21 13v1a4 4 0 0 1-4 4H3'],
    bag: ['M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z', 'M3 6h18', 'M16 10a4 4 0 0 1-8 0'],
    building: ['M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17', 'M15 9h4a1 1 0 0 1 1 1v11', 'M2 21h20', 'M8 7h3', 'M8 11h3', 'M8 15h3'],
    mail: ['M3 5h18v14H3z', 'M3 6l9 7 9-7'],
    sparkles: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', 'M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'],
    compass: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M15.5 8.5l-2 5-5 2 2-5z'],
    pin: ['M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
    users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.9', 'M16 3.1a4 4 0 0 1 0 7.8'],
    book: ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
    chess: ['M8 21h8', 'M9.5 21c0-3.5 1.2-5 1.2-7C8 13 7 10 9 8c1.5-2 5-2.6 7 0 2.2 2.8.8 5.3-.7 7 0 2 1 3.2 1 6'],
    utensils: ['M4 3v6a3 3 0 0 0 3 3v9', 'M7 3v6', 'M10 3v6a3 3 0 0 1-3 3', 'M18 21V3c-2 1.5-3 4-3 7s1 4 3 4'],
    sprout: ['M12 21v-9', 'M12 12c0-4-3-6-7-6 0 4 3 6 7 6z', 'M12 14c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6z'],
    shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', 'M9 12l2 2 4-4'],
    check: ['M5 12.5l4.5 4.5L19 7.5'],
    arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
    menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
    close: ['M6 6l12 12', 'M18 6L6 18'],
    plus: ['M12 5v14', 'M5 12h14'],
    minus: ['M5 12h14'],
    calendar: ['M4 6h16v14H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
    clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2'],
    gift: ['M4 11h16v10H4z', 'M3 7h18v4H3z', 'M12 7v14', 'M12 7c-2-4-6-3-5 0 .5 1.5 3 1 5 0z', 'M12 7c2-4 6-3 5 0-.5 1.5-3 1-5 0z'],
    icecream: ['M7.5 11a4.5 4.5 0 1 1 9 0', 'M6 11h12', 'M7.2 11L12 22l4.8-11', 'M9.6 16h4.8'],
    star: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z'],
    lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'],
    phoneoff: ['M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z', 'M3 3l18 18'],
    mic: ['M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3z', 'M5 11a7 7 0 0 0 14 0', 'M12 18v3'],
    flask: ['M9 3h6', 'M10 3v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3'],
    flag: ['M8 21V3l9 4-9 4'],
    sun: ['M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
    coin: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.1 0-2-.5-2.5-1.5', 'M12 6.5V8', 'M12 16v1.5'],
    bus: ['M4 5h16v12H4z', 'M4 11h16', 'M7 17v3', 'M17 17v3'],
    info: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 11v5', 'M12 8h.01'],
    handshake: ['M3 12l4-4 4 2 3-2 4 3', 'M3 12l5 5a2 2 0 0 0 3 0l1-1', 'M21 11l-5 6a2 2 0 0 1-3 0', 'M7 8L3 12'],
    leaf: ['M20 4C9 4 4 9 4 15a5 5 0 0 0 5 5c6 0 11-5 11-16z', 'M4 20c4-6 8-9 12-11'],
    paint: ['M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.4 3.4c.4.4.4 1 .1 1.4-.5.8-1.5 1.2-2.7 1.2z', 'M7.5 11h.01', 'M12 7.5h.01', 'M16.5 11h.01'],
    external: ['M14 4h6v6', 'M20 4L10 14', 'M18 14v6H4V6h6']
  };
  function icon(name, cls) {
    return '<svg class="i ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }
  window.mpIcon = icon;

  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true"><defs>';
  Object.keys(ICONS).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k].map(function (d) { return '<path d="' + d + '"/>'; }).join('') + '</symbol>';
  });
  sprite += '</defs></svg>';

  /* ---- Navigation -------------------------------------------------------- */
  var NAV = [
    { label: 'Our Work', href: 'our-work.html', match: ['our-work.html'] },
    { label: 'Impact', href: 'impact.html', match: ['impact.html'] },
    { label: 'Shop', href: 'shop.html', match: ['shop.html', 'product.html'] },
    { label: 'Donors’ Club', href: 'donors-club.html', match: ['donors-club.html'] },
    { label: 'Partners', href: 'partners.html', match: ['partners.html'] },
    { label: 'Updates', href: 'updates.html', match: ['updates.html', 'update.html'] }
  ];
  var file = (location.pathname.split('/').pop() || 'index.html');
  function isCurrent(n) { return n.match.indexOf(file) !== -1; }

  function navLinks(mobile) {
    return NAV.map(function (n) {
      var cur = isCurrent(n) ? ' aria-current="page"' : '';
      return mobile
        ? '<a class="m-link" href="' + n.href + '"' + cur + '>' + n.label + icon('arrow') + '</a>'
        : '<a href="' + n.href + '"' + cur + '>' + n.label + '</a>';
    }).join('');
  }

  /* ---- Header ------------------------------------------------------------ */
  class Header extends HTMLElement {
    connectedCallback() {
    var a = C.announcement || {};
    var minimal = this.hasAttribute('minimal');
    var announce = (!minimal && a.text)
      ? '<div class="announce"><strong>' + a.label + '</strong> &nbsp;' + a.text + ' <a href="' + a.href + '" data-track="announce-click">' + a.linkText + ' &rarr;</a></div>' : '';

    if (minimal) {
      this.innerHTML = sprite +
        '<a class="skip-link" href="#main">Skip to content</a>' +
        '<div class="container give-top"><a class="brand" href="index.html" aria-label="M-Pack home"><img src="assets/img/logo-wordmark.png" alt="M-Pack: Molding Passionate Active Creative Kids" width="190" height="46"></a>' +
        '<a class="link-arrow" href="index.html">&larr; Back to site</a></div>';
      return;
    }

    this.innerHTML = sprite +
      '<a class="skip-link" href="#main">Skip to content</a>' + announce +
      '<header class="site-header" id="site-header"><div class="container header-inner">' +
      '<a class="brand" href="index.html" aria-label="M-Pack home"><img src="assets/img/logo-wordmark.png" alt="M-Pack: Molding Passionate Active Creative Kids" width="190" height="46"></a>' +
      '<nav class="nav" aria-label="Main">' + navLinks(false) + '</nav>' +
      '<div class="header-actions">' +
      '<button class="icon-btn" type="button" data-cart-open aria-label="Open cart">' + icon('bag') + '<span class="cart-count" data-cart-count aria-hidden="true">0</span></button>' +
      '<a class="btn btn--give btn--sm" href="give.html" data-track="nav-give">' + icon('heart') + '<span class="label">Give</span></a>' +
      '<button class="icon-btn menu-btn" type="button" id="menu-open" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">' + icon('menu') + '</button>' +
      '</div></div></header>' +
      '<div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<div class="mobile-nav-head"><a class="brand" href="index.html" aria-label="M-Pack home"><img src="assets/img/logo-wordmark.png" alt="M-Pack" width="170" height="41" style="height:40px"></a>' +
      '<button class="icon-btn" type="button" id="menu-close" aria-label="Close menu">' + icon('close') + '</button></div>' +
      navLinks(true) +
      '<a class="btn btn--give btn--lg" href="give.html">' + icon('heart') + ' Give to M-Pack</a>' +
      '<a class="btn btn--outline btn--lg" href="contact.html" style="margin-top:.75rem">Contact us</a>' +
      '</div>';
    }
  }
  customElements.define('mpack-header', Header);

  /* ---- Footer ------------------------------------------------------------ */
  class Footer extends HTMLElement {
    connectedCallback() {
    var minimal = this.hasAttribute('minimal');
    var social = (C.social || []).map(function (s) { return '<li><a href="' + s.href + '" rel="noopener">' + s.label + '</a></li>'; }).join('');
    var contact = C.contactEmail
      ? '<li><a href="mailto:' + C.contactEmail + '">' + C.contactEmail + '</a></li>' : '<li><a href="contact.html">Send us a message</a></li>';

    var legal =
      '<div class="footer-bottom"><span>&copy; M-Pack &middot; Molding Passionate Active Creative Kids Corporation. All rights reserved.</span>' +
      '<span><a href="privacy.html">Privacy</a> &nbsp;&middot;&nbsp; <a href="terms.html">Terms</a></span></div>';

    if (minimal) {
      this.innerHTML = '<footer class="site-footer"><div class="container">' + legal + '</div></footer>';
      return;
    }

    this.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand"><img src="assets/img/logo-wordmark-light.png" alt="M-Pack: Molding Passionate Active Creative Kids" width="220" height="53">' +
      '<p>Trauma-informed afterschool care that helps young people build skills, relationships, and confidence. Outside the classroom and beyond.</p>' +
      '<div class="footer-badges"><span>' + icon('shield') + ' 501(c)(3) nonprofit</span><span>' + icon('pin') + ' Carrollton, Georgia</span></div></div>' +
      '<nav aria-label="Explore"><h2>Explore</h2><ul>' +
      '<li><a href="our-work.html">Our Work</a></li><li><a href="impact.html">Impact</a></li><li><a href="shop.html">Shop</a></li><li><a href="donors-club.html">Donors’ Club</a></li><li><a href="partners.html">Partners</a></li><li><a href="updates.html">Updates</a></li></ul></nav>' +
      '<nav aria-label="About M-Pack"><h2>M-Pack</h2><ul>' +
      '<li><a href="about.html">About</a></li><li><a href="give.html">Give</a></li>' + contact + '<li><a href="privacy.html">Privacy &amp; safeguarding</a></li><li><a href="terms.html">Terms</a></li>' + social + '</ul></nav>' +
      '<div class="footer-news"><h2>Stay close to the work</h2>' +
      '<form class="form" data-form="newsletter" novalidate>' +
      '<div class="field"><label for="f-nl-email" class="sr-only">Email address</label><input id="f-nl-email" name="email" type="email" autocomplete="email" placeholder="Your email address" required></div>' +
      '<div class="hp" aria-hidden="true"><label>Leave blank<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<button class="btn btn--give btn--block" type="submit">Keep me updated</button>' +
      '<p class="consent">By subscribing, you agree to receive M-Pack updates. You can unsubscribe at any time.</p>' +
      '<p class="form-error" role="alert"></p></form>' +
      '<div class="form-success" role="status">' + icon('check') + '<div><h3>You’re on the list.</h3><p>Thanks for staying close to the work.</p></div></div>' +
      '</div></div>' + legal + '</div></footer>';
    }
  }
  customElements.define('mpack-footer', Footer);

  /* ---- Mobile action bar -------------------------------------------------- */
  class Bar extends HTMLElement {
    connectedCallback() {
    this.innerHTML = '<div class="mobile-cta"><a class="btn btn--give" href="give.html">' + icon('heart') + ' Give monthly</a><a class="btn btn--outline" href="shop.html">' + icon('bag') + ' Shop</a></div>';
    document.body.classList.add('has-mobile-cta');
    }
  }
  customElements.define('mpack-mobile-cta', Bar);
})();
