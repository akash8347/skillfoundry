import { connectDB } from "@/lib/mongodb";
import Log from "@/models/log";
import { v4 as uuidv4 } from "uuid";

export async function logMessage(requestId, ...messages) {

  console.log(requestId,...messages)
  try {
    await connectDB();

    // console.log jaisa: sab ko readable string/object banado
    const normalized = messages.map(m => {
      if (typeof m === "string") return m;
      if (m instanceof Error) return { error: m.message, stack: m.stack };
      try {
        return JSON.parse(JSON.stringify(m)); // safe clone
      } catch {
        return String(m);
      }
    });

    await Log.findOneAndUpdate(
      { requestId },
      { $push: { messages: { $each: normalized } } },
      { upsert: true, new: true }
    );
  } catch (e) {
    console.error("logMessage failed:", e.message);
  }
}


export function withLogger(handler) {
  return async function (req, context) {
    const requestId = uuidv4();
    const { pathname } = new URL(req.url);
    const method = req.method;

    let status = 200;
    let response;

    try {
      // run original API logic
      response = await handler(req, context, requestId);
      status = response?.status || 200;
    } catch (err) {
      status = 500;
      response = new Response(
        JSON.stringify({ error: err.message }),
        { status: 500 }
      );
    }

    // save base log entry (upsert + fire & forget)
    (async () => {
      try {
        await connectDB();
        await Log.findOneAndUpdate(
          { requestId },
          {
            $setOnInsert: {
              requestId,
              method,
              route: pathname,
              host: req.headers.get("host"),
              createdAt: new Date(),
            },
            $set: { status }, // status hamesha update hoga
          },
          { upsert: true, new: true }
        );
      } catch (e) {
        console.error("Log save failed:", e.message);
      }
    })();

    return response;
  };
}
