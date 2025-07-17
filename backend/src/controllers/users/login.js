import loginSchema from "../../validation/login.validation.js";
import catchAsync from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";
import User from "../../models/users/Users.model.js";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.helper.js";



const loginUser = catchAsync(async (req, res, next) => {
  // Validate credentials
  const { identifier, password } = loginSchema.parse(req.body);

  // Find user by email or username
  const user = await User.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier }
    ]
  }).select('+password +refreshTokens'); // include refreshTokens here

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  const isMatch = await user.correctPassword(password, user.password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Generate tokens
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  // Store refresh token in DB (you can limit max to 5 tokens, for example)
  user.refreshTokens.push(refreshToken);
  await user.save({ validateBeforeSave: false });

  // Send refresh token as cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  // Send access token and user info
  res.status(200).json({
    status: 'success',
    accessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

export default loginUser;
