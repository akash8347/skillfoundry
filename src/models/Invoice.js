import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // FK mapping

    // Customer snapshot (to keep history correct even if user later changes details)
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },

    // Invoice meta
    invoiceNumber: { type: String, required: true, unique: true }, // e.g. INV25-000001
    date: { type: Date, default: Date.now },
    currency: { type: String, required: true }, // USD, EUR, INR etc.

    // Purchased items
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

    // Totals
    subTotal: Number,
    total: Number,
    totalText: String, // e.g. "USD NINETEEN ONLY"

    // For later storing file path (if you decide to save PDF)
    pdfUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
