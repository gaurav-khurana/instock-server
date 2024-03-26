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

// routes path
// place here

// listen to server
app.use(PORT, () => {
  console.log("Listening to port ", PORT);
  console.log("To Quit server - Ctrl + C");
});
