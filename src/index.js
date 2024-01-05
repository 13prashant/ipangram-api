const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./services/db.service");

// Load env vars
dotenv.config();

const app = express();

// Connect to database service
connectDB();

app.get("/", (_, res) => {
  res.send("Welcome to ipangram API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
