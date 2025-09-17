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
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import User from "@/models/User"; // adjust path if needed
import { connectDB } from "@/lib/mongodb"; // your db connection util

// Simple in-memory rate limits (use Redis for production multi-instance)
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_IP = 30;
const ipRequests = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const entry = ipRequests.get(ip) || { count: 0, start: now };

  if (now - entry.start > RATE_LIMIT_WINDOW) {
    // reset window
    entry.count = 1;
    entry.start = now;
  } else {
    entry.count++;
  }

  ipRequests.set(ip, entry);
  return entry.count <= MAX_REQUESTS_PER_IP;
}

function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.trim().toLowerCase());
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Basic rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await connectDB();

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // Course access check
    const hasPythonAccess = user.courses.some(
      (c) => String(c.name).toLowerCase() === "python"
    );
    const hasJavaScriptAccess = user.courses.some(
      (c) => String(c.name).toLowerCase() === "javascript"
    );

    // Links
    const pythonLink =
      "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing";
    const jsLink =
      "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing";

    let contentParts = [];
    if (hasPythonAccess) {
      contentParts.push(
        `<li><a href="${pythonLink}">Download Python Course Materials</a></li>`
      );
    }
    if (hasJavaScriptAccess) {
      contentParts.push(
        `<li><a href="${jsLink}">Download JavaScript Course Materials</a></li>`
      );
    }

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; background-color: #f9fafb; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 32px;">
          <h2 style="color: #1f2937;">👋 Hello ${user.name || "there"},</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for purchasing a course from <strong>Skill Foundry</strong>! Below you'll find the download links for the material(s) you have access to.
          </p>
          ${
            contentParts.length > 0
              ? `<ul style="padding-left: 20px; margin-top: 24px; font-size: 16px; line-height: 1.6;">${contentParts.join(
                  ""
                )}</ul>`
              : `<p style="margin-top: 24px;">It looks like you don't currently have any active course access. If this seems incorrect, please contact support.</p>`
          }
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p>This email was sent by Skill Foundry.</p>
            <p>If you have any issues accessing your materials, simply reply to this email or reach out to our support team.</p>
          </div>
        </div>
      </div>
    `;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Skill Foundry" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Skill Foundry Course Download Links",
      html: htmlContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Support-mail-access API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
