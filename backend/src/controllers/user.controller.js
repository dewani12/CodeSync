import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateAccessandRefreshTokens } from "../utils/generateTokens.js";
import { cookieOptions } from "../constants.js";

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Username and password are required fields");
  }
  if (await User.exists({ username })) {
    throw new ApiError(409, "Username already exists");
  }
  const user = new User({ username, password });
  await user.save();
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went Wrong while creating the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", { createdUser }));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Username and password are required fields");
  }
  const user = await User.findOne({ username: username?.toLowerCase() });
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid username or password");
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
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "User logged in Successfully"
      )
    );
});

export { register, login };
