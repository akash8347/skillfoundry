/**
 * JWT Token Management
 * Handle token creation, verification, and refresh
 */

import * as jose from "jose";
import { createLogger } from "./api/logger.js";

const logger = createLogger("JWT");

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
);

const ALGORITHM = "HS256";
const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "7d";

/**
 * Create access token
 */
export async function createAccessToken(payload) {
  try {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: ALGORITHM })
      .setExpirationTime(ACCESS_TOKEN_EXPIRES)
      .setIssuedAt()
      .sign(JWT_SECRET);

    logger.debug("Access token created", { userId: payload.userId });
    return token;
  } catch (error) {
    logger.error("Failed to create access token", error);
    throw error;
  }
}

/**
 * Create refresh token
 */
export async function createRefreshToken(payload) {
  try {
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: ALGORITHM })
      .setExpirationTime(REFRESH_TOKEN_EXPIRES)
      .setIssuedAt()
      .sign(JWT_SECRET);

    logger.debug("Refresh token created", { userId: payload.userId });
    return token;
  } catch (error) {
    logger.error("Failed to create refresh token", error);
    throw error;
  }
}

/**
 * Verify token
 */
export async function verifyToken(token) {
  try {
    const verified = await jose.jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    logger.warn("Token verification failed", { error: error.message });
    return null;
  }
}

/**
 * Create token pair (access + refresh)
 */
export async function createTokenPair(payload) {
  const accessToken = await createAccessToken(payload);
  const refreshToken = await createRefreshToken(payload);

  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES,
  };
}

/**
 * Verify and refresh token if expired
 */
export async function verifyAndRefreshToken(accessToken, refreshToken) {
  let verified = await verifyToken(accessToken);

  // If access token is valid, return it
  if (verified) {
    return {
      valid: true,
      accessToken,
      refreshToken,
    };
  }

  // Try to refresh using refresh token
  verified = await verifyToken(refreshToken);

  if (verified) {
    const newTokenPair = await createTokenPair(verified);
    return {
      valid: true,
      ...newTokenPair,
    };
  }

  return {
    valid: false,
  };
}
