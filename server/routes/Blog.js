const Router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const controllers = require("../controllers/Blog");

// Router to get blogs
Router.get("/", controllers.getBlogs);
// Router to create blog
Router.post("/", [verifyAccessToken, isAdmin], controllers.createBlog);
// Router to get one blog
Router.get("/one/:bid", controllers.getBlog);
// Router to like blog
Router.put("/like/:bid", [verifyAccessToken], controllers.likeBlog);
// Router to dislike blog
Router.put("/dislike/:bid", [verifyAccessToken], controllers.dislikeBlog);
// Router to update blog
Router.put("/:bid", [verifyAccessToken, isAdmin], controllers.updateBlog);
// Router to delete blog
Router.delete("/:bid", [verifyAccessToken, isAdmin], controllers.deleteBlog);

module.exports = Router;
