const Product = require("../models/Product");
const Category = require("../models/ProductCategory");
const asyncHandler = require("express-async-handler");
const data = require("../../data/data.json");
const slugify = require("slugify");
const categoryData = require("../../data/category_brand");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 1000),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
  });
};

const fnProductCategory = async (category) => {
  await Category.create({
    title: category?.cate,
    brand: category?.brand,
  });
};

// Insert Products
const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json("Done");
});

// Insert Product Categories
const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let category of categoryData) promises.push(fnProductCategory(category));
  await Promise.all(promises);
  return res.json("Done");
});

module.exports = {
  insertProduct,
  insertCategory,
};
