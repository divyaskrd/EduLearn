const express = require("express");
const router = express.Router();

const { createBatch, enrollBatch, getEnrolledBatches, unenrollBatch } = require("../controllers/batchController");

router.post("/create", createBatch);
router.post("/enroll", enrollBatch);
router.get("/enrolled/:userId", getEnrolledBatches);
router.post("/unenroll", unenrollBatch);

module.exports = router;
