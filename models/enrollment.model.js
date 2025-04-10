import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
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
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0 // in percentage (0–100)
  }
}, { timestamps: true });

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
