const UserRouter = require("./User");
const ProductRouter = require("./Product");
const ProductCategoryRouter = require("./ProductCategory");
const BlogCategoryRouter = require("./BlogCategory");
const BlogRouter = require("./Blog");
const BrandRouter = require("./Brand");
const { notFound, errorHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
  //Router User
  app.use("/api/user", UserRouter);
  // Router Product
  app.use("/api/product", ProductRouter);
  // Router Product Category
  app.use("/api/category", ProductCategoryRouter);
  // Router Blog Category
  app.use("/api/blogcategory", BlogCategoryRouter);
  // Router Blog
  app.use("/api/blog", BlogRouter);
  // Router Brand
  app.use("/api/brand", BrandRouter);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
