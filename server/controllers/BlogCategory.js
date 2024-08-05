const BlogCategory = require("../models/BlogCategory");
const asyncHandler = require("express-async-handler");

// Create Blog Category
const createBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createCategory: response ? response : "Can not create new blog category",
  });
});

// Get Categories
const getBlogCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    blogCategories: response ? response : "Can not get blog categories",
  });
});

// Update Categories
const updateBlogCategory = asyncHandler(async (req, res) => {
  // Blog Category ID
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });

  return res.json({
    success: response ? true : false,
    updateBlogCategory: response ? response : "Can not update blog category",
  });
});

// Delete Blog Category
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);

  return res.json({
    success: response ? true : false,
    deleteBlogCategory: response ? response : "Can not delete blog category",
  });
});

module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory,
};
