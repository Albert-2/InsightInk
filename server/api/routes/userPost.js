import express from "express";
const router = express.Router();
import Post from "../models/blog.js";

// Route to create a new blog post
router.post("/blogpost", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      image: req.body.image,
      author: req.body.author,
      tags: req.body.tags,
    });
    res.status(200).json({ result: "Post Successful", postId: newPost._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
});

// Route to get all blog posts
router.get("/getblogpost", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({ allPosts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
});

// Route to delete a blog post by ID
router.delete("/delete/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
});

export default router;
