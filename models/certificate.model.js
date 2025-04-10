import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
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
  issuedAt: {
    type: Date,
    default: Date.now
  },
  certificateURL: {
    type: String // URL to PDF or image
  }
});

certificateSchema.index({ student: 1, course: 1 }, { unique: true });

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
