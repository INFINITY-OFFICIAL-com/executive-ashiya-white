// ========== NAVIGATION SCROLL EFFECT ==========
const mainNav = document.getElementById('mainNav');

function handleNavScroll() {
    if (window.scrollY > 80) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== CAROUSEL FUNCTIONALITY ==========
function initCarousel(carouselId, progressBarId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const progressBar = document.getElementById(progressBarId);
    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');

    if (!track) return;

    const cards = track.children;
    const cardCount = cards.length;

    function updateProgress() {
        if (!progressBar) return;
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll <= 0) {
            progressBar.style.width = '100%';
            progressBar.style.left = '0';
            return;
        }
        const progress = scrollLeft / maxScroll;
        const barWidth = (1 / cardCount) * 100;
        const barLeft = progress * (100 - barWidth);
        progressBar.style.width = barWidth + '%';
        progressBar.style.left = barLeft + '%';
    }

    function scrollByCard(direction) {
        const cardWidth = cards[0].offsetWidth + 24; // card width + gap
        track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => scrollByCard(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => scrollByCard(1));
    }

    track.addEventListener('scroll', updateProgress, { passive: true });

    // Initial progress
    updateProgress();

    // Update on resize
    window.addEventListener('resize', updateProgress, { passive: true });
}

initCarousel('serviceCarousel', 'serviceProgressBar');
initCarousel('conciergeCarousel', 'conciergeProgressBar');

// ========== DETAIL MODAL ==========
function openDetail(id) {
    const panel = document.getElementById('detail-' + id);
    if (!panel) return;
    panel.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { panel.classList.add('open'); });
}

function closeDetail(e, force) {
    if (!force && e.target !== e.currentTarget) return;
    const panel = e.target.closest('.detail-modal');
    if (!panel || panel.classList.contains('closing')) return;
    panel.classList.add('closing');
    document.body.style.overflow = '';
    setTimeout(() => {
        panel.classList.remove('open', 'closing');
        panel.style.display = 'none';
    }, 300);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.detail-modal.open').forEach(p => {
            if (p.classList.contains('closing')) return;
            p.classList.add('closing');
            document.body.style.overflow = '';
            setTimeout(() => {
                p.classList.remove('open', 'closing');
                p.style.display = 'none';
            }, 300);
        });
    }
});

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

initScrollAnimations();

// ========== SMOOTH PARALLAX ON HERO ==========
function initHeroParallax() {
    const hero = document.getElementById('hero');
    const wrapper = hero ? hero.querySelector('.hero-video-wrapper') : null;

    if (!wrapper) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            wrapper.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    }, { passive: true });
}

initHeroParallax();

// ========== LANGUAGE TOGGLE ==========
var currentLang = 'ja';

var translations = {
    // Hero
    '.hero-brand-ja': { ja: 'エ グ ゼ ク テ ィ ブ 芦 屋', en: 'E X E C U T I V E  A S H I Y A' },
    '.hero-catch': { ja: '健康寿命を、生涯最大の資産に。', en: 'Your health span — your greatest lifelong asset.' },
    '.hero-cta-btn': { ja: 'ウェイティングリスト登録', en: 'Join Waiting List' },
    // Service Overview
    '.service-overview .section-heading': { ja: '身体の変化に、先手を打つ。', en: 'Stay ahead of your body\'s changes.' },
    '.service-overview .section-body': { ja: '多忙な日々のなかで、身体は静かに変化していきます。気づいたときには手遅れ——そうならないために、私たちは日常のコンディション管理に特化したサポートを提供しています。運動・栄養・休養の三本柱を軸に、各分野の専門家があなたの身体を総合的に評価。データに基づいたプログラムで、経営者の日常コンディションを長期的に守ります。', en: 'Your body changes quietly amid busy days. To prevent it from being too late when you notice, we provide support specialized in daily condition management. With exercise, nutrition, and rest as the three pillars, specialists in each field comprehensively evaluate your body. Data-driven programs protect executives\' daily conditioning long-term.' },
    // Service Program
    '#serviceProgram .section-heading': { ja: 'サービスプログラム', en: 'Service Program' },
    '#serviceProgram .section-intro': { ja: 'すべてのプログラムは、あなたの身体データ・生活リズム・目標に合わせて完全個別に設計。<br>運動・食事・コンディショニングを一体化し、日常のパフォーマンスを根本から変えていきます。', en: 'Every program is fully customized to your body data, lifestyle rhythm, and goals.<br>Integrating exercise, nutrition, and conditioning to fundamentally transform your daily performance.' },
    // Service Cards
    '.service-card:nth-child(1) .card-title': { ja: '運動プログラム', en: 'Training Program' },
    '.service-card:nth-child(1) .card-desc': { ja: 'あなたの身体に合わせた完全個別メニュー。可動域・筋力・姿勢を整え、日常の動きを変える。', en: 'A fully personalized menu tailored to your body. Improving mobility, strength, and posture to transform your daily movement.' },
    '.service-card:nth-child(2) .card-title': { ja: '栄養設計', en: 'Nutrition Design' },
    '.service-card:nth-child(2) .card-desc': { ja: '検査データをもとに組み立てるオーダーメイドの食事プラン。何を、いつ、どれだけ摂るかを設計。', en: 'A custom meal plan built from test data. Designing what, when, and how much to consume.' },
    '.service-card:nth-child(3) .card-title': { ja: 'コンディショニング', en: 'Conditioning' },
    '.service-card:nth-child(3) .card-desc': { ja: '疲労回復・可動域改善・自律神経の調整。忙しい日常のパフォーマンスを底上げする。', en: 'Fatigue recovery, mobility improvement, and autonomic nervous system regulation. Boosting your performance in busy daily life.' },
    '.btn-text-link:not(.light)': { ja: '詳しく見る', en: 'Learn more' },
    '.btn-text-link.light': { ja: '詳しく見る', en: 'Learn more' },
    // Member Invite
    '.member-invite .section-heading': { ja: '入会をお考えの方へ', en: 'For Prospective Members' },
    '.member-invite .section-body': { ja: '完全会員制のため、まずはウェイティングリストへのご登録をお願いしております。担当より2営業日以内にご連絡いたします。', en: 'As a fully members-only service, we ask that you first register on our waiting list. A representative will contact you within 2 business days.' },
    '.member-invite .btn-outline': { ja: 'ウェイティングリスト登録', en: 'Join Waiting List' },
    // Concierge
    '#conciergeServices .section-heading': { ja: '会員向け付帯サービス', en: 'Concierge Services' },
    '#conciergeServices .section-intro': { ja: 'メインプログラムに加え、会員の方には以下の情報提供・ご紹介サービスをご利用いただけます。サービスのご利用時は実費を申し受けます。', en: 'In addition to the main program, members can access the following information and referral services. Actual costs apply for service usage.' },
    '.concierge-card:nth-child(1) .dest-title': { ja: '医療情報のご案内', en: 'Medical Information' },
    '.concierge-card:nth-child(1) .dest-desc': { ja: '会員のご要望に応じた医療機関・専門家の情報提供。各種検査に関するご相談も承ります。', en: 'Providing information on medical institutions and specialists according to member requests. Consultations regarding various examinations are also available.' },
    '.concierge-card:nth-child(2) .dest-title': { ja: '美容・ボディケア', en: 'Aesthetic & Body Care' },
    '.concierge-card:nth-child(2) .dest-desc': { ja: '提携先の美容・ボディケアサービスのご紹介。ご希望に合わせた施設情報をご案内します。', en: 'Introduction to partnered aesthetic and body care services. We guide you to facilities matching your preferences.' },
    '.concierge-card:nth-child(3) .dest-title': { ja: '食・栄養', en: 'Culinary & Nutrition' },
    '.concierge-card:nth-child(3) .dest-desc': { ja: '提携レストランやパーソナルシェフのご紹介。栄養面を考慮した食の体験をご案内します。', en: 'Introduction to partnered restaurants and personal chefs. We guide you to culinary experiences with nutrition in mind.' },
    // Founder
    '.founder-label': { ja: 'FOUNDER', en: 'FOUNDER' },
    '#founder .section-heading': { ja: '代表挨拶', en: 'Founder\'s Message' },
    // Planning Guides
    '#planningGuides .section-heading': { ja: '入会までの流れ', en: 'Membership Process' },
    '#planningGuides .section-intro': { ja: '完全会員制のため、ご入会にはリクエストフォームからのお申し込みが必要です。', en: 'As a fully members-only service, applications must be submitted through the request form.' },
    '.guide-card:nth-child(1) .guide-title': { ja: 'ご入会リクエスト送信', en: 'Submit Membership Request' },
    '.guide-card:nth-child(1) .guide-desc': { ja: 'フォームよりお名前・必要事項をご記入ください。', en: 'Please fill in your name and required information via the form.' },
    '.guide-card:nth-child(2) .guide-title': { ja: '担当よりご連絡', en: 'Representative Contact' },
    '.guide-card:nth-child(2) .guide-desc': { ja: '2営業日以内にメールまたはお電話にてご連絡いたします。', en: 'We will contact you by email or phone within 2 business days.' },
    '.guide-card:nth-child(3) .guide-title': { ja: '詳細ヒアリング・ご提案', en: 'Consultation & Proposal' },
    '.guide-card:nth-child(3) .guide-desc': { ja: '健康目標・生活リズムをお伺いし、最適なプログラムをご提案します。', en: 'We listen to your health goals and lifestyle, then propose the optimal program.' },
    '.guide-card:nth-child(4) .guide-title': { ja: 'プログラム開始', en: 'Program Start' },
    '.guide-card:nth-child(4) .guide-desc': { ja: '初回セッション・各種データ測定からスタートします。', en: 'Starting with your first session and various data measurements.' },
    // Pricing
    '#pricingPlans .section-heading': { ja: '料金プラン', en: 'Pricing Plans' },
    '#pricingPlans .section-intro': { ja: 'すべてのプランは年間契約・完全出張型です。', en: 'All plans are annual contracts with full home-visit service.' },
    '.pricing-card.featured .pricing-plan-note': { ja: '初年度合計（入会金300万＋年会費900万・税込）', en: 'First year total (Enrollment ¥3M + Annual ¥9M, tax incl.)' },
    '.pricing-card:not(.featured) .pricing-plan-note': { ja: '初年度合計（入会金150万＋年会費600万・税込）', en: 'First year total (Enrollment ¥1.5M + Annual ¥6M, tax incl.)' },
    '.pricing-note': { ja: '※ 定員：年間最大5名 ／ 全スタッフNDA（秘密保持契約）締結 ／ 対応エリア：芦屋・西宮・神戸', en: '※ Capacity: max 5 clients/year ／ All staff under NDA ／ Areas: Ashiya, Nishinomiya, Kobe' },
    '.pricing-card.featured .pricing-plan-btn': { ja: 'ウェイティングリスト登録', en: 'Join Waiting List' },
    '.pricing-card:not(.featured) .pricing-plan-btn': { ja: 'ウェイティングリスト登録', en: 'Join Waiting List' },
    // Inline Form
    '#inlineForm .section-heading': { ja: 'ウェイティングリスト登録', en: 'Join Waiting List' },
    '#inlineForm .section-intro': { ja: '完全会員制のため、まずはウェイティングリストへのご登録をお願いしております。<br>担当より2営業日以内にご連絡いたします。', en: 'As a fully members-only service, we ask that you first register on our waiting list.<br>A representative will contact you within 2 business days.' },
    '#inline-submit-btn span': { ja: 'リクエストを送信する', en: 'Submit Request' },
    // CTA
    '.cta-heading': { ja: 'あなたの健康を、次のステージへ。', en: 'Take your health to the next stage.' },
    '.cta-body': { ja: 'すべては一通のリクエストから始まります。まずはお気軽にお問い合わせください。', en: 'Everything begins with a single request. Please feel free to reach out.' },
    '.btn-primary': { ja: 'ウェイティングリスト登録', en: 'Join Waiting List' },
    // Cookie
    // Footer
    '.footer-col:nth-child(1) h4': { ja: 'サービス', en: 'Services' },
    '.footer-col:nth-child(1) a:nth-child(2)': { ja: 'サービスプログラム', en: 'Service Program' },
    '.footer-col:nth-child(1) a:nth-child(3)': { ja: 'コンシェルジュ', en: 'Concierge' },
    '.footer-col:nth-child(1) a:nth-child(4)': { ja: '代表挨拶', en: 'Founder\'s Message' },
    '.footer-col:nth-child(2) h4': { ja: 'ご案内', en: 'Information' },
    '.footer-col:nth-child(2) a:nth-child(2)': { ja: '入会までの流れ', en: 'Membership Process' },
    '.footer-col:nth-child(2) a:nth-child(3)': { ja: 'お問い合わせ', en: 'Contact' },
    '.footer-col:nth-child(3) h4': { ja: '法的情報', en: 'Legal' },
    '.footer-col:nth-child(3) a:nth-child(2)': { ja: 'プライバシーポリシー', en: 'Privacy Policy' },
    '.footer-col:nth-child(3) a:nth-child(3)': { ja: '特定商取引法に基づく表記', en: 'Commercial Transaction Act' },
    '.footer-col:nth-child(3) a:nth-child(4)': { ja: '守秘について', en: 'Confidentiality' },
    '.footer-col:nth-child(3) a:nth-child(5)': { ja: '運営体制・サービス提供範囲', en: 'Operations & Service Scope' },
    '.footer-col:nth-child(4) h4': { ja: '運営', en: 'Company' },
    // Cookie
    '.cookie-text': { ja: '当サイトは、利便性向上のためにCookieを利用しています。「同意する」を選択すると使用に同意したことになります。Cookieはブラウザで制限／無効化できます。', en: 'This site uses cookies to improve usability. By selecting "Accept," you consent to their use. Cookies can be restricted or disabled in your browser.' },
    '.cookie-accept': { ja: '同意する', en: 'Accept' },
};

// Modal translations
var modalTranslations = {
    'detail-training': {
        num: '01', en: 'Personal Training',
        ja_title: 'パ ー ソ ナ ル ト レ ー ニ ン グ', en_title: 'P E R S O N A L  T R A I N I N G',
        ja_items: [
            '専属トレーナーがご自宅またはオフィスへ訪問。月2〜4回・各60〜90分の完全個別セッションを実施します',
            'お身体の状態を丁寧に評価し、筋力・柔軟性・姿勢の改善を目的としたプログラムをオーダーメイドで設計します',
            '体組成の定期測定により、変化を数値で確認。毎月レポートをお届けし、プログラムの見直しに活用します',
            'ゴルフ・テニス等のスポーツに必要な身体づくりにも対応。日常のパフォーマンス向上をサポートします'
        ],
        en_items: [
            'A dedicated trainer visits your home or office. 2-4 fully personalized 60-90 minute sessions per month',
            'We carefully assess your physical condition and design a custom program aimed at improving strength, flexibility, and posture',
            'Regular body composition measurements to track changes numerically. Monthly reports delivered and used to refine your program',
            'We also support physical conditioning for golf, tennis, and other sports. Enhancing your daily performance'
        ]
    },
    'detail-nutrition': {
        num: '02', en: 'Nutrition Design',
        ja_title: '栄 養 設 計', en_title: 'N U T R I T I O N  D E S I G N',
        ja_items: [
            'お身体の状態や生活リズムに合わせて、管理栄養士が個別の食事プランを作成します',
            '目標やお身体のデータに応じたサプリメントをご提案。毎月ご自宅へお届けします',
            '日々の食事内容を写真でフィードバック。月次レポートで振り返り、外食が多い方にも実践的な改善をご提案します',
            '減量・体力づくり・体調管理など、目標に合わせた献立を定期的に更新。ご家族の食事との両立もサポートします',
            'アレルギーや食事制限にも対応。出張先・旅行先での食事プランニングも承ります'
        ],
        en_items: [
            'A registered dietitian creates an individual meal plan tailored to your physical condition and lifestyle rhythm',
            'Supplements recommended based on your goals and body data. Delivered to your home monthly',
            'Daily meal content reviewed via photo feedback. Monthly reports with practical improvement suggestions, even for those who dine out frequently',
            'Menus regularly updated to match goals such as weight management, fitness building, and health maintenance. Family meal coordination also supported',
            'Accommodates allergies and dietary restrictions. Meal planning for business trips and travel also available'
        ]
    },
    'detail-conditioning': {
        num: '03', en: 'Conditioning',
        ja_title: 'コ ン デ ィ シ ョ ニ ン グ', en_title: 'C O N D I T I O N I N G',
        ja_items: [
            '理学療法士が、提携する整骨院・鍼灸院とも連携しながら、ストレッチや施術を組み合わせた身体のケアをご提供します',
            'トレーニング後の疲労をためないよう、筋肉や関節の違和感を早めにケア。次回セッションの質を高めます',
            'デスクワークによる肩こり・腰痛・姿勢の崩れに対して、運動と施術の両面からアプローチします',
            '出張や多忙な時期でも続けられるセルフケアメニューを動画付きでご提供します',
            '施術の予約代行からトレーニング内容の調整まで一括管理。担当者同士が情報を共有し、一貫したケアを行います'
        ],
        en_items: [
            'A physical therapist provides body care combining stretching and treatment, coordinating with partnered osteopathic and acupuncture clinics',
            'Early care for muscle and joint discomfort to prevent post-training fatigue accumulation. Enhancing the quality of your next session',
            'Addressing desk work-related stiff shoulders, lower back pain, and posture issues through both exercise and treatment',
            'Self-care menus with video guides that can be continued even during business trips or busy periods',
            'Centralized management from appointment booking to training adjustments. Staff share information to ensure consistent care'
        ]
    },
    'detail-medical': {
        num: '01', en: 'Medical Information',
        ja_title: '医 療 情 報 の ご 案 内', en_title: 'M E D I C A L  I N F O R M A T I O N',
        ja_items: [
            '会員のご希望に応じて、医療機関や専門家に関する情報をご提供します',
            '各種検査や受診に関するご相談を承り、適切な機関をご案内します',
            'ご予約の代行や日程調整など、受診に関する事務的なサポートを行います',
            '医療機関から共有いただいたデータをもとに、トレーナーが運動・栄養プログラムの調整に活用します'
        ],
        en_items: [
            'We provide information on medical institutions and specialists according to member requests',
            'We accept consultations regarding various examinations and guide you to appropriate institutions',
            'We handle administrative support for appointments including booking and scheduling',
            'Based on data shared from medical institutions, trainers utilize it to adjust exercise and nutrition programs'
        ],
        ja_note: '※ 当サービスは医療行為・診断・治療を行うものではありません。医療に関する最終的なご判断は、必ず医師等の専門家にご相談ください。情報提供およびご紹介は、医療法その他関連法令に基づき適切に行っております。',
        en_note: '※ This service does not provide medical practice, diagnosis, or treatment. Please always consult a qualified physician for final medical decisions. Information provision and referrals are conducted appropriately in accordance with the Medical Practitioners Act and other relevant laws.'
    },
    'detail-aesthetic': {
        num: '02', en: 'Aesthetic & Body Care',
        ja_title: '美 容 ・ ボ デ ィ ケ ア', en_title: 'A E S T H E T I C  &  B O D Y  C A R E',
        ja_items: [
            '芦屋・神戸・大阪の美容皮膚科・美容外科クリニックの優先予約代行。初回カウンセリングへのコンシェルジュ同行も可能',
            '会員のご希望に応じて、美容鍼・各種施術等を目的別にコーディネート',
            '国内外のプライベートスパ・リトリート施設（有馬・淡路・京都・沖縄等）の予約代行。ウェルネスプログラム付きステイのご提案',
            '経験10年以上のボディケアセラピスト（整体・アロマ・リンパドレナージュ）をご自宅・滞在先へ派遣。定期ケアスケジュールも設計',
            '専門家と連携し、体質・肌質・生活習慣に基づくスキンケア＋インナーケアの提案を一元設計'
        ],
        en_items: [
            'Priority booking at aesthetic dermatology and cosmetic surgery clinics in Ashiya, Kobe, and Osaka. Concierge accompaniment to initial consultations available',
            'Coordinating beauty acupuncture and various treatments by purpose according to member preferences',
            'Booking arrangements for private spas and retreat facilities (Arima, Awaji, Kyoto, Okinawa, etc.). Proposals for wellness program stays',
            'Dispatching body care therapists with 10+ years experience (chiropractic, aromatherapy, lymphatic drainage) to your home or accommodation. Regular care schedules also designed',
            'Working with specialists to provide integrated skincare and inner care proposals based on constitution, skin type, and lifestyle habits'
        ]
    },
    'detail-culinary': {
        num: '03', en: 'Culinary & Nutrition',
        ja_title: '食 ・ 栄 養', en_title: 'C U L I N A R Y  &  N U T R I T I O N',
        ja_items: [
            '関西のミシュラン星付きシェフ（日本料理・フレンチ・イタリアン）によるプライベートダイニングをご自宅へ。記念日・接待利用にも対応',
            '管理栄養士が体組成・生活リズムを踏まえ、減量・筋力増強・抗酸化等の目標別オーダーメイド献立を毎週更新',
            '全国の契約農家からのオーガニック食材、海外直輸入サプリメント（NMN・グルタチオン等）、機能性食品の調達をワンストップで代行',
            '神戸・大阪・京都の予約困難店・会員制レストランへの優先予約。ソムリエ手配やプライベートルームの確保も対応',
            'アレルギー・食事制限（グルテンフリー・ケトジェニック等）に対応した、国内外の旅行先での食事プランニング・レストランリサーチ'
        ],
        en_items: [
            'Private dining at your home by Michelin-starred chefs from Kansai (Japanese, French, Italian). Available for anniversaries and business entertainment',
            'A registered dietitian creates weekly custom menus for goals like weight management, strength building, and antioxidation based on body composition and lifestyle',
            'One-stop procurement of organic ingredients from contracted farms nationwide, directly imported supplements (NMN, Glutathione, etc.), and functional foods',
            'Priority reservations at exclusive and members-only restaurants in Kobe, Osaka, and Kyoto. Sommelier arrangements and private room bookings also handled',
            'Meal planning and restaurant research for domestic and international travel destinations accommodating allergies and dietary restrictions (gluten-free, ketogenic, etc.)'
        ]
    }
};

// Founder body translation
var founderBodyJa = '私が身体づくりの世界に踏み出した原点は、自分自身の変化でした。<span class="founder-num">5,000</span>名以上の方と向き合うなかで、知識やトレーニングだけでは届かない領域があることを知りました。経営の最前線に立つ方々が、判断力・集中力・体力のすべてを高い水準で保ち続けるために、本当に必要な仕組みとは何か。その問いへの答えとして、<span class="founder-brand">EXECUTIVE ASHIYA</span>を立ち上げました。';
var founderBodyEn = 'The starting point of my journey into physical wellness was my own transformation. Through working with over <span class="founder-num">5,000</span> individuals, I learned that knowledge and training alone cannot reach every domain. What systems are truly needed for those at the forefront of business to maintain high standards of judgment, focus, and physical strength? <span class="founder-brand">EXECUTIVE ASHIYA</span> was founded as my answer to that question.';

function switchLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;

    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update page text
    Object.keys(translations).forEach(function(selector) {
        var els = document.querySelectorAll(selector);
        els.forEach(function(el) {
            var text = translations[selector][lang];
            if (text) {
                if (text.indexOf('<') !== -1) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });
    });

    // Update founder body
    var founderBody = document.querySelector('.founder-body');
    if (founderBody) {
        founderBody.innerHTML = lang === 'ja' ? founderBodyJa : founderBodyEn;
    }

    // Update modals
    Object.keys(modalTranslations).forEach(function(id) {
        var modal = document.getElementById(id);
        if (!modal) return;
        var t = modalTranslations[id];
        var jaEl = modal.querySelector('.detail-ja');
        if (jaEl) jaEl.textContent = lang === 'ja' ? t.ja_title : t.en_title;
        var items = modal.querySelectorAll('.detail-list li');
        var itemTexts = lang === 'ja' ? t.ja_items : t.en_items;
        items.forEach(function(li, i) {
            if (itemTexts[i]) li.textContent = itemTexts[i];
        });
        var note = modal.querySelector('.detail-note');
        if (note && t.ja_note) {
            note.textContent = lang === 'ja' ? t.ja_note : t.en_note;
        }
    });

    // Update inline form labels, placeholders, and consent
    var formLabels = {
        'if-name':    { ja: '氏名',            en: 'Full Name' },
        'if-email':   { ja: 'メールアドレス',   en: 'Email Address' },
        'if-phone':   { ja: '電話番号',         en: 'Phone Number' },
        'if-area':    { ja: '居住エリア',       en: 'Area of Residence' },
        'if-message': { ja: 'ご要望',           en: 'Message' },
        'if-referrer': { ja: 'ご紹介者名',      en: 'Referrer Name' }
    };
    var formPlaceholders = {
        'if-name':     { ja: '山田 太郎',                          en: 'Taro Yamada' },
        'if-email':    { ja: 'your@email.com',                     en: 'your@email.com' },
        'if-phone':    { ja: '090-1234-5678',                      en: '090-1234-5678' },
        'if-message':  { ja: 'お気軽にご記入ください（任意）',       en: 'Please feel free to write (optional)' },
        'if-referrer': { ja: 'ご紹介者がいる場合のみ（任意）',       en: 'Only if you have a referrer (optional)' }
    };
    Object.keys(formLabels).forEach(function(id) {
        var input = document.getElementById(id);
        if (!input) return;
        var label = document.querySelector('label[for="' + id + '"]');
        if (label) {
            var reqSpan = label.querySelector('.inline-required');
            label.textContent = formLabels[id][lang];
            if (reqSpan) {
                reqSpan.textContent = lang === 'ja' ? '必須' : 'Required';
                label.appendChild(reqSpan);
            }
        }
        if (formPlaceholders[id]) {
            input.placeholder = formPlaceholders[id][lang];
        }
    });

    // Update select options
    var areaSelect = document.getElementById('if-area');
    if (areaSelect) {
        var areaOptions = {
            ja: ['選択してください', '芦屋市', '西宮市', '宝塚市', '神戸市', '大阪府', '京都府', '関東', 'その他'],
            en: ['Please select', 'Ashiya', 'Nishinomiya', 'Takarazuka', 'Kobe', 'Osaka', 'Kyoto', 'Kanto', 'Other']
        };
        var opts = areaSelect.querySelectorAll('option');
        opts.forEach(function(opt, i) {
            if (areaOptions[lang][i]) opt.textContent = areaOptions[lang][i];
        });
    }

    // Update consent text
    var consentLabel = document.querySelector('.inline-form-checkbox span');
    if (consentLabel) {
        if (lang === 'ja') {
            consentLabel.innerHTML = 'ご登録内容は厳重に管理し、ご入会に関するご案内以外の目的には使用いたしません。<a href="./privacy.html">プライバシーポリシー</a>に同意のうえ、登録します。';
        } else {
            consentLabel.innerHTML = 'Your information will be strictly managed and will not be used for purposes other than membership inquiries. I agree to the <a href="./privacy.html">Privacy Policy</a> and register.';
        }
    }

    // Update pricing plan list items
    var platinumItems = {
        ja: [
            '月4回パーソナルセッション（各60〜90分）',
            'フルオーダー食事管理',
            'オーダーメイドサプリメント設計',
            '理学療法士によるコンディショニング',
            '体組成データ測定・月次レポート',
            '提携医療機関のご紹介',
            'コンシェルジュサービス 対応回数無制限',
            '提携ホテルでのウェルネスセッション（年4回）',
            '国内出張同行',
            'メンバーズウェルカムギフト'
        ],
        en: [
            '4 personal sessions/month (60-90 min each)',
            'Fully customized meal management',
            'Custom supplement design',
            'Conditioning by physical therapist',
            'Body composition measurement & monthly report',
            'Referral to partnered medical institutions',
            'Concierge service — unlimited requests',
            'Wellness sessions at partnered hotels (4x/year)',
            'Domestic business trip accompaniment',
            'Members welcome gift'
        ]
    };
    var executiveItems = {
        ja: [
            '月2回パーソナルセッション（各60〜90分）',
            '週次食事ガイド＋月1回栄養カウンセリング',
            '理学療法士によるコンディショニング',
            '体組成データ測定・月次レポート',
            '提携医療機関のご紹介',
            'コンシェルジュサービス 対応回数無制限',
            'メンバーズウェルカムギフト'
        ],
        en: [
            '2 personal sessions/month (60-90 min each)',
            'Weekly meal guide + monthly nutrition counseling',
            'Conditioning by physical therapist',
            'Body composition measurement & monthly report',
            'Referral to partnered medical institutions',
            'Concierge service — unlimited requests',
            'Members welcome gift'
        ]
    };
    var featuredCard = document.querySelector('.pricing-card.featured .pricing-plan-list');
    if (featuredCard) {
        var lis = featuredCard.querySelectorAll('li');
        lis.forEach(function(li, i) {
            if (platinumItems[lang][i]) li.textContent = platinumItems[lang][i];
        });
    }
    var execCard = document.querySelector('.pricing-card:not(.featured) .pricing-plan-list');
    if (execCard) {
        var lis2 = execCard.querySelectorAll('li');
        lis2.forEach(function(li, i) {
            if (executiveItems[lang][i]) li.textContent = executiveItems[lang][i];
        });
    }

    // Update pricing notes (both)
    var pricingNotes = document.querySelectorAll('.pricing-note');
    var notesJa = [
        '※ 全スタッフNDA（秘密保持契約）締結 ／ 対応エリア：芦屋・西宮・神戸',
        '※ 「提携医療機関のご紹介」は情報提供および予約代行であり、当サービスが医療行為・診断・治療を行うものではありません。「オーダーメイドサプリメント設計」は医薬品の処方ではなく、栄養学に基づく食品としてのサプリメントのご提案です。'
    ];
    var notesEn = [
        '※ All staff under NDA ／ Areas: Ashiya, Nishinomiya, Kobe',
        '※ "Referral to partnered medical institutions" is information provision and appointment booking; this service does not provide medical practice, diagnosis, or treatment. "Custom supplement design" is not pharmaceutical prescription but a nutrition-based dietary supplement proposal.'
    ];
    pricingNotes.forEach(function(note, i) {
        if (lang === 'ja' && notesJa[i]) note.textContent = notesJa[i];
        if (lang === 'en' && notesEn[i]) note.textContent = notesEn[i];
    });

    // Update HTML lang attribute & persist preference
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
    try { localStorage.setItem('ea_lang', lang); } catch(e) {}
}

// Bind toggle buttons
document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        switchLang(this.dataset.lang);
    });
});

// ========== INLINE FORM ==========
(function() {
    var loadedAt = document.getElementById('inline-form-loaded-at');
    if (loadedAt) loadedAt.value = Date.now().toString();

    var form = document.getElementById('inline-invitation-form');
    var submitBtn = document.getElementById('inline-submit-btn');
    if (!form || !submitBtn) return;

    var isSubmitting = false;
    form.addEventListener('submit', function(e) {
        if (isSubmitting) { e.preventDefault(); return; }
        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = '送信中…';
    });
})();

// ========== COOKIE CONSENT ==========
(function() {
    const banner = document.getElementById('cookieConsent');
    const btn = document.getElementById('cookieAccept');
    if (!banner || !btn) return;

    if (localStorage.getItem('cookie_consent') === 'accepted') {
        banner.style.display = 'none';
        return;
    }

    btn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        banner.classList.add('hidden');
        setTimeout(() => { banner.style.display = 'none'; }, 300);
    });
})();
