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
    createProduct: newProduct ? newProduct : "Can not create a new product",
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
  const queries = { ...req.query };
  //   Separate special field out of query
  //  View tutorials of filtering mongoose sort of Jeff Blog
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  //  Format operators to correct mongoose syntax
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);

  //  Filtering products
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);

  //Sorting products
  //123,456 => [123,456]
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    // console.log(sortBy);
    queryCommand = queryCommand.sort(sortBy);
  }

  //Fields limiting
  if (req.query.fields) {
    // console.log(req.body.fields);
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  //Pagination
  // Limit: number of objects to return when call an API
  // Skip: 2
  // 1,2,3,...10
  const page = +req.query.page || 1;
  const limitProducts = +req.query.limit || process.env.LIMITS_PRODUCTS;
  const skip = (page - 1) * limitProducts;
  queryCommand.skip(skip).limit(limitProducts);

  // Execute query
  // Query: Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
  try {
    // Thực hiện truy vấn và chờ đợi kết quả
    const response = await queryCommand.exec();
    // Tính toán số lượng tài liệu dựa trên các truy vấn đã định dạng
    const counts = await Product.find(formatedQueries).countDocuments();
    // Gửi phản hồi về client
    res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Can not get all product",
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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

// Ratings Products
const ratings = asyncHandler(async (req, res) => {
  // Get id
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing inputs");

  const ratingProduct = await Product.findById(pid);
  // check already had comment
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );
  console.log({ alreadyRating });
  if (alreadyRating) {
    // Update star & comment
    await Product.updateOne(
      {
        ratings: {
          // elementMatch mongoose documentation
          $elemMatch: alreadyRating,
        },
      },
      {
        // set mongoose documentation
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
        },
      },
      { new: true }
    );
  } else {
    // Add star & comment
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: {
          ratings: {
            star,
            comment,
            postedBy: _id,
          },
        },
      },
      { new: true }
    );
    console.log(response);
  }

  // Sum average total ratings
  const updatedProduct = await Product.findById(pid);
  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found after ratings",
    });
  }
  const ratingCount = updatedProduct.ratings.length;
  // Use reduce function to calculate sum
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, element) => sum + +element.star,
    0
  );

  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;

  await updatedProduct.save();

  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

// Upload Photo using Cloudinary
const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    uploadImagesProduct: response ? response : "Can not upload images",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
