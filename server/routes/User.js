const Router = require("express").Router();
const controllers = require("../controllers/User");

Router.post("/register", controllers.register);

module.exports = Router;
// CRUD: Create - Read - Update - Delete | POST - GET - PUT - DELETE
