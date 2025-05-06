import { NextResponse } from "next/server";
import User from "@/models/User";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = verifyToken(token);
  const userEmail = decoded.email;

  const dbUser = await User.findOne({ email: userEmail });

  if (!dbUser || !dbUser.courses) {
    return NextResponse.json({ hasPythonAccess: false, hasJavaScriptAccess: false });
  }

  const hasPythonAccess = dbUser.courses.some(course => course.name === "python");
  const hasJavaScriptAccess = dbUser.courses.some(course => course.name === "javascript");

  return NextResponse.json({ hasPythonAccess, hasJavaScriptAccess });
}
