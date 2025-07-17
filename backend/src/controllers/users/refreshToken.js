/**
 * 🌀 Overview
 * | Step | What It Does                                       |
 * |------|----------------------------------------------------|
 * | 1    | Checks if refresh token exists in the cookie       |
 * | 2    | Verifies the refresh token                         |
 * | 3    | Finds user with the token                          |
 * | 4    | Issues a new access token                          |
 * | 5    | (Optional) Rotates refresh token (better security) |
 */

import jwt from 'jsonwebtoken' // ✅ Corrected import
import { signAccessToken } from "../../utils/jwt.helper.js";
import catchAsync from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";
import User from "../../models/users/Users.model.js";

const refreshAccessToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  // 1. Check if refresh token is present
  if (!token) {
    return next(new AppError('Refresh token not found. Please login again.', 401));
  }

  // 2. Verify the refresh token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return next(new AppError('Invalid or expired refresh token. Please login again.', 403));
  }

  // 3. Find the user and check if token is still valid
  const user = await User.findById(decoded.id);
  if (!user || !user.refreshTokens.includes(token)) {
    return next(new AppError('Refresh token is no longer valid. Please login again.', 403));
  }

  // 4. Rotate refresh token (optional but more secure)
  const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  // Replace old token with new one
  user.refreshTokens = user.refreshTokens.filter((rt) => rt !== token);
  user.refreshTokens.push(newRefreshToken);
  await user.save({ validateBeforeSave: false });

  // 5. Set new refresh token cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 6. Issue new access token
  const accessToken = signAccessToken(user);

  // 7. Send response
  res.status(200).json({
    status: 'success',
    accessToken,
  });
});

export default refreshAccessToken;
