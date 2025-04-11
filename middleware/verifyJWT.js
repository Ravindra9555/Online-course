import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import asynchandler from './asyncHandler';
import ApiError from '../utils/ApiError.js';
dotenv.config();

const verifyJWT = asynchandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select("-password");

  next();
}
);
export default verifyJWT;