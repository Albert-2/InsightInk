import mongoDb from "./dbConnect.js";
import express from "express";
import cors from "cors";
import signInRoute from "./routes/userAuth.js";
import postRoute from "./routes/userPost.js";
import savedBlog from "./routes/userSaveBlog.js";
import likedBlog from "./routes/userLikedBlog.js";
import updateUser from "./routes/userInfo.js";
import resetPass from "./routes/passReset.js";

mongoDb();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`);
});

app.use("/auth", signInRoute);
app.use("/post", postRoute);
app.use("/save", savedBlog);
app.use("/like", likedBlog);
app.use("/user", updateUser);
app.use("/reset", resetPass);

export default (req, res) => {
  app(req, res);
};
