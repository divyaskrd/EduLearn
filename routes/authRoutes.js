const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getAllUserEnrollments } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/enrollments", getAllUserEnrollments);

module.exports = router;
