// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import mongoose from "mongoose";
// import User from "@/models/User"; // adjust path if needed
// import { connectDB } from "@/lib/mongodb"; // your db connection util

// export async function POST(req) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json({ error: "Email is required" }, { status: 400 });
//     }

//     await connectDB();

//     // Find user by email
//     const user = await User.findOne({ email: email.trim().toLowerCase() });

//     if (!user) {
//       return NextResponse.json({ error: "Email not found" }, { status: 404 });
//     }

//     // Course access check
//     const hasPythonAccess = user.courses.some((c) => c.name === "python");
//     const hasJavaScriptAccess = user.courses.some((c) => c.name === "javascript");

//     // Links
//     const pythonLink =
//       "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing";
//     const jsLink =
//       "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing";

//     let contentParts = [];

//     if (hasPythonAccess) {
//       contentParts.push(
//         `<li><a href="${pythonLink}">Download Python Course Materials</a></li>`
//       );
//     }
//     if (hasJavaScriptAccess) {
//       contentParts.push(
//         `<li><a href="${jsLink}">Download JavaScript Course Materials</a></li>`
//       );
//     }

//     const htmlContent = `
//       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; background-color: #f9fafb; color: #333;">
//         <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 32px;">
//           <h2 style="color: #1f2937;">👋 Hello ${user.name || "there"},</h2>
//           <p style="font-size: 16px; line-height: 1.6;">
//             Thank you for purchasing a course from <strong>Skill Foundry</strong>! Below you'll find the download links for the material(s) you have access to.
//           </p>
//           ${
//             contentParts.length > 0
//               ? `<ul style="padding-left: 20px; margin-top: 24px; font-size: 16px; line-height: 1.6;">${contentParts.join(
//                   ""
//                 )}</ul>`
//               : `<p style="margin-top: 24px;">It looks like you don't currently have any active course access. If this seems incorrect, please contact support.</p>`
//           }
//           <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
//             <p>This email was sent by Skill Foundry.</p>
//             <p>If you have any issues accessing your materials, simply reply to this email or reach out to our support team.</p>
//           </div>
//         </div>
//       </div>
//     `;

//     // Nodemailer setup
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Send email
//     await transporter.sendMail({
//       from: `"Skill Foundry" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your Skill Foundry Course Download Links",
//       html: htmlContent,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Support-mail-access API error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again later." },
//       { status: 500 }
//     );
//   }
// }


// advanace version

// app/api/support-mail-access/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

/**
 * Basic in-memory rate limiter stores.
 * - For single instance deployments only. Use Redis for multi-instance production.
 */
const IP_LIMIT = 60; // max requests per IP per hour
const EMAIL_LIMIT = 1; // max emails sent per email within WINDOW_EMAIL_MS
const WINDOW_IP_MS = 60 * 60 * 1000; // 1 hour
const WINDOW_EMAIL_MS = 15 * 60 * 1000; // 15 minutes between actual sends to same email

// maps: ip -> {count, firstSeen}
const ipMap = new Map();
// maps: email -> lastSentTimestamp
const emailSentMap = new Map();

/**
 * Simple email validation (RFC5322 full regex is huge).
 * This is pragmatic and catches common invalid formats.
 */
function isValidEmail(e) {
  if (!e || typeof e !== "string") return false;
  const s = e.trim().toLowerCase();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(s);
}

/**
 * Rate-limit helpers (in-memory)
 */
function recordIp(ip) {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry) {
    ipMap.set(ip, { count: 1, firstSeen: now });
    return { allowed: true, remaining: IP_LIMIT - 1 };
  }
  // if window expired, reset
  if (now - entry.firstSeen > WINDOW_IP_MS) {
    ipMap.set(ip, { count: 1, firstSeen: now });
    return { allowed: true, remaining: IP_LIMIT - 1 };
  }
  entry.count += 1;
  if (entry.count > IP_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  return { allowed: true, remaining: IP_LIMIT - entry.count };
}

function canSendToEmail(email) {
  const now = Date.now();
  const last = emailSentMap.get(email);
  if (!last) return true;
  if (now - last > WINDOW_EMAIL_MS) return true;
  return false;
}

function markEmailSent(email) {
  emailSentMap.set(email, Date.now());
}

/**
 * Create transporter - ensure env present
 */
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials not configured in environment variables.");
  }

  // For production, consider using a transactional email provider (SendGrid, SES, Mailgun)
  // and OAuth2 or API keys.
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function POST(req) {
  try {
    console.log("support-mail-access request received");
    // Basic body size guard: Next handles this in many deployments, but keep minimal protection
    const raw = await req.text();
    if (raw.length > 2000) {
      // too big, possible abuse
      return NextResponse.json({ success: true }, { status: 200 }); // generic
    }

    const { email: rawEmail } = JSON.parse(raw || "{}");

    // Validate email
    if (!isValidEmail(rawEmail)) {
      // Always return generic success to avoid leaking info
      return NextResponse.json(
        { success: true, message: "If the email exists, you'll receive an email shortly." },
        { status: 200 }
      );
    }

    const email = rawEmail.trim().toLowerCase();

    // Rate limiting by IP
    const ip = req.headers.get("x-forwarded-for") || req.ip || req.headers.get("x-real-ip") || "unknown";
    const ipRes = recordIp(ip);
    if (!ipRes.allowed) {
      // return generic success to caller, but use 429 so clients/rate-limiters notice
      return NextResponse.json({ success: true }, { status: 429 });
    }

    // Connect DB (ensure your connectDB handles multiple calls safely)
    await connectDB();

    // Find user (case-insensitive)
    const user = await User.findOne({ email });

    // If user not found: do NOT return 404 (to prevent enumeration).
    // Instead, respond with a generic success message. Do not attempt to send email.
    if (!user) {
      // small delay to make timing less useful to attackers
      await new Promise((r) => setTimeout(r, 250));
      return NextResponse.json(
        { success: true, message: "If the email exists, you'll receive an email shortly." },
        { status: 200 }
      );
    }

    // Check email-send frequency per email
    if (!canSendToEmail(email)) {
      // Already sent recently — do not send again.
      return NextResponse.json(
        { success: true, message: "If the email exists, you'll receive an email shortly." },
        { status: 200 }
      );
    }

    // Determine course access
    const hasPythonAccess = Array.isArray(user.courses) && user.courses.some((c) => String(c.name).toLowerCase() === "python");
    const hasJavaScriptAccess = Array.isArray(user.courses) && user.courses.some((c) => String(c.name).toLowerCase() === "javascript");

    // Prepare email content
    const pythonLink = "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing";
    const jsLink = "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing";

    const contentParts = [];
    if (hasPythonAccess) contentParts.push(`<li><a href="${pythonLink}">Download Python Course Materials</a></li>`);
    if (hasJavaScriptAccess) contentParts.push(`<li><a href="${jsLink}">Download JavaScript Course Materials</a></li>`);

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; background-color: #f9fafb; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 24px;">
          <h2>👋 Hello ${user.name ? escapeHtml(String(user.name)) : "there"},</h2>
          <p>Thank you for purchasing a course from <strong>Skill Foundry</strong>! Below you'll find the download links for the material(s) you have access to.</p>
          ${
            contentParts.length > 0
              ? `<ul style="margin-top: 16px;">${contentParts.join("")}</ul>`
              : `<p style="margin-top: 16px;">It looks like you don't currently have any active course access. If this seems incorrect, please contact support.</p>`
          }
          <div style="margin-top: 20px; color: #6b7280; font-size: 13px;">
            <p>This email was sent by Skill Foundry.</p>
          </div>
        </div>
      </div>
    `;

    // Create transporter and send
    const transporter = createTransporter();

    try {
      await transporter.sendMail({
        from: `"Skill Foundry" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Skill Foundry Course Download Links",
        html: htmlContent,
      });

      // Mark email as sent so we don't spam same address
      markEmailSent(email);

      // Record minimal audit log (avoid storing PII in verbose logs)
      console.info(`support-mail-access: email sent -> ${email} (userId=${user._id})`);
    } catch (smtpErr) {
      // If SMTP fails, still return generic success. Log for debugging.
      console.error("support-mail-access smtp error:", smtpErr);
      // Do not throw so that callers can't detect failures to send.
    }

    // Always return generic success so caller can't enumerate accounts
    return NextResponse.json(
      { success: true, message: "If the email exists, you'll receive an email shortly." },
      { status: 200 }
    );
  } catch (err) {
    console.error("support-mail-access unexpected error:", err);
    // Generic response
    return NextResponse.json(
      { success: true, message: "If the email exists, you'll receive an email shortly." },
      { status: 200 }
    );
  }
}

/**
 * Small helper to escape HTML in name to avoid breaking email template
 */
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
