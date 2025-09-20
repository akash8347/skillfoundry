// import crypto from "crypto";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import { generateToken } from "@/lib/jwt";
// import { v4 as uuidv4 } from "uuid";
// import generateInvoice from "./invoice";
// import { Currency } from "lucide-react";

// export async function POST(req) {
//   try {
//     // ✅ DB Connection
//     try {
//       await connectDB();
//     } catch (dbErr) {
//       console.error("DB connection error:", dbErr);
//       return Response.json({ error: "Database connection failed" }, { status: 500 });
//     }

//     let body;
//     try {
//       body = await req.json();
//     } catch (jsonErr) {
//       console.error("Invalid JSON in request:", jsonErr);
//       return Response.json({ error: "Invalid request body" }, { status: 400 });
//     }

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       email,
//       mobile,
//       courseIdentifier,
//       currency,
//       courseId,
//       is39
//     } = body;
//    console.log("currency:", currency);
//     // ✅ Verify signature
//     let generatedSignature;
//     try {
//       const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
//       hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//       generatedSignature = hmac.digest("hex");
//     } catch (sigErr) {
//       console.error("Signature generation error:", sigErr);
//       return Response.json({ error: "Signature verification failed" }, { status: 500 });
//     }

//     if (generatedSignature !== razorpay_signature) {
//       console.warn("Signature mismatch:", { razorpay_order_id, razorpay_payment_id, email });
//       return Response.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     // ✅ Course pricing logic
//     let coursesToSave = [];
//     const priceMap = {
//       INR: { python: 24900, javascript: 24900 },
//       USD: { python: 2900, javascript: 2900 },
//       EUR: { python: 2500, javascript: 2500 },
//     };

//     const currencyToCountry = {
//       INR: "INDIA",
//       USD: "USA",
//       EUR: "EUROPE",
//     };

//     const currencyKey = (currency || "").toUpperCase();
//     if (!priceMap[currencyKey]) {
//       console.warn("Unsupported currency:", currencyKey);
//       return Response.json({ error: "Unsupported currency" }, { status: 400 });
//     }

//     try {
//       switch (courseIdentifier) {
//         case "python_299":
//           coursesToSave = [{ name: "python", amount: is39 ? courseId =="python_js_combo" ? 5800 : 3900 : priceMap[currencyKey].python }];
//           break;
//         case "javascript_199":
//           coursesToSave = [{ name: "javascript", amount: priceMap[currencyKey].javascript }];
//           break;
//         case "python_js_combo_498":
//           coursesToSave = [
//             { name: "python", amount: priceMap[currencyKey].python },
//             { name: "javascript", amount: priceMap[currencyKey].javascript },
//           ];
//           break;
//         default:
//           console.warn("Invalid courseIdentifier:", courseIdentifier);
//           return Response.json({ error: "Invalid courseIdentifier" }, { status: 400 });
//       }
//     } catch (courseErr) {
//       console.error("Course selection error:", courseErr);
//       return Response.json({ error: "Course processing failed" }, { status: 500 });
//     }

//     // Add purchase timestamp
//     coursesToSave = coursesToSave.map((course) => ({
//       ...course,
//       purchasedAt: new Date(),
//     }));

//     // ✅ User handling
//     let user;
//     try {
//       user = await User.findOne({ email,mobile  });
//     } catch (findErr) {
//       console.error("User lookup error:", findErr);
//       return Response.json({ error: "User lookup failed" }, { status: 500 });
//     }

//     try {
//       if (user) {
//         user.purchases.push({ razorpay_order_id, razorpay_payment_id });

//         const courseNames = coursesToSave.map((c) => c.name);
//         const existingCourses = user.courses?.map((c) => c.name) || [];

//         for (const course of coursesToSave) {
//           if (!existingCourses.includes(course.name)) {
//             user.courses.push(course);
//           }
//         }

//         if (!user.certificateNumber) {
//           user.certificateNumber = `WD-${uuidv4().slice(0, 8).toUpperCase()}`;
//         }

//         await user.save();
//       } else {
//         user = new User({
//           email,
//           mobile,
//           certificateNumber: `WD-${uuidv4().slice(0, 8).toUpperCase()}`,
//           purchases: [{ razorpay_order_id, razorpay_payment_id }],
//           courses: coursesToSave,
//         });
//         await user.save();
//       }
//     } catch (userSaveErr) {
//       console.error("User save error:", userSaveErr);
//       return Response.json({ error: "User saving failed" }, { status: 500 });
//     }

//     // ✅ Invoice generation (fire & forget)
//     try {
//           const country=currencyToCountry[currency]

//       generateInvoice(email, mobile, country,currency, coursesToSave, razorpay_order_id, razorpay_payment_id).then((invoice) => {
//         console.log("Invoice generated successfully: ", invoice.invoiceNumber);
//       }).catch((err) => {
//         console.error("Invoice generation error:", err);
//       });
//     } catch (invErr) {
//       console.error("Invoice trigger error:", invErr);
//     }

//     // ✅ Token generation
//     let token;
//     try {
//       token = generateToken(user);
//     } catch (tokenErr) {
//       console.error("JWT generation error:", tokenErr);
//       return Response.json({ error: "Authentication failed" }, { status: 500 });
//     }

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: {
//         "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure`,
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (err) {
//     console.error("Unhandled payment verify error:", err);
//     return Response.json({ error: "Server error" }, { status: 500 });
//   }
// }


// this is last working code before razorpay webhook
// import crypto from "crypto";
// import { connectDB } from "@/lib/mongodb";
// import User from "@/models/User";
// import { generateToken } from "@/lib/jwt";
// import { v4 as uuidv4 } from "uuid";
// import generateInvoice from "./invoice";
// import { getCoursePricesByCode, codeToCurrency } from "@/lib/currencyMapper";
// import nodemailer from "nodemailer";


// export async function POST(req) {
//   try {
//     // ✅ DB Connection
//     try {
//       await connectDB();
//     } catch (dbErr) {
//       console.error("DB connection error:", dbErr);
//       return Response.json({ error: "Database connection failed" }, { status: 500 });
//     }

//     let body;
//     try {
//       body = await req.json();
//     } catch (jsonErr) {
//       console.error("Invalid JSON in request:", jsonErr);
//       return Response.json({ error: "Invalid request body" }, { status: 400 });
//     }

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       email,
//       mobile,
//       courseIdentifier,
//       encryptedCode, // 🔹 now used instead of currency+is39
//       courseId,
//     } = body;

//     // ✅ Verify signature
//     let generatedSignature;
//     try {
//       const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
//       hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//       generatedSignature = hmac.digest("hex");
//     } catch (sigErr) {
//       console.error("Signature generation error:", sigErr);
//       return Response.json({ error: "Signature verification failed" }, { status: 500 });
//     }

//     if (generatedSignature !== razorpay_signature) {
//       console.warn("Signature mismatch:", { razorpay_order_id, razorpay_payment_id, email });
//       return Response.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     // ✅ Pricing logic from currencyMapper
//     const currencyDetails = codeToCurrency[encryptedCode];
//     if (!currencyDetails) {
//       console.warn("Invalid encryptedCode:", encryptedCode);
//       return Response.json({ error: "Invalid currency code" }, { status: 400 });
//     }

//     const { currency } = currencyDetails;
//     const prices = getCoursePricesByCode(encryptedCode);

//     let coursesToSave = [];

//     try {
//       switch (courseIdentifier) {
//         case "python_299":
//           coursesToSave = [
//             { name: "python", amount: prices.python * 100 }, // 🔹 convert to subunit
//           ];
//           break;

//         case "javascript_199":
//           coursesToSave = [
//             { name: "javascript", amount: prices.js * 100 },
//           ];
//           break;

//         case "python_js_combo_498":
//           coursesToSave = [
//             { name: "python", amount: prices.python * 100 },
//             { name: "javascript", amount: prices.js * 100 },
//           ];
//           break;

//         default:
//           console.warn("Invalid courseIdentifier:", courseIdentifier);
//           return Response.json({ error: "Invalid courseIdentifier" }, { status: 400 });
//       }
//     } catch (courseErr) {
//       console.error("Course selection error:", courseErr);
//       return Response.json({ error: "Course processing failed" }, { status: 500 });
//     }

//     // Add purchase timestamp
//     coursesToSave = coursesToSave.map((course) => ({
//       ...course,
//       purchasedAt: new Date(),
//     }));

//     // ✅ User handling
//     let user;
//     try {
//       user = await User.findOne({ email, mobile });
//     } catch (findErr) {
//       console.error("User lookup error:", findErr);
//       return Response.json({ error: "User lookup failed" }, { status: 500 });
//     }

//     try {
//       if (user) {
//         user.purchases.push({ razorpay_order_id, razorpay_payment_id });

//         const courseNames = coursesToSave.map((c) => c.name);
//         const existingCourses = user.courses?.map((c) => c.name) || [];

//         for (const course of coursesToSave) {
//           if (!existingCourses.includes(course.name)) {
//             user.courses.push(course);
//           }
//         }

//         if (!user.certificateNumber) {
//           user.certificateNumber = `WD-${uuidv4().slice(0, 8).toUpperCase()}`;
//         }

//         await user.save();
//       } else {
//         user = new User({
//           email,
//           mobile,
//           certificateNumber: `WD-${uuidv4().slice(0, 8).toUpperCase()}`,
//           purchases: [{ razorpay_order_id, razorpay_payment_id }],
//           courses: coursesToSave,
//         });
//         await user.save();
//       }
//     } catch (userSaveErr) {
//       console.error("User save error:", userSaveErr);
//       return Response.json({ error: "User saving failed" }, { status: 500 });
//     }

//     // ✅ Invoice generation (fire & forget)
//     try {
//       const currencyToCountry = {
//         INR: "INDIA",
//         USD: "USA",
//         EUR: "EUROPE",
//       };
//       const country = currencyToCountry[currency] || "GLOBAL";

//       const invoice = await generateInvoice(
//         email,
//         mobile,
//         country,
//         currency,
//         coursesToSave,
//         razorpay_order_id,
//         razorpay_payment_id
//       );

//       console.log("Invoice generated successfully: ", invoice.invoiceNumber);
//     } catch (invErr) {
//       console.error("Invoice trigger error:", invErr);
//     }
//     //<--email sending code START---------------->


//     try {
//       const hasPythonAccess = coursesToSave.some((c) => c.name === "python");
//       const hasJavaScriptAccess = coursesToSave.some((c) => c.name === "javascript");

//       const pythonLink =
//         "https://drive.google.com/drive/folders/18hG0Omuwj8Se1xJQuDYtvPdhEEY44qt3?usp=sharing";
//       const jsLink =
//         "https://drive.google.com/drive/folders/1veiv54vM5rqb-YSgSZXw-YMBuOYIIGyV?usp=sharing";

//       let contentParts = [];
//       if (hasPythonAccess) {
//         contentParts.push(
//           `<li><a href="${pythonLink}">Download Python Course Materials</a></li>`
//         );
//       }
//       if (hasJavaScriptAccess) {
//         contentParts.push(
//           `<li><a href="${jsLink}">Download JavaScript Course Materials</a></li>`
//         );
//       }

//       const htmlContent = `
//         <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 32px; background-color: #f9fafb; color: #333;">
//           <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 32px;">
//             <h2 style="color: #1f2937;">👋 Hello ${user.name || "there"},</h2>
//             <p style="font-size: 16px; line-height: 1.6;">
//               Thank you for purchasing from <strong>Skill Foundry</strong>! Below you'll find your download links:
//             </p>
//             ${
//               contentParts.length > 0
//                 ? `<ul style="padding-left: 20px; margin-top: 24px; font-size: 16px; line-height: 1.6;">${contentParts.join(
//                     ""
//                   )}</ul>`
//                 : `<p style="margin-top: 24px;">No active course access found. Contact support if this seems wrong.</p>`
//             }
//             <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
//               <p>This email was sent by Skill Foundry.</p>
//               <p>If you have any issues accessing your materials, simply reply to this email.</p>
//             </div>
//           </div>
//         </div>
//       `;

//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       await transporter.sendMail({
//         from: `"Skill Foundry" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Your Skill Foundry Course Download Links",
//         html: htmlContent,
//       });

//       console.log("✅ Download email FROM PAYMENT VERIFY", email);
//     } catch (mailErr) {
//       console.error("Email sending failed:", mailErr);
//     }


//     //<--email sending code END---------------->

//     // ✅ Token generation
//     let token;
//     try {
//       token = generateToken(user);
//     } catch (tokenErr) {
//       console.error("JWT generation error:", tokenErr);
//       return Response.json({ error: "Authentication failed" }, { status: 500 });
//     }

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: {
//         "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure`,
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (err) {
//     console.error("Unhandled payment verify error:", err);
//     return Response.json({ error: "Server error" }, { status: 500 });
//   }
// }




import crypto from "crypto";

export async function POST(req) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // ✅ Verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ✅ Only return success/fail now
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unhandled payment verify error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
