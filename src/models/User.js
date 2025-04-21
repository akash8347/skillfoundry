import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    purchases: [
      {
        razorpay_order_id: String,
        razorpay_payment_id: String,
        createdAt: { type: Date, default: Date.now },
      }
    ],
    certificateNumber: { type: String, unique: true },
    certificateGenerated: { type: Boolean, required: true, default: false },
    certificateName: { type: String }, // ✅ newly added
    passedExam: {
        type: Boolean,
        default: false,
      },
      
  });
  

// Ensure the model isn't registered multiple times
export default mongoose.models.User || mongoose.model("User", UserSchema);
    