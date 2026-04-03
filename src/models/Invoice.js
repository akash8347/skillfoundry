import mongoose from "mongoose";

/**
 * Invoice Schema
 * Stores generated invoices with payment and customer information
 */
const InvoiceSchema = new mongoose.Schema(
  {
    // User Reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Customer Information (snapshot at time of purchase)
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: String,
    postalCode: String,

    // Invoice Metadata
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    date: { type: Date, default: Date.now, index: true },
    currency: { type: String, required: true, index: true },

    // Purchased Items
    items: [
      {
        sr: Number,
        description: String,
        hsn: { type: String, default: "998431" },
        qty: { type: Number, default: 1 },
        rate: Number,
        amount: Number,
      },
    ],

    // Financial Information
    subTotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true, index: true },
    totalText: String, // e.g., "USD NINETEEN ONLY"
    convertedINRAmount: Number, // For records
    exchangeRate: Number,

    // Payment References
    razorpay_order_id: { type: String, index: true },
    razorpay_payment_id: { type: String, unique: true, index: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    // File Storage
    pdfUrl: String,

    // Additional Notes
    notes: String,
    isRefunded: { type: Boolean, default: false },
    refundAmount: Number,
    refundDate: Date,
  },
  { timestamps: true }
);

// Create indexes for better query performance
InvoiceSchema.index({ user: 1, createdAt: -1 });
InvoiceSchema.index({ email: 1, createdAt: -1 });
InvoiceSchema.index({ paymentStatus: 1, createdAt: -1 });

// Pre-save middleware
InvoiceSchema.pre("save", function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
