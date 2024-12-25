/*
PORT = 5001
DB_CONNECTION_STRING = Your DataBase String
ACCESS_TOKEN = Your token secret
*/

const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const app = express();

const PORT = process.env.PORT || 3000;
// console.log("Inside App")
connectDb();
const corsOptions = {
  origin: "http://localhost:5500", // Allow only requests from this origin
  methods: "GET,POST", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes.js"));
app.get("/", (req, res) => {
  res.status(200).json({ Status: "Server is UP and Fine" });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
