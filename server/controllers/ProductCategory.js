const ProductCategory = require("../models/ProductCategory");
const asyncHandler = require("express-async-handler");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createCategory: response ? response : "Can not create new product category",
  });
});

// Get Categories
const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    productCategories: response ? response : "Can not get product category",
  });
});

// Update Categories
const updateCategory = asyncHandler(async (req, res) => {
  // Category ID
  const { cid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(cid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "Can not update category",
  });
});

// Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(cid);

  return res.json({
    success: response ? true : false,
    deleteCategory: response ? response : "Can not delete category",
  });
});

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
