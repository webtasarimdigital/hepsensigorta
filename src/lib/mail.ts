import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/constants/siteConfig";

export interface LeadMailData {
  service: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  preferredContact?: string;
  message?: string;
}

export async function sendLeadNotificationEmail(data: LeadMailData): Promise<boolean> {
  const adminEmails = process.env.ADMIN_NOTIFICATION_EMAILS || `${SITE_CONFIG.emailPrimary}, ${SITE_CONFIG.emailContact}`;
  const subject = `[Yeni Teklif Talebi] ${data.service} - ${data.fullName}`;

  const cleanPhone = data.phone.replace(/\D/g, "");
  const waUrl = `https://wa.me/90${cleanPhone.startsWith("0") ? cleanPhone.slice(1) : cleanPhone}`;
  const callUrl = `tel:${data.phone}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #0B1F3A; padding: 28px 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #50C878; margin: 6px 0 0 0; font-size: 13px; font-weight: 500; }
    .content { padding: 32px 24px; }
    .badge { display: inline-block; background-color: #ecfdf5; color: #047857; font-weight: 600; padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .info-table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .info-table td.label { font-weight: 600; color: #64748b; width: 35%; background: #f8fafc; }
    .actions { display: flex; gap: 12px; margin-top: 24px; }
    .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center; }
    .btn-green { background-color: #22C55E; color: #ffffff; }
    .btn-navy { background-color: #0B1F3A; color: #ffffff; }
    .footer { background: #f8fafc; padding: 16px 24px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HEPSEN SİGORTA</h1>
      <p>Yeni Web Teklif Bildirimi</p>
    </div>
    <div class="content">
      <span class="badge">Talep: ${data.service}</span>
      <table class="info-table">
        <tr>
          <td class="label">Ad Soyad</td>
          <td><strong>${data.fullName}</strong></td>
        </tr>
        <tr>
          <td class="label">Telefon</td>
          <td><a href="${callUrl}">${data.phone}</a></td>
        </tr>
        <tr>
          <td class="label">E-posta</td>
          <td>${data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : "Belirtilmedi"}</td>
        </tr>
        <tr>
          <td class="label">Şehir</td>
          <td>${data.city || "Belirtilmedi"}</td>
        </tr>
        <tr>
          <td class="label">İletişim Tercihi</td>
          <td>${data.preferredContact || "Telefon"}</td>
        </tr>
        <tr>
          <td class="label">Not / Mesaj</td>
          <td>${data.message || "Özel bir not belirtilmedi."}</td>
        </tr>
        <tr>
          <td class="label">Tarih</td>
          <td>${new Date().toLocaleString("tr-TR")}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; text-align: center;">
        <a href="${waUrl}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin-right: 8px;">WhatsApp'tan Yanıtla</a>
        <a href="${callUrl}" style="background-color: #0B1F3A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Telefonla Ara</a>
      </div>
    </div>
    <div class="footer">
      Bu e-posta hepsensigorta.com web sitesi hızlı teklif formu üzerinden otomatik olarak gönderilmiştir.
    </div>
  </div>
</body>
</html>
  `;

  // Check if SMTP is configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM || `Hepsen Sigorta <${SITE_CONFIG.emailContact}>`,
        to: adminEmails,
        subject,
        html: htmlContent,
      });

      return true;
    } catch (err) {
      console.error("[Mail Error] SMTP send failed:", err);
      return false;
    }
  }

  // If no SMTP configured, log in development mode
  console.log("------------------------------------------");
  console.log(`[DEV EMAIL SIMULATION] To: ${adminEmails}`);
  console.log(`Subject: ${subject}`);
  console.log(`Lead Data:`, data);
  console.log("------------------------------------------");
  return true;
}
