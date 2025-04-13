import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    const { score } = await req.json();
const cookieStore = await  cookies()
  const token = cookieStore.get('authToken')?.value
  if (!token) return  NextResponse.json({ error: 'Unauthorized' }, { status: 401 })


    const decoded = jwt.verify(token, process.env.NEXT_PRIVATE_JWT_SECRET)

    const email = decoded.email;

    // if (!email) {
    //   return Response.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectDB();
    

    const user = await User.findOneAndUpdate(
      { email },
      {
        passedExam: true,
        certificationScore: score,
        certificationPassedAt: new Date(),
      }
    );

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error saving result:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
