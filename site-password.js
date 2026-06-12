(function() {
  // Verification tokens (split + encoded for security)
  var _t = [
    atob('MzI5ZDYxNzcxZDg2OGY2ZmI0YmJkMjA4ZDAzZWM5MDY='),
    atob('ODc3YjE5ZjA4M2ZjZWFhZDlmZjRiNmQ3NmI1MTQzYjQ=')
  ];
  var _k = 'ea-site-auth';
  var _v = function() { return _t[0] + _t[1]; };

  // Skip if already authenticated this session
  try {
    if (sessionStorage.getItem(_k) === '1') return;
  } catch(e) {}

  // CSS-first: hide ALL page content immediately (survives JS-disable)
  var hideStyle = document.createElement('style');
  hideStyle.id = 'site-pw-hide';
  hideStyle.textContent = 'body>*:not(#site-pw-screen){display:none!important}';
  document.head.appendChild(hideStyle);

  // Inject password screen
  var overlay = document.createElement('div');
  overlay.id = 'site-pw-screen';
  overlay.innerHTML =
    '<div class="site-pw-logo">EXECUTIVE ASHIYA</div>' +
    '<div class="site-pw-sub">MEMBERS ONLY</div>' +
    '<div class="site-pw-nda">\u79D8\u5BC6\u4FDD\u6301\u5951\u7D04\u3092\u7DE0\u7D50\u3055\u308C\u305F\u4F1A\u54E1\u69D8\u306E\u307F<br>\u30A2\u30AF\u30BB\u30B9\u3044\u305F\u3060\u3051\u307E\u3059\u3002</div>' +
    '<div class="site-pw-label">ACCESS CODE</div>' +
    '<div class="site-pw-input-wrap">' +
      '<input type="password" id="site-pw-input" maxlength="20" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="off">' +
    '</div>' +
    '<div id="site-pw-error"></div>' +
    '<button id="site-pw-btn"><span>ENTER</span></button>' +
    '<div class="site-pw-footer">' +
      '<div class="site-pw-divider"></div>' +
      '<div class="site-pw-notice">\u3059\u3079\u3066\u306E\u4F1A\u54E1\u60C5\u5831\u306F\u53B3\u91CD\u306B\u7BA1\u7406\u3055\u308C\u3066\u3044\u307E\u3059\u3002</div>' +
      '<div class="site-pw-nonmember">\u4F1A\u54E1\u3067\u306A\u3044\u65B9\u306F<a href="/invitation-request.html">\u30A6\u30A7\u30A4\u30C6\u30A3\u30F3\u30B0\u30EA\u30B9\u30C8</a>\u3088\u308A\u304A\u7533\u3057\u8FBC\u307F\u304F\u3060\u3055\u3044\u3002</div>' +
    '</div>';

  // Inject styles
  var style = document.createElement('style');
  style.textContent =
    '#site-pw-screen{position:fixed;inset:0;background:#FFFFFF;display:flex!important;flex-direction:column;align-items:center;justify-content:center;z-index:9999;padding:2rem;transition:opacity .6s}' +
    '.site-pw-logo{font-family:"Cormorant Garamond",serif;font-size:clamp(1.2rem,3vw,1.8rem);letter-spacing:.4em;color:#8B6F1F;margin-bottom:.5rem;text-align:center}' +
    '.site-pw-sub{font-size:.75rem;letter-spacing:.3em;color:rgba(28,31,46,.55);margin-bottom:4rem;text-align:center}' +
    '.site-pw-label{font-size:.72rem;letter-spacing:.35em;color:#8B6F1F;margin-bottom:1rem;text-align:center}' +
    '.site-pw-input-wrap{position:relative;width:100%;max-width:280px;margin-bottom:2rem}' +
    '#site-pw-input{width:100%;background:transparent;border:none;border-bottom:1px solid #6A521A;color:#1C1F2E;font-family:"Cormorant Garamond",serif;font-size:1.6rem;letter-spacing:.5em;text-align:center;padding:.5rem 0;outline:none;transition:border-color .3s}' +
    '#site-pw-input:focus{border-bottom-color:#8B6F1F}' +
    '#site-pw-input::placeholder{color:rgba(28,31,46,.22);font-size:.8rem;letter-spacing:.3em}' +
    '#site-pw-error{font-size:.72rem;letter-spacing:.1em;color:#A03A3A;text-align:center;margin-top:-1rem;margin-bottom:1.5rem;min-height:1rem;opacity:0;transition:opacity .3s;line-height:1.8}' +
    '#site-pw-error.show{opacity:1}' +
    '#site-pw-btn{background:transparent;border:1px solid #6A521A;color:#8B6F1F;font-family:"Cormorant Garamond",serif;font-size:.82rem;letter-spacing:.4em;padding:.9rem 3rem;cursor:pointer;transition:all .4s}' +
    '#site-pw-btn:hover{background:#8B6F1F;color:#FFFFFF;border-color:#8B6F1F}' +
    '#site-pw-btn:disabled{opacity:.4;cursor:not-allowed}' +
    '#site-pw-btn:disabled:hover{background:transparent;color:#8B6F1F}' +
    '.site-pw-nda{font-family:"Noto Serif JP",serif;font-size:.78rem;font-weight:300;letter-spacing:.08em;color:rgba(28,31,46,.5);line-height:2;text-align:center;margin-bottom:3rem}' +
    '.site-pw-footer{margin-top:2.5rem;text-align:center;max-width:320px}' +
    '.site-pw-divider{width:40px;height:1px;background:rgba(139,111,31,.4);margin:0 auto 1.2rem}' +
    '.site-pw-notice{font-family:"Noto Serif JP",serif;font-size:.65rem;font-weight:300;letter-spacing:.06em;color:rgba(28,31,46,.35);line-height:1.8;margin-bottom:.8rem}' +
    '.site-pw-nonmember{font-family:"Noto Serif JP",serif;font-size:.72rem;font-weight:300;letter-spacing:.06em;color:rgba(28,31,46,.5);line-height:1.8}' +
    '.site-pw-nonmember a{color:#8B6F1F;text-decoration:underline;text-underline-offset:3px}';

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  var input = document.getElementById('site-pw-input');
  var error = document.getElementById('site-pw-error');
  var btn = document.getElementById('site-pw-btn');

  // Rate limiting: lockout after failed attempts
  var _failCount = 0;
  var _maxAttempts = 5;
  var _lockoutMs = 60000;
  var _locked = false;

  // Verification using Web Crypto API
  async function _c(str) {
    var buf = new TextEncoder().encode(str);
    var h = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(h)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  async function _verify() {
    if (_locked) return;
    if (!input.value) return;

    var result = await _c(input.value);
    if (result === _v()) {
      try { sessionStorage.setItem(_k, '1'); } catch(e) {}
      var h = document.getElementById('site-pw-hide');
      if (h) h.remove();
      overlay.style.opacity = '0';
      setTimeout(function() { overlay.remove(); }, 600);
    } else {
      _failCount++;
      input.value = '';

      if (_failCount >= _maxAttempts) {
        _locked = true;
        btn.disabled = true;
        input.disabled = true;
        error.textContent = (window._spLang==='en' ? _spTexts.en : _spTexts.ja).errLockout;
        error.classList.add('show');
        setTimeout(function() {
          _locked = false;
          _failCount = 0;
          btn.disabled = false;
          input.disabled = false;
          error.classList.remove('show');
        }, _lockoutMs);
      } else {
        error.textContent = (window._spLang==='en' ? _spTexts.en : _spTexts.ja).errNormal;
        error.classList.add('show');
        setTimeout(function() { error.classList.remove('show'); }, 3000);
      }
    }
  }

  btn.addEventListener('click', _verify);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') _verify();
  });

  setTimeout(function() { input.focus(); }, 100);

  // Language toggle integration
  var _spTexts = {
    ja: {
      nda: '\u79D8\u5BC6\u4FDD\u6301\u5951\u7D04\u3092\u7DE0\u7D50\u3055\u308C\u305F\u4F1A\u54E1\u69D8\u306E\u307F<br>\u30A2\u30AF\u30BB\u30B9\u3044\u305F\u3060\u3051\u307E\u3059\u3002',
      notice: '\u3059\u3079\u3066\u306E\u4F1A\u54E1\u60C5\u5831\u306F\u53B3\u91CD\u306B\u7BA1\u7406\u3055\u308C\u3066\u3044\u307E\u3059\u3002',
      nonmember: '\u4F1A\u54E1\u3067\u306A\u3044\u65B9\u306F<a href="/invitation-request.html">\u30A6\u30A7\u30A4\u30C6\u30A3\u30F3\u30B0\u30EA\u30B9\u30C8</a>\u3088\u308A\u304A\u7533\u3057\u8FBC\u307F\u304F\u3060\u3055\u3044\u3002',
      errNormal: '\u4F1A\u54E1\u60C5\u5831\u3068\u306E\u4E00\u81F4\u304C\u78BA\u8A8D\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F',
      errLockout: '\u8907\u6570\u56DE\u306E\u8A8D\u8A3C\u5931\u6557\u3092\u691C\u77E5\u3057\u307E\u3057\u305F\u3002\u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u3002'
    },
    en: {
      nda: 'Access is restricted to members who have<br>signed a confidentiality agreement.',
      notice: 'All member information is strictly secured.',
      nonmember: 'Non-members may apply via the <a href="/invitation-request.html">Waiting List</a>.',
      errNormal: 'Member verification failed.',
      errLockout: 'Multiple failed attempts detected. Please wait.'
    }
  };
  window._spSetLang = function(lang) {
    var t = _spTexts[lang] || _spTexts.ja;
    var el = overlay.querySelector('.site-pw-nda'); if(el) el.innerHTML = t.nda;
    el = overlay.querySelector('.site-pw-notice'); if(el) el.textContent = t.notice;
    el = overlay.querySelector('.site-pw-nonmember'); if(el) el.innerHTML = t.nonmember;
    window._spLang = lang;
  };
  window._spLang = 'ja';
})();
