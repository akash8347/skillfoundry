import mongoose from "mongoose";

const ProcessedEventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },
    processedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


// ✅ TTL index — 120 hours me auto delete
ProcessedEventSchema.index(
  { processedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 120 }
);
export default mongoose.models.Processed || mongoose.model("Processed", ProcessedEventSchema);
