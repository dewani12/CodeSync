import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateAccessandRefreshTokens } from "../utils/generateTokens.js";
import { cookieOptions } from "../constants.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

const signup = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new ApiError(400, "Username, Email and password are required fields");
  }
  const existedUser = await User.findOne({
    $or: [
      { email: email?.toLowerCase() },
      { username: username?.toLowerCase() },
    ],
  });
  if (existedUser) {
    throw new ApiError(409, "Username or Email is already in use");
  }
  const user = new User({ username, password, email });
  await user.save();
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went Wrong while creating the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", { createdUser }));
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Email or Username is required");
  }
  const user = await User.findOne({
    $or: [
      { username: username?.toLowerCase() },
      { email: email?.toLowerCase() },
    ],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id
  );
  user.refreshToken = refreshToken;
  await user.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in Successfully", {
        accessToken,
        refreshToken,
      })
    );
});

const logout = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "User is not authenticated");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      refreshToken: null,
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new ApiError(500, "Something went wrong while logging out");
  }
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "User is not authenticated");
  }
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched successfully", { user }));
});

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const token = user.getResetPasswordToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Please reset your password",
      text: `CodeSync password reset \n ${process.env.CLIENT_URL}/reset_password/${token} \n If you don't use this link within 10 minutes, it will expire.`,
    };

    await transporter.sendMail(receiver);
    return res
      .status(200)
      .json(new ApiResponse(200, "Password reset link sent successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 400,
          error.message || "Something went wrong while resetting the password"
        )
      );
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!password) {
      throw new ApiError(400, "Please provide a password");
    }
    const decodedToken = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    // const newhashPassword = await bcrypt.hash(password, 12);
    user.password = password;
    const newUser = await user.save({ validateBeforeSave: false });
    console.log(newUser);
    return res
      .status(200)
      .json(new ApiResponse(200, "Password reset successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          400,
          error.message || "Something went wrong while resetting the password"
        )
      );
  }
});

export { signup, login, logout, getUserProfile, forgotPassword, resetPassword };
