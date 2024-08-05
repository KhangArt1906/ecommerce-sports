const Router = require("express").Router();
const controllers = require("../controllers/ProductCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Create category
Router.post("/", [verifyAccessToken, isAdmin], controllers.createCategory);
// Get Category
Router.get("/", controllers.getCategories);
// Update Category
Router.put("/:cid", [verifyAccessToken, isAdmin], controllers.updateCategory);
// Delete Category
Router.delete(
  "/:cid",
  [verifyAccessToken, isAdmin],
  controllers.deleteCategory
);

module.exports = Router;
