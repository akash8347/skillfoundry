import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";
import { v4 as uuidv4 } from "uuid";
import generateInvoice from "./invoice";
import { Currency } from "lucide-react";

export async function POST(req) {
  try {
    // ✅ DB Connection
    try {
      await connectDB();
    } catch (dbErr) {
      console.error("DB connection error:", dbErr);
      return Response.json({ error: "Database connection failed" }, { status: 500 });
    }

    let body;
    try {
      body = await req.json();
    } catch (jsonErr) {
      console.error("Invalid JSON in request:", jsonErr);
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      mobile,
      courseIdentifier,
      currency,
      courseId,
      is19
    } = body;
   console.log("currency:", currency);
    // ✅ Verify signature
    let generatedSignature;
    try {
      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      generatedSignature = hmac.digest("hex");
    } catch (sigErr) {
      console.error("Signature generation error:", sigErr);
      return Response.json({ error: "Signature verification failed" }, { status: 500 });
    }

    if (generatedSignature !== razorpay_signature) {
      console.warn("Signature mismatch:", { razorpay_order_id, razorpay_payment_id, email });
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ✅ Course pricing logic
    let coursesToSave = [];
    const priceMap = {
      INR: { python: 24900, javascript: 24900 },
      USD: { python: 2700, javascript: 2700 },
      EUR: { python: 2500, javascript: 2500 },
    };

    const currencyToCountry = {
      INR: "INDIA",
      USD: "USA",
      EUR: "EUROPE",
    };

    const currencyKey = (currency || "").toUpperCase();
    if (!priceMap[currencyKey]) {
      console.warn("Unsupported currency:", currencyKey);
      return Response.json({ error: "Unsupported currency" }, { status: 400 });
    }

    try {
      switch (courseIdentifier) {
        case "python_299":
          coursesToSave = [{ name: "python", amount: is19 ? courseId =="python_js_combo" ? 2900 : 1900 : priceMap[currencyKey].python }];
          break;
        case "javascript_199":
          coursesToSave = [{ name: "javascript", amount: priceMap[currencyKey].javascript }];
          break;
        case "python_js_combo_498":
          coursesToSave = [
            { name: "python", amount: priceMap[currencyKey].python },
            { name: "javascript", amount: priceMap[currencyKey].javascript },
          ];
          break;
        default:
          console.warn("Invalid courseIdentifier:", courseIdentifier);
          return Response.json({ error: "Invalid courseIdentifier" }, { status: 400 });
      }
    } catch (courseErr) {
      console.error("Course selection error:", courseErr);
      return Response.json({ error: "Course processing failed" }, { status: 500 });
    }

    // Add purchase timestamp
    coursesToSave = coursesToSave.map((course) => ({
      ...course,
      purchasedAt: new Date(),
    }));

    // ✅ User handling
    let user;
    try {
      user = await User.findOne({ email,mobile  });
    } catch (findErr) {
      console.error("User lookup error:", findErr);
      return Response.json({ error: "User lookup failed" }, { status: 500 });
    }

    try {
      if (user) {
        user.purchases.push({ razorpay_order_id, razorpay_payment_id });

        const courseNames = coursesToSave.map((c) => c.name);
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
          purchases: [{ razorpay_order_id, razorpay_payment_id }],
          courses: coursesToSave,
        });
        await user.save();
      }
    } catch (userSaveErr) {
      console.error("User save error:", userSaveErr);
      return Response.json({ error: "User saving failed" }, { status: 500 });
    }

    // ✅ Invoice generation (fire & forget)
    try {
          const country=currencyToCountry[currency]

      generateInvoice(email, mobile, country,currency, coursesToSave).then((invoice) => {
        console.log("Invoice generated successfully: ", invoice.invoiceNumber);
      }).catch((err) => {
        console.error("Invoice generation error:", err);
      });
    } catch (invErr) {
      console.error("Invoice trigger error:", invErr);
    }

    // ✅ Token generation
    let token;
    try {
      token = generateToken(user);
    } catch (tokenErr) {
      console.error("JWT generation error:", tokenErr);
      return Response.json({ error: "Authentication failed" }, { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Unhandled payment verify error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
