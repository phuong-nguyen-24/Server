const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
// Method: GET
// Path: /users
router.get("/", async (req, res) => {
  // Get all users from database
  const users = await User.find();

  // Response to client
  res.json(users);
});

// Get user by id
// Method: GET
// Path: /users/:userId
router.get("/:userId", async (req, res) => {
  try {
    // Get userId from params
    const userId = req.params.userId;

    // Get all users from database
    const user = await User.findById(userId);

    // Response to client
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;