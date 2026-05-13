// Netlify Function: submission-created
// Triggered automatically when a Netlify Form receives a submission.
// Sends auto-reply email to customer + internal notification to owner.

exports.handler = async function (event) {
  const payload = JSON.parse(event.body).payload;

  // Route to appropriate handler
  if (payload.form_name === 'press-inquiry') {
    return handlePressInquiry(payload);
  }
  if (payload.form_name !== 'invitation-request') {
    return { statusCode: 200, body: 'Skipped: unknown form' };
  }

  // Time-based spam check: reject if submitted < 3s after page load
  const loadedAt = parseInt(payload.data['form-loaded-at'] || '0', 10);
  const submittedAt = payload.created_at
    ? new Date(payload.created_at).getTime()
    : Date.now();
  if (loadedAt > 0 && submittedAt - loadedAt < 3000) {
    console.log('Spam detected: submission too fast');
    return { statusCode: 200, body: 'Spam rejected' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return { statusCode: 500, body: 'Missing API key' };
  }

  const FROM_EMAIL = 'info@executive-ashiya.com';
  const FROM_NAME = 'Executive Ashiya 代表 福田泰士';

  const name = payload.data['氏名'] || '';
  const gender = payload.data['性別'] || '';
  const email = payload.data['メールアドレス'] || '';
  const phone = payload.data['電話番号'] || '';
  const area = payload.data['居住エリア'] || '';
  const health = payload.data['健康上の課題'] || '';
  const submittedDate = payload.created_at || new Date().toISOString();

  // ─── Auto-reply to customer ───
  const autoReplyHtml = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <div style="max-width:600px;margin:0 auto;font-family:'Noto Serif JP','Yu Mincho',Georgia,serif;color:#1C1F2E;line-height:2.2;">
    <div style="text-align:center;padding:3rem 2rem 2rem;border-bottom:1px solid rgba(28,31,46,0.13);">
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;letter-spacing:0.4em;color:#8B6F1F;margin:0;">EXECUTIVE ASHIYA</p>
    </div>
    <div style="padding:2.5rem 2rem;">
      <p style="font-size:14px;margin-bottom:2rem;">${name} 様</p>
      <p style="font-size:13px;color:rgba(28,31,46,0.68);line-height:2.4;">
        この度は Executive Ashiya へ関心をお寄せいただき、誠にありがとうございます。<br><br>
        お預かりしたご相談内容につきまして、弊社のチームが最適なアプローチをご提供できるか、慎重に確認させていただきます。<br><br>
        2営業日以内に、代表・福田より直接ご連絡を差し上げます。
      </p>
      <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(28,31,46,0.13);text-align:center;">
        <p style="font-size:12px;color:rgba(28,31,46,0.4);line-height:2;">
          Executive Ashiya<br>
          代表 福田泰士<br><br>
          <a href="https://executive-ashiya.com" style="color:#8B6F1F;text-decoration:none;letter-spacing:0.15em;font-size:11px;">executive-ashiya.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

  // ─── Internal notification ───
  const notificationHtml = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:2rem;font-family:sans-serif;color:#1C1F2E;">
  <h2 style="font-size:18px;margin-bottom:1.5rem;color:#8B6F1F;">新規ご入会リクエスト</h2>
  <table style="border-collapse:collapse;width:100%;max-width:600px;font-size:14px;">
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;width:140px;">氏名</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${name}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">性別</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${gender}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">メールアドレス</td>
      <td style="padding:10px 14px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">電話番号</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${phone}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">居住エリア</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${area}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">健康上の課題</td>
      <td style="padding:10px 14px;border:1px solid #ddd;white-space:pre-wrap;">${health}</td>
    </tr>
  </table>
  <p style="font-size:12px;color:#888;margin-top:2rem;">送信日時: ${submittedDate}</p>
</body>
</html>`;

  try {
    // Send auto-reply to customer
    const replyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: '【Executive Ashiya】リクエスト受理のご連絡',
        html: autoReplyHtml,
      }),
    });

    if (!replyRes.ok) {
      console.error('Auto-reply failed:', await replyRes.text());
    }

    // Send internal notification
    const notifRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [FROM_EMAIL],
        subject: `【EA新規リクエスト】${name} 様 / ${area}`,
        html: notificationHtml,
      }),
    });

    if (!notifRes.ok) {
      console.error('Notification failed:', await notifRes.text());
    }

    return { statusCode: 200, body: 'Emails sent successfully' };
  } catch (error) {
    console.error('Email send error:', error);
    return { statusCode: 500, body: 'Email send failed' };
  }
};

// ─── Press Inquiry Handler ───
async function handlePressInquiry(payload) {
  const loadedAt = parseInt(payload.data['form-loaded-at'] || '0', 10);
  const submittedAt = payload.created_at
    ? new Date(payload.created_at).getTime()
    : Date.now();
  if (loadedAt > 0 && submittedAt - loadedAt < 3000) {
    console.log('Spam detected: press inquiry too fast');
    return { statusCode: 200, body: 'Spam rejected' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return { statusCode: 500, body: 'Missing API key' };
  }

  const FROM_EMAIL = 'info@executive-ashiya.com';
  const FROM_NAME = 'Executive Ashiya';

  const category = payload.data['お問い合わせ種別'] || '';
  const company = payload.data['会社名・媒体名'] || '（未記入）';
  const name = payload.data['お名前'] || '';
  const email = payload.data['メールアドレス'] || '';
  const phone = payload.data['電話番号'] || '（未記入）';
  const message = payload.data['お問い合わせ内容'] || '';
  const submittedDate = payload.created_at || new Date().toISOString();

  // Auto-reply to inquirer
  const autoReplyHtml = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <div style="max-width:600px;margin:0 auto;font-family:'Noto Serif JP','Yu Mincho',Georgia,serif;color:#1C1F2E;line-height:2.2;">
    <div style="text-align:center;padding:3rem 2rem 2rem;border-bottom:1px solid rgba(28,31,46,0.13);">
      <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;letter-spacing:0.4em;color:#8B6F1F;margin:0;">EXECUTIVE ASHIYA</p>
    </div>
    <div style="padding:2.5rem 2rem;">
      <p style="font-size:14px;margin-bottom:2rem;">${name} 様</p>
      <p style="font-size:13px;color:rgba(28,31,46,0.68);line-height:2.4;">
        この度はお問い合わせいただき、誠にありがとうございます。<br><br>
        お預かりした内容を確認のうえ、担当者より折り返しご連絡差し上げます。<br>
        2営業日以内にご返信いたします。
      </p>
      <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(28,31,46,0.13);text-align:center;">
        <p style="font-size:12px;color:rgba(28,31,46,0.4);line-height:2;">
          Executive Ashiya<br><br>
          <a href="https://executive-ashiya.com" style="color:#8B6F1F;text-decoration:none;letter-spacing:0.15em;font-size:11px;">executive-ashiya.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

  // Internal notification
  const notificationHtml = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:2rem;font-family:sans-serif;color:#1C1F2E;">
  <h2 style="font-size:18px;margin-bottom:1.5rem;color:#8B6F1F;">取材・メディアお問い合わせ</h2>
  <table style="border-collapse:collapse;width:100%;max-width:600px;font-size:14px;">
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;width:140px;">種別</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${category}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">会社名・媒体名</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${company}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">お名前</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${name}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">メールアドレス</td>
      <td style="padding:10px 14px;border:1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">電話番号</td>
      <td style="padding:10px 14px;border:1px solid #ddd;">${phone}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid #ddd;font-weight:bold;background:#f9f9f7;">お問い合わせ内容</td>
      <td style="padding:10px 14px;border:1px solid #ddd;white-space:pre-wrap;">${message}</td>
    </tr>
  </table>
  <p style="font-size:12px;color:#888;margin-top:2rem;">送信日時: ${submittedDate}</p>
</body>
</html>`;

  try {
    // Auto-reply
    const replyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        subject: '【Executive Ashiya】お問い合わせ受付のご連絡',
        html: autoReplyHtml,
      }),
    });
    if (!replyRes.ok) console.error('Press auto-reply failed:', await replyRes.text());

    // Internal notification
    const notifRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [FROM_EMAIL],
        subject: `【EA取材依頼】${company} / ${name} 様`,
        html: notificationHtml,
      }),
    });
    if (!notifRes.ok) console.error('Press notification failed:', await notifRes.text());

    return { statusCode: 200, body: 'Press inquiry emails sent' };
  } catch (error) {
    console.error('Press inquiry email error:', error);
    return { statusCode: 500, body: 'Email send failed' };
  }
}
