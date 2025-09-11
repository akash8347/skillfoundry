import Razorpay from "razorpay";

export async function POST(req) {


    const courses = {
        python: { USD: 2900, EUR: 2500, INR: 24900 },
        js: { USD: 2900, EUR: 2500, INR: 24900 },
        python_js_combo: { USD: 4800, EUR: 3900, INR: 39800 }
    };

    try {
        const { name, email, mobile, currency , courseId, is39} = await req.json();
        console.log("Request data:", { name, email, mobile, currency, courseId });
    
        const currencyMapper = {
            INR: "INR",
            USD: "USD",
            EUR: "EUR"
        };
        const currencyMapped = currencyMapper[currency.toUpperCase()] || "INR";

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        console.log("is39: ", is39);
       const amount= is39? courseId === "python_js_combo" ? 5800 : 3900 : courses[courseId][currencyMapped];
        const options = {
            amount: amount, // amount in paise, must be a number (e.g., 50000 for ₹500.00)
            currency: currencyMapped,
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return Response.json({ order, name, email, mobile });
    } catch (error) {
        console.error("Razorpay order creation error:", error); // <-- This is important!
        return Response.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }
}
