import express from "express";
const router = express.Router();
import Post from "../models/blog.js";

router.post("/blogpost", async (req, res) => {
  const newPost = await Post.create({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
    author: req.body.author,
    tags: req.body.tags,
  });
  res.status(200).json({ result: "Post Successfull", postId: newPost._id });
});

router.get("/getblogpost", async (req, res) => {
  const allPosts = await Post.find();
  res.status(200).json({ allPosts });
});

export default router;
