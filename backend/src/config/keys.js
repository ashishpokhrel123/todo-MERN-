require("dotenv").config();
const path = require("path");

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

module.exports = config;
