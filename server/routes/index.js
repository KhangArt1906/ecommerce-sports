const UserRouter = require("./User");
const ProductRouter = require("./Product");
const { notFound, errorHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
