const Router = require("express").Router();
const controllers = require("../controllers/BlogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Create Blog Category
Router.post("/", [verifyAccessToken, isAdmin], controllers.createBlogCategory);
// Get Blog Category
Router.get("/", controllers.getBlogCategories);
// Update Blog Category
Router.put(
  "/:bcid",
  [verifyAccessToken, isAdmin],
  controllers.updateBlogCategory
);
// Delete Blog Category
Router.delete(
  "/:bcid",
  [verifyAccessToken, isAdmin],
  controllers.deleteBlogCategory
);

module.exports = Router;
