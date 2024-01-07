const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./services/db.service");
// Routes
const authRoutes = require("./modules/auth/auth.routes");
const { errorHandler } = require("./middlewares/error.middleware");

// Load env vars
dotenv.config();

const app = express();

// Connect to database service
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Welcome to ipangram API");
});

// Mount routes
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
