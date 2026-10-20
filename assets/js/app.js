/* ==========================================================================
   M-Pack site behavior. Plain JavaScript, no build step, works on GitHub Pages
   (and when a page is opened straight from disk).
   Sections: helpers · analytics · header/menu · reveal+counters · toast+modal ·
   cart · shop rendering · donation widget · forms · updates
   ========================================================================== */
(function () {
  'use strict';
  var C = window.MPACK_CONFIG || {};
  var D = window.MPACK_DATA || {};
  var icon = window.mpIcon;

  /* ---- Helpers ------------------------------------------------------------ */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(cents) { return '$' + (cents % 100 ? (cents / 100).toFixed(2) : String(cents / 100)); }
  function param(k) { try { return new URLSearchParams(location.search).get(k); } catch (e) { return null; } }
  function product(slug) { return (D.products || []).filter(function (p) { return p.slug === slug; })[0]; }
  // Keep the brand name from breaking at its hyphen ("M-" / "Pack"): insert an invisible word-joiner (U+2060).
  function fixBrand(root) {
    var w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (n.nodeValue.indexOf('M-Pack') !== -1 && !/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/.test(n.parentNode.nodeName)) n.nodeValue = n.nodeValue.replace(/M-Pack/g, 'M-\u2060Pack');
    }
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Analytics (privacy-first: event names only, never form contents) ---- */
  if (C.analytics && C.analytics.plausibleDomain) {
    var s = document.createElement('script');
    s.defer = true; s.setAttribute('data-domain', C.analytics.plausibleDomain); s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }
  function track(name, props) {
    if (typeof window.plausible === 'function') window.plausible(name, props ? { props: props } : undefined);
    else if (window.console && console.debug) console.debug('[track]', name, props || '');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-track]');
    if (t) track(t.getAttribute('data-track'));
  });
  // QR codes at events can add ?utm_source=community_event&utm_medium=qr&utm_content=NAME
  if (param('utm_medium') === 'qr') track('event_qr_visit', { event: param('utm_content') || 'unknown' });

  /* ---- Header: scroll shadow + mobile menu ----------------------------------- */
  var header = $('#site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }
  var menu = $('#mobile-nav'), openBtn = $('#menu-open'), closeBtn = $('#menu-close');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    openBtn.setAttribute('aria-expanded', String(open));
    if (open) closeBtn.focus(); else openBtn.focus();
  }
  if (menu) {
    openBtn.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { document.body.style.overflow = ''; }); });
    window.matchMedia('(min-width: 1021px)').addEventListener('change', function (m) { if (m.matches && menu.classList.contains('open')) setMenu(false); });
  }

  /* ---- Reveal on scroll, counters, bars ---------------------------------------- */
  $$('.reveal').forEach(function (el) {
    var i = $$('.reveal', el.parentElement).filter(function (x) { return x.parentElement === el.parentElement; }).indexOf(el);
    if (i > 0) el.style.setProperty('--d', Math.min(i, 5) * 0.07 + 's');
  });
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count')), dec = (String(to).split('.')[1] || '').length;
    if (reduceMotion || isNaN(to)) { el.textContent = to.toFixed(dec); return; }
    var t0 = null, dur = 1400;
    (function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  function observeAll() {
    var targets = $$('.reveal, [data-count], .bar-fill');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { reveal(t); }); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
    setTimeout(function () { targets.forEach(function (t) { if (t.classList.contains('reveal')) t.classList.add('in'); }); }, 3500); // safety net
  }
  function reveal(el) {
    if (el.classList.contains('reveal')) el.classList.add('in');
    if (el.hasAttribute('data-count')) countUp(el);
    if (el.classList.contains('bar-fill')) el.style.width = el.getAttribute('data-w') + '%';
  }

  /* ---- Toast + modal -------------------------------------------------------------- */
  var toastEl, toastTimer;
  function toast(msg, action) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = icon('check') + '<span>' + esc(msg) + '</span>' + (action ? ' <button class="btn btn--light btn--sm" type="button" id="toast-action" style="min-height:34px;padding:.3rem .9rem">' + esc(action.label) + '</button>' : '');
    toastEl.classList.add('show');
    var b = $('#toast-action', toastEl); if (b) b.addEventListener('click', function () { action.fn(); toastEl.classList.remove('show'); });
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 4200);
  }
  var modalEl, lastFocus;
  function modal(html) {
    if (!modalEl) {
      modalEl = document.createElement('div'); modalEl.className = 'modal-backdrop';
      modalEl.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1"><button class="icon-btn close" type="button" aria-label="Close" data-close-modal>' + icon('close') + '</button><div data-modal-body></div></div>';
      document.body.appendChild(modalEl);
      modalEl.addEventListener('click', function (e) { if (e.target === modalEl || e.target.closest('[data-close-modal]')) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalEl.classList.contains('open')) closeModal(); });
    }
    lastFocus = document.activeElement; if (toastEl) toastEl.classList.remove('show');
    $('[data-modal-body]', modalEl).innerHTML = html; fixBrand(modalEl);
    modalEl.classList.add('open'); document.body.style.overflow = 'hidden';
    $('.modal', modalEl).focus();
  }
  function closeModal() { modalEl.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }

  /* ---- Cart (localStorage; demo checkout) ---------------------------------------------- */
  var KEY = 'mpack_cart_v1';
  function loadCart() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function saveCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* private mode: cart lives for this page only */ } }
  var cart = loadCart().filter(function (l) { return product(l.slug); });
  function cartCount() { return cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (n, l) { return n + l.qty * product(l.slug).price; }, 0); }

  var drawer, backdrop, drawerFocus;
  function buildDrawer() {
    backdrop = document.createElement('div'); backdrop.className = 'drawer-backdrop';
    drawer = document.createElement('aside'); drawer.className = 'drawer'; drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-modal', 'true'); drawer.setAttribute('aria-label', 'Shopping cart'); drawer.setAttribute('tabindex', '-1');
    drawer.innerHTML = '<div class="drawer-head"><h2>Your cart</h2><button class="icon-btn" type="button" data-cart-close aria-label="Close cart">' + icon('close') + '</button></div><div class="drawer-body" data-cart-body></div><div class="drawer-foot" data-cart-foot></div>';
    document.body.appendChild(backdrop); document.body.appendChild(drawer);
    backdrop.addEventListener('click', closeCart);
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-cart-close]')) return closeCart();
      var q = e.target.closest('[data-qty]'); if (q) return changeQty(q.getAttribute('data-slug'), parseInt(q.getAttribute('data-qty'), 10));
      if (e.target.closest('[data-checkout]')) return checkout();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });
  }
  function openCart() { if (!drawer) buildDrawer(); if (toastEl) toastEl.classList.remove('show'); renderCart(); drawerFocus = document.activeElement; drawer.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow = 'hidden'; drawer.focus(); }
  function closeCart() { drawer.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow = ''; if (drawerFocus && drawerFocus.focus) drawerFocus.focus(); }
  function renderBadge() {
    var n = cartCount();
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; el.classList.toggle('has-items', n > 0); });
    $$('[data-cart-open]').forEach(function (b) { b.setAttribute('aria-label', 'Open cart, ' + n + (n === 1 ? ' item' : ' items')); });
  }
  function renderCart() {
    renderBadge();
    if (!drawer) return;
    var body = $('[data-cart-body]', drawer), foot = $('[data-cart-foot]', drawer);
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty"><p>Your cart is empty. Explore crafts or M-Pack merch to find something that connects you to the mission.</p><div class="btn-row" style="justify-content:center"><a class="btn btn--outline btn--sm" href="shop.html?cat=craft">Crafts</a><a class="btn btn--outline btn--sm" href="shop.html?cat=merch">Merch</a></div></div>';
      foot.innerHTML = ''; foot.style.display = 'none'; fixBrand(body); return;
    }
    foot.style.display = '';
    body.innerHTML = cart.map(function (l) {
      var p = product(l.slug);
      return '<div class="cart-line"><a class="thumb" href="product.html?p=' + esc(p.slug) + '" aria-hidden="true" tabindex="-1">' + window.mpArt(p.art) + '</a><div>' +
        '<h3><a href="product.html?p=' + esc(p.slug) + '">' + esc(p.name) + '</a></h3><div class="muted small">' + money(p.price) + ' each</div>' +
        '<div class="qty"><button type="button" data-slug="' + esc(p.slug) + '" data-qty="' + (l.qty - 1) + '" aria-label="' + (l.qty === 1 ? 'Remove ' : 'Decrease quantity of ') + esc(p.name) + '">' + icon(l.qty === 1 ? 'close' : 'minus') + '</button>' +
        '<output aria-live="polite">' + l.qty + '</output><button type="button" data-slug="' + esc(p.slug) + '" data-qty="' + (l.qty + 1) + '" aria-label="Increase quantity of ' + esc(p.name) + '">' + icon('plus') + '</button></div></div></div>';
    }).join('');
    foot.innerHTML = '<div class="subtotal"><span>Subtotal</span><span>' + money(cartTotal()) + '</span></div>' +
      '<p class="muted small" style="margin-bottom:1rem">Your purchase supports M-Pack’s work. Shipping details confirmed at checkout. Purchases are not donations.</p>' +
      '<button class="btn btn--primary btn--block" type="button" data-checkout data-track="craft-checkout">Checkout</button>' +
      '<p class="muted small" style="margin:.8rem 0 0;display:flex;gap:.5rem;align-items:flex-start">' + icon('lock') + '<span>Secure hosted checkout. This site never collects card details.</span></p>';
    fixBrand(drawer);
  }
  function addToCart(slug) {
    var p = product(slug); if (!p || p.stock === 'out') return;
    var line = cart.filter(function (l) { return l.slug === slug; })[0];
    if (line) line.qty += 1; else cart.push({ slug: slug, qty: 1 });
    saveCart(cart); renderCart();
    track(p.category + '_add_to_cart', { slug: slug });
    toast('Added “' + p.name + '” to your cart', { label: 'View cart', fn: openCart });
  }
  function changeQty(slug, qty) {
    cart = cart.map(function (l) { return l.slug === slug ? { slug: slug, qty: qty } : l; }).filter(function (l) { return l.qty > 0; });
    saveCart(cart); renderCart();
  }
  function checkout() {
    track('craft_checkout_click', { items: cart.length });
    var single = cart.length === 1 && cart[0].qty === 1 ? product(cart[0].slug) : null;
    if (single && single.checkoutUrl) { location.href = single.checkoutUrl; return; }
    closeCart();
    modal('<h2 id="modal-title">Thank you for supporting M-Pack.</h2>' +
      '<p>Your purchase is one more way to help create consistent opportunities and experiences for young people.</p>' +
      '<div class="notice" style="margin:1.25rem 0">' + icon('info') + '<div><strong>Prototype checkout.</strong> No payment was taken and no order was placed. On the live site this step opens a secure hosted checkout page.</div></div>' +
      '<p style="margin-bottom:.5rem"><strong>Want your support to go further?</strong></p>' +
      '<div class="btn-row"><a class="btn btn--give" href="donors-club.html">' + icon('heart') + ' Join the Donors’ Club</a><a class="btn btn--outline" href="index.html#stay-close">Follow M-Pack updates</a></div>');
    cart = []; saveCart(cart); renderCart();
  }
  $$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', openCart); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-add]'); if (a) { e.preventDefault(); addToCart(a.getAttribute('data-add')); }
  });
  renderBadge();

  /* ---- Shop rendering -------------------------------------------------------------------- */
  var STOCK = { limited: ['Limited', 'badge--orange'], out: ['Sold out', 'badge--orange'] };
  function badges(p) {
    var h = '<span class="badge badge--outline">Sample</span>';
    if (STOCK[p.stock]) h += '<span class="badge ' + STOCK[p.stock][1] + '">' + STOCK[p.stock][0] + '</span>';
    return h;
  }
  function productCard(p) {
    var out = p.stock === 'out', url = 'product.html?p=' + encodeURIComponent(p.slug);
    return '<li class="p-card reveal"><a class="p-art" href="' + url + '" aria-label="View ' + esc(p.name) + '" data-track="' + p.category + '-view">' + window.mpArt(p.art) + '<div class="p-badges">' + badges(p) + '</div></a>' +
      '<div class="p-body"><h3><a href="' + url + '">' + esc(p.name) + '</a></h3><p>' + esc(p.short) + '</p>' +
      '<div class="p-foot"><span class="price">' + money(p.price) + '</span>' +
      (out ? '<button class="btn btn--outline btn--sm" type="button" disabled>Sold out</button>' : '<button class="btn btn--primary btn--sm" type="button" data-add="' + esc(p.slug) + '">Add to cart</button>') +
      '</div></div></li>';
  }
  function renderProducts(el, cat) {
    var list = (D.products || []).filter(function (p) { return (cat === 'all' || !cat || p.category === cat) && (!el.hasAttribute('data-featured') || p.featured); });
    var limit = parseInt(el.getAttribute('data-limit'), 10); if (limit) list = list.slice(0, limit);
    el.innerHTML = list.length ? list.map(productCard).join('') : '<li class="muted">New items are on the way. Subscribe to hear first.</li>';
    $$('.reveal', el).forEach(function (r) { requestAnimationFrame(function () { r.classList.add('in'); }); });
  }
  $$('[data-products]').forEach(function (el) {
    var cat = el.getAttribute('data-cat') || 'all';
    if (el.hasAttribute('data-filterable')) cat = ({ craft: 'craft', merch: 'merch' })[param('cat')] || 'all';
    renderProducts(el, cat);
    if (el.hasAttribute('data-filterable')) {
      var chips = $$('[data-filter]');
      var setChips = function (c) { chips.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === c)); }); };
      setChips(cat);
      chips.forEach(function (b) {
        b.addEventListener('click', function () {
          var c = b.getAttribute('data-filter'); setChips(c); renderProducts(el, c);
          var out = $('[data-filter-count]'); if (out) out.textContent = $$('.p-card', el).length + (c === 'all' ? ' items' : ' ' + c + ' items');
          try { history.replaceState(null, '', c === 'all' ? location.pathname : '?cat=' + c); } catch (e) { /* ignore */ }
        });
      });
    }
  });

  var pRoot = $('#product-root');
  if (pRoot) {
    var p = product(param('p'));
    if (!p) {
      pRoot.innerHTML = '<div class="center" style="padding:4rem 0"><h1>We couldn’t find that item.</h1><p class="lead" style="margin-inline:auto">It may have sold out or moved.</p><a class="btn btn--primary" href="shop.html">Back to the shop</a></div>';
    } else {
      document.title = p.name + ' · M-Pack';
      var related = (D.products || []).filter(function (x) { return x.category === p.category && x.slug !== p.slug; }).slice(0, 3);
      var crumbCat = p.category === 'craft' ? 'Crafts' : 'Merch';
      pRoot.innerHTML =
        '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="shop.html">Shop</a> / <a href="shop.html?cat=' + p.category + '">' + crumbCat + '</a> / <span aria-current="page">' + esc(p.name) + '</span></nav>' +
        '<div class="product-detail"><div class="p-art" role="img" aria-label="Illustration of ' + esc(p.name) + '">' + window.mpArt(p.art) + '<div class="p-badges">' + badges(p) + '</div></div>' +
        '<div><h1>' + esc(p.name) + '</h1><div class="detail-price">' + money(p.price) + '</div><p class="lead" style="margin-bottom:1.5rem">' + esc(p.description) + '</p>' +
        '<div class="btn-row">' + (p.stock === 'out'
          ? '<button class="btn btn--outline btn--lg" disabled>Sold out</button><a class="btn btn--light btn--lg" href="#notify">Tell me when it’s back</a>'
          : '<button class="btn btn--primary btn--lg" type="button" data-add="' + esc(p.slug) + '">Add to cart</button>') + '</div>' +
        '<p class="muted small" style="margin-top:1rem">Shipping details confirmed at checkout. Purchases are not donations.</p>' +
        (p.story ? '<div class="story"><h2>The activity behind it</h2><p>' + esc(p.story) + '</p></div>' : '<div class="story"><h2>Your purchase supports M-Pack</h2><p>Every purchase helps fund consistent programs, new experiences, and positive relationships for the young people M-Pack serves.</p></div>') +
        (p.materials && p.materials.length ? '<p class="small"><strong>Materials:</strong> ' + p.materials.map(esc).join(' · ') + '</p>' : '') +
        '<div class="notice" style="margin-top:1.25rem">' + icon('info') + '<div><strong>Sample item.</strong> This product is a placeholder for the prototype; real items, prices, and stock come from M-Pack.</div></div></div></div>' +
        '<div class="grid grid-2" style="margin-top:4rem">' +
        '<div class="panel" id="notify"><h2 style="font-size:1.8rem">Stay close to the work</h2><p class="muted">New crafts and ways to help, in your inbox.</p>' + newsletterForm('pd') + '</div>' +
        '<div class="panel" style="background:var(--teal-900);border-color:var(--teal-900)"><h2 style="font-size:1.8rem;color:#fff">Want to do more?</h2><p style="color:#c9dcd8">Monthly support helps M-Pack plan ahead with funding it can count on.</p><a class="btn btn--give" href="donors-club.html" data-track="donors-club-cta">Explore the Donors’ Club ' + icon('arrow', 'i-arrow') + '</a></div></div>' +
        (related.length ? '<h2 style="font-size:2rem;margin-top:4rem">More ' + crumbCat.toLowerCase() + '</h2><ul class="products" style="margin-top:1.25rem">' + related.map(productCard).join('') + '</ul>' : '');
      $$('.reveal', pRoot).forEach(function (r) { r.classList.add('in'); });
      bindForms(pRoot);
      track(p.category + '_view', { slug: p.slug });
    }
  }
  function newsletterForm(id) {
    return '<div data-form-wrap><form class="form" data-form="newsletter" novalidate style="margin-top:1rem"><div class="form-row"><div class="field"><label for="' + id + '-n">First name <span class="opt">(optional)</span></label><input id="' + id + '-n" name="firstName" autocomplete="given-name"></div>' +
      '<div class="field"><label for="' + id + '-e">Email address</label><input id="' + id + '-e" name="email" type="email" autocomplete="email" required></div></div>' +
      '<div class="hp" aria-hidden="true"><label>Leave blank<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<div><button class="btn btn--primary" type="submit">Keep me updated</button></div><p class="consent">By subscribing, you agree to receive M-Pack updates. You can unsubscribe at any time.</p><p class="form-error" role="alert"></p></form>' +
      '<div class="form-success" role="status">' + icon('check') + '<div><h3>You’re on the list.</h3><p>Thanks for staying close to the work.</p></div></div></div>';
  }

  /* ---- Donation widget (give.html) ------------------------------------------------------------ */
  var give = $('#give-form');
  if (give) {
    var impactEl = $('#impact-text'), tierEl = $('#tier-text'), goBtn = $('#give-go'), customWrap = $('#custom-wrap'), customIn = $('#custom-amount'), errEl = $('#give-error');
    var freqVal = function () { return $('input[name="freq"]:checked', give).value; };
    var amtKey = function () { return $('input[name="amount"]:checked', give).value; };
    var amount = function () { return amtKey() === 'other' ? Math.round(parseFloat(customIn.value || '0')) : parseInt(amtKey(), 10); };
    var tierFor = function (a) { var t = null; (D.tiers || []).forEach(function (x) { if (a >= x.amount) t = x; }); return t; };
    var update = function () {
      var key = amtKey(), a = amount(), monthly = freqVal() === 'monthly';
      customWrap.hidden = key !== 'other';
      var base = D.giftImpact[key] || D.giftImpact.other;
      impactEl.innerHTML = (key !== '10' && key !== 'other' ? (monthly ? 'A <strong>$' + a + ' monthly</strong> gift ' : 'A <strong>$' + a + '</strong> gift ') + base.replace(/^Can/, 'can') : base);
      var t = monthly ? tierFor(a) : null;
      tierEl.innerHTML = t ? icon('star') + ' <span>Includes <strong>Donors’ Club · ' + esc(t.name) + '</strong> membership: ' + esc(t.benefits.slice(-1)[0].toLowerCase()) + (t.benefits.length > 1 ? ' and more' : '') + '.</span>' : (monthly ? icon('info') + ' <span>Monthly gifts of $10 or more include Donors’ Club membership.</span>' : icon('info') + ' <span>Prefer to give monthly? Switch above to join the Donors’ Club.</span>');
      goBtn.innerHTML = 'Give ' + (a > 0 ? '$' + a : '') + (monthly ? ' monthly' : ' once') + ' ' + icon('arrow', 'i-arrow');
      errEl.textContent = '';
    };
    // Prefill from links like give.html?amount=25&freq=monthly (or ?tier=champion)
    var pa = param('amount'), pt = param('tier'), pf = param('freq');
    if (pt) { var tt = (D.tiers || []).filter(function (x) { return x.id === pt; })[0]; if (tt) pa = String(tt.amount); }
    if (pf === 'once') $('input[name="freq"][value="once"]', give).checked = true;
    if (pa) { var m = $('input[name="amount"][value="' + pa + '"]', give); if (m) m.checked = true; else { $('input[name="amount"][value="other"]', give).checked = true; customIn.value = pa; } }
    give.addEventListener('change', update); give.addEventListener('input', update);
    update();
    give.addEventListener('submit', function (e) {
      e.preventDefault();
      var a = amount(), monthly = freqVal() === 'monthly', key = amtKey();
      if (!a || a < 5) { errEl.textContent = 'Please enter an amount of $5 or more.'; customIn.focus(); return; }
      var co = C.checkout || {}, bucket = monthly ? co.monthly : co.oneTime, custom = monthly ? co.monthlyCustom : co.oneTimeCustom;
      var url = (key !== 'other' && bucket && bucket[a]) || custom || '';
      track(monthly ? 'donors_club_checkout_click' : 'give_once_checkout_click', { amount: a });
      if (url) { location.href = url; return; }
      modal('<h2 id="modal-title">Thank you, from all of us at M-Pack.</h2><p>You chose to give <strong>$' + a + (monthly ? ' every month' : ' once') + '</strong>. ' + (monthly ? 'You’d receive a receipt, impact updates, and a link to change or cancel anytime.' : 'You’d receive a receipt by email.') + '</p>' +
        '<div class="notice" style="margin:1.25rem 0">' + icon('info') + '<div><strong>Prototype donation.</strong> No payment was taken. On the live site this step opens a secure hosted checkout page, and M-Pack never sees your card details.</div></div>' +
        '<div class="btn-row"><a class="btn btn--primary" href="shop.html">Browse crafts &amp; merch</a><a class="btn btn--outline" href="index.html#stay-close">Follow M-Pack updates</a></div>');
    });
  }

  /* ---- Forms: newsletter, partner inquiry, contact ---------------------------------------------- */
  function bindForms(root) {
    $$('form[data-form]', root || document).forEach(function (form) {
      if (form.__bound) return; form.__bound = true;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = form.getAttribute('data-form'), ok = true, firstBad = null;
        $$('.field-error', form).forEach(function (n) { n.remove(); });
        $$('[aria-invalid]', form).forEach(function (n) { n.removeAttribute('aria-invalid'); n.removeAttribute('aria-describedby'); });
        $$('[required]', form).forEach(function (f, i) {
          var v = (f.value || '').trim(), msg = '';
          if (!v) msg = f.type === 'email' ? 'Please enter your email address.' : 'This field is required.';
          else if (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(v)) msg = 'Enter a valid email address, like name@example.com.';
          if (msg) {
            ok = false; if (!firstBad) firstBad = f;
            var id = (f.id || 'f' + i) + '-err', p = document.createElement('p');
            p.className = 'field-error'; p.id = id; p.textContent = msg; f.insertAdjacentElement('afterend', p);
            f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', id);
          }
        });
        if (!ok) { firstBad.focus(); return; }
        var data = new FormData(form), honeypot = data.get('website');
        var btn = $('[type="submit"]', form), label = btn.innerHTML, errBox = $('.form-error', form);
        btn.disabled = true; btn.textContent = 'Sending…'; errBox.classList.remove('show');
        track(type === 'newsletter' ? 'newsletter_submit' : (type === 'partner' ? 'partner_inquiry_submit' : 'contact_submit'));
        var endpoint = (C.forms || {})[type];
        var done = function (demo) {
          var wrap = form.closest('[data-form-wrap]') || form.parentElement, success = $('.form-success', wrap);
          form.style.display = 'none';
          if (demo && success && !$('.demo-note', success)) { var d = document.createElement('p'); d.className = 'small demo-note'; d.style.marginTop = '.5rem'; d.textContent = 'Demo mode: nothing was actually sent.'; $('div', success).appendChild(d); }
          if (success) { success.classList.add('show'); success.setAttribute('tabindex', '-1'); success.focus(); }
          if (type === 'newsletter') track('newsletter_success');
        };
        if (honeypot) { done(false); return; }
        if (!endpoint) { setTimeout(function () { done(true); }, 600); return; }
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error('bad'); done(false); })
          .catch(function () { btn.disabled = false; btn.innerHTML = label; errBox.textContent = 'Something went wrong. Please try again in a moment.'; errBox.classList.add('show'); });
      });
      form.addEventListener('input', function (e) {
        var f = e.target, err = f.id && $('#' + f.id + '-err'); if (err) { err.remove(); f.removeAttribute('aria-invalid'); }
        if (form.getAttribute('data-form') === 'partner' && !form.__started) { form.__started = true; track('partner_inquiry_start'); }
      });
    });
  }
  bindForms();
  var reason = param('reason'), reasonSel = $('select[name="reason"]');
  if (reason && reasonSel) { $$('option', reasonSel).forEach(function (o) { if (o.value.toLowerCase().indexOf(reason.toLowerCase()) === 0) reasonSel.value = o.value; }); }

  /* ---- Updates (list + detail) ----------------------------------------------------------------------- */
  function updateCard(u) {
    var url = 'update.html?p=' + encodeURIComponent(u.slug);
    return '<li class="reveal"><article class="card update-card"><div class="meta"><span class="badge">' + esc(u.category) + '</span><span>' + esc(u.date) + '</span></div>' +
      '<h3><a href="' + url + '">' + esc(u.title) + '</a></h3><p>' + esc(u.summary) + '</p><a class="link-arrow" href="' + url + '">Read more ' + icon('arrow') + '</a></article></li>';
  }
  var uList = $('#updates-list');
  if (uList) {
    var limit = parseInt(uList.getAttribute('data-limit'), 10), all = D.updates || [];
    var draw = function (cat) {
      var list = all.filter(function (u) { return !cat || cat === 'All' || u.category === cat; }); if (limit) list = list.slice(0, limit);
      uList.innerHTML = list.map(updateCard).join(''); $$('.reveal', uList).forEach(function (r) { requestAnimationFrame(function () { r.classList.add('in'); }); });
    };
    draw('All');
    var bar = $('#updates-filter');
    if (bar) {
      var cats = ['All'].concat(all.map(function (u) { return u.category; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
      bar.innerHTML = cats.map(function (c, i) { return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>'; }).join('');
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat]'); if (!b) return;
        $$('.chip', bar).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); draw(b.getAttribute('data-cat'));
      });
    }
  }
  var uRoot = $('#update-root');
  if (uRoot) {
    var u = (D.updates || []).filter(function (x) { return x.slug === param('p'); })[0];
    if (!u) { uRoot.innerHTML = '<h1>We couldn’t find that update.</h1><p><a class="btn btn--primary" href="updates.html">All updates</a></p>'; }
    else {
      document.title = u.title + ' · M-Pack';
      uRoot.innerHTML = '<a class="link-arrow" href="updates.html" style="margin-bottom:1.5rem">&larr; All updates</a><div class="meta" style="display:flex;gap:.7rem;align-items:center;margin-bottom:1rem"><span class="badge">' + esc(u.category) + '</span><span class="muted small">' + esc(u.date) + '</span></div>' +
        '<h1 style="font-size:clamp(2.2rem,1.4rem + 3.4vw,3.6rem)">' + esc(u.title) + '</h1>' + u.body.map(function (b) { return '<p>' + esc(b) + '</p>'; }).join('') +
        '<div style="margin-top:2rem"><a class="btn btn--primary" href="' + esc(u.cta.href) + '">' + esc(u.cta.label) + ' ' + icon('arrow', 'i-arrow') + '</a></div>' +
        (u.sample ? '<div class="notice" style="margin-top:2rem">' + icon('info') + '<div><strong>Sample post.</strong> Placeholder content for the prototype; replace with real M-Pack news.</div></div>' : '');
    }
  }

  fixBrand($('#main'));

  /* ---- Go ---------------------------------------------------------------------------------------------- */
  observeAll();
})();
