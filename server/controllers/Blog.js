const Blog = require("../models/Blog");
const asyncHandler = require("express-async-handler");

// Create New Blog
const createBlog = asyncHandler(async (req, res) => {
  //Require title, description, category
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.json({
    success: response ? true : false,
    createBlog: response ? response : "Can not create blog",
  });
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  // Blog ID
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");

  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });

  return res.json({
    success: response ? true : false,
    updateBlog: response ? response : "Can not update blog",
  });
});

// Get Blogs
const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    getBlogs: response ? response : "Can not get blogs",
  });
});

// Check dislike or like exist from one person

/*
    When user like a blog then:
    1. Check that person before dislike that blog or not => remove dislike
    2. Check that person before like that blog or not => remove like / add like
*/
// LIKE & DISLIKE
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.body;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);

  // Check already disliked
  const alreadyDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    // Using $pull & $push of mongoose
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: _id },
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      res: response,
    });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      res: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      res: response,
    });
  }
});

// Dislike
const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing inputs");
  const blog = await Blog.findById(bid);

  // Check already disliked
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    // Using $pull & $push of mongoose
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { likes: _id },
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      res: response,
    });
  }
  const isDisliked = blog?.dislikes?.find((el) => el.toString() === _id);
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: _id },
      },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      res: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      res: response,
    });
  }
});

// Get Collection of Blog using populate mongoose
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    {
      $inc: {
        numberViews: 1,
      },
    },
    { new: true }
  )
    .populate("likes", "firstName lastName")
    .populate("dislikes", "firstName lastName");
  return res.json({
    success: blog ? true : false,
    res: blog,
  });
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid);
  return res.json({
    success: blog ? true : false,
    deleteBlog: blog || "Can not delete blog",
  });
});

module.exports = {
  createBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  dislikeBlog,
  getBlog,
  deleteBlog,
};
