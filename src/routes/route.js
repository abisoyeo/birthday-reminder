const express = require("express");
const User = require("../models/model");

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { username, email, dob } = req.body;

    if (!username || !email || !dob) {
      return res.status(400).json({
        error: "All fields are required",
        required: ["username", "email", "dob"],
      });
    }

    const user = new User({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      dateOfBirth: new Date(dob),
    });

    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        error: `${field} already exists`,
        field: field,
      });
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }

    res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong while creating user",
    });
  }
});
module.exports = router;
