const Router = require("express").Router();
const controllers = require("../controllers/Coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Router to create a coupon
Router.post("/", [verifyAccessToken, isAdmin], controllers.createCoupon);
// Router to update a coupon
Router.put("/:cid", [verifyAccessToken, isAdmin], controllers.updateCoupons);
// Router to delete a coupon
Router.delete("/:cid", [verifyAccessToken, isAdmin], controllers.deleteCoupon);
// Router to get coupons
Router.get("/", controllers.getCoupons);

module.exports = Router;
