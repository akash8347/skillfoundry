import mongoose from "mongoose";

/**
 * User Schema
 * Stores user information, courses, purchases, and certification data
 */
const UserSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    mobile: {
      type: String,
      required: true,
      index: true,
    },

    // Purchase History
    purchases: [
      {
        razorpay_order_id: String,
        razorpay_payment_id: { type: String, index: true },
        courseId: String,
        amount: Number,
        currency: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Enrolled Courses
    courses: [
      {
        name: String, // course identifier
        purchasedAt: { type: Date, default: Date.now },
        amount: Number,
        currency: String,
        completedLessons: [String],
        progress: { type: Number, default: 0 }, // 0-100
      },
    ],

    // Certification Data
    certificateNumber: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null values
      index: true,
    },
    certificateGenerated: {
      type: Boolean,
      default: false,
      index: true,
    },
    certificateName: String,
    passedExam: {
      type: Boolean,
      default: false,
      index: true,
    },
    examScore: Number,

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    lastLoginAt: Date,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create indexes for better query performance
UserSchema.index({ email: 1, createdAt: -1 });
UserSchema.index({ mobile: 1 });
UserSchema.index({ "courses.name": 1 });

// Pre-save middleware for validation
UserSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

// Ensure the model isn't registered multiple times
export default mongoose.models.User || mongoose.model("User", UserSchema);
    