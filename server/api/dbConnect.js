import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

function mongoDb() {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(
      process.env.MONGO_PASS
    )}@clusterzero.3yk3x.mongodb.net/${process.env.MONGO_DB}`
  );
}

export default mongoDb;
