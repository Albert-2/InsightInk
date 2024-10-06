import mongoose from "mongoose";
function mongoDb() {
  mongoose.connect(
    `mongodb+srv://bhushanharvard50:MongoDB'24@clusterzero.3yk3x.mongodb.net/myBlogDB`
  );
  console.log("connected to mongo");
}

export default mongoDb;
