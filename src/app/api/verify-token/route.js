import { verifyToken, generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  const { token } = await req.json();

  // Step 1: Verify the short-lived magic token (10m)
  const data = verifyToken(token);

  if (!data || !data.email) {
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  const user = await User.findOne({ email: data.email });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Step 2: Generate a fresh long-lived session token (30 days)
  const longLivedToken = generateToken(user, "30d");

  // Step 3: Set the session token as an HttpOnly cookie
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `authToken=${longLivedToken}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict; Secure`,
      "Content-Type": "application/json",
    },
  });
}
