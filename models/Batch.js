const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: String,
      enum: ["Languages", "Data Structure", "Data Analytics", "Data Science"],
      default: "Languages"
    },
    teacher: String,
    duration: String,
    description: String,
    level: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
