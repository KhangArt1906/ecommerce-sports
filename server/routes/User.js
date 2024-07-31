const Router = require("express").Router();
const controllers = require("../controllers/User");
const { verifyAccessToken } = require("../middlewares/verifyToken");

Router.post("/register", controllers.register);
Router.post("/login", controllers.login);
Router.get("/current", verifyAccessToken, controllers.getCurrent);
Router.post("/refreshtoken", controllers.refreshToken);
Router.get("/logout", controllers.logout);
Router.get("/forgotpassword", controllers.forgotPassword);
Router.put("/resetpassword", controllers.resetPassword);

module.exports = Router;
// CRUD: Create - Read - Update - Delete | POST - GET - PUT - DELETE
// CREATE (POST) + PUT - body
// GET + DELETE - query || not
