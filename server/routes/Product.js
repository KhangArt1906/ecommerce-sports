const Router = require("express").Router();
const controllers = require("../controllers/Product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/Cloudinary.config");

// Router to create a product
Router.post("/", [verifyAccessToken, isAdmin], controllers.createProduct);
// Router to get all products
Router.get("/", controllers.getProducts);
// Router to get ratings
Router.put("/ratings", verifyAccessToken, controllers.ratings);

// Router to upload image rely on photo id
Router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  controllers.uploadImagesProduct
);
// Router to update a product
Router.put("/:pid", [verifyAccessToken, isAdmin], controllers.updateProduct);
// Router to delete a product
Router.delete("/:pid", [verifyAccessToken, isAdmin], controllers.deleteProduct);
// Router to get a product rely on product id: pid
Router.get("/:pid", controllers.getProduct);

module.exports = Router;
