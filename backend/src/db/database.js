const mongoose = require("mongoose");

// Db Config
const db = require('../config/keys').mongoose.url || "mongodb://localhost:27017/todo";

const connectionDb = async function () {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = connectionDb;
