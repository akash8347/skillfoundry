/**
 * Environment Variable Validation
 * Ensures all required env vars are set at application startup
 */

export function validateEnvironment() {
  const required = [
    "MONGODB_URI",
    "RAZORPAY_KEY_ID",
    "RAZORPAY_KEY_SECRET",
    "JWT_SECRET",
    "NEXT_PUBLIC_API_BASE_URL",
  ];

  const optional = [
    "NODEMAILER_EMAIL",
    "NODEMAILER_PASSWORD",
    "SENDGRID_API_KEY",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return {
    mongodb: process.env.MONGODB_URI,
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID,
      keySecret: process.env.RAZORPAY_KEY_SECRET,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    nodeEnv: process.env.NODE_ENV || "development",
  };
}

/**
 * Get environment configuration
 */
export const getConfig = () => {
  return {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
    isStaging: process.env.NODE_ENV === "staging",
    mongodb: process.env.MONGODB_URI,
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID,
      keySecret: process.env.RAZORPAY_KEY_SECRET,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    },
  };
};
