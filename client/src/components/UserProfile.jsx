import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProfileHeader from "./ProfileHeader";
import UserPosts from "./UserPosts";
import BookmarkedPosts from "./BookmarkedPosts";
import { updateUser } from "../redux/userSlice";
import { getAllPosts } from "../redux/blogSlice.js";

const UserProfile = () => {
  const defaultProfilePicture =
    "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg";
  const data = useSelector(getAllPosts);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userBlogs = user.userBlogs;
  const currentUserID = user.userID;
  let profilePicture = user.profilePicture || defaultProfilePicture;
  const filteredBlogs = data.filter((blog) => userBlogs.includes(blog._id));
  const userBlogsAsAuthor = data.filter(
    (blog) => blog.author === currentUserID
  );

  const [user1, setUser1] = useState({
    name: user.userName || "",
    bio: user.bio || "",
    profilePicture,
    contributedPosts: userBlogsAsAuthor,
    bookmarkedPosts: filteredBlogs,
  });

  useEffect(() => {
    setUser1((prevUser) => ({
      ...prevUser,
      name: user.userName || "",
      bio: user.bio || "",
    }));
  }, [user]);

  useEffect(() => {
    if (!user.userID) {
      navigate("/");
    }
  }, [user.userID, navigate]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        profilePicture = imageUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser1((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    const userUpdatedData = {
      userId: user.userID,
      userName: user1.name,
      bio: user1.bio,
      profilePicture,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/user/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userUpdatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      dispatch(
        updateUser({
          userName: updatedUser.userName,
          bio: updatedUser.bio,
          profilePicture,
        })
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 selection:text-white selection:bg-green-600 flex flex-col space-y-8 min-h-[83vh]">
      <ProfileHeader
        user1={user1}
        onImageUpload={handleImageUpload}
        onInputChange={handleInputChange}
        onProfileUpdate={handleProfileUpdate}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UserPosts posts={user1.contributedPosts} title="Your Blogs" />
        <BookmarkedPosts posts={user1.bookmarkedPosts} title="Saved Blogs" />
      </div>
    </div>
  );
};

export default UserProfile;
