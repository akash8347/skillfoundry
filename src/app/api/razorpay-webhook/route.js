import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { v4 as uuidv4 } from "uuid";
import generateInvoice from "../payment-verify/invoice";
import { getCoursePricesByCode, codeToCurrency } from "@/lib/currencyMapper";
import nodemailer from "nodemailer";
import Processed from "@/models/Processed"; // new model

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const razorpaySignature = req.headers.get("x-razorpay-signature");
    const eventId = req.headers.get("x-razorpay-event-id");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.warn("⚠️ Invalid webhook signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event !== "payment.captured") {
      return new Response("Event ignored", { status: 200 });
    }

    const payment = event.payload.payment.entity;
    const {
      order_id,
      id: paymentId,
      notes, // ✅ yaha se email, mobile, courseIdentifier aa rahe honge
    } = payment;

    await connectDB();


     const already = await Processed.findOne({ eventId });
    if (already) {
      console.log("⚠️ Duplicate webhook ignored:", eventId);
      return new Response("Duplicate ignored", { status: 200 });
    }

const email = notes?.email || "";
const mobile = notes?.mobile || "";
const courseIdentifier = notes?.courseIdentifier || "";
const encryptedCode = notes?.encryptedCode || "";
const courseId = notes?.courseId || "";

console.log("✅ Webhook received:", {
  eventId,
  order_id,
  paymentId,
  email,
  courseIdentifier
});

    // ✅ Pricing logic
    const currencyDetails = codeToCurrency[encryptedCode];
    if (!currencyDetails) {
      console.warn("Invalid encryptedCode:", encryptedCode);
      return new Response("Invalid currency code", { status: 400 });
    }
    const { currency } = currencyDetails;
    const prices = getCoursePricesByCode(encryptedCode);

    let coursesToSave = [];
    switch (courseIdentifier) {
      case "python_299":
        coursesToSave = [{ name: "python", amount: prices.python * 100 }];
        break;
      case "javascript_199":
        coursesToSave = [{ name: "javascript", amount: prices.js * 100 }];
        break;
      case "python_js_combo_498":
        coursesToSave = [
          { name: "python", amount: prices.python * 100 },
          { name: "javascript", amount: prices.js * 100 },
        ];
        break;
      default:
        console.warn("Invalid courseIdentifier:", courseIdentifier);
        return new Response("Invalid courseIdentifier", { status: 400 });
    }

    coursesToSave = coursesToSave.map((c) => ({ ...c, purchasedAt: new Date() }));

    // ✅ User handling
    let user = await User.findOne({ email, mobile });
    if (user) {
      user.purchases.push({ razorpay_order_id: order_id, razorpay_payment_id: paymentId });
      const existingCourses = user.courses?.map((c) => c.name) || [];
      for (const course of coursesToSave) {
        if (!existingCourses.includes(course.name)) {
          user.courses.push(course);
        }
      }
      if (!user.certificateNumber) {
        user.certificateNumber = `WD-${uuidv4().slice(0, 8).toUpperCase()}`;
      }
      await user.save();
    } else {
      user = new User({
        email,
        mobile,
        certificateNumber: `WD-${uuidv4().slice(0, 8).toUpperCase()}`,
        purchases: [{ razorpay_order_id: order_id, razorpay_payment_id: paymentId }],
        courses: coursesToSave,
      });
      await user.save();
    }

    // ✅ Invoice
    try {
      const currencyToCountry = {
        INR: "INDIA",
        USD: "USA",
        EUR: "EUROPE",
        CAD: "CANADA",
        NZD : "NEW ZEALAND",
        AUD : "AUSTRALIA"
      };
      const country = currencyToCountry[currency] || "GLOBAL";

      const invoice = await generateInvoice(
        email,
        mobile,
        country,
        currency,
        coursesToSave,
        order_id,
        paymentId
      );
      console.log("Invoice generated successfully: ", invoice.invoiceNumber);
    } catch (err) {
      console.error("Invoice error", err);
    }

    // ✅ Email sending (same as /payment-verify)
    try {
      const hasPythonAccess = coursesToSave.some((c) => c.name === "python");
      const hasJavaScriptAccess = coursesToSave.some((c) => c.name === "javascript");

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
              Thank you for purchasing from <strong>Skill Foundry</strong>! Below you'll find your download links:
            </p>
            ${
              contentParts.length > 0
                ? `<ul style="padding-left: 20px; margin-top: 24px; font-size: 16px; line-height: 1.6;">${contentParts.join(
                    ""
                  )}</ul>`
                : `<p style="margin-top: 24px;">No active course access found. Contact support if this seems wrong.</p>`
            }
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
              <p>This email was sent by Skill Foundry.</p>
              <p>If you have any issues accessing your materials, simply reply to this email.</p>
            </div>
          </div>
        </div>
      `;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Skill Foundry" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Skill Foundry Course Download Links",
        html: htmlContent,
      });

      console.log("✅ Download email FROM WEBHOOK", email);
    } catch (mailErr) {
      console.error("Email sending failed:", mailErr);
    }
await Processed.findOneAndUpdate(
  { eventId },
  { eventId, processedAt: new Date() },
  { upsert: true, new: true }
);

    return new Response("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Server error", { status: 500 });
  }
}
