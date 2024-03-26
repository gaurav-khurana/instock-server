const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// define port
const { PORT } = process.env;

// middleware for cors
app.use(cors());

// middleware for JSON format
app.use(express.json());
console.log("Middleware DONE");

// routes path
const warehouseRoutes = require("./routes/routes-warehouse");
app.use("/", warehouseRoutes);
console.log("i run this");

// listen to server
app.listen(PORT, () => {
  console.log("Listening to port ", PORT);
});
