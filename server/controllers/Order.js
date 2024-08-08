const Order = require("../models/Order");
const User = require("../models/User");
const Coupon = require("../models/Coupon");
const asyncHandler = require("express-async-handler");

// Create Order
const createOrder = asyncHandler(async (req, res) => {
  // Get id of user
  const { _id } = req.user;
  //   Get Coupon for order
  const { coupon } = req.body;
  //   Find userCart through ID of User then query cart to get information
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");

  // Get user cart information include id, quantity and color
  const products = userCart?.cart?.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));
  //   Get total price by multiple price with quantity
  let total = userCart?.cart?.reduce(
    (sum, el) => el.product.price * el.quantity + sum,
    0
  );
  /*
  Case Use Coupon
  */
  //   Create a data to to store order information
  const createData = { products, total, orderBy: _id };
  //   Get total price after using Coupon
  if (coupon) {
    const usedCoupons = await Coupon.findById(coupon);
    // Calculate total price using Coupon then round the price to even
    total =
      Math.round((total * (1 - +usedCoupons?.discount / 100)) / 1000) * 1000 ||
      total;
    createData.total = total;
    createData.coupon = coupon;
  }
  console.log(total);
  const response = await Order.create(createData);
  return res.json({
    success: response ? true : false,
    response: response ? response : "Can not create order",
  });
});

// Update Status Order
const updateStatus = asyncHandler(async (req, res) => {
  // Get order id
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing inputs");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    response: response ? response : "Can not update status",
  });
});

// Get User Order
const getUserOrder = asyncHandler(async (req, res) => {
  // Get ID User
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });

  return res.json({
    success: response ? true : false,
    response: response ? response : "Can not get user order",
  });
});

// Get Orders
const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();

  return res.json({
    success: response ? true : false,
    response: response ? response : "Can not get user orders",
  });
});

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
