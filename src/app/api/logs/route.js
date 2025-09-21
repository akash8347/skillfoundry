import { connectDB } from "@/lib/mongodb";
import Log from "@/models/log";

export async function GET(req) {
  try {
    await connectDB();

    // sirf last 48 hours ke logs
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const logs = await Log.find({ createdAt: { $gte: since } })
      .sort({ createdAt: -1 }) // latest first
      .limit(200); // limit for performance

    return new Response(JSON.stringify(logs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
