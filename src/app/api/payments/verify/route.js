/**
 * Payment Verification API Route
 * POST /api/payments/verify
 */

import { handlePOST } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";
import { connectDB } from "@/lib/db/connection";
import User from "@/models/User";
import Invoice from "@/models/Invoice";
import crypto from "crypto";
import { number } from "number-to-words";

const logger = createLogger("PaymentVerify");

async function handler(request, body) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw createError("VALIDATION_002", {
        missingFields: ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"],
      });
    }

    // Verify signature
    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(message)
      .digest("hex");

    if (signature !== razorpay_signature) {
      logger.warn("Invalid payment signature", { razorpay_order_id });
      throw createError("PAYMENT_001");
    }

    await connectDB();

    // Check if payment already processed
    const existingInvoice = await Invoice.findOne({ razorpay_payment_id });
    if (existingInvoice) {
      throw createError("PAYMENT_003");
    }

    logger.info("Payment verified successfully", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

    return sendResponse(
      APIResponse.success(
        { orderId: razorpay_order_id, paymentId: razorpay_payment_id },
        "Payment verified"
      )
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Payment verification error", error);
    throw createError("PAYMENT_001");
  }
}

export const POST = handlePOST(handler);
