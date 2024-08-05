const Brand = require("../models/Brand");
const asyncHandler = require("express-async-handler");

// Create Blog Category
const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createBrand: response ? response : "Can not create new brand",
  });
});

// Get Categories
const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    brands: response ? response : "Can not get brand",
  });
});

// Update Categories
const updateBrand = asyncHandler(async (req, res) => {
  // Brand ID
  const { bid } = req.params;
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updateBrand: response ? response : "Can not update brand",
  });
});

// Delete Blog Category
const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid);

  return res.json({
    success: response ? true : false,
    deleteBrand: response ? response : "Can not delete blog category",
  });
});

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
