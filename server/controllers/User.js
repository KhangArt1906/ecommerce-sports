const User = require("../models/User");
const asyncHandler = require("express-async-handler");
// Call Middlewares
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register User
const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      message: "Missing Inputs",
    });
  }
  // Check email user exist or not to register
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? "Register is successfully. Now you can login"
        : "Something went wrong",
    });
  }
});

// Login User, Refresh Token: Create new access token
// Access Token => Determine user, privilege user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing Inputs",
    });
  }
  // Check response find Email of User and correct password before allowing to login
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // Plain Object, separate password and role out ò database
    const { password, role, ...userData } = response.toObject();
    // Create accessToken
    const accessToken = generateAccessToken(response._id, role);
    // Create refreshToken
    const refreshToken = generateRefreshToken(response._id);
    //Lưu refresh token vào database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    // Save refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

//Get User
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: false,
    res: user ? user : "User not found",
  });
});

// Refresh Token
const refreshToken = asyncHandler(async (req, res) => {
  //Get token from cookies
  const cookie = req.cookies;
  //Check whether has token
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");

  // Check token is verified or not
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  //Delete fresh token in database
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  //  Delete refresh token in cookie browser
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logout success",
  });
});

// Client send email
// Server check email is valid or not -> Send email plus with link (password change token)
// Client check email -> Click Link
// Client send API include token
// Check token is the match with token which server sent to email
// Change password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Const refreshToken
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Click the link below here to change your password. Link will be expired after 15 minutes <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click</a>`;

  const data = {
    email,
    html,
  };

  const rs = await sendEmail(data);
  return res.status(200).json({
    success: true,
    rs,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  // Check password and token
  //console.log({password, token});
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Updated password successfully" : "Something went wrong",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
};
