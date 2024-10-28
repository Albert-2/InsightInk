import express from "express";
import User from "../models/user.js"; // Ensure you have a User model
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SEC || "thisiskey";
const FRONTEND_URL = process.env.FRONTEND_URL;
// Set up Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Route to handle password reset request
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const secret = JWT_SECRET + user._id;
  // Create a password reset token
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: "10m" });
  const id = user._id;
  // Construct the reset link
  const resetLink = `${encodeURIComponent(
    FRONTEND_URL
  )}/forgetPass/${encodeURIComponent(token)}/${encodeURIComponent(id)}`;

  // Send email with the reset link
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <p><a href="${resetLink}">Reset Password</a></p>
  `,
    text: `You requested a password reset. Click the link below to reset your password:\n${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email" });
    }
    res.status(200).json({ result: "Successfull" });
  });
});

// Route to update password
router.post("/update-password", async (req, res) => {
  const { token, password, id } = req.body;
  // Verify the token
  try {
    const secret = JWT_SECRET + id;
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      result: "Successfull",
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

export default router;
