import mongoDb from "./dbConnect.js";
import express from "express";
import cors from "cors";
import signInRoute from "./routes/userAuth.js";
import postRoute from "./routes/userPost.js";
import savedBlog from "./routes/userSaveBlog.js";
import likedBlog from "./routes/userLikedBlog.js";

mongoDb();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/auth", signInRoute);
app.use("/post", postRoute);
app.use("/save", savedBlog);
app.use("/like", likedBlog);

export default (req, res) => {
  app(req, res);
};
