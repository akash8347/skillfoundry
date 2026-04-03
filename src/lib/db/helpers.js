/**
 * Database Helper Functions
 * Common database operations with error handling
 */

import { connectDB } from "./connection";
import User from "@/models/User";
import Invoice from "@/models/Invoice";
import { createLogger } from "../api/logger";
import { createError } from "../api/errors";
import { Types } from "mongoose";

const logger = createLogger("DBHelpers");

/**
 * Find user by ID
 */
export async function findUserById(userId) {
  try {
    if (!Types.ObjectId.isValid(userId)) {
      throw createError("VALIDATION_003", { userId: "Invalid user ID" });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      throw createError("AUTH_004");
    }

    return user;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Find user error", error);
    throw createError("DB_002");
  }
}

/**
 * Find user by email
 */
export async function findUserByEmail(email) {
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw createError("AUTH_004");
    }

    return user;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Find user by email error", error);
    throw createError("DB_002");
  }
}

/**
 * Create new user
 */
export async function createUser(userData) {
  try {
    await connectDB();

    const existing = await User.findOne({ email: userData.email.toLowerCase() });
    if (existing) {
      throw createError("AUTH_005");
    }

    const user = new User({
      ...userData,
      email: userData.email.toLowerCase(),
    });

    await user.save();
    logger.info("User created", { userId: user._id, email: user.email });
    return user;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Create user error", error);
    throw createError("DB_002");
  }
}

/**
 * Update user
 */
export async function updateUser(userId, updateData) {
  try {
    if (!Types.ObjectId.isValid(userId)) {
      throw createError("VALIDATION_003", { userId: "Invalid user ID" });
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      throw createError("AUTH_004");
    }

    logger.info("User updated", { userId });
    return user;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Update user error", error);
    throw createError("DB_002");
  }
}

/**
 * Add course to user
 */
export async function enrollUserInCourse(userId, courseData) {
  try {
    const user = await findUserById(userId);

    // Check if already enrolled
    const alreadyEnrolled = user.courses.some((c) => c.name === courseData.name);
    if (alreadyEnrolled) {
      throw createError("COURSE_003");
    }

    user.courses.push(courseData);
    await user.save();

    logger.info("User enrolled in course", { userId, courseId: courseData.name });
    return user;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Enroll user error", error);
    throw createError("DB_002");
  }
}

/**
 * Add purchase to user
 */
export async function addPurchaseToUser(userId, purchaseData) {
  try {
    const user = await findUserById(userId);
    user.purchases.push(purchaseData);
    await user.save();

    logger.info("Purchase added", { userId, paymentId: purchaseData.razorpay_payment_id });
    return user;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Add purchase error", error);
    throw createError("DB_002");
  }
}

/**
 * Create invoice
 */
export async function createInvoice(invoiceData) {
  try {
    await connectDB();

    const invoice = new Invoice(invoiceData);
    await invoice.save();

    logger.info("Invoice created", {
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
    });
    return invoice;
  } catch (error) {
    logger.error("Create invoice error", error);
    throw createError("INVOICE_002");
  }
}

/**
 * Find invoice
 */
export async function findInvoice(filters) {
  try {
    await connectDB();
    const invoice = await Invoice.findOne(filters);

    if (!invoice) {
      throw createError("INVOICE_001");
    }

    return invoice;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Find invoice error", error);
    throw createError("DB_002");
  }
}

/**
 * Find invoices for user
 */
export async function findUserInvoices(userId, limit = 10, skip = 0) {
  try {
    await connectDB();

    const invoices = await Invoice.find({ user: userId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Invoice.countDocuments({ user: userId });

    return {
      data: invoices,
      total,
      limit,
      skip,
    };
  } catch (error) {
    logger.error("Find user invoices error", error);
    throw createError("DB_002");
  }
}

/**
 * Update invoice
 */
export async function updateInvoice(invoiceId, updateData) {
  try {
    await connectDB();

    const invoice = await Invoice.findByIdAndUpdate(invoiceId, updateData, {
      new: true,
    });

    if (!invoice) {
      throw createError("INVOICE_001");
    }

    logger.info("Invoice updated", { invoiceId });
    return invoice;
  } catch (error) {
    if (error.code) throw error;
    logger.error("Update invoice error", error);
    throw createError("DB_002");
  }
}
