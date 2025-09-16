// import Razorpay from "razorpay";

// export async function POST(req) {


//     const courses = {
//         python: { USD: 2900, EUR: 2500, INR: 24900 },
//         js: { USD: 2900, EUR: 2500, INR: 24900 },
//         python_js_combo: { USD: 4800, EUR: 3900, INR: 39800 }
//     };

//     try {
//         const { name, email, mobile, currency , courseId, is39, encryptedCode} = await req.json();
//         console.log("Request data:", { name, email, mobile, currency, courseId });
    
//         const currencyMapper = {
//             INR: "INR",
//             USD: "USD",
//             EUR: "EUR"
//         };
//         const currencyMapped = currencyMapper[currency.toUpperCase()] || "INR";

//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });
//         console.log("is39: ", is39);
//        const amount= is39? courseId === "python_js_combo" ? 5800 : 3900 : courses[courseId][currencyMapped];
//         const options = {
//             amount: amount, // amount in paise, must be a number (e.g., 50000 for ₹500.00)
//             currency: currencyMapped,
//             receipt: `order_rcptid_${Date.now()}`,
//         };

//         const order = await razorpay.orders.create(options);

//         return Response.json({ order, name, email, mobile });
//     } catch (error) {
//         console.error("Razorpay order creation error:", error); // <-- This is important!
//         return Response.json({ error: "Failed to create Razorpay order" }, { status: 500 });
//     }
// }


import Razorpay from "razorpay";
import { getCoursePricesByCode, codeToCurrency } from "@/lib/currencyMapper";

export async function POST(req) {
  try {
    const { name, email, mobile, currency, courseId, encryptedCode } = await req.json();
    console.log("Request data:", { name, email, mobile, currency, courseId, encryptedCode });

    // 🔹 Get currency details from code
    const currencyDetails = codeToCurrency[encryptedCode];
    if (!currencyDetails) {
      return Response.json({ error: "Invalid currency code" }, { status: 400 });
    }

    const { currency: currencyMapped, symbol } = currencyDetails;

    // 🔹 Get course prices from helper
    const prices = getCoursePricesByCode(encryptedCode);

    if (!prices[courseId]) {
      return Response.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // 🔹 Convert to subunits (paise/cents)
    const amount = prices[courseId] * 100;

    // 🔹 Init Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount,
      currency: currencyMapped,
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ order, name, email, mobile, symbol });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return Response.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}
