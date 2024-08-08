const Router = require("express").Router();
const controllers = require("../controllers/User");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

Router.post("/register", controllers.register);
Router.post("/login", controllers.login);
Router.get("/current", verifyAccessToken, controllers.getCurrent);
Router.post("/refreshtoken", controllers.refreshToken);
Router.get("/logout", controllers.logout);
Router.get("/forgotpassword", controllers.forgotPassword);
Router.put("/resetpassword", controllers.resetPassword);
// Get All User with Admin Role
Router.get("/", [verifyAccessToken, isAdmin], controllers.getUsers);
// Delete an user
Router.delete("/", [verifyAccessToken, isAdmin], controllers.deleteUser);
// Update an user
Router.put("/current", [verifyAccessToken, isAdmin], controllers.updateUser);
// Update Address by admin
Router.put(
  "/address",
  [verifyAccessToken, isAdmin],
  controllers.updateUserAddress
);
// Update User Cart
Router.put("/cart", [verifyAccessToken], controllers.updateCart);
// Update user by admin
Router.put(
  "/:uid",
  [verifyAccessToken, isAdmin],
  controllers.updateUserByAdmin
);
module.exports = Router;
// CRUD: Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body
// GET + DELETE - query || not
