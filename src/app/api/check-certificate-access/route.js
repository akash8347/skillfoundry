// import { getTokenDataFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function GET(req) {
  try {
    
    const cookieStore = await  cookies()
    const token = cookieStore.get('authToken')?.value
    if (!token) return  NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const decoded = jwt.verify(token, process.env.NEXT_PRIVATE_JWT_SECRET)

    const email = decoded.email;


    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.passedExam) {
      return Response.json({ allowed: false });
    }

    return Response.json({
      allowed: true,
      alreadyGenerated: user.certificateGenerated,
      certificateName: user.certificateName || null,
    });
  } catch (err) {
    console.error("Error checking certificate access:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
