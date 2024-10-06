import mongoose from "mongoose";
function mongoDb() {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${MONGO_PASS}'24@clusterzero.3yk3x.mongodb.net/${process.env.MONGO_DB}`
  );
  console.log("connected to mongo");
}

export default mongoDb;
