const Router = require("express").Router();

const controllers = require("../controllers/InsertData");

// Router to insert Product
Router.post("/", controllers.insertProduct);
// Router to insert Product Category
Router.post("/category", controllers.insertCategory);

module.exports = Router;
