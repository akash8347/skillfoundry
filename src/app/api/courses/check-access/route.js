/**
 * Course Access Check API Route
 * POST /api/courses/check-access
 */

import { handlePOST } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";
import { connectDB } from "@/lib/db/connection";
import User from "@/models/User";
import { Types } from "mongoose";

const logger = createLogger("CourseAccess");

async function handler(request, body) {
  try {
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      throw createError("VALIDATION_002", {
        missingFields: ["userId", "courseId"],
      });
    }

    // Validate MongoDB ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      throw createError("VALIDATION_003", { userId: "Invalid user ID format" });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      throw createError("COURSE_002");
    }

    // Check if user has access to course
    const hasAccess = user.courses.some(
      (course) => course.name === courseId
    );

    if (!hasAccess) {
      logger.warn("User course access denied", { userId, courseId });
      throw createError("COURSE_002");
    }

    logger.info("Course access granted", { userId, courseId });

    return sendResponse(
      APIResponse.success(
        { hasAccess: true, courseId },
        "Course access granted"
      )
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Course access check error", error);
    throw createError("COURSE_001");
  }
}

export const POST = handlePOST(handler);
