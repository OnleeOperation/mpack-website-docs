/* ==========================================================================
   Product illustrations (inline SVG). Placeholders used until M-Pack has
   approved product photography. Palette follows the M-Pack presentation.
   ========================================================================== */
(function () {
  var n = 0;
  var C = { teal: '#2b6663', tealD: '#1e4f4d', tealL: '#dfece8', tealM: '#5a9aa0', orange: '#ee9a5d', orangeL: '#f7d9c1', coral: '#d9573a', blue: '#3f9fc4', yellow: '#f3b13e', cream: '#faf9f3', sand: '#ece7d3' };

  function wrap(bg, inner, id) {
    return '<svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="400" height="460" fill="' + bg + '"/>' + inner + '</svg>';
  }

  var art = {
    bracelet: function (id) {
      return wrap(C.tealL,
        '<circle cx="330" cy="70" r="92" fill="#cfe2de"/><circle cx="60" cy="420" r="70" fill="' + C.orangeL + '" opacity=".7"/>' +
        '<defs><pattern id="pat' + id + '" width="44" height="40" patternUnits="userSpaceOnUse">' +
        ['M0 10 L22 -2 L44 10:' + C.coral, 'M0 20 L22 8 L44 20:#ffffff', 'M0 30 L22 18 L44 30:' + C.blue, 'M0 40 L22 28 L44 40:' + C.yellow]
          .map(function (p) { var a = p.split(':'); return '<path d="' + a[0] + '" fill="none" stroke="' + a[1] + '" stroke-width="9"/>'; }).join('') +
        '</pattern></defs>' +
        '<ellipse cx="200" cy="238" rx="126" ry="96" fill="none" stroke="url(#pat' + id + ')" stroke-width="62"/>' +
        '<ellipse cx="200" cy="238" rx="157" ry="127" fill="none" stroke="' + C.tealD + '" stroke-width="3"/>' +
        '<ellipse cx="200" cy="238" rx="95" ry="65" fill="none" stroke="' + C.tealD + '" stroke-width="3"/>' +
        '<rect x="318" y="150" width="26" height="22" rx="5" fill="' + C.yellow + '" stroke="' + C.tealD + '" stroke-width="3" transform="rotate(25 331 161)"/>' +
        '<path d="M336 170 q16 20 6 46 M340 168 q26 14 28 44 M332 172 q2 28 -14 48" fill="none" stroke="' + C.coral + '" stroke-width="4" stroke-linecap="round"/>');
    },
    card: function () {
      return wrap(C.orangeL,
        '<circle cx="70" cy="60" r="80" fill="#fbe9d8"/>' +
        '<rect x="96" y="96" width="220" height="290" rx="10" fill="' + C.cream + '" stroke="' + C.tealD + '" stroke-width="3" transform="rotate(-5 206 241)"/>' +
        '<g transform="rotate(-5 206 241)"><circle cx="206" cy="190" r="48" fill="' + C.orange + '"/><circle cx="206" cy="190" r="48" fill="none" stroke="' + C.tealD + '" stroke-width="3"/>' +
        '<path d="M110 300 q40 -50 96 -22 t98 -10 V372 H110z" fill="' + C.teal + '"/><path d="M110 330 q50 -30 100 -4 t94 -6 V372 H110z" fill="' + C.tealD + '"/>' +
        '<path d="M140 130 q14 -16 30 -6 M254 124 q16 -14 32 0" fill="none" stroke="' + C.tealD + '" stroke-width="4" stroke-linecap="round"/></g>' +
        '<rect x="196" y="318" width="190" height="112" rx="8" fill="#fff" stroke="' + C.tealD + '" stroke-width="3" transform="rotate(7 291 374)"/>' +
        '<path d="M196 322 l95 58 l95 -58" fill="none" stroke="' + C.tealD + '" stroke-width="3" transform="rotate(7 291 374)"/>');
    },
    print: function () {
      return wrap('#ece7d3',
        '<rect x="70" y="66" width="260" height="330" fill="' + C.cream + '" stroke="' + C.tealD + '" stroke-width="3"/>' +
        '<rect x="96" y="92" width="208" height="278" fill="' + C.teal + '"/>' +
        '<circle cx="250" cy="150" r="30" fill="' + C.orange + '"/>' +
        '<path d="M200 350 V230" stroke="' + C.cream + '" stroke-width="8" stroke-linecap="round"/>' +
        '<path d="M200 270 C150 270 130 235 128 200 C170 200 196 225 200 270z" fill="' + C.cream + '"/>' +
        '<path d="M200 300 C250 300 272 262 274 226 C230 226 204 254 200 300z" fill="' + C.orangeL + '"/>' +
        '<path d="M110 350 H290" stroke="' + C.tealD + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M160 160 h30 M150 176 h44" stroke="' + C.cream + '" stroke-width="4" stroke-linecap="round" opacity=".5"/>');
    },
    tote: function () {
      return wrap(C.tealL,
        '<circle cx="330" cy="90" r="88" fill="#cfe2de"/>' +
        '<path d="M140 170 C140 70 260 70 260 170" fill="none" stroke="' + C.tealD + '" stroke-width="10" stroke-linecap="round"/>' +
        '<path d="M96 160 H304 L322 410 H78 Z" fill="' + C.cream + '" stroke="' + C.tealD + '" stroke-width="3"/>' +
        '<circle cx="200" cy="268" r="54" fill="none" stroke="' + C.teal + '" stroke-width="7"/>' +
        '<path d="M178 292 V250 a22 22 0 0 1 44 0 V292" fill="none" stroke="' + C.orange + '" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M170 330 h60" stroke="' + C.orange + '" stroke-width="5" stroke-linecap="round"/>' +
        '<text x="200" y="372" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="30" fill="' + C.tealD + '" letter-spacing="3">M·PACK</text>');
    },
    tee: function () {
      return wrap(C.orangeL,
        '<circle cx="70" cy="80" r="90" fill="#fbe9d8"/>' +
        '<path d="M140 80 L52 130 L84 196 L122 176 V404 H278 V176 L316 196 L348 130 L260 80 C252 112 148 112 140 80Z" fill="' + C.teal + '" stroke="' + C.tealD + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M140 80 C148 112 252 112 260 80" fill="none" stroke="' + C.tealD + '" stroke-width="3"/>' +
        '<circle cx="200" cy="250" r="42" fill="none" stroke="' + C.cream + '" stroke-width="6"/>' +
        '<path d="M182 270 V240 a18 18 0 0 1 36 0 V270" fill="none" stroke="' + C.orange + '" stroke-width="8" stroke-linecap="round"/>' +
        '<text x="200" y="330" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="24" fill="' + C.cream + '" letter-spacing="3">M·PACK</text>');
    },
    stickers: function () {
      function disc(cx, cy, r, bg, rot, glyph) {
        return '<g transform="rotate(' + rot + ' ' + cx + ' ' + cy + ')"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + bg + '" stroke="#fff" stroke-width="9"/>' +
          '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + C.tealD + '" stroke-width="2.5"/>' + glyph + '</g>';
      }
      return wrap(C.tealL,
        '<circle cx="320" cy="400" r="100" fill="#cfe2de"/>' +
        disc(140, 150, 84, C.orange, -8, '<path d="M140 190 c-40 -26 -52 -46 -36 -66 a22 22 0 0 1 36 6 a22 22 0 0 1 36 -6 c16 20 4 40 -36 66z" fill="' + C.cream + '"/>') +
        disc(270, 262, 84, C.teal, 9, '<path d="M270 300 v-52 M270 262 c0 -26 -20 -40 -46 -40 0 26 20 40 46 40z M270 280 c0 -22 16 -38 44 -38 0 22 -16 38 -44 38z" fill="none" stroke="' + C.cream + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>') +
        disc(150, 350, 70, C.cream, -4, '<path d="M120 372 V344 a30 30 0 0 1 60 0 V372" fill="none" stroke="' + C.orange + '" stroke-width="10" stroke-linecap="round"/><path d="M110 395 h80" stroke="' + C.teal + '" stroke-width="6" stroke-linecap="round"/>'));
    }
  };

  window.mpArt = function (key) { n += 1; return (art[key] || art.card)(n); };
})();
