const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 72, bottom: 72, left: 60, right: 60 },
  info: {
    Title: '福田泰士 プロフィール | EXECUTIVE ASHIYA',
    Author: 'EXECUTIVE ASHIYA',
    Subject: '代表プロフィール'
  }
});

const output = fs.createWriteStream(path.join(__dirname, 'fukuda-taishi-profile.pdf'));
doc.pipe(output);

const fontRegular = 'C:/Windows/Fonts/yumin.ttf';
const fontBold = 'C:/Windows/Fonts/yumindb.ttf';
const fontLight = 'C:/Windows/Fonts/yuminl.ttf';

// Colors
const gold = '#8B6F1F';
const ink = '#1C1F2E';
const inkSoft = '#4A4D5A';
const cream = '#FDFBF7';
const goldLine = '#D4BC6A';

// ═══ PAGE BACKGROUND ═══
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#FFFFFF');

// ═══ TOP GOLD LINE ═══
doc.rect(0, 0, doc.page.width, 3).fill(gold);

// ═══ HEADER AREA ═══
const headerY = 50;

doc.font(fontLight)
   .fontSize(8)
   .fillColor(gold)
   .text('EXECUTIVE ASHIYA', 60, headerY, { characterSpacing: 3 });

doc.font(fontLight)
   .fontSize(6.5)
   .fillColor('#999999')
   .text('Press Kit — Founder Profile', 60, headerY + 16, { characterSpacing: 1.5 });

// Gold accent line under header
doc.moveTo(60, headerY + 38)
   .lineTo(doc.page.width - 60, headerY + 38)
   .strokeColor('#E8E0D0')
   .lineWidth(0.5)
   .stroke();

// ═══ NAME SECTION ═══
const nameY = 130;

doc.font(fontRegular)
   .fontSize(22)
   .fillColor(ink)
   .text('福田 泰士', 60, nameY);

doc.font(fontLight)
   .fontSize(9)
   .fillColor(gold)
   .text('TAISHI FUKUDA', 60, nameY + 34, { characterSpacing: 2.5 });

doc.font(fontRegular)
   .fontSize(9.5)
   .fillColor(inkSoft)
   .text('株式会社ReFit 代表取締役', 60, nameY + 56);

// Divider
doc.moveTo(60, nameY + 80)
   .lineTo(100, nameY + 80)
   .strokeColor(gold)
   .lineWidth(1)
   .stroke();

// ═══ PROFILE SECTION ═══
const profileY = nameY + 105;

doc.font(fontLight)
   .fontSize(7)
   .fillColor(gold)
   .text('PROFILE', 60, profileY, { characterSpacing: 2 });

const bioStartY = profileY + 25;

doc.font(fontRegular)
   .fontSize(9)
   .fillColor(inkSoft)
   .text(
     '2004年11月23日生まれ、福岡県出身。\n福岡県立東筑高等学校（北九州市）を経て、2023年4月に関西学院大学社会学部に入学。在学中。',
     60, bioStartY, { width: doc.page.width - 120, lineGap: 8 }
   );

const bio2Y = bioStartY + 65;
doc.font(fontRegular)
   .fontSize(9)
   .fillColor(inkSoft)
   .text(
     '大学入学前、50kg台という細身の体格に強いコンプレックスを抱える中、身体を変えるべく1日6時間のトレーニングと徹底した食事管理を継続し、1年間で30kgの増量を果たす。この経験から得た「身体が変わると、人生が変わる」という確信を一人でも多くの人に届けたいという想いから、大学2年時に個人事業として起業。',
     60, bio2Y, { width: doc.page.width - 120, lineGap: 8 }
   );

const bio3Y = bio2Y + 95;
doc.font(fontRegular)
   .fontSize(9)
   .fillColor(inkSoft)
   .text(
     '「パーソナルジムSUN」を兵庫県内に3店舗展開するほか、LINEベースのオンライン食事指導サービス「ReFit Online」を立ち上げ、累計5,000名以上の身体と人生に向き合ってきた。2026年3月13日に株式会社ReFitを設立し、代表取締役に就任。同年6月、芦屋エリアの超富裕層を対象とした日本最高額（2026年4月当社調べ）・年間1,200万円の会員制ヘルスケアサービス「Executive Ashiya」を開始。',
     60, bio3Y, { width: doc.page.width - 120, lineGap: 8 }
   );

// ═══ BUSINESS SECTION ═══
const bizY = bio3Y + 115;

// Line separator
doc.moveTo(60, bizY)
   .lineTo(doc.page.width - 60, bizY)
   .strokeColor('#E8E0D0')
   .lineWidth(0.5)
   .stroke();

const bizTitleY = bizY + 20;
doc.font(fontLight)
   .fontSize(7)
   .fillColor(gold)
   .text('BUSINESS', 60, bizTitleY, { characterSpacing: 2 });

const bizListY = bizTitleY + 28;
const bizItems = [
  { name: 'パーソナルジムSUN', desc: '兵庫県内3店舗', url: 'https://sun-personalgym.com/' },
  { name: 'ReFit Online', desc: 'オンライン食事指導', url: 'https://refit-online.com/' },
  { name: 'Executive Ashiya', desc: '超富裕層向け会員制ヘルスケア', url: 'https://executive-ashiya.com' },
];

let currentY = bizListY;
bizItems.forEach((item, i) => {
  doc.font(fontBold)
     .fontSize(9)
     .fillColor(ink)
     .text(item.name, 60, currentY);

  doc.font(fontRegular)
     .fontSize(8)
     .fillColor(inkSoft)
     .text(`（${item.desc}）`, 60 + doc.widthOfString(item.name, { fontSize: 9 }) + 8, currentY + 1);

  doc.font(fontLight)
     .fontSize(7.5)
     .fillColor(gold)
     .text(item.url, 60, currentY + 18);

  currentY += 42;
});

// ═══ CONTACT SECTION ═══
const contactY = currentY + 20;

doc.moveTo(60, contactY)
   .lineTo(doc.page.width - 60, contactY)
   .strokeColor('#E8E0D0')
   .lineWidth(0.5)
   .stroke();

const contactTitleY = contactY + 20;
doc.font(fontLight)
   .fontSize(7)
   .fillColor(gold)
   .text('CONTACT', 60, contactTitleY, { characterSpacing: 2 });

const contactInfoY = contactTitleY + 25;
doc.font(fontRegular)
   .fontSize(9)
   .fillColor(inkSoft)
   .text(
     '株式会社ReFit\n〒530-0001 大阪府大阪市北区梅田1-1-3 大阪駅前第3ビル29階\nTEL: 080-7690-5653\nMail: info@executive-ashiya.com\nWeb: https://executive-ashiya.com',
     60, contactInfoY, { width: doc.page.width - 120, lineGap: 6 }
   );

// ═══ FOOTER ═══
const footerY = doc.page.height - 50;

doc.moveTo(60, footerY - 15)
   .lineTo(doc.page.width - 60, footerY - 15)
   .strokeColor('#E8E0D0')
   .lineWidth(0.3)
   .stroke();

doc.font(fontLight)
   .fontSize(6)
   .fillColor('#AAAAAA')
   .text('© 2025 EXECUTIVE ASHIYA / ReFit Inc.', 60, footerY, { align: 'center', width: doc.page.width - 120 });

// ═══ BOTTOM GOLD LINE ═══
doc.rect(0, doc.page.height - 3, doc.page.width, 3).fill(gold);

doc.end();

output.on('finish', () => {
  console.log('PDF generated: fukuda-taishi-profile.pdf');
});
