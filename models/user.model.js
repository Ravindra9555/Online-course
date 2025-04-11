import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: [true, "Password is required"],

    },
    role: {
        type: String,
        enum: ["admin", "student", "instructor"],
        default: "student",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profilePic: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        default: "",
    },
    phone: {
        type: Number,
        default: null,
    },

}, {timestamps: true});


// hash password before saving
 userSchema.pre("save", async function(next){
    if(!this.isModified("passwordHash")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
 })

// compare password
userSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password, this.passwordHash); 
}

const User = mongoose.model("User", userSchema);
export default User;