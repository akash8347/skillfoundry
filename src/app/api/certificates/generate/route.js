/**
 * Certificate Generation API Route
 * POST /api/certificates/generate
 */

import { handlePOST } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";
import { connectDB } from "@/lib/db/connection";
import { findUserById, updateUser } from "@/lib/db/helpers";
import User from "@/models/User";
import { v4 as uuidv4 } from "uuid";

const logger = createLogger("CertificateGenerate");

/**
 * Generate certificate for user
 * Body: { userId, courseId }
 */
async function handler(request, body) {
  try {
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      throw createError("VALIDATION_002", {
        missingFields: ["userId", "courseId"],
      });
    }

    await connectDB();

    // Find user
    const user = await findUserById(userId);

    // Check if user passed exam
    if (!user.passedExam) {
      throw createError("CERT_003");
    }

    // Check if already generated
    if (user.certificateGenerated) {
      return sendResponse(
        APIResponse.success(
          { certificateNumber: user.certificateNumber },
          "Certificate already generated"
        )
      );
    }

    // Generate certificate
    const certificateNumber = `CERT-${Date.now()}-${uuidv4().slice(0, 8)}`.toUpperCase();

    const updated = await updateUser(userId, {
      certificateNumber,
      certificateGenerated: true,
      certificateName: user.name,
    });

    logger.info("Certificate generated", {
      userId,
      certificateNumber,
      courseId,
    });

    return sendResponse(
      APIResponse.success(
        {
          certificateNumber,
          userName: user.name,
          courseId,
          generatedAt: new Date().toISOString(),
        },
        "Certificate generated successfully"
      )
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Certificate generation error", error);
    throw createError("CERT_001");
  }
}

export const POST = handlePOST(handler);
