const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Check Access Token
const verifyAccessToken = asyncHandler(async (req, res, next) => {
  // Bearer Token
  // Headers: {authorization: Bearer(token)}
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid Access Token",
        });
      }
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Require Authentication",
    });
  }
});

// Check Admin Authentication
const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  // Check role
  if (role !== "admin")
    return res.status(401).json({
      success: false,
      message: "Require admin role",
    });
  next();
});
module.exports = {
  verifyAccessToken,
  isAdmin,
};
