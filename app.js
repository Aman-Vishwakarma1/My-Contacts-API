/*
PORT = 5001
DB_CONNECTION_STRING = Your DataBase String
ACCESS_TOKEN = Your token secret
*/

const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes.js"));
app.get("/", (req, res) => {
  res.status(200).json({ Status: "Server is UP and Fine" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
