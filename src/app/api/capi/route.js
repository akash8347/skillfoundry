// // app/api/capi/route.js
// import { NextResponse } from "next/server";
// import crypto from "crypto";

// const API_VERSION = process.env.META_GRAPH_API_VERSION || "v20.0";
// const DATASET_ID = process.env.META_DATASET_ID;
// const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

// function sha256(value) {
//   if (!value) return undefined;
//   return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
// }

// export async function POST(request) {
//   try {
//     console.log("CAPI event request received");
//     const body = await request.json();

//     const {
//       event_name = "Purchase",
//       event_id,
//       event_source_url,
//       custom_data = {},
//       email,
//       phone,
//       test_event_code
//     } = body;

//     if (!DATASET_ID || !ACCESS_TOKEN) {
//       return NextResponse.json({ error: "Server config missing META_DATASET_ID or META_ACCESS_TOKEN" }, { status: 500 });
//     }

//     // fallback event_id if client didn't send (not recommended)
//     const eventIdToSend = event_id || ('ev_server_' + Date.now().toString(36) + Math.random().toString(36).slice(2));

//     // Build user_data for matching (hash PII)
//     const user_data = {
//       client_user_agent: request.headers.get('user-agent') || undefined
//     };

//     const xff = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
//     if (xff) user_data.client_ip_address = String(xff).split(',')[0].trim();

//     if (email) user_data.em = [sha256(email)];
//     if (phone) user_data.ph = [sha256(phone)];

//     const eventPayload = {
//       event_name,
//       event_time: Math.floor(Date.now() / 1000),
//       event_id: eventIdToSend,
//       action_source: "website",
//       event_source_url: event_source_url || undefined,
//       user_data,
//       custom_data,
//       ...(test_event_code ? { test_event_code } : {})
//     };

//     const payload = { data: [eventPayload] };

//     const url = `https://graph.facebook.com/${API_VERSION}/${DATASET_ID}/events?access_token=${ACCESS_TOKEN}`;

//     console.log("CAPI payload:", JSON.stringify(payload, null, 2));

//     const resp = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });
//     console.log("CAPI response status:", resp.status);

//     const metaJson = await resp.json();

//     return NextResponse.json({ ok: true, metaResponse: metaJson });
//   } catch (err) {
//     return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//   }
// }



// app/api/capi/route.js
// import { NextResponse } from "next/server";
// import crypto from "crypto";

// // ... (sha256 function and constants are the same)
// const API_VERSION = process.env.META_GRAPH_API_VERSION || "v20.0";
// const DATASET_ID = process.env.META_DATASET_ID;
// const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

// function sha256(value) {
//   if (!value) return undefined;
//   return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
// }


// export async function POST(request) {
//   try {
//     console.log("CAPI event request received");
//     const body = await request.json();

//     const {
//       event_name = "Purchase",
//       event_id,
//       event_source_url,
//       custom_data = {},
//       email,
//       phone,
//       test_event_code
//     } = body;

//     if (!DATASET_ID || !ACCESS_TOKEN) {
//       return NextResponse.json({ error: "Server config missing META_DATASET_ID or META_ACCESS_TOKEN" }, { status: 500 });
//     }

//     const eventIdToSend = event_id || ('ev_server_' + Date.now().toString(36) + Math.random().toString(36).slice(2));

//     const user_data = {
//       client_user_agent: request.headers.get('user-agent') || undefined
//     };

//     //
//     // ✅ START: MODIFIED IP ADDRESS LOGIC
//     //
//     const xff = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
//     if (xff) {
//       const ip = String(xff).split(',')[0].trim();
//       // Only add the IP if it's NOT a localhost address
//       if (ip !== '::1' && ip !== '127.0.0.1') {
//         user_data.client_ip_address = ip;
//       }
//     }
//     // ✅ END: MODIFIED IP ADDRESS LOGIC
//     //

//     if (email) user_data.em = [sha256(email)];
//     if (phone) user_data.ph = [sha256(phone)];

//     const eventPayload = {
//       event_name,
//       event_time: Math.floor(Date.now() / 1000),
//       event_id: eventIdToSend,
//       action_source: "website",
//       event_source_url: event_source_url || undefined,
//       user_data,
//       custom_data,
//       ...(test_event_code ? { test_event_code } : {})
//     };

//     const payload = { data: [eventPayload] };
//     const url = `https://graph.facebook.com/${API_VERSION}/${DATASET_ID}/events?access_token=${ACCESS_TOKEN}`;

//     console.log("CAPI payload:", JSON.stringify(payload, null, 2));

//     const resp = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });

//     console.log("CAPI response status:", resp.status);
//     const metaJson = await resp.json();

//     // For better debugging, log the error if Meta sends one
//     if (!resp.ok) {
//         console.error("Meta CAPI Error Response:", metaJson);
//     }

//     return NextResponse.json({ ok: resp.ok, metaResponse: metaJson });

//   } catch (err) {
//     return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
//   }
// }


// app/api/capi/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import { datasetMapper } from "@/lib/datasetMapper";
import { codeToCurrency } from "@/lib/currencyMapper";
import { getInitialCurrency } from "@/lib/getInitialCurrency";

// ... (sha256 function and constants are the same)
const API_VERSION = process.env.META_GRAPH_API_VERSION || "v20.0";


// const DATASET_ID = process.env.META_DATASET_ID;
// const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

function sha256(value) {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(String(value).trim().toLowerCase()).digest("hex");
}


export async function POST(request) {
  const { currency } = await getInitialCurrency(); // server call
  const datasetConfig = datasetMapper[currency];
  if (!datasetConfig) {
    return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
  }

  const { datasetId:DATASET_ID,accessToken: ACCESS_TOKEN } = datasetConfig;
  // console.log("CAPI using datasetConfig:", datasetConfig);
  // return NextResponse.json({ msg: datasetConfig }, { status: 500 });


  try {
    const body = await request.json();

    const {
      event_name = "Purchase",
      event_id,
      event_source_url,
      custom_data = {},
      email,
      phone,
      fbp, // <-- 1. Destructure fbp
      fbc,
      test_event_code
    } = body;

    if (!DATASET_ID || !ACCESS_TOKEN) {
      return NextResponse.json({ error: "Server config missing META_DATASET_ID or META_ACCESS_TOKEN" }, { status: 500 });
    }

    const eventIdToSend = event_id || ('ev_server_' + Date.now().toString(36) + Math.random().toString(36).slice(2));

    const user_data = {
      client_user_agent: request.headers.get('user-agent') || undefined,
      ...(fbp && { fbp: fbp }),
      ...(fbc && { fbc: fbc }),
    };

    const xff = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    if (xff) {
      const ip = String(xff).split(',')[0].trim();
      if (ip !== '::1' && ip !== '127.0.0.1') {
        user_data.client_ip_address = ip;
      }
    }

    if (email) user_data.em = [sha256(email)];
    if (phone) user_data.ph = [sha256(phone)];

    // 1. REMOVE test_event_code from this object
    const eventPayload = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventIdToSend,
      action_source: "website",
      event_source_url: event_source_url || undefined,
      user_data,
      custom_data,
    };

    // 2. ADD test_event_code to this top-level payload object
    const payload = {
      data: [eventPayload],
      ...(test_event_code ? { test_event_code } : {})
    };

    const url = `https://graph.facebook.com/${API_VERSION}/${DATASET_ID}/events?access_token=${ACCESS_TOKEN}`;

    // console.log("CAPI payload:", JSON.stringify(payload, null, 2));

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    // console.log("CAPI response status:", resp.status);
    const metaJson = await resp.json();

    if (!resp.ok) {
      console.error("Meta CAPI Error Response:", metaJson);
    }

    return NextResponse.json({ ok: resp.ok, metaResponse: metaJson });

  } catch (err) {
    console.error("CAPI Exception:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}