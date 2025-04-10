import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewText: {
    type: String,
    maxlength: 1000
  }
}, { timestamps: true });

// Prevent one student from reviewing a course multiple times
reviewSchema.index({ student: 1, course: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
