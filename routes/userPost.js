import express from "express";
const router = express.Router();
import Post from "../models/blog.js";

router.post("/blogpost", async (req, res) => {
  console.log(req.body);
  const newPost = await Post.create({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
    author: req.body.author,
    tags: req.body.tags,
  });
  res.status(200).json({ result: "Post Successfull" });
});

router.get("/getblogpost", async (req, res) => {
  const allPosts = await Post.find();
  res.status(200).json({ allPosts });
});

router.get("/tags/:tag", async (req, res) => {
  try {
    const post = await Post.find({ tags: { $in: req.params.tag } });

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
