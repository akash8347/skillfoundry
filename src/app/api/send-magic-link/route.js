import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { generateToken } from "../../../lib/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return Response.json({ error: "A valid email is required." }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    const token = generateToken(user, "10m");
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const magicLink = `${baseUrl}/auth/verify?token=${token}`;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY, // <-- set this in your .env file
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Skill Foundry", email: "akashgohil.av@gmail.com" }, // Replace with Brevo verified sender
        // to: [{ email }],
        to: [{ email }],

        subject: "Your login Login Link",
        htmlContent: `
  <div style="font-family: sans-serif; padding: 24px;">
    <h2 style="color: #333;">Hello ${user.name || "there"},</h2>
    <p>Click the button below to log in to <strong>Skill Foundry</strong>:</p>
    <a href="${magicLink}" style="display:inline-block; padding: 12px 20px; background:#4f46e5; color:#fff; border-radius:6px; text-decoration:none;">Login Now</a>
    <p style="margin-top: 16px;">This link will expire in 10 minutes.</p>
    <hr style="margin: 32px 0; border: none; border-top: 1px solid #ccc;">
    <p style="font-size: 0.85em; color: #666;">
      You received this email because you requested a login link for Skill Foundry.<br>
      Skill Foundry, Mumbai, IN<br>
    </p>
  </div>
`

      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Email send error:", data);
      return Response.json({ error: "Failed to send email." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending magic link:", error);
    return Response.json(
      { error: "Failed to send magic link. Please try again later." },
      { status: 500 }
    );
  }
}
