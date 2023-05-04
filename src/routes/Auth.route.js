const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require("http-errors");

const router = express.Router();

// Sign up
// Method: POST
// Path: /signup
// Body: {username, password}
router.post("/signup", async (req, res, next) => {
  try {
    // Get username and password from body
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password) {
      throw createError(400, "Invalid username or password");
    }

    // Check user exists or not
    const user = await User.findOne({ username });
    if (user) {
      throw createError(400, "Username exists");
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // Create user document in database
    await User.create({ username, hash });

    // Response to client
    res.json({ message: "OK" });
  } catch (err) {
    next(err);
  }
});

// Sign in
// Method: POST
// Path: /signin
// Body: {username, password}
router.post("/signin", async (req, res, next) => {
  try {
    // Get username and password from body
    const { username, password } = req.body;

    // Validate username and password
    if (!username || !password) {
      throw createError(400, "Invalid username or password");
    }

    // Check username exists or not
    const user = await User.findOne({ username });

    if (!user) {
      throw createError(404, "User not found");
    }

    // Compare password and hash password
    const isValid = bcrypt.compareSync(password, user.hash);

    // Check valid password
    if (!isValid) {
      throw createError(400, "Invalid password");
    }

    // Generate access token
    const accessToken = jwt.sign({ user_id: user._id }, "bimat", {
      expiresIn: "30s",
    });

    // Response to client
    res.json({ message: "OK", accessToken: accessToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;