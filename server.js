const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const batchRoutes = require("./routes/batchRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/batches", batchRoutes);

// test route
app.get("/", (req, res) => {
  res.send("EduLearn Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
