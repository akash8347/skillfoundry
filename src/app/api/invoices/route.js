// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Invoice from "@/models/Invoice";
// import User from "@/models/User";
// import { startOfDay, endOfDay } from "date-fns";
// import { logMessage , withLogger} from "@/lib/withLogger";
// async function handler(request,context,requestId) {

//     // const requestId = req.headers.get("x-request-id"); // middleware ne bheja tha
//   await logMessage(requestId,{key:"myvalue"});
//   await logMessage(requestId, "Another debug log here...");
//   try {
//     await connectDB();
//     // Sanity check to ensure the User model is loaded, preventing populate errors.
//     User.modelName; 

//     const { searchParams } = new URL(request.url);

//     // --- 1. Parse Filters and Pagination ---
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const limit = parseInt(searchParams.get("limit") || "10", 10);
//     const search = searchParams.get("search") || "";
//     const skip = (page - 1) * limit;

//     // --- 2. Parse Date Range from Frontend ---
//     const startDateParam = searchParams.get("startDate");
//     const endDateParam = searchParams.get("endDate");

//     // Validate date parameters and create a valid date range
//     if (!startDateParam || !endDateParam) {
//       return NextResponse.json(
//         { message: "Missing required startDate or endDate parameters." },
//         { status: 400 }
//       );
//     }
    
//     // Set startDate to the beginning of the day and endDate to the end of the day
//     const startDate = startOfDay(new Date(startDateParam));
//     const endDate = endOfDay(new Date(endDateParam));

//     // --- 3. Construct MongoDB Queries ---
//     const baseQuery = { date: { $gte: startDate, $lte: endDate } };
    
//     const searchQuery = search
//       ? {
//           $or: [
//             { name: { $regex: search, $options: "i" } },
//             { invoiceNumber: { $regex: search, $options: "i" } },
//           ],
//         }
//       : {};
    
//     const tableQuery = { ...baseQuery, ...searchQuery };
    
//     // --- 4. Execute All Database Queries Concurrently ---
//     const [
//         invoicesForTable,
//         totalDocuments,
//         metrics,
//     ] = await Promise.all([ 
//         // Query for paginated table data, populating user details
//         Invoice.find(tableQuery)
//             .populate('user', 'name email mobile')
//             .sort({ date: -1 })
//             .skip(skip)
//             .limit(limit)
//             .lean(),

//         // Query for the total count of documents for pagination
//         Invoice.countDocuments(tableQuery),

//         // Aggregation for metric cards (based on the precise date range only)
//         Invoice.aggregate([
//             { $match: baseQuery },
//             {
//                 $group: {
//                     _id: "$currency",
//                     totalAmount: { $sum: "$total" },
//                     totalINR: { $sum: "$convertedINRAmount" },
//                     count: { $sum: 1 },
//                 },
//             },
//             { $project: { _id: 0, currency: "$_id", totalAmount: 1, totalINR: 1, count: 1 } },
//         ]),
//     ]);

//     // --- 5. Process Metrics ---
//     const totalINR = metrics.reduce((sum, item) => sum + item.totalINR, 0);
//     const invoiceCount = metrics.reduce((sum, item) => sum + item.count, 0);

//     // --- 6. Assemble the Final JSON Response ---
//     // Note: Chart data is removed as it's no longer displayed in the new UI.
//     // It can be added back with a new aggregation if needed.
//     const responsePayload = {
//       metrics: {
//         totalINR,
//         invoiceCount,
//         salesByCurrency: metrics,
//       },
//       tableData: {
//         invoices: invoicesForTable,
//         totalPages: Math.ceil(totalDocuments / limit),
//         currentPage: page,
//       },
//     };

//     return NextResponse.json(responsePayload);

//   } catch (error) {
//     console.error("API Route Error:", error);
//     return NextResponse.json(
//       { message: "An error occurred on the server.", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export const GET = withLogger(handler);


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import User from "@/models/User";
import { startOfDay, endOfDay } from "date-fns";
import { logMessage, withLogger } from "@/lib/withLogger";

async function handler(request, context, requestId) {
  await logMessage(requestId, { msg: "Invoice fetch start" });

  try {
    await connectDB();
    User.modelName; // Sanity check

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (!startDateParam || !endDateParam) {
      return NextResponse.json(
        { message: "Missing required startDate or endDate parameters." },
        { status: 400 }
      );
    }

    const startDate = startOfDay(new Date(startDateParam));
    const endDate = endOfDay(new Date(endDateParam));

    // ---- 1️⃣ Base Query ----
    const baseQuery = { date: { $gte: startDate, $lte: endDate } };
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { invoiceNumber: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const tableQuery = { ...baseQuery, ...searchQuery };

    // ---- 2️⃣ Fast metrics first ----
    // Very lightweight aggregation (should return instantly)
    const metricsAgg = await Invoice.aggregate([
      { $match: baseQuery },
      {
        $group: {
          _id: "$currency",
          totalAmount: { $sum: "$total" },
          totalINR: { $sum: "$convertedINRAmount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          currency: "$_id",
          totalAmount: 1,
          totalINR: 1,
          count: 1,
        },
      },
    ]);

    const totalINR = metricsAgg.reduce((sum, item) => sum + item.totalINR, 0);
    const invoiceCount = metricsAgg.reduce((sum, item) => sum + item.count, 0);

    // Immediately send a fast partial response for metrics
    const initialPayload = {
      metrics: {
        totalINR,
        invoiceCount,
        salesByCurrency: metricsAgg,
      },
      tableData: null, // Will be filled later
      status: "metrics_ready",
    };

    // ---- 3️⃣ Start long-running table query (non-blocking) ----
    const tablePromise = (async () => {
      const [invoices, totalDocuments] = await Promise.all([
        Invoice.find(tableQuery)
          .populate("user", "name email mobile")
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Invoice.countDocuments(tableQuery),
      ]);

      return {
        invoices,
        totalPages: Math.ceil(totalDocuments / limit),
        currentPage: page,
      };
    })();

    // ---- 4️⃣ Wait for table data in background ----
    const tableData = await tablePromise;
    initialPayload.tableData = tableData;
    initialPayload.status = "complete";

    return NextResponse.json(initialPayload);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { message: "An error occurred on the server.", error: error.message },
      { status: 500 }
    );
  }
}

export const GET = withLogger(handler);
