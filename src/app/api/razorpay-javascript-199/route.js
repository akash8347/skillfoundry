import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const { name, email, mobile } = await req.json();

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: 14900, // ₹149 in paise
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return Response.json({ order, name, email, mobile });
    } catch (error) {
        return Response.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }
}
