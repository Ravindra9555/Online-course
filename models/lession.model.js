import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  title: {
    type: String,
    required: [true, "Lesson title is required"]
  },
  description: {
    type: String,
    default: ""
  },
  videoUrl: {
    type: String,
    default: ""
  },
  resourceUrl: {
    type: String,
    default: "" // Optional PDF, notes, slides
  },
  order: {
    type: Number,
    required: true // Order of the lesson in course
  },
  isFree: {
    type: Boolean,
    default: false // Previewable without buying
  },
  type: {
    type: String,
    enum: ["video", "quiz", "article"],
    default: "video"
  }
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
