const Coupons = require("../models/Coupon");
const asyncHandler = require("express-async-handler");

// Create A Coupon
const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing inputs");

  const response = await Coupons.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 24 * 60 * 100,
  });
  return res.json({
    success: response ? true : false,
    createCoupon: response ? response : "Can not create coupon",
  });
});

// Get Coupons
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupons.find().select("-createdAt -updatedAt");
  return res.json({
    success: response ? true : false,
    getCoupons: response ? response : "Can not get coupons",
  });
});

// Update A Coupon
const updateCoupons = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  // Update body
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  // Update date of coupons
  if (req.body.expiry)
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  const response = await Coupons.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updateCoupons: response ? response : "Can not update coupon",
  });
});

// Delete A Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupons.findByIdAndDelete(cid);
  return res.json({
    success: response ? true : false,
    deleteCoupon: response ? response : "Can not delete coupon",
  });
});

module.exports = {
  createCoupon,
  getCoupons,
  updateCoupons,
  deleteCoupon,
};
