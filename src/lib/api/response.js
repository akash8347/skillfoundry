/**
 * API Response Formatter
 * Standardizes all API responses across the application
 */

export class APIResponse {
  /**
   * Success response
   */
  static success(data, message = "Success", statusCode = 200) {
    return {
      status: "success",
      data,
      message,
      code: statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Error response
   */
  static error(errorCode, message, statusCode = 400, details = null) {
    return {
      status: "error",
      error: errorCode,
      message,
      code: statusCode,
      ...(details && { details }),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Paginated response
   */
  static paginated(data, total, page, limit, message = "Success") {
    return {
      status: "success",
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Convert APIResponse to NextResponse
 */
export function sendResponse(response) {
  const { code, ...rest } = response;
  return Response.json(rest, { status: code });
}
