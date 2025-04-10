import mongoose from "mongoose";
import { Schema } from "mongoose";

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    language: {
        type: String,
        default: "English"
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    published: {
        type: Boolean,
        default: false
    },
    tags: [String],
    enrolledCount: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });

const Course = mongoose.model("Course", CourseSchema);
export default Course;