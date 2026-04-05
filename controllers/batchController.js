const mongoose = require("mongoose");
const Batch = require("../models/Batch");
const User = require("../models/User");

const createBatch = (req, res) => {
  res.json({ message: "Batch created successfully" });
};

const enrollBatch = async (req, res) => {
  try {
    const { userId, batchId } = req.body;

    // Validate inputs
    if (!userId || !batchId) {
      return res.status(400).json({ message: "User ID and Batch ID are required" });
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use string IDs so frontend numeric IDs can be stored
    const batchIdStr = String(batchId);

    // Check if already enrolled
    if ((user.enrolledBatches || []).map(String).includes(batchIdStr)) {
      return res.status(400).json({ message: "User already enrolled in this batch" });
    }

    // Add batch to user's enrolled batches
    user.enrolledBatches = user.enrolledBatches || [];
    user.enrolledBatches.push(batchIdStr);
    await user.save();

    res.status(200).json({
      message: "Enrolled successfully",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in batch", error: error.message });
  }
};

const getEnrolledBatches = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Enrolled batches retrieved",
      enrolledBatches: user.enrolledBatches || []
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving enrolled batches", error: error.message });
  }
};

const unenrollBatch = async (req, res) => {
  try {
    const { userId, batchId } = req.body;

    // Validate inputs
    if (!userId || !batchId) {
      return res.status(400).json({ message: "User ID and Batch ID are required" });
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if enrolled
    if (!user.enrolledBatches.includes(batchId)) {
      return res.status(400).json({ message: "User is not enrolled in this batch" });
    }

    // Remove batch from user's enrolled batches
    user.enrolledBatches = user.enrolledBatches.filter(id => id.toString() !== batchId);
    await user.save();

    res.status(200).json({
      message: "Unenrolled successfully",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Error unenrolling from batch", error: error.message });
  }
};

module.exports = { createBatch, enrollBatch, getEnrolledBatches, unenrollBatch };
