/**
 * API Route Handler Wrapper
 * Provides consistent error handling, logging, and response formatting
 */

import { createLogger } from "./api/logger.js";
import { sendResponse, APIResponse } from "./api/response.js";
import { APIError, createError } from "./api/errors.js";

/**
 * Wrap API route handler
 */
export function createApiHandler(handler, options = {}) {
  const { method = "POST", requireAuth = false, validateBody = null, logger: customLogger = null } = options;

  return async (request) => {
    const logger = customLogger || createLogger("API");
    const startTime = Date.now();

    try {
      // Method validation
      if (request.method !== method) {
        return sendResponse(
          APIResponse.error("METHOD_NOT_ALLOWED", `Method ${request.method} not allowed`, 405)
        );
      }

      // Get request ID from middleware
      const requestId = request.headers.get("x-request-id") || "unknown";

      logger.info(`${method} ${request.nextUrl.pathname} - START`, { requestId });

      let body = null;

      // Parse body for POST/PUT/PATCH
      if (["POST", "PUT", "PATCH"].includes(method)) {
        try {
          body = await request.json();
        } catch (error) {
          logger.warn("Invalid JSON body", error);
          return sendResponse(
            APIResponse.error("INVALID_JSON", "Request body must be valid JSON", 400)
          );
        }
      }

      // Validate body if schema provided
      if (validateBody && body) {
        const validation = validateBody(body);
        if (!validation.isValid) {
          return sendResponse(
            APIResponse.error(
              "VALIDATION_001",
              "Validation failed",
              400,
              validation.errors
            )
          );
        }
      }

      // Call actual handler
      const result = await handler(request, body);

      const duration = Date.now() - startTime;
      logger.info(`${method} ${request.nextUrl.pathname} - SUCCESS (${duration}ms)`, {
        requestId,
        duration,
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Handle API errors
      if (error instanceof APIError) {
        logger.error(
          `${method} ${request.nextUrl.pathname} - ERROR (${duration}ms)`,
          error,
          { statusCode: error.statusCode }
        );
        return sendResponse(
          APIResponse.error(error.code, error.message, error.statusCode, error.details)
        );
      }

      // Handle unexpected errors
      logger.error(`${method} ${request.nextUrl.pathname} - UNHANDLED ERROR (${duration}ms)`, error);

      return sendResponse(
        APIResponse.error(
          "SERVER_001",
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
          500
        )
      );
    }
  };
}

/**
 * Handle GET request
 */
export function handleGET(handler, options = {}) {
  return createApiHandler(handler, { method: "GET", ...options });
}

/**
 * Handle POST request
 */
export function handlePOST(handler, options = {}) {
  return createApiHandler(handler, { method: "POST", ...options });
}

/**
 * Handle PUT request
 */
export function handlePUT(handler, options = {}) {
  return createApiHandler(handler, { method: "PUT", ...options });
}

/**
 * Handle DELETE request
 */
export function handleDELETE(handler, options = {}) {
  return createApiHandler(handler, { method: "DELETE", ...options });
}
