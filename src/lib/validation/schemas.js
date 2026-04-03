/**
 * Input Validation Schemas and Validators
 * Using simple validation - can be replaced with Zod/Yup if needed
 */

export const VALIDATION_SCHEMAS = {
  // Email validation
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },

  // Phone validation (international format)
  phone: {
    pattern: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
    message: "Invalid phone number",
  },

  // Strong password (min 8 chars, uppercase, lowercase, number, special char)
  strongPassword: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "Password must contain uppercase, lowercase, number, and special character",
  },

  // MongoDB ObjectId
  mongoId: {
    pattern: /^[0-9a-fA-F]{24}$/,
    message: "Invalid ID format",
  },

  // UUID
  uuid: {
    pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Invalid UUID format",
  },

  // Currency code (3 letters)
  currencyCode: {
    pattern: /^[A-Z]{3}$/,
    message: "Invalid currency code",
  },

  // ISO Country code
  countryCode: {
    pattern: /^[A-Z]{2}$/,
    message: "Invalid country code",
  },
};

/**
 * Validate field against pattern
 */
export function validateField(value, schemaKey) {
  const schema = VALIDATION_SCHEMAS[schemaKey];
  if (!schema) {
    throw new Error(`Unknown validation schema: ${schemaKey}`);
  }
  return schema.pattern.test(value);
}

/**
 * Validate user registration data
 */
export function validateUserRegistration(data) {
  const errors = {};

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email || !validateField(data.email, "email")) {
    errors.email = VALIDATION_SCHEMAS.email.message;
  }

  if (!data.mobile || !validateField(data.mobile, "phone")) {
    errors.mobile = VALIDATION_SCHEMAS.phone.message;
  }

  if (!data.password || !validateField(data.password, "strongPassword")) {
    errors.password = VALIDATION_SCHEMAS.strongPassword.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate payment data
 */
export function validatePaymentData(data) {
  const errors = {};

  if (!data.amount || typeof data.amount !== "number" || data.amount <= 0) {
    errors.amount = "Amount must be a positive number";
  }

  if (!data.currency || !validateField(data.currency, "currencyCode")) {
    errors.currency = VALIDATION_SCHEMAS.currencyCode.message;
  }

  if (data.email && !validateField(data.email, "email")) {
    errors.email = VALIDATION_SCHEMAS.email.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate course enrollment request
 */
export function validateCourseEnrollment(data) {
  const errors = {};

  if (!data.userId || !validateField(data.userId, "mongoId")) {
    errors.userId = VALIDATION_SCHEMAS.mongoId.message;
  }

  if (!data.courseId || typeof data.courseId !== "string" || data.courseId.trim().length === 0) {
    errors.courseId = "Course ID is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize input (prevent XSS)
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return input;
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Validate and sanitize object
 */
export function sanitizeObject(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.keys(obj).reduce((acc, key) => {
    let value = obj[key];
    if (typeof value === "string") {
      value = sanitizeInput(value);
    } else if (typeof value === "object" && value !== null) {
      value = sanitizeObject(value);
    }
    acc[key] = value;
    return acc;
  }, {});
}
