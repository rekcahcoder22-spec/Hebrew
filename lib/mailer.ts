/*
  GMAIL APP PASSWORD SETUP (required):

  1. Go to: https://myaccount.google.com/security
  2. Enable "2-Step Verification" if not already on
  3. Go to: https://myaccount.google.com/apppasswords
  4. Select app: "Mail"
  5. Select device: "Other" → type "HEBREW Store"
  6. Click Generate → copy the 16-character password
  7. Paste into .env.local as GMAIL_APP_PASSWORD

  TEST THE EMAIL SETUP:
  → npm run dev
  → Open: http://localhost:3000/api/test-email
  → Check inbox of rekcahcoder22@gmail.com and mamdung1001@gmail.com

  COMMON ERRORS:
  - "Invalid login": App Password is wrong or 2FA not enabled
  - "Username and Password not accepted": Need App Password, not Gmail password
  - "Connection timeout": Check internet, try again
  - Email goes to SPAM: Normal for first sends, mark as "Not Spam"

  PRODUCTION (Vercel):
  Add these in Vercel Dashboard → Settings → Environment Variables:
    GMAIL_USER
    GMAIL_APP_PASSWORD
    ADMIN_EMAIL_1
    ADMIN_EMAIL_2
    STORE_NAME
    STORE_URL

  DELETE app/api/test-email/route.ts before production deploy.
*/

import nodemailer from "nodemailer";
import type { Order } from "@/types";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const hasGmailAuth =
  typeof process.env.GMAIL_USER === "string" &&
  process.env.GMAIL_USER.length > 0 &&
  typeof process.env.GMAIL_APP_PASSWORD === "string" &&
  process.env.GMAIL_APP_PASSWORD.length > 0;

const transporter = hasGmailAuth
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : null;

if (transporter) {
  transporter.verify((error) => {
    if (error) {
      console.error("❌ Mailer connection failed:", error);
    } else {
      console.log("✅ Mailer ready");
    }
  });
}

function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getShippingMethodLabel(method: string): string {
  const map: Record<string, string> = {
    standard: "Giao hàng tiêu chuẩn (3-5 ngày)",
    express: "Giao hàng nhanh (1-2 ngày)",
    pickup: "Nhận tại cửa hàng",
  };
  return map[method] ?? method;
}

function buildAdminEmailHTML(order: Order): string {
  const storeName = escapeHtml(process.env.STORE_NAME ?? "HEBREW");
  const storeUrlRaw = process.env.STORE_URL ?? "https://hebrewstore.com";
  const adminOrdersUrl = `${storeUrlRaw.replace(/\/$/, "")}/admin/orders`;
  const adminOrdersHref = escapeHtml(adminOrdersUrl);

  const itemRows = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #2A2A2A;
                 font-family:monospace;font-size:13px;color:#F0EDE6;">
        ${escapeHtml(item.name)}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #2A2A2A;
                 font-family:monospace;font-size:13px;color:#888;
                 text-align:center;">
        ${escapeHtml(item.size)}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #2A2A2A;
                 font-family:monospace;font-size:13px;color:#888;
                 text-align:center;">
        ${item.quantity}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #2A2A2A;
                 font-family:monospace;font-size:13px;color:#B8963E;
                 text-align:right;">
        ${formatVND(item.price * item.quantity)}
      </td>
    </tr>
  `,
    )
    .join("");

  const noteBlock =
    order.customer.note && order.customer.note.trim()
      ? `
              <div style="margin-top:16px;padding:12px 16px;
                          background:#080808;border-left:2px solid #C0392B;">
                <div style="font-family:monospace;font-size:9px;
                            color:#555;letter-spacing:2px;
                            text-transform:uppercase;margin-bottom:6px;">
                  GHI CHÚ
                </div>
                <div style="font-family:monospace;font-size:12px;color:#888;">
                  ${escapeHtml(order.customer.note.trim())}
                </div>
              </div>`
      : "";

  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Đơn hàng mới #${escapeHtml(order.id)}</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:monospace;">

  <table width="100%" cellpadding="0" cellspacing="0"
         style="background:#080808;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px;width:100%;">

          <tr>
            <td style="background:#C0392B;height:3px;"></td>
          </tr>

          <tr>
            <td style="background:#1A1A1A;padding:32px 40px;
                       border:1px solid #2A2A2A;border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family:sans-serif;font-size:32px;
                                font-weight:900;letter-spacing:8px;
                                color:#F0EDE6;">
                      ${storeName}
                    </div>
                    <div style="font-family:monospace;font-size:10px;
                                letter-spacing:3px;color:#888;
                                text-transform:uppercase;margin-top:4px;">
                      ADMIN NOTIFICATION
                    </div>
                  </td>
                  <td align="right">
                    <div style="background:#C0392B;color:#fff;
                                font-family:monospace;font-size:10px;
                                letter-spacing:2px;text-transform:uppercase;
                                padding:8px 16px;display:inline-block;">
                      ● ĐƠN HÀNG MỚI
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#080808;padding:24px 40px;
                       border:1px solid #2A2A2A;border-top:none;">
              <div style="font-family:sans-serif;font-size:42px;
                          font-weight:900;letter-spacing:4px;
                          color:#F0EDE6;">
                #${escapeHtml(order.id)}
              </div>
              <div style="font-family:monospace;font-size:11px;
                          color:#888;letter-spacing:2px;
                          text-transform:uppercase;margin-top:6px;">
                ${formatDate(order.createdAt)}
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#1A1A1A;padding:24px 40px;
                       border:1px solid #2A2A2A;border-top:none;">
              <div style="font-family:monospace;font-size:9px;
                          letter-spacing:3px;color:#C0392B;
                          text-transform:uppercase;margin-bottom:16px;">
                KHÁCH HÀNG
              </div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="vertical-align:top;
                                         padding-right:20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family:monospace;font-size:10px;
                                   color:#555;letter-spacing:2px;
                                   text-transform:uppercase;
                                   padding-bottom:4px;">
                          HỌ TÊN
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:14px;
                                   color:#F0EDE6;padding-bottom:16px;">
                          ${escapeHtml(order.customer.firstName)} ${escapeHtml(order.customer.lastName)}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:10px;
                                   color:#555;letter-spacing:2px;
                                   text-transform:uppercase;
                                   padding-bottom:4px;">
                          EMAIL
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:13px;
                                   color:#F0EDE6;padding-bottom:16px;">
                          ${escapeHtml(order.customer.email)}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:10px;
                                   color:#555;letter-spacing:2px;
                                   text-transform:uppercase;
                                   padding-bottom:4px;">
                          SĐT
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:13px;
                                   color:#F0EDE6;">
                          ${escapeHtml(order.customer.phone)}
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family:monospace;font-size:10px;
                                   color:#555;letter-spacing:2px;
                                   text-transform:uppercase;
                                   padding-bottom:4px;">
                          ĐỊA CHỈ GIAO HÀNG
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:13px;
                                   color:#F0EDE6;line-height:1.8;
                                   padding-bottom:16px;">
                          ${escapeHtml(order.shipping.address)}<br>
                          ${escapeHtml(order.shipping.ward)}, ${escapeHtml(order.shipping.district)}<br>
                          ${escapeHtml(order.shipping.city)}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:10px;
                                   color:#555;letter-spacing:2px;
                                   text-transform:uppercase;
                                   padding-bottom:4px;">
                          VẬN CHUYỂN
                        </td>
                      </tr>
                      <tr>
                        <td style="font-family:monospace;font-size:12px;
                                   color:#B8963E;">
                          ${escapeHtml(
                            getShippingMethodLabel(order.shipping.method),
                          )}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              ${noteBlock}
            </td>
          </tr>

          <tr>
            <td style="background:#080808;padding:24px 40px;
                       border:1px solid #2A2A2A;border-top:none;">
              <div style="font-family:monospace;font-size:9px;
                          letter-spacing:3px;color:#C0392B;
                          text-transform:uppercase;margin-bottom:16px;">
                SẢN PHẨM ĐẶT HÀNG
              </div>
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border:1px solid #2A2A2A;">
                <tr style="background:#1A1A1A;">
                  <th style="padding:10px 12px;font-family:monospace;
                             font-size:9px;letter-spacing:2px;color:#555;
                             text-transform:uppercase;text-align:left;
                             font-weight:normal;">
                    SẢN PHẨM
                  </th>
                  <th style="padding:10px 12px;font-family:monospace;
                             font-size:9px;letter-spacing:2px;color:#555;
                             text-transform:uppercase;text-align:center;
                             font-weight:normal;">
                    SIZE
                  </th>
                  <th style="padding:10px 12px;font-family:monospace;
                             font-size:9px;letter-spacing:2px;color:#555;
                             text-transform:uppercase;text-align:center;
                             font-weight:normal;">
                    SL
                  </th>
                  <th style="padding:10px 12px;font-family:monospace;
                             font-size:9px;letter-spacing:2px;color:#555;
                             text-transform:uppercase;text-align:right;
                             font-weight:normal;">
                    GIÁ
                  </th>
                </tr>
                ${itemRows}
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#1A1A1A;padding:20px 40px;
                       border:1px solid #2A2A2A;border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:sans-serif;font-size:22px;
                             font-weight:900;letter-spacing:4px;
                             color:#F0EDE6;text-transform:uppercase;">
                    TỔNG CỘNG
                  </td>
                  <td align="right">
                    <span style="font-family:sans-serif;font-size:28px;
                                 font-weight:900;letter-spacing:2px;
                                 color:#C0392B;">
                      ${formatVND(order.total)}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#080808;padding:24px 40px;
                       border:1px solid #2A2A2A;border-top:none;
                       text-align:center;">
              <a href="${adminOrdersHref}"
                 style="display:inline-block;background:#C0392B;color:#fff;
                        font-family:monospace;font-size:11px;
                        letter-spacing:3px;text-transform:uppercase;
                        text-decoration:none;padding:14px 32px;">
                XEM ĐƠN HÀNG TRONG ADMIN →
              </a>
            </td>
          </tr>

          <tr>
            <td style="background:#080808;padding:20px 40px;
                       border:1px solid #2A2A2A;border-top:none;
                       text-align:center;">
              <div style="font-family:sans-serif;font-size:24px;
                          font-weight:900;letter-spacing:8px;
                          color:rgba(240,237,230,0.06);">
                HEBREW
              </div>
              <div style="font-family:monospace;font-size:9px;
                          color:#333;letter-spacing:2px;
                          text-transform:uppercase;margin-top:8px;">
                © ${year} HEBREW — NO RIGHTS, ONLY DROPS.
              </div>
            </td>
          </tr>

          <tr>
            <td style="background:#C0392B;height:2px;"></td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

function buildAdminEmailText(order: Order): string {
  const items = order.items
    .map(
      (i) =>
        `  - ${i.name} | Size: ${i.size} | SL: ${i.quantity} | ${formatVND(i.price * i.quantity)}`,
    )
    .join("\n");

  const noteTrim = order.customer.note?.trim();
  const noteLine = noteTrim ? `Ghi chú: ${noteTrim}` : "";

  return `
HEBREW — ĐƠN HÀNG MỚI
══════════════════════════════════════

Mã đơn:  #${order.id}
Thời gian: ${formatDate(order.createdAt)}

KHÁCH HÀNG
──────────────────────────────────────
Họ tên:  ${order.customer.firstName} ${order.customer.lastName}
Email:   ${order.customer.email}
SĐT:     ${order.customer.phone}

ĐỊA CHỈ GIAO HÀNG
──────────────────────────────────────
${order.shipping.address}
${order.shipping.ward}, ${order.shipping.district}
${order.shipping.city}
Vận chuyển: ${getShippingMethodLabel(order.shipping.method)}
${noteLine}

SẢN PHẨM
──────────────────────────────────────
${items}

TỔNG CỘNG: ${formatVND(order.total)}

══════════════════════════════════════
© ${new Date().getFullYear()} HEBREW — NO RIGHTS, ONLY DROPS.
  `.trim();
}

/** @returns true if mail was sent, false if skipped or send failed (errors are logged). */
export async function sendOrderNotification(order: Order): Promise<boolean> {
  const adminEmails = [
    process.env.ADMIN_EMAIL_1,
    process.env.ADMIN_EMAIL_2,
  ].filter((e): e is string => typeof e === "string" && e.trim().length > 0);

  if (adminEmails.length === 0) {
    console.warn("⚠️  No admin emails configured in .env.local");
    return false;
  }

  if (!transporter || !process.env.GMAIL_USER) {
    console.warn(
      "⚠️  Gmail SMTP not configured (GMAIL_USER / GMAIL_APP_PASSWORD). Skipping email.",
    );
    return false;
  }

  const subject =
    `[HEBREW] Đơn hàng mới #${order.id} — ` +
    `${order.customer.firstName} ${order.customer.lastName} — ` +
    `${formatVND(order.total)}`;

  const mailOptions = {
    from: `"HEBREW Store" <${process.env.GMAIL_USER}>`,
    to: adminEmails.join(", "),
    subject,
    text: buildAdminEmailText(order),
    html: buildAdminEmailHTML(order),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Order notification sent: ${info.messageId}`);
    console.log(`   To: ${adminEmails.join(", ")}`);
    console.log(`   Order: #${order.id}`);
    return true;
  } catch (error) {
    console.error("❌ Failed to send order notification:", error);
    return false;
  }
}
