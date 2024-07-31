const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);

  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Can't create a new product",
  });
});

// Get A Product
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    createProduct: product ? product : "Can not get a product",
  });
});

// Filtering, sorting and pagination products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({
    success: products ? true : false,
    createProduct: products ? products : "Can not get all product",
  });
});

// Update A Product
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct
      ? updatedProduct
      : "Can not update a product",
  });
});

// Delete A Product
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct
      ? deletedProduct
      : "Can not delete a product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
