/**
 * Centralized Error Handling
 * Define all API error types and messages
 */

class APIError extends Error {
  constructor(code, message, statusCode = 400, details = null) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.name = "APIError";
  }
}

/**
 * Error Codes & Messages
 */
export const ERROR_CODES = {
  // Authentication Errors (AUTH_xxx)
  AUTH_001: { message: "Invalid credentials", statusCode: 401 },
  AUTH_002: { message: "Token expired or invalid", statusCode: 401 },
  AUTH_003: { message: "Unauthorized access", statusCode: 403 },
  AUTH_004: { message: "User not found", statusCode: 404 },
  AUTH_005: { message: "Email already registered", statusCode: 409 },
  AUTH_006: { message: "Invalid email format", statusCode: 400 },
  AUTH_007: { message: "Password too weak", statusCode: 400 },

  // Payment Errors (PAYMENT_xxx)
  PAYMENT_001: { message: "Payment processing failed", statusCode: 400 },
  PAYMENT_002: { message: "Invalid order ID", statusCode: 404 },
  PAYMENT_003: { message: "Payment already processed", statusCode: 409 },
  PAYMENT_004: { message: "Razorpay API error", statusCode: 502 },
  PAYMENT_005: { message: "Currency not supported", statusCode: 400 },
  PAYMENT_006: { message: "Insufficient amount", statusCode: 400 },

  // Validation Errors (VALIDATION_xxx)
  VALIDATION_001: { message: "Validation failed", statusCode: 400 },
  VALIDATION_002: { message: "Missing required fields", statusCode: 400 },
  VALIDATION_003: { message: "Invalid data type", statusCode: 400 },

  // Course Errors (COURSE_xxx)
  COURSE_001: { message: "Course not found", statusCode: 404 },
  COURSE_002: { message: "Course access denied", statusCode: 403 },
  COURSE_003: { message: "Course already enrolled", statusCode: 409 },
  COURSE_004: { message: "Course content not available", statusCode: 404 },

  // Certificate Errors (CERT_xxx)
  CERT_001: { message: "Certificate generation failed", statusCode: 500 },
  CERT_002: { message: "Certificate not found", statusCode: 404 },
  CERT_003: { message: "Exam not passed", statusCode: 403 },

  // Invoice Errors (INVOICE_xxx)
  INVOICE_001: { message: "Invoice not found", statusCode: 404 },
  INVOICE_002: { message: "Invoice generation failed", statusCode: 500 },

  // Database Errors (DB_xxx)
  DB_001: { message: "Database connection failed", statusCode: 500 },
  DB_002: { message: "Database operation failed", statusCode: 500 },

  // Server Errors (SERVER_xxx)
  SERVER_001: { message: "Internal server error", statusCode: 500 },
  SERVER_002: { message: "Service temporarily unavailable", statusCode: 503 },
  SERVER_003: { message: "Request timeout", statusCode: 504 },

  // Rate Limiting (RATE_xxx)
  RATE_001: { message: "Too many requests", statusCode: 429 },

  // Not Found
  NOT_FOUND: { message: "Resource not found", statusCode: 404 },
};

/**
 * Create API Error
 */
export function createError(code, details = null) {
  const errorInfo = ERROR_CODES[code];
  if (!errorInfo) {
    return new APIError("SERVER_001", "Internal server error", 500, details);
  }
  return new APIError(code, errorInfo.message, errorInfo.statusCode, details);
}

export { APIError };
