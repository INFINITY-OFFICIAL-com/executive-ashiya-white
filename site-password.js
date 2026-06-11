(function() {
  // SHA-256 hash of the password (password is NOT stored in plaintext)
  var HASH = '329d61771d868f6fb4bbd208d03ec906877b19f083fceaad9ff4b6d76b5143b4';
  var STORAGE_KEY = 'ea-site-auth';

  // Skip if already authenticated this session
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === HASH) return;
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
    '<div class="site-pw-label">ACCESS CODE</div>' +
    '<div class="site-pw-input-wrap">' +
      '<input type="password" id="site-pw-input" maxlength="20" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="off">' +
    '</div>' +
    '<div id="site-pw-error">\u30A2\u30AF\u30BB\u30B9\u30B3\u30FC\u30C9\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093</div>' +
    '<button id="site-pw-btn"><span>ENTER</span></button>';

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
    '#site-pw-error{font-size:.72rem;letter-spacing:.2em;color:#A03A3A;text-align:center;margin-top:-1rem;margin-bottom:1.5rem;min-height:1rem;opacity:0;transition:opacity .3s}' +
    '#site-pw-error.show{opacity:1}' +
    '#site-pw-btn{background:transparent;border:1px solid #6A521A;color:#8B6F1F;font-family:"Cormorant Garamond",serif;font-size:.82rem;letter-spacing:.4em;padding:.9rem 3rem;cursor:pointer;transition:all .4s}' +
    '#site-pw-btn:hover{background:#8B6F1F;color:#FFFFFF;border-color:#8B6F1F}';

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  var input = document.getElementById('site-pw-input');
  var error = document.getElementById('site-pw-error');
  var btn = document.getElementById('site-pw-btn');

  // SHA-256 hash function using Web Crypto API
  async function sha256(str) {
    var buf = new TextEncoder().encode(str);
    var hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  async function checkSitePassword() {
    var hashed = await sha256(input.value);
    if (hashed === HASH) {
      try { sessionStorage.setItem(STORAGE_KEY, HASH); } catch(e) {}
      // Remove CSS hiding rule
      var h = document.getElementById('site-pw-hide');
      if (h) h.remove();
      overlay.style.opacity = '0';
      setTimeout(function() { overlay.remove(); }, 600);
    } else {
      error.classList.add('show');
      input.value = '';
      setTimeout(function() { error.classList.remove('show'); }, 3000);
    }
  }

  btn.addEventListener('click', checkSitePassword);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkSitePassword();
  });

  setTimeout(function() { input.focus(); }, 100);
})();
