import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const { name, email, mobile, amount, currency} = await req.json();
       const currencyMapper = {
           INR: "INR",
           USD: "USD",
           EUR: "EUR"
       };
      const currencyMapped = currencyMapper[currency] || "INR";

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

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
