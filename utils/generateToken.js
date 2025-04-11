import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// 🔐 Generate JWT Access Token
export const  generateAccessToken = (user) => {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  };
  
  // 🔁 Generate Refresh Token
  export const generateRefreshToken = (user) => {
    return jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
  };