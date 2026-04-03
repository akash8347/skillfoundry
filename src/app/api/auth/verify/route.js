/**
 * Token Verification API Route
 * GET /api/auth/verify
 */

import { verifyToken } from "@/lib/auth/tokens";
import { handleGET } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";

const logger = createLogger("AuthVerify");

async function handler(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError("AUTH_002");
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload) {
      throw createError("AUTH_002");
    }

    return sendResponse(
      APIResponse.success({ user: payload }, "Token valid")
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Token verification error", error);
    throw createError("AUTH_002");
  }
}

export const GET = handleGET(handler);
