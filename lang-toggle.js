(function() {
  // Skip if already on index page with built-in lang toggle
  if (document.querySelector('.lang-toggle')) return;

  // Inject CSS
  var style = document.createElement('style');
  style.textContent = '.ea-lang-toggle{position:fixed;top:1.2rem;right:1.2rem;z-index:9999;display:flex;gap:0;font-family:"Cormorant Garamond",serif;}.ea-lang-btn{background:#fff;border:1px solid rgba(28,31,46,0.18);padding:0.35rem 0.6rem;cursor:pointer;font-family:"Cormorant Garamond",serif;font-size:0.68rem;letter-spacing:0.12em;color:rgba(28,31,46,0.45);transition:color 0.3s,border-color 0.3s,background 0.3s;touch-action:manipulation;}.ea-lang-btn:first-child{border-radius:2px 0 0 2px;border-right:none;}.ea-lang-btn:last-child{border-radius:0 2px 2px 0;}.ea-lang-btn.active{color:#1C1F2E;background:rgba(28,31,46,0.06);}';
  document.head.appendChild(style);

  // Create toggle UI
  var toggle = document.createElement('div');
  toggle.className = 'ea-lang-toggle';
  toggle.innerHTML = '<button class="ea-lang-btn active" data-lang="ja">JP</button><button class="ea-lang-btn" data-lang="en">EN</button>';
  document.body.appendChild(toggle);

  var currentLang = 'ja';

  // ═══ NEWS ARTICLE TRANSLATIONS ═══
  var newsArticles = {
    'service-launch': {
      h1: 'EXECUTIVE ASHIYA Official Service Launch',
      h2s: ['Service Overview', 'Our Vision', 'Service Area'],
      ps: [
        'EXECUTIVE ASHIYA will officially launch its fully mobile healthcare concierge service based in Ashiya from June 1, 2026.',
        'EXECUTIVE ASHIYA is a completely private, mobile healthcare service for executives and business leaders. Beyond personal training, we provide comprehensive support encompassing nutrition design, medical coordination, and mental wellness as a "healthcare concierge" — a new style of service.',
        'For busy executives, health management is the most important yet often postponed priority. EXECUTIVE ASHIYA eliminates the burden of travel by sending a dedicated team directly to your home or office, seamlessly integrating world-class healthcare into your daily life.',
        'All staff sign NDAs (non-disclosure agreements), ensuring that the very fact of your membership is never disclosed externally. This is a service truly designed for executives, with privacy as the top priority.',
        'We primarily serve the Ashiya, Nishinomiya, and Kobe areas. Service may also be available in other areas upon consultation — please feel free to inquire.'
      ],
      lis: []
    },
    'medical-network-expansion': {
      h1: 'Medical Network Expansion — Now 30 Facilities in Kansai',
      h2s: ['Newly Added Partnership Areas', 'Benefits for Members', 'How to Use'],
      ps: [
        'EXECUTIVE ASHIYA has significantly expanded its network of partner medical institutions to provide members with more advanced and prompt medical access. This brings our Kansai region network to 30 facilities.',
        'All partner facilities maintain priority appointment slots exclusively for EXECUTIVE ASHIYA members. Even precision examinations that typically require weeks of waiting can be arranged as early as the next business day.',
        'Additionally, we have established secure data-sharing protocols with each facility, enabling your dedicated concierge to comprehensively understand your health status and recommend the optimal medical institution.',
        'For medical referrals and appointment arrangements, please contact your dedicated concierge. We will recommend the most suitable facility and specialist based on your symptoms and preferences. Second opinion consultations are also available.'
      ],
      lis: [
        'Comprehensive health checkup and screening facilities (Ashiya, Kobe, Osaka areas)',
        'Advanced diagnostic imaging clinics (full-body precision examination capable)',
        'Regenerative medicine and anti-aging specialty clinics',
        'Cosmetic dentistry and implant specialty practices',
        'Psychosomatic medicine and mental wellness specialty facilities'
      ]
    },
    'supplement-prescription': {
      h1: 'May Custom Supplement Prescriptions Now Open',
      h2s: ['Program Features', 'May Featured Ingredients', 'Prescription Process', 'How to Apply'],
      ps: [
        'EXECUTIVE ASHIYA offers a fully personalized supplement program based on monthly blood test data. We are pleased to announce that May prescriptions are now being accepted.',
        'Unlike off-the-shelf supplements, our specialist team conducts fully customized prescriptions after comprehensively analyzing your blood test results, lifestyle data, and current physical condition. Everything from ingredient types and dosages to intake timing is individually designed.',
        'Your dedicated concierge will deliver a blood collection kit during a visit, with analysis conducted at a partner laboratory. Results are typically available within 3-5 business days, followed by delivery of your custom-formulated supplements to your home within one week.',
        'Prescription contents are updated based on monthly test results, ensuring you always receive nutritional support optimized for your latest physical condition.',
        'The deadline for May prescriptions is May 10, 2026. Please contact your dedicated concierge or reach out via the form below.'
      ],
      lis: [
        'NMN (Nicotinamide Mononucleotide) — Attracting attention as a compound that contributes to cellular-level aging care',
        'Glutathione — Supports the body\'s antioxidant function and contributes to daily condition maintenance',
        'High-dose Vitamin D — Immune balance regulation and seasonal adaptation',
        'Magnesium — Sleep quality improvement and muscle recovery promotion'
      ]
    },
    'sleep-investment': {
      h1: 'Why Executives Invest in Sleep',
      h2s: ['Data Shows the Correlation Between Sleep and Performance', 'Sleep Challenges Unique to Executives', 'EXECUTIVE ASHIYA\'s Sleep Optimization Approach', 'Sleep Is an "Investment"'],
      ps: [
        'In recent years, investing in "sleep quality" has rapidly gained traction among top-tier executives and business leaders. A major paradigm shift has occurred from the era when "short sleep was a badge of success."',
        'At EXECUTIVE ASHIYA, we recommend sleep tracking using wearable devices for our members. When we analyze the accumulated data, clear trends emerge.',
        'Members whose deep sleep (non-REM sleep stages 3-4) duration exceeds the average by 20% or more show significantly higher scores in both daytime decision-making speed and sustained concentration.',
        'Particularly noteworthy is that sleep "quality" matters more than "quantity." In many cases, 6 hours of high-quality sleep delivers greater performance recovery than 8 hours of light sleep.',
        'Three common sleep challenges shared by busy executives are:',
        'We don\'t offer generic advice like "get more sleep." Instead, we propose specific improvement plans based on each client\'s individual data.',
        'Improving sleep quality directly contributes not only to next-day performance but also to reducing medium-to-long-term health risks. Cardiovascular disease, cognitive decline, decreased immunity — all are deeply connected to sleep quality.',
        '"Investing in sleep" is no longer exclusive to a few forward-thinking executives. Viewing your own body as your most important business asset and doing your best to maintain it — EXECUTIVE ASHIYA is here to help you put this into practice.'
      ],
      lis: [
        'Blue light exposure from device use right before bed and sustained brain arousal',
        'Difficulty falling asleep due to pressure from important decisions the next day',
        'Disruption of circadian rhythms from irregular schedules (business trips, dinner engagements, etc.)',
        'Continuous sleep score monitoring via wearable devices',
        'Optimization of evening training intensity and timing',
        'Dinner nutrition design to support sleep hormone secretion',
        'Personalized pre-sleep relaxation routine design',
        'Sleep environment optimization consulting (bedding, room temperature, lighting, aromatherapy)'
      ]
    },
    'medical-network': {
      h1: 'Building Our Partner Medical Network',
      h2s: ['Reaching Beyond What Training Alone Can Achieve', 'Network Features', 'How to Use'],
      ps: [
        'EXECUTIVE ASHIYA has expanded its network of partner medical institutions, orthopedic clinics, and acupuncture clinics to provide more comprehensive healthcare to our clients.',
        'Personal training is a vital pillar of health management, but there are areas it cannot address alone. Chronic shoulder stiffness, lower back pain, accumulated fatigue, internal medical issues — these challenges require collaboration with medical specialists.',
        'At EXECUTIVE ASHIYA, rather than having trainers work in isolation, we have built a system where trusted medical institutions share information and support client health as a team.',
        'Our partner medical network is available to all EXECUTIVE ASHIYA members without additional procedures. Please contact your trainer or reach out via the inquiry form.',
        'Please note that medical consultation fees are the client\'s responsibility. Please check with each medical institution regarding insurance coverage.'
      ],
      lis: [
        'Program adjustments based on physical data through coordination with orthopedic and internal medicine specialists',
        'Enhanced recovery and conditioning through partnerships with osteopathic and acupuncture clinics',
        'Preventive medicine approach utilizing health checkup data',
        'Specialist referrals and coordination as needed'
      ]
    },
    'private-training': {
      h1: 'The Value of Fully Mobile Personal Training',
      h2s: ['The Value of Zero Travel Time', 'A Completely Private Space', 'Programs Designed for Your Environment', 'High Retention Rates Prove the Value'],
      ps: [
        '"Going to the gym" involves more barriers than one might imagine. Travel time, changing clothes, others\' gazes, scheduling — all of these factors hinder busy executives from maintaining consistency.',
        'If a round trip to the gym takes 30 minutes, that\'s 4 hours per month at twice a week. Over a year, you\'d spend more than 48 hours just on "commuting." For executives, the value of this time is immeasurable.',
        'With a fully mobile service, you can work until 5 minutes before your session starts. Not wasting a single second of your time — that is the greatest value of mobile personal training.',
        'The "eyes of others" are unavoidable at a gym. For executives, the reluctance to be seen training by acquaintances or business partners is significant.',
        'Training at your home or private office means you can concentrate at your own pace without worrying about others at all. Your attire, your expressions — everything is your choice.',
        '"Can you really get a serious workout without machines at home?" — This is a common question. However, there are many training methodologies that deliver excellent results without machines.',
        'EXECUTIVE ASHIYA trainers design optimal programs tailored to your living environment. We bring specialized equipment as needed, maximizing your home space for training. For those interested, we also offer home gym setup consulting.',
        'While the average gym retention rate is said to be around 30%, EXECUTIVE ASHIYA\'s retention rate is 92%. This figure clearly demonstrates that mobile personal training is "easy to continue."',
        'Training is meaningless unless you continue. The system that makes continuation possible is itself the ultimate training program.'
      ],
      lis: []
    },
    'health-investment': {
      h1: 'Why Executives Should Invest in Health',
      h2s: ['Your Body Is Your Greatest Business Asset', 'The Correlation Between Performance and Health', '"Being Too Busy" Is the Greatest Risk', 'Health Management as an Investment'],
      ps: [
        'What most influences a company\'s value — is it business strategy? Market conditions? Or is it the physical and mental state of the executive themselves? Judgment, focus, endurance. Every capability required in business is built upon the foundation of health.',
        'Many executives actively invest in equipment and human resources while postponing investment in their own bodies. Yet if the executive falls, the company stops. Among hundreds of employees, the one irreplaceable person is the executive.',
        'The reason global CEOs employ personal trainers and health concierges is because they understand that health management is not "self-care" but a "business decision."',
        'Multiple research findings report that executives with regular exercise habits show improved decision-making speed and accuracy compared to those without. Furthermore, proper nutrition management and sleep enhance stress resilience and maintain the quality of long-term business decisions.',
        'Conversely, chronic fatigue and poor health lead to judgment errors and overlooked risks. Physical condition directly reflects business condition.',
        '"No time." "No time to go to the gym." — These are the most commonly heard excuses for neglecting health management. However, these very words are also the strongest signal that health management is most needed.',
        'A fully mobile healthcare service fundamentally solves this problem. Zero travel time. A dedicated team visits your home or office on your schedule, integrating health management into your daily life.',
        'Investing in health is neither a perk nor a luxury. It is the most reliable investment for maintaining your performance as an executive and protecting your company and family.',
        'EXECUTIVE ASHIYA is a "healthcare concierge" that comprehensively provides training, nutrition, medical coordination, and mental care to executives who share this awareness.'
      ],
      lis: []
    },
    'oura-ring-conditioning': {
      h1: 'Oura Ring Integration: 24/7 Conditioning Support Launched',
      h2s: ['Data-Driven Condition Management', 'Support Details', 'How to Use'],
      ps: [
        'EXECUTIVE ASHIYA is launching 24-hour conditioning support integrated with Oura Ring to more precisely understand our members\' health status and apply insights to daily conditioning.',
        'Your dedicated trainer monitors sleep scores, heart rate variability (HRV), skin temperature, and activity data measured by Oura Ring in real time — reading changes in the numbers to adjust training intensity and suggest rest.',
        'This service is provided as standard to all EXECUTIVE ASHIYA members. If you do not own an Oura Ring, your trainer will guide you through the options — please feel free to inquire.'
      ],
      lis: [
        'Training menu optimization based on sleep data (automatic switch to recovery sessions on low sleep score days)',
        'HRV trend analysis to detect early signs of overtraining',
        'Skin temperature fluctuation monitoring to anticipate health issues and proactively adjust schedules',
        'Weekly data reports sent to visualize conditioning trends'
      ]
    },
    'nutrition-program': {
      h1: 'Full-Order Nutrition Program by Registered Dietitians Launched',
      h2s: ['A Scientific Approach Based on Blood Test Data', 'Program Features', 'How to Use'],
      ps: [
        'EXECUTIVE ASHIYA is launching a full-order nutrition management program by registered dietitians to deliver meal planning based on each member\'s individual body data.',
        'Based on 40+ blood test results, we analyze vitamins, minerals, lipids, inflammation markers, and other values — identifying nutrient deficiencies and designing efficient intake plans through diet.',
        'This program is available to EXECUTIVE ASHIYA members. Blood tests are conducted at partner medical institutions. Please contact your trainer or reach out via the inquiry form for details.'
      ],
      lis: [
        'Registered dietitians interpret blood test data and design fully customized meal plans',
        'Plans are continuously optimized based on monthly blood test results',
        'Nutrient intake timing designed in coordination with training content (pre- and post-workout nutrition)',
        'Restaurant selection guides and menu-choosing advice for those who dine out frequently',
        'Integration with custom supplement prescriptions as needed'
      ]
    }
  };

  // Detect current page
  function getPageKey() {
    var path = window.location.pathname;
    if (path.indexOf('privacy') !== -1) return 'privacy';
    if (path.indexOf('tokushoho') !== -1) return 'tokushoho';
    if (path.indexOf('confidentiality') !== -1) return 'confidentiality';
    if (path.indexOf('invitation-thanks') !== -1) return 'invitation-thanks';
    if (path.indexOf('invitation-request') !== -1) return 'invitation-request';
    if (path.indexOf('/news/') !== -1) return 'news';
    if (path.indexOf('method') !== -1) return 'method';
    if (path.indexOf('for-members') !== -1) return 'for-members';
    if (path.indexOf('screening') !== -1) return 'screening';
    return null;
  }

  function getNewsKey() {
    var path = window.location.pathname;
    if (path.indexOf('service-launch') !== -1) return 'service-launch';
    if (path.indexOf('medical-network-expansion') !== -1) return 'medical-network-expansion';
    if (path.indexOf('supplement-prescription') !== -1) return 'supplement-prescription';
    if (path.indexOf('sleep-investment') !== -1) return 'sleep-investment';
    if (path.indexOf('medical-network') !== -1 && path.indexOf('expansion') === -1) return 'medical-network';
    if (path.indexOf('private-training') !== -1) return 'private-training';
    if (path.indexOf('health-investment') !== -1) return 'health-investment';
    if (path.indexOf('oura-ring') !== -1) return 'oura-ring-conditioning';
    if (path.indexOf('nutrition-program') !== -1) return 'nutrition-program';
    return null;
  }

  // Store original Japanese content for news articles
  var originalNews = null;
  function captureOriginalNews() {
    if (originalNews) return;
    var h1 = document.querySelector('h1');
    var h2s = document.querySelectorAll('h2');
    var container = document.querySelector('.container');
    if (!container) return;
    var ps = [];
    container.querySelectorAll('p').forEach(function(p) {
      if (!p.closest('.article-meta') && !p.classList.contains('back-link')) {
        ps.push(p.textContent.trim());
      }
    });
    var lis = [];
    container.querySelectorAll('li').forEach(function(li) { lis.push(li.textContent.trim()); });
    originalNews = {
      h1: h1 ? h1.textContent.trim() : '',
      h2s: Array.from(h2s).map(function(h) { return h.textContent.trim(); }),
      ps: ps,
      lis: lis
    };
  }

  function switchLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    try { localStorage.setItem('ea-lang', lang); } catch(e) {}

    toggle.querySelectorAll('.ea-lang-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.documentElement.lang = lang === 'en' ? 'en' : 'ja';

    var pageKey = getPageKey();

    // ═══ NEWS ARTICLES ═══
    if (pageKey === 'news') {
      captureOriginalNews();
      var nk = getNewsKey();
      var article = nk ? newsArticles[nk] : null;
      if (article && originalNews) {
        var h1 = document.querySelector('h1');
        if (h1) h1.textContent = lang === 'en' ? article.h1 : originalNews.h1;

        var h2s = document.querySelectorAll('h2');
        var h2src = lang === 'en' ? article.h2s : originalNews.h2s;
        h2s.forEach(function(h, i) { if (h2src[i]) h.textContent = h2src[i]; });

        var container = document.querySelector('.container');
        if (container) {
          var pIdx = 0;
          var pSrc = lang === 'en' ? article.ps : originalNews.ps;
          container.querySelectorAll('p').forEach(function(p) {
            if (p.closest('.article-meta') || p.classList.contains('back-link')) return;
            if (pSrc[pIdx] !== undefined) p.textContent = pSrc[pIdx];
            pIdx++;
          });

          var liIdx = 0;
          var liSrc = lang === 'en' ? article.lis : originalNews.lis;
          container.querySelectorAll('li').forEach(function(li) {
            if (liSrc[liIdx] !== undefined) li.textContent = liSrc[liIdx];
            liIdx++;
          });
        }

        // Tag
        var tag = document.querySelector('.article-tag');
        if (tag) {
          var tagText = tag.textContent.trim();
          if (lang === 'en') {
            if (tagText === 'お知らせ') tag.textContent = 'NEWS';
          }
        }
      }
      // CTA link
      var cta = document.querySelector('.cta-link');
      if (cta) cta.textContent = 'CONTACT US';
      return;
    }

    // ═══ PRIVACY ═══
    if (pageKey === 'privacy') {
      var headings = {
        ja: ['1. 個人情報の収集について','2. 個人情報の利用目的','3. 個人情報の第三者提供','4. 個人情報の管理','5. 個人情報の開示・訂正・削除','6. ポリシーの変更'],
        en: ['1. Collection of Personal Information','2. Purpose of Use','3. Third-Party Disclosure','4. Information Security','5. Disclosure, Correction & Deletion','6. Policy Changes']
      };
      document.querySelectorAll('h2').forEach(function(h, i) { if (headings[lang][i]) h.textContent = headings[lang][i]; });

      var pTexts = {
        ja: ['当サービス（EXECUTIVE ASHIYA、以下「当社」）は、お問い合わせフォームを通じて、お名前、メールアドレス等の個人情報を収集いたします。','収集した個人情報は、以下の目的にのみ使用いたします。','当社は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。','当社は、個人情報の漏洩、滅失、毀損の防止のため、適切な安全管理措置を講じます。','ご本人様からの個人情報の開示・訂正・削除のご請求には、速やかに対応いたします。お問い合わせフォームよりご連絡ください。','本ポリシーの内容は、法令の変更等により予告なく変更する場合がございます。変更後のポリシーは、当ページに掲載した時点から効力を生じるものとします。'],
        en: ['Our service (EXECUTIVE ASHIYA, hereinafter "the Company") collects personal information such as your name and email address through inquiry forms.','Collected personal information is used solely for the following purposes.','The Company will not provide personal information to third parties without your consent, except as required by law.','The Company implements appropriate security measures to prevent the leakage, loss, or damage of personal information.','We will promptly respond to requests for disclosure, correction, or deletion of personal information. Please contact us via the inquiry form.','The contents of this policy may be changed without notice due to amendments in laws. The revised policy shall take effect from the time it is posted on this page.']
      };
      var pIdx = 0;
      document.querySelectorAll('.container p').forEach(function(p) {
        if (p.style.marginTop) { p.textContent = lang === 'en' ? 'Established: March 19, 2026' : '制定日：2026年3月19日'; return; }
        if (pTexts[lang][pIdx] !== undefined) p.textContent = pTexts[lang][pIdx];
        pIdx++;
      });

      var liTexts = {
        ja: ['お問い合わせへの返答・ご連絡','サービスに関するご案内','サービスの品質向上のための分析'],
        en: ['Responding to and communicating about inquiries','Providing information about our services','Analysis for service quality improvement']
      };
      document.querySelectorAll('.container li').forEach(function(li, i) { if (liTexts[lang][i]) li.textContent = liTexts[lang][i]; });
      return;
    }

    // ═══ TOKUSHOHO ═══
    if (pageKey === 'tokushoho') {
      var thLabels = {
        ja: ['事業者名','代表者','所在地','電話番号','メールアドレス','サービス料金','料金以外の必要経費','支払方法','支払時期','サービス提供時期','契約期間','クーリング・オフ','中途解約','キャンセル・日程変更'],
        en: ['Business Name','Representative','Address','Phone','Email','Service Fee','Additional Expenses','Payment Method','Payment Timing','Service Start','Contract Period','Cooling-Off','Mid-Contract Cancellation','Cancellation & Rescheduling']
      };
      document.querySelectorAll('th').forEach(function(th, i) { if (thLabels[lang][i]) th.textContent = thLabels[lang][i]; });

      var tdVals = {
        ja: ['EXECUTIVE ASHIYA','福田 泰士','〒530-0001 大阪府大阪市北区梅田1-1-3','お問い合わせフォームよりご連絡ください','お問い合わせフォームよりご連絡ください','完全会員制のため、審査通過者に個別にご案内しております。<br>詳細はお問い合わせください。','国内出張時の交通費・宿泊費等は会費に含まれます。海外同行時の渡航費・滞在費等は別途実費となります。サプリメント・血液検査等の実費は別途ご請求となる場合がございます。','銀行振込 / クレジットカード','入会金：契約締結時にお支払いいただきます。<br>年会費：契約締結後14日以内に一括お支払い、または年4回の分割払いも可能です。','入会金お支払い確認後、初回アセスメントセッションの日程調整を行い、年間プログラムを開始いたします。','1年単位の年間プログラムとなります。次年度以降の継続については、年度末の個別面談にて改めてご相談いただけます。','本サービスは特定商取引法上の特定継続的役務提供に該当する場合があり、契約書面の受領日から起算して8日以内であれば、書面または電磁的記録により無条件で契約を解除いただけます（クーリング・オフ）。クーリング・オフの期間中は、損害賠償または違約金の請求は一切いたしません。','クーリング・オフ期間経過後も、お客様のご都合により将来に向かって契約を解除いただけます。中途解約の際は、提供済みサービスの対価および法令で定める損害賠償額（上限あり）のみご負担いただき、未提供分の年会費は速やかにご返金いたします。','個別セッションの日程変更は前日18時までのご連絡で当月内振替が可能です。出張・体調不良等やむを得ない場合は月をまたいだ振替にも個別対応いたします。'],
        en: ['EXECUTIVE ASHIYA','Taishi Fukuda','1-1-3 Umeda, Kita-ku, Osaka-shi, Osaka 530-0001, Japan','Please contact us via the inquiry form','Please contact us via the inquiry form','As an invitation-only service, fees are disclosed individually to approved members.<br>Please contact us for details.','Domestic travel and accommodation costs are included in membership fees. International travel costs are billed separately. Supplement and blood test fees may be billed separately.','Bank transfer / Credit card','Entrance fee: Due upon contract execution.<br>Annual fee: Full payment within 14 days of contract, or quarterly installments available.','After confirming entrance fee payment, we schedule the initial assessment session and begin the annual program.','Programs are annual (1-year). Continuation is discussed in individual year-end consultations.','This service may qualify as a specified continuous service under the Specified Commercial Transactions Act. You may unconditionally cancel within 8 days of receiving the contract documents (cooling-off period). No damages or penalties are charged during this period.','After the cooling-off period, you may cancel at any time. Upon cancellation, you are responsible only for services already provided and legally prescribed damages (capped). Unused annual fees will be promptly refunded.','Session rescheduling is available with notice by 6:00 PM the day before, within the same month. Special accommodations for business trips or illness are handled on a case-by-case basis.']
      };
      document.querySelectorAll('td').forEach(function(td, i) { if (tdVals[lang][i]) td.innerHTML = tdVals[lang][i]; });

      var notes = { ja: ['制定日：2026年3月19日 ／ 最終改定：2026年4月10日','※ 本表記は法令遵守のため随時見直しを行います。最新の契約条件はご契約時にお渡しする契約書面をご確認ください。'], en: ['Established: March 19, 2026 / Last revised: April 10, 2026','* This notation is reviewed regularly for legal compliance. Please refer to contract documents for the latest terms.'] };
      document.querySelectorAll('.note').forEach(function(n, i) { if (notes[lang][i]) n.textContent = notes[lang][i]; });
      return;
    }

    // ═══ CONFIDENTIALITY ═══
    if (pageKey === 'confidentiality') {
      var heroJa = document.querySelector('.c-hero-ja');
      var heroMotto = document.querySelector('.c-hero-motto');
      if (heroJa) heroJa.textContent = lang === 'en' ? 'About Confidentiality' : '守 秘 に つ い て';
      if (heroMotto) heroMotto.textContent = lang === 'en' ? 'Silence is the highest proof of trust.' : '沈黙は、最上の信頼の証。';

      var bodyPs = {
        ja: ['EXECUTIVE ASHIYAでは、会員様の個人情報はもとより、ご利用の事実そのものを厳格に保護いたします。すべてのスタッフが個別の機密保持契約（NDA）を締結しており、在籍中はもちろん、退職後も守秘義務は永続的に効力を持ちます。','会員様のご家族・ご関係者への情報開示も、ご本人の明示的な許可なく行うことは一切ございません。お名前、ご住所、ご利用内容、訪問スケジュール——あらゆる接点において、完全な秘匿性を維持します。'],
        en: ['At EXECUTIVE ASHIYA, we strictly protect not only our members\' personal information but also the very fact of their membership. All staff sign individual non-disclosure agreements (NDAs), and confidentiality obligations remain in effect permanently, even after resignation.','We never disclose information to members\' families or associates without explicit written consent. Names, addresses, service details, visit schedules — we maintain complete confidentiality at every touchpoint.']
      };
      document.querySelectorAll('.c-body p').forEach(function(p, i) { if (bodyPs[lang][i]) p.textContent = bodyPs[lang][i]; });

      var items = {
        ja: ['全スタッフが個別の機密保持契約を締結。違反時は損害賠償請求を含む法的措置の対象となる厳格な契約体制を採用。','退職スタッフを含む、永続的かつ無期限の守秘義務。契約終了・退職後も守秘義務に時効はなく、生涯にわたり保護が継続されます。','ご利用の事実そのものを外部に開示しません。ご家族・関係者への連絡、SNSでの言及もご本人の書面による事前許可がない限り一切不可。','健康データ・トレーニング記録・医療情報はAES-256暗号化で保管。アクセスは担当者のみに制限。退会後のデータは、ご希望に応じ完全削除いたします。'],
        en: ['All staff sign individual non-disclosure agreements. A strict contractual framework includes legal action and damages claims for any violations.','Perpetual and unlimited confidentiality obligations for all staff, including those who have resigned. No statute of limitations — protection continues for life.','The very fact of membership is never disclosed externally. Contact with family or associates, social media mentions — none permitted without prior written consent.','Health data, training records, and medical information are stored with AES-256 encryption. Access restricted to assigned staff only. Data completely deleted upon request after membership ends.']
      };
      document.querySelectorAll('.c-item p').forEach(function(p, i) { if (items[lang][i]) p.textContent = items[lang][i]; });
      return;
    }

    // ═══ INVITATION REQUEST ═══
    if (pageKey === 'invitation-request') {
      var title = document.querySelector('.form-title');
      if (title) title.textContent = lang === 'en' ? 'Membership Request' : 'ご入会リクエスト';
      var intro = document.querySelector('.form-intro');
      if (intro) intro.textContent = lang === 'en' ? 'EXECUTIVE ASHIYA operates on an invitation-only basis. Please submit your interest through the form below. Representative Fukuda will contact you directly after review.' : 'EXECUTIVE ASHIYAは完全招待制にてご案内しております。以下のフォームよりご入会のご意向をお知らせください。内容を確認のうえ、代表・福田より直接ご連絡を差し上げます。';
      return;
    }

    // ═══ METHOD ═══
    if (pageKey === 'method') {
      var d = document;
      if (!window._mO) {
        window._mO = {
          hj: (d.querySelector('.method-hero-ja')||{}).textContent||'',
          hl: (d.querySelector('.method-hero-lead')||{}).innerHTML||'',
          tj: [].map.call(d.querySelectorAll('.m-title-ja'),function(e){return e.textContent;}),
          bp: [].map.call(d.querySelectorAll('.m-body p'),function(e){return e.innerHTML;}),
          pl: [].map.call(d.querySelectorAll('.m-points li'),function(e){return e.innerHTML;}),
          vt: [].map.call(d.querySelectorAll('.m-voice-text'),function(e){return e.textContent;}),
          vr: [].map.call(d.querySelectorAll('.m-voice-role'),function(e){return e.textContent;}),
          vn: (d.querySelector('.m-voice-note')||{}).textContent||'',
          jt: [].map.call(d.querySelectorAll('.m-journey-title'),function(e){return e.textContent;}),
          jd: [].map.call(d.querySelectorAll('.m-journey-desc'),function(e){return e.textContent;}),
          ct: (d.querySelector('.m-cta-text')||{}).textContent||''
        };
      }
      var o = window._mO;
      if (lang === 'en') {
        var el = d.querySelector('.method-hero-ja');
        if(el) el.textContent = 'Our Proprietary Method';
        el = d.querySelector('.method-hero-lead');
        if(el) el.innerHTML = 'Integrating cutting-edge evidence from global preventive medicine and longevity research,<br>optimized for the lifestyles of Japanese executives.<br>EXECUTIVE ASHIYA delivers not training, but "health architecture."';
        var tjs=['Precision Data Science','Integrated Expert Team','Preventive & Longevity Medicine','Lifetime Continuity Design','Why Executive Ashiya'];
        d.querySelectorAll('.m-title-ja').forEach(function(e,i){if(tjs[i])e.textContent=tjs[i];});
        var bps=[
          'Making decisions based on "numbers" rather than "intuition" — this is the starting point of the EA Method.<br>The data collected during the initial assessment sets us apart from typical personal training gyms.',
          'In conventional healthcare, trainers, dietitians, and physicians work independently.<br>In the EA Method, five disciplines hold monthly conferences as one team,<br>sharing data and aligning programs toward the same goals.',
          'Traditional medicine followed a Medicine 2.0 approach — treating illness after it occurs.<br>The EA Method is built on "Medicine 3.0," advocated by Dr. Peter Attia —<br>preventing chronic disease while maximizing both lifespan and healthspan.',
          'To put this philosophy into practice, the EA Method integrates three medical frameworks.',
          'There are countless programs promising short-term results.<br>However, weight lost in 3 months returns in 3 months — this is reality.',
          'This is why the EA Method is based on annual contracts.<br>True physical transformation requires at least 6 months of consistency,<br>and one year of accumulated data dramatically improves program precision.<br>Our 92% retention rate proves this design philosophy works.',
          'Global longevity research, functional medicine, molecular nutrition —<br>these insights are individually available through books and clinics.<br>But a service where one team integrates them all,<br>delivered privately through a fully mobile model, did not exist in Japan.',
          'EXECUTIVE ASHIYA is the only private healthcare service that optimizes<br>global-standard preventive medicine for the lifestyles and aesthetics of Japanese executives.'
        ];
        d.querySelectorAll('.m-body p').forEach(function(e,i){if(bps[i]!==undefined)e.innerHTML=bps[i];});
        var pls=[
          '<strong>BLOOD PANEL \u2014 40+ BIOMARKERS</strong> Lipid panel (LDL/HDL/TG), liver function (AST/ALT/\u03b3-GTP), glucose metabolism (HbA1c/fasting blood sugar), hormones (testosterone/cortisol/DHEA-S), inflammation markers (hs-CRP), vitamins & minerals (Vit D/B12/ferritin/zinc). Bi-annual testing to track trends.',
          '<strong>BODY COMPOSITION \u2014 InBody 770</strong> Precise measurement of segmental muscle mass, body fat percentage, visceral fat level, and extracellular water ratio (ECW/TBW). Monthly changes tracked to 0.1 kg for quantitative program evaluation.',
          '<strong>WEARABLE BIOMETRICS \u2014 Oura Ring / Apple Watch</strong> 24/7 real-time tracking of sleep scores, HRV, resting heart rate, skin temperature, and activity. Data syncs to the trainer\u2019s dashboard for daily conditioning assessments.',
          '<strong>MOVEMENT SCREENING \u2014 FMS / SFMA</strong> Functional Movement Screen (7 movement patterns) quantifies mobility, stability, and bilateral asymmetry. Directly linked to early injury risk detection and program optimization.',
          '<strong>PERSONAL TRAINER</strong> Holding certifications such as NSCA-CSCS and NASM-PES. Trainers selected from the top 0.3% provide consistent year-round guidance.',
          '<strong>REGISTERED DIETITIAN</strong> Registered dietitians update meal plans and supplement prescriptions monthly based on blood data, body composition, and lifestyle. Molecular nutrition insights applied in practice.',
          '<strong>MEDICAL PARTNERS</strong> Coordinating with 30+ partner medical institutions (internal medicine, orthopedics, regenerative medicine, cosmetic dermatology). Test result reviews, emergency responses, and second opinion arrangements.',
          '<strong>HEALTH CONCIERGE</strong> A dedicated concierge handles medical appointments, beauty arrangements, food procurement, and travel wellness \u2014 all through one point of contact.',
          '<strong>FUNCTIONAL MEDICINE</strong> Addressing root causes rather than symptoms. Identifying upstream factors \u2014 gut health, hormonal balance, chronic inflammation, oxidative stress \u2014 and improving them through nutrition, exercise, and lifestyle.',
          '<strong>MOLECULAR NUTRITION</strong> Evaluating individual nutritional status at the molecular level from blood test data. Optimizing deficient vitamins, minerals, and amino acids with custom supplements.',
          '<strong>REGENERATIVE MEDICINE ACCESS</strong> Access to regenerative medicine through partner clinics: stem cell therapy, exosome IV, PRP therapy, NMN IV, etc. Pre- and post-treatment conditioning managed comprehensively.',
          '<strong>QUARTERLY REVIEW CYCLE</strong> Blood tests, body composition, and FMS reassessed every 3 months. Data trends visualized and next-quarter strategy redesigned.',
          '<strong>ANNUAL COMPREHENSIVE REPORT</strong> A comprehensive annual report integrating all data submitted at year-end. Changes visualized in numbers and graphs; next-year goals set.',
          '<strong>CUMULATIVE DATA ADVANTAGE</strong> The longer you continue, the more data accumulates, deepening program personalization. Long-term members benefit from increasingly precise health design.'
        ];
        d.querySelectorAll('.m-points li').forEach(function(e,i){if(pls[i]!==undefined)e.innerHTML=pls[i];});
        var vts=['My health checkup numbers had been worsening year after year, but all metrics improved within six months. Above all, my morning alertness and focus changed. I genuinely feel my decision-making sharpness has returned.','The peace of mind of having my body conditioning for the stage completely managed. From nutrition to injury prevention, they flexibly adapt to performance schedules \u2014 the only team that can do this.','As a physician, I understood the importance of preventive medicine, but always put my own health last. I place my professional trust in their thorough data-driven approach.'];
        d.querySelectorAll('.m-voice-text').forEach(function(e,i){if(vts[i])e.textContent=vts[i];});
        var vrs=['50s \u2014 CEO, Listed Company','40s \u2014 Former Takarazuka Top Star','60s \u2014 Physician (Internal Medicine)'];
        d.querySelectorAll('.m-voice-role').forEach(function(e,i){if(vrs[i])e.textContent=vrs[i];});
        el=d.querySelector('.m-voice-note');if(el)el.textContent='* All testimonials are published anonymously to protect privacy.';
        var jts=['Foundation Building','Active Improvement','Optimization','Annual Review'];
        d.querySelectorAll('.m-journey-title').forEach(function(e,i){if(jts[i])e.textContent=jts[i];});
        var jds=['Initial assessment (body composition, blood tests, FMS). Data-driven annual roadmap created. Starting with foundational exercise habits and nutrition improvement.','After confirming baseline fitness gains, transition to targeted programs. Intensive muscle strengthening, body fat management, and posture correction. Mid-term blood tests verify progress.','Six months of data integrated and analyzed for precise program tuning. Nutrition and supplement adjustments, mental care introduction, and expanded concierge utilization.','Annual results compiled into a comprehensive report. Body composition, blood data, and subjective changes visualized. Next-year goals set and program redesigned.'];
        d.querySelectorAll('.m-journey-desc').forEach(function(e,i){if(jds[i])e.textContent=jds[i];});
        el=d.querySelector('.m-cta-text');if(el)el.textContent='For Those Considering Membership';
      } else {
        var el=d.querySelector('.method-hero-ja');if(el)el.textContent=o.hj;
        el=d.querySelector('.method-hero-lead');if(el)el.innerHTML=o.hl;
        d.querySelectorAll('.m-title-ja').forEach(function(e,i){if(o.tj[i]!==undefined)e.textContent=o.tj[i];});
        d.querySelectorAll('.m-body p').forEach(function(e,i){if(o.bp[i]!==undefined)e.innerHTML=o.bp[i];});
        d.querySelectorAll('.m-points li').forEach(function(e,i){if(o.pl[i]!==undefined)e.innerHTML=o.pl[i];});
        d.querySelectorAll('.m-voice-text').forEach(function(e,i){if(o.vt[i]!==undefined)e.textContent=o.vt[i];});
        d.querySelectorAll('.m-voice-role').forEach(function(e,i){if(o.vr[i]!==undefined)e.textContent=o.vr[i];});
        el=d.querySelector('.m-voice-note');if(el)el.textContent=o.vn;
        d.querySelectorAll('.m-journey-title').forEach(function(e,i){if(o.jt[i]!==undefined)e.textContent=o.jt[i];});
        d.querySelectorAll('.m-journey-desc').forEach(function(e,i){if(o.jd[i]!==undefined)e.textContent=o.jd[i];});
        el=d.querySelector('.m-cta-text');if(el)el.textContent=o.ct;
      }
      return;
    }

    // ═══ FOR MEMBERS ═══
    if (pageKey === 'for-members') {
      var d = document;
      if (!window._fmO) {
        window._fmO = {
          ht: (d.querySelector('.fm-hero-title')||{}).textContent||'',
          hl: (d.querySelector('.fm-hero-lead')||{}).innerHTML||'',
          ft: [].map.call(d.querySelectorAll('.fm-title'),function(e){return e.textContent;}),
          ctj: [].map.call(d.querySelectorAll('.fm-month-col-title-ja'),function(e){return e.textContent;}),
          mit: [].map.call(d.querySelectorAll('.fm-month-item-title'),function(e){return e.textContent;}),
          mid: [].map.call(d.querySelectorAll('.fm-month-item-date'),function(e){return e.textContent;}),
          csj: [].map.call(d.querySelectorAll('.fm-contact-sub-ja'),function(e){return e.textContent;}),
          dh: (d.querySelector('.fm-desk-hours')||{}).textContent||'',
          dal: [].map.call(d.querySelectorAll('.fm-desk-areas li'),function(e){return e.textContent;}),
          del_: [].map.call(d.querySelectorAll('.fm-desk-examples li'),function(e){return e.textContent;}),
          lf: (d.querySelector('.fm-login-forgot')||{}).innerHTML||'',
          gm: (d.querySelector('.fm-gate-message')||{}).textContent||'',
          gs: (d.querySelector('.fm-gate-sub')||{}).innerHTML||''
        };
      }
      var o = window._fmO;
      if (lang === 'en') {
        var el=d.querySelector('.fm-hero-title');if(el)el.textContent='For Members';
        el=d.querySelector('.fm-hero-lead');if(el)el.innerHTML='Thank you for choosing EXECUTIVE ASHIYA.<br>This is a members-only information page.';
        var fts=['This Month\'s Updates','Member Support'];
        d.querySelectorAll('.fm-title').forEach(function(e,i){if(fts[i])e.textContent=fts[i];});
        var ctjs=['Announcements','Events This Month','Exclusive Offers This Month'];
        d.querySelectorAll('.fm-month-col-title-ja').forEach(function(e,i){if(ctjs[i])e.textContent=ctjs[i];});
        var mits=['Members App Update','Monthly Conditioning Report','Private Session Event','Invited Guest Lecturer Seminar','Private Chef Special Arrangement','Premium Examination Package'];
        d.querySelectorAll('.fm-month-item-title').forEach(function(e,i){if(mits[i])e.textContent=mits[i];});
        var mids=['2026.05','2026.05','May 2026 (Scheduled)','Late May 2026 (Planned)','This Month Only','This Month Only'];
        d.querySelectorAll('.fm-month-item-date').forEach(function(e,i){if(mids[i])e.textContent=mids[i];});
        var csjs=['Concierge Desk','Member Login'];
        d.querySelectorAll('.fm-contact-sub-ja').forEach(function(e,i){if(csjs[i])e.textContent=csjs[i];});
        el=d.querySelector('.fm-desk-hours');if(el)el.textContent='Available 24/7 (immediate for emergencies, within 30 min for standard requests)';
        var dals=['Priority medical appointments & second opinion arrangements','International wellness retreat & health spa arrangements','Private chef & special dining arrangements','Travel & transportation (chauffeur, private jet)','Partner facility reservations & scheduling','All health & wellness consultations'];
        d.querySelectorAll('.fm-desk-areas li').forEach(function(e,i){if(dals[i])e.textContent=dals[i];});
        var dels=['Pre-trip health checkup and travel supplement arrangement','Anniversary dinner private chef + sommelier arrangement','Regenerative medicine clinic booking and pre-treatment conditioning'];
        d.querySelectorAll('.fm-desk-examples li').forEach(function(e,i){if(dels[i])e.textContent=dels[i];});
        el=d.querySelector('.fm-login-forgot');if(el)el.innerHTML='If you have forgotten your password, please contact the Concierge Desk.<br>We will reissue it after identity verification.';
        el=d.querySelector('.fm-gate-message');if(el)el.textContent='Members-Only Content';
        el=d.querySelector('.fm-gate-sub');if(el)el.innerHTML='This information is available to members only.<br>Please log in to access.';
      } else {
        var el=d.querySelector('.fm-hero-title');if(el)el.textContent=o.ht;
        el=d.querySelector('.fm-hero-lead');if(el)el.innerHTML=o.hl;
        d.querySelectorAll('.fm-title').forEach(function(e,i){if(o.ft[i]!==undefined)e.textContent=o.ft[i];});
        d.querySelectorAll('.fm-month-col-title-ja').forEach(function(e,i){if(o.ctj[i]!==undefined)e.textContent=o.ctj[i];});
        d.querySelectorAll('.fm-month-item-title').forEach(function(e,i){if(o.mit[i]!==undefined)e.textContent=o.mit[i];});
        d.querySelectorAll('.fm-month-item-date').forEach(function(e,i){if(o.mid[i]!==undefined)e.textContent=o.mid[i];});
        d.querySelectorAll('.fm-contact-sub-ja').forEach(function(e,i){if(o.csj[i]!==undefined)e.textContent=o.csj[i];});
        el=d.querySelector('.fm-desk-hours');if(el)el.textContent=o.dh;
        d.querySelectorAll('.fm-desk-areas li').forEach(function(e,i){if(o.dal[i]!==undefined)e.textContent=o.dal[i];});
        d.querySelectorAll('.fm-desk-examples li').forEach(function(e,i){if(o.del_[i]!==undefined)e.textContent=o.del_[i];});
        el=d.querySelector('.fm-login-forgot');if(el)el.innerHTML=o.lf;
        el=d.querySelector('.fm-gate-message');if(el)el.textContent=o.gm;
        el=d.querySelector('.fm-gate-sub');if(el)el.innerHTML=o.gs;
      }
      return;
    }

    // ═══ SCREENING ═══
    if (pageKey === 'screening') {
      var d = document;
      if (!window._scO) {
        window._scO = {
          pe: (d.getElementById('pw-error')||{}).textContent||'',
          st: (d.querySelector('.section-title')||{}).textContent||'',
          it: (d.querySelector('.intro-text')||{}).innerHTML||'',
          fl: [].map.call(d.querySelectorAll('.form-label'),function(e){return e.innerHTML;}),
          fn: [].map.call(d.querySelectorAll('.form-note'),function(e){return e.innerHTML;}),
          cb: [].map.call(d.querySelectorAll('.checkbox-item span'),function(e){return e.textContent;}),
          sn: (d.querySelector('.submit-note')||{}).innerHTML||'',
          sm: (d.getElementById('success-msg')||{}).innerHTML||'',
          ft: (d.querySelector('.footer-text')||{}).textContent||''
        };
      }
      var o = window._scO;
      if (lang === 'en') {
        var el=d.getElementById('pw-error');if(el)el.textContent='Incorrect access code';
        el=d.querySelector('.section-title');if(el)el.textContent='Screening Application Form';
        el=d.querySelector('.intro-text');if(el)el.innerHTML='This form is accessible only to those who have received an access code from us.<br>All information is strictly managed and used solely for screening purposes.<br>A representative will contact you within 3 business days after review.';
        var fls=['Basic Information<span class="required">Required</span>','Current Health Status<span class="required">Required</span>','Lifestyle','Visit Environment','Purpose of Use','Preferred Plan & Contract Type','Reason for Inquiry<span class="required">Required</span>','About Your Referrer'];
        d.querySelectorAll('.form-label').forEach(function(e,i){if(fls[i])e.innerHTML=fls[i];});
        var fns=['Please enter your name, age, title/position, and address.','Please describe your current health concerns or physical conditions.','Please tell us about your current lifestyle habits.','Please indicate training space availability at home/office, and preferred visit times.','Please select all that apply.','Please select your preferred plan and contract type.','Please describe in detail why you are inquiring about this service.<br>Your written response is the most important factor in the screening process.','Please fill in only if you were referred.'];
        d.querySelectorAll('.form-note').forEach(function(e,i){if(fns[i])e.innerHTML=fns[i];});
        var cbs=['Health Improvement','Performance Enhancement','Family/Partner Care','Life Optimization'];
        d.querySelectorAll('.checkbox-item span').forEach(function(e,i){if(cbs[i])e.textContent=cbs[i];});
        el=d.querySelector('.submit-note');if(el)el.innerHTML='A representative will contact you within 3 business days after submission.<br>All information is strictly managed and used solely for screening purposes.';
        el=d.querySelector('.footer-text');if(el)el.textContent='\u00a9 EXECUTIVE ASHIYA \u2014 ReFit, Inc. \u2014 CONFIDENTIAL';
      } else {
        var el=d.getElementById('pw-error');if(el)el.textContent=o.pe;
        el=d.querySelector('.section-title');if(el)el.textContent=o.st;
        el=d.querySelector('.intro-text');if(el)el.innerHTML=o.it;
        d.querySelectorAll('.form-label').forEach(function(e,i){if(o.fl[i]!==undefined)e.innerHTML=o.fl[i];});
        d.querySelectorAll('.form-note').forEach(function(e,i){if(o.fn[i]!==undefined)e.innerHTML=o.fn[i];});
        d.querySelectorAll('.checkbox-item span').forEach(function(e,i){if(o.cb[i]!==undefined)e.textContent=o.cb[i];});
        el=d.querySelector('.submit-note');if(el)el.innerHTML=o.sn;
        el=d.querySelector('.footer-text');if(el)el.textContent=o.ft;
      }
      return;
    }

    // ═══ INVITATION THANKS ═══
    if (pageKey === 'invitation-thanks') {
      var el = document.querySelector('.thanks-text');
      if (el) {
        if (!window._itO) window._itO = el.innerHTML;
        el.innerHTML = lang === 'en'
          ? 'Your request has been received.<br><br>Our service operates with limited annual capacity,<br>as we dedicate our finest resources to each member.<br>We may not be able to accommodate all requests.<br><br>After review, Representative Fukuda will<br>contact you directly within 2 business days.'
          : window._itO;
      }
      return;
    }
  }

  // Event listeners
  toggle.querySelectorAll('.ea-lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      switchLang(btn.getAttribute('data-lang'));
    });
  });

  // Restore saved language
  try {
    var saved = localStorage.getItem('ea-lang');
    if (saved === 'en') {
      setTimeout(function() { switchLang('en'); }, 100);
    }
  } catch(e) {}
})();
