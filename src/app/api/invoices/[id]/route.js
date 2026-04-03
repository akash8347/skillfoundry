/**
 * Invoice Retrieval API Route
 * GET /api/invoices/:id
 */

import { handleGET } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";
import { connectDB } from "@/lib/db/connection";
import { findInvoice } from "@/lib/db/helpers";
import { Types } from "mongoose";

const logger = createLogger("InvoiceGet");

async function handler(request) {
  try {
    const invoiceId = request.nextUrl.pathname.split("/").pop();

    if (!invoiceId || !Types.ObjectId.isValid(invoiceId)) {
      throw createError("VALIDATION_003", { invoiceId: "Invalid invoice ID" });
    }

    await connectDB();

    const invoice = await findInvoice({ _id: new Types.ObjectId(invoiceId) });

    logger.info("Invoice retrieved", { invoiceId });

    return sendResponse(
      APIResponse.success(invoice, "Invoice retrieved successfully")
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Invoice retrieval error", error);
    throw createError("INVOICE_001");
  }
}

export const GET = handleGET(handler);
