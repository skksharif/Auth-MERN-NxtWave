const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const fs = require("fs");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SG_API_KEY);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { username, email, password,company,age, dob } = req.body;

    if (!username || !email || !password || !age || !dob) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      company,
      age,
      dob,
      profileImage: req.file ? req.file.path : "",
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    user.otp = otp; // Save OTP temporarily
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    console.log(user);
    await user.save();

    // Send OTP via SendGrid
    const msg = {
      to: email,
      from: "khasimsharif12@gmail.com",
      subject: "KEEP IT SECRET! DON’T SHARE",
      text: `Your OTP code is: ${otp}`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      msg: "OTP sent to your email",
      nextStep: "redirect_to_otp",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: error.message});
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log(user);

    if (user.otp !== parseInt(otp)) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "OTP has expired" });
    }

    // Clear OTP and expiration fields after successful verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Generate a JWT token for authenticated sessions
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // Remove sensitive fields from the user object
    const { password, otpExpires, ...userDetails } = user.toObject();
    res.status(200).json({
      msg: "OTP verified successfully",
      token,
      userDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/delete-account/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete the profile image if it exists
    if (user.profileImage) {
      const imagePath = path.join(__dirname, "../", user.profileImage);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ msg: "Account and profile image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
