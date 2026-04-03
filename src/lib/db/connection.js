/**
 * Database Connection Manager
 * Improved version with better error handling and logging
 */

import mongoose from "mongoose";
import { createLogger } from "../api/logger.js";

const logger = createLogger("Database");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

/**
 * Global mongoose cache
 */
let cached = global.mongoose || { conn: null, promise: null };

/**
 * Connect to MongoDB
 */
export async function connectDB() {
  // Return existing connection
  if (cached.conn) {
    logger.debug("Using existing database connection");
    return cached.conn;
  }

  // If connection in progress, wait for it
  if (!cached.promise) {
    try {
      logger.info("Initiating database connection");

      const conn = await mongoose.connect(MONGODB_URI, {
        maxPoolSize: 10,
        minPoolSize: 2,
      });

      cached.promise = Promise.resolve(conn);
      logger.info("Database connected successfully");
    } catch (error) {
      logger.error("Database connection failed", error);
      cached.promise = null;
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB() {
  try {
    if (cached.conn) {
      await mongoose.disconnect();
      cached.conn = null;
      cached.promise = null;
      logger.info("Database disconnected");
    }
  } catch (error) {
    logger.error("Database disconnection failed", error);
    throw error;
  }
}

/**
 * Get connection status
 */
export function getConnectionStatus() {
  return {
    connected: mongoose.connection.readyState === 1,
    state: mongoose.connection.readyState,
    database: mongoose.connection.name,
  };
}

/**
 * Execute operation with DB connection
 */
export async function executeWithDB(operation) {
  try {
    await connectDB();
    return await operation();
  } catch (error) {
    logger.error("Database operation failed", error);
    throw error;
  }
}
