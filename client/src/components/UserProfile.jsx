import React, { useState, useEffect, useContext } from "react";
import ProfileHeader from "./ProfileHeader";
import UserPosts from "./UserPosts";
import BookmarkedPosts from "./BookmarkedPosts";
import { DataContext } from "../context/DataContext.jsx";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const defaultProfilePicture = "https://via.placeholder.com/150";
  const { data } = useContext(DataContext);
  const user = useSelector((state) => state.user);
  const userBlogs = user.userBlogs;
  const currentUserID = user.userID;

  const filteredBlogs = data.filter((blog) => userBlogs.includes(blog._id));

  const userBlogsAsAuthor = data.filter(
    (blog) => blog.author === currentUserID
  );

  const [user1, setUser] = useState({
    name: user.userName,
    bio: "Web developer, tech enthusiast, and coffee lover.",
    profilePicture: defaultProfilePicture,
    contributedPosts: userBlogsAsAuthor,
    bookmarkedPosts: filteredBlogs,
  });

  useEffect(() => {
    const storedImage = localStorage.getItem("profilePicture");
    if (storedImage) {
      setUser((prevUser) => ({ ...prevUser, profilePicture: storedImage }));
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setUser((prevUser) => ({ ...prevUser, profilePicture: imageUrl }));
        localStorage.setItem("profilePicture", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 selection:text-white selection:bg-green-600 flex flex-col space-y-8">
      <ProfileHeader
        user1={user1}
        onImageUpload={handleImageUpload}
        onInputChange={handleInputChange}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <UserPosts posts={user1.contributedPosts} title="Your Blogs" />
        <BookmarkedPosts posts={user1.bookmarkedPosts} title="Saved Blogs" />
      </div>
    </div>
  );
};

export default UserProfile;
