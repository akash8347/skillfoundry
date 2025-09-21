import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    requestId: { type: String, required: true, index: true }, 
    time: { type: Date, default: Date.now }, // index hata diya
    method: { type: String, required: true },
    status: { type: Number, required: true },
    route: { type: String, required: true },
    host: { type: String },
    messages: [{ type: mongoose.Schema.Types.Mixed }], // 👈 allow anything
  },
  { timestamps: true }
);

// ✅ TTL index — 48 hours me auto delete
LogSchema.index({ time: 1 }, { expireAfterSeconds: 60 * 60 * 48 });

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
