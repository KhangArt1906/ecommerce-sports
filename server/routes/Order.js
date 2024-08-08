const Router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const controllers = require("../controllers/Order");
// Router Create Order
Router.post("/", [verifyAccessToken, isAdmin], controllers.createOrder);
// Router Update Status
Router.put(
  "/status/:oid",
  verifyAccessToken,
  isAdmin,
  controllers.updateStatus
);
// Router User Order
Router.get("/", verifyAccessToken, controllers.getUserOrder);
// Router All User Orders
Router.get("/admin", verifyAccessToken, isAdmin, controllers.getOrders);
module.exports = Router;
