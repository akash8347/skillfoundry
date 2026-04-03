/**
 * Payment Order Creation API Route
 * POST /api/payments/create-order
 */

import { handlePOST } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { validatePaymentData } from "@/lib/validation/schemas";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";
import { connectDB } from "@/lib/db/connection";
import User from "@/models/User";
import Razorpay from "razorpay";

const logger = createLogger("PaymentOrder");

async function handler(request, body) {
  try {
    const { name, email, mobile, courseId, amount, currency } = body;

    // Validate payment data
    const validation = validatePaymentData({ amount, currency, email });
    if (!validation.isValid) {
      throw createError("VALIDATION_001", validation.errors);
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Convert amount to smallest currency unit (paise for INR, cents for USD)
    const amountInSmallestUnit = Math.round(amount * 100);

    const orderOptions = {
      amount: amountInSmallestUnit,
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        name,
        email,
        mobile,
        courseId,
        courseType: courseId,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    logger.info("Razorpay order created", {
      orderId: order.id,
      email,
      amount: amount,
      currency,
    });

    return sendResponse(
      APIResponse.success(
        {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: process.env.RAZORPAY_KEY_ID,
        },
        "Order created successfully"
      )
    );
  } catch (error) {
    if (error.code) throw error;

    if (error.statusCode === 400) {
      logger.warn("Razorpay API error", error);
      throw createError("PAYMENT_004");
    }

    logger.error("Payment order creation error", error);
    throw createError("PAYMENT_001");
  }
}

export const POST = handlePOST(handler);
