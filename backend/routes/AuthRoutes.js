const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

// register
router.post("/register", async (req, res) => {

  const { username, password } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  res.json({
    message: "Kullanıcı oluşturuldu",
  });
});

// login
router.post("/login", async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({
    username,
  });

  if (!user) {
    return res.status(400).json({
      message: "Kullanıcı bulunamadı",
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      message: "Şifre yanlış",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    "SECRET_KEY",
    {
      expiresIn: "1d",
    }
  );

  res.json({
    token,
  });
});

module.exports = router;