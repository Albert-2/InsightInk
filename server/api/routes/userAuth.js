import express from "express";
const router = express.Router();
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SEC;

router.post(
  "/signin",
  [
    body("userName").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userExists = await User.findOne({ email: req.body.email });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });

      const data = {
        user: { id: newUser._id },
      };
      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
      const userName = newUser.userName;
      const userID = newUser._id.toString();
      res
        .status(200)
        .json({ result: "Successfull", authToken, userName, userID });
    } catch (error) {
      console.error("error.message" + error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  [
    body("userName").exists().isString(),
    body("password").exists().isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({
        $or: [{ userName: req.body.userName }, { email: req.body.userName }],
      });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const data = {
        user: { id: user._id },
      };
      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
      const userID = user._id.toString();
      const userBlogs = user.savedPosts;
      const userName = user.userName;
      res.status(200).json({
        result: "Successfull",
        authToken,
        userID,
        userBlogs,
        userName,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
export default router;
