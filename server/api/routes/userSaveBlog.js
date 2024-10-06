import express from "express";
const router = express.Router();
import User from "../models/user.js";
import mongoose from "mongoose";

// Save Post Route
router.post("/savePost", async (req, res) => {
  const { userID, postID } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userID),
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the post is already saved
    if (!user.savedPosts.includes(postID)) {
      user.savedPosts.push(postID); // Add the postID to savedPosts
      await user.save(); // Save the user document
      return res.status(200).send("Post saved successfully");
    } else {
      return res.status(400).send("Post already saved");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.delete("/unsavePost", async (req, res) => {
  const { userID, postID } = req.body;

  try {
    // Find the user by userId
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userID),
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the post is saved
    if (user.savedPosts.includes(postID)) {
      // Remove the postID from savedPosts
      user.savedPosts = user.savedPosts.filter(
        (id) => id.toString() !== postID.toString()
      );
      await user.save(); // Save the updated user document
      return res.status(200).send("Post unsaved successfully");
    } else {
      return res.status(400).send("Post not found in saved posts");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

export default router;
