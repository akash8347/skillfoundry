import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  await connectDB();

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      mobile,
      courseIdentifier
    } = await req.json();

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }
    // --------------- course identify-------------------
    let coursesToSave = [];
    switch (courseIdentifier) {
      case "python_299":
        coursesToSave = [{ name: "python", amount: 29900 }];
        break;
      case "javascript_199":
        coursesToSave = [{ name: "javascript", amount: 19900 }];
        break;
      case "python_js_combo_498":
        coursesToSave = [
          { name: "python", amount: 29900 },
          { name: "javascript", amount: 19900 },
        ];
        break;


      default:
        return Response.json({ error: "Invalid courseIdentifier" }, { status: 400 });
    }

    coursesToSave = coursesToSave.map((course) => ({
      ...course,
      purchasedAt: new Date(),
    }));






    let user = await User.findOne({ email });

    if (user) {
      user.purchases.push({ razorpay_order_id, razorpay_payment_id });


      const courseNames = coursesToSave.map(c => c.name);
      const existingCourses = user.courses?.map(c => c.name) || [];

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




    const token = generateToken(user);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": `authToken=${token}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Payment verify error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
