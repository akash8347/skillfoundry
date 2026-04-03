/**
 * Authentication API Route - Login/Register
 * POST /api/auth/login
 */

import { connectDB } from "@/lib/db/connection";
import User from "@/models/User";
import { handlePOST } from "@/lib/api/handler";
import { APIResponse, sendResponse } from "@/lib/api/response";
import { validateUserRegistration, sanitizeObject } from "@/lib/validation/schemas";
import { createTokenPair } from "@/lib/auth/tokens";
import { createError } from "@/lib/api/errors";
import { createLogger } from "@/lib/api/logger";

const logger = createLogger("AuthLogin");

/**
 * Handler for login/register
 * Body: { email, password, name?, mobile? }
 */
async function handler(request, body) {
  try {
    await connectDB();

    const { email, password, name, mobile } = body;

    // Basic validation
    if (!email || !password) {
      throw createError("VALIDATION_002", { missingFields: ["email", "password"] });
    }

    // Save new user or verify existing
    let user = await User.findOne({ email });

    // If user doesn't exist, try to register
    if (!user && name && mobile) {
      // Validate registration data
      const validation = validateUserRegistration({ name, email, password, mobile });
      if (!validation.isValid) {
        throw createError("VALIDATION_001", validation.errors);
      }

      // Create new user
      user = new User({
        name: sanitizeObject({ name }).name,
        email,
        mobile,
        courses: [],
        purchases: [],
      });
      await user.save();
      logger.info("New user registered", { email, userId: user._id });
    } else if (!user) {
      throw createError("AUTH_004"); // User not found
    }

    // Create tokens
    const tokens = await createTokenPair({
      userId: user._id.toString(),
      email: user.email,
    });

    return sendResponse(
      APIResponse.success(
        {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
          },
          tokens,
        },
        "Authentication successful"
      )
    );
  } catch (error) {
    if (error.code) throw error;
    logger.error("Login handler error", error);
    throw createError("SERVER_001");
  }
}

export const POST = handlePOST(handler);
