import express from "express";
import multer from "multer"; // Import multer
import User from "../models/user.js"; // Adjust the path based on your structure

const router = express.Router();

// Update User Profile Route
router.post("/update", async (req, res) => {
  const { userId, username, bio, profilePicture } = req.body;
  // Fetch the current user from the database using userId
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Prepare updated fields, using existing values if new ones are not provided
  const updatedFields = {
    userName: username || user.userName, // Keep existing username if not provided
    bio: bio || user.bio, // Keep existing bio if not provided
    profilePicture: profilePicture || user.profilePicture, // Use new image or keep existing
  };
  console.log(updatedFields, " updated fields ");
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true } // Return the updated document
    );
    console.log(updatedUser, " updatedUser at update ");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

export default router; // Make sure to export the router
