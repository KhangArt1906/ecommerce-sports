const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn.connection.readyState === 1) {
      console.log(`Database connection is successfully`);
    } else {
      console.log("Database connection is failed");
    }
  } catch (error) {
    console.log("DB connection is failed");
    throw new Error(error);
  }
};

module.exports = dbConnection;
