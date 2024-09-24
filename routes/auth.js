const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.create(name, email, password, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error registering user" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, users) => {
    if (err || users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = users[0];
    if (user.status === "blocked") {
      return res.status(403).json({ message: "User is blocked" });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      User.updateLastLogin(user.id, () => {});
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );

      res.json({ message: 'Login successful', token, name: user.name });

    });
  });
});

module.exports = router;
