import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  bio: {
    type: String,
    default:
      "Be curious. Read widely. Try new things. What people call intelligence just boils down to curiosity. -Aaron Swartz",
  },
  profilePicture: {
    type: String,
    default:
      "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg", // Optional default profile picture
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
