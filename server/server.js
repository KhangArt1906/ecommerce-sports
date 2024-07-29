const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbconnection");
const initRoutes = require("./routes");

const app = express();
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
initRoutes(app);

app.use("/", (req, res) => {
  res.send("Server is On");
});

app.listen(port, () => {
  console.log(`Server is running on port: ` + port);
});
