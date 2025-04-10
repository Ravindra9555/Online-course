import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "INR"
  },
  paymentStatus: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created"
  },
  razorpay_order_id: {
    type: String
  },
  razorpay_payment_id: {
    type: String
  },
  razorpay_signature: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;

// 💡 How it works (Flow)
// Frontend calls /create-order to create a Razorpay order.

// Backend creates order using Razorpay API and returns order_id.

// User makes payment via Razorpay UI on frontend.

// Razorpay returns payment_id, order_id, signature → frontend sends this to backend /verify-payment.

// Backend verifies payment signature.

// On success, update paymentStatus to "paid" in DB.

// Enroll the user in the course.