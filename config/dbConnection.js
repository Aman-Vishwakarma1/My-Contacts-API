const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDb = async () => {
  // console.log(process.env.DB_CONNECTION_STRING);
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    // console.log(
    //   "Database Connected Successfully",
    //   connect.connection.host,
    //   connect.connection.name
    // );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
