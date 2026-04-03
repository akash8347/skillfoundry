/**
 * User Invoices List API Route
 * GET /api/invoices/list?page=1&limit=10
 */

import { handleGET } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";
import { connectDB } from "@/lib/db/connection";
import { findUserInvoices, findUserById } from "@/lib/db/helpers";

const logger = createLogger("InvoicesList");

async function handler(request) {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!userId) {
      throw createError("VALIDATION_002", { missingFields: ["userId"] });
    }

    if (page < 1 || limit < 1 || limit > 100) {
      throw createError("VALIDATION_003", {
        page: "Page must be >= 1",
        limit: "Limit must be between 1 and 100",
      });
    }

    await connectDB();

    // Verify user exists
    await findUserById(userId);

    const skip = (page - 1) * limit;
    const result = await findUserInvoices(userId, limit, skip);

    logger.info("User invoices retrieved", { userId, page, limit, total: result.total });

    return sendResponse(
      APIResponse.paginated(
        result.data,
        result.total,
        page,
        limit,
        "Invoices retrieved successfully"
      )
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Invoices list error", error);
    throw createError("INVOICE_001");
  }
}

export const GET = handleGET(handler);
