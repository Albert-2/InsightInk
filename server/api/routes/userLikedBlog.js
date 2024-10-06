import express from "express";
import Post from "../models/blog.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/likePost", async (req, res) => {
  const { userID, postID } = req.body;

  try {
    const post = await Post.findOne({
      _id: new mongoose.Types.ObjectId(postID),
    });
    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (!post.likedBy.includes(userID)) {
      post.likedBy.push(userID);
      post.likes += 1;
      await post.save();
      return res.status(200).send("Post liked successfully");
    } else {
      return res.status(400).send("Post already liked" + userID);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.delete("/dislikePost", async (req, res) => {
  const { userID, postID } = req.body;

  try {
    const post = await Post.findOne({
      _id: new mongoose.Types.ObjectId(postID),
    });
    if (!post) {
      return res.status(404).send("post not found");
    }

    if (post.likedBy.includes(userID)) {
      post.likedBy = post.likedBy.filter(
        (id) => id.toString() !== userID.toString()
      );
      post.likes -= 1;
      await post.save();
      return res.status(200).send("Post unliked successfully");
    } else {
      return res.status(400).send("Post not found in liked posts");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

export default router;
