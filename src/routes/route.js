const express = require("express");
const User = require("../models/model");

const router = express.Router();

router.post("/users", async (req, res, next) => {
  try {
    const { username, email, dob } = req.body;

    if (!username || !email || !dob) {
      return res.status(400).json({
        error: "All fields are required",
        required: ["username", "email", "dob"],
      });
    }

    const user = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      dateOfBirth: dob,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0].path;
      return res.status(400).json({
        error: `${field} already exists`,
        field: field,
      });
    }

    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
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
