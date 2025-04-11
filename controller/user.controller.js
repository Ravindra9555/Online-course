import asynchandler from "../middleware/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

// 📝 REGISTER
export const register = asynchandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }
  const profilePic = req.file ? await uploadToCloudinary(req.file.path) : null;
  //   console.log(profilePic);
  const newUser = await User.create({
    name,
    email,
    phone,
    passwordHash: password,
    role,
    profilePic: profilePic?.secure_url || "",
  });

  return res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      profilePic: newUser.profilePic,
      phone: newUser.phone,
    })
  );
});

// 🔐 LOGIN
export const login = asynchandler(async (req, res) => {
  const { email, password, phone } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Store refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .json(
      new ApiResponse(
        200,
        "Login successful",
        {
          accessToken,
            refreshToken,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
          },
        }
      )
    );
});

// 🙋‍♂️ GET USER PROFILE
export const getUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-passwordHash -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});

// 🔁 REFRESH TOKEN
export const refresh = asynchandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) throw new ApiError(401, "Refresh token not found");

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== token) {
    throw new ApiError(403, "Invalid refresh token");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(new ApiResponse(200, { accessToken }, "Token refreshed"));
});

// 🚪 LOGOUT
export const logout = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.refreshToken = "";
    await user.save();
  }

  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
