const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Db Connected...");
    })
    .catch((err) => {
      console.log("Failed to connect Db", err);
    });
};

module.exports = ConnectDb;