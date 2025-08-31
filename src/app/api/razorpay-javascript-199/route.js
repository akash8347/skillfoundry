import Razorpay from "razorpay";

export async function POST(req) {


    const courses = {
        python: { USD: 2700, EUR: 2500, INR: 24900 },
        js: { USD: 2700, EUR: 2500, INR: 24900 },
        python_js_combo: { USD: 4400, EUR: 3900, INR: 49800 }
    };

    try {
        const { name, email, mobile, currency , courseId, is19} = await req.json();
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
        console.log("is19: ", is19);
       const amount= is19? courseId === "python_js_combo" ? 2900 : 1900 : courses[courseId][currencyMapped];
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
