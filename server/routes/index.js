const UserRouter = require("./User");
const { notFound, errorHandler } = require("../middlewares/errorHandler");

const initRoutes = (app) => {
  app.use("/api/user", UserRouter);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
