const Router = require("express").Router();
const controllers = require("../controllers/Brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Router to create brand
Router.post("/", [verifyAccessToken, isAdmin], controllers.createBrand);
// Router to get brands
Router.get("/", controllers.getBrands);
// Router to get update brand
Router.put("/:bid", controllers.updateBrand);
// Router to delete brand
Router.delete("/:bid", [verifyAccessToken, isAdmin], controllers.deleteBrand);

module.exports = Router;
