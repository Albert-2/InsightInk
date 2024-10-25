import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateSavedPosts } from "../redux/userSlice";

const BookmarkedPosts = ({ posts, title }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleToggleSave = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/save/unsavePost`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.userID,
            postID: id,
          }),
        }
      );

      if (response.ok) {
        const updatedSavedPosts = user.userBlogs.filter(
          (postId) => postId !== id
        );
        dispatch(updateSavedPosts(updatedSavedPosts));
      } else {
        const errorText = await response.text();
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="max-h-96 overflow-y-auto space-y-4 p-2 border rounded-lg">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 p-6 font-bold">
            How is it possible that you haven't liked any blogs..?
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="flex items-start justify-between space-x-4 border-2 border-gray-200 p-2"
            >
              <Link to={`/blogpost/${encodeURIComponent(post.title)}`}>
                <div className="mb-2">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                </div>
              </Link>
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="cursor-pointer"
                onClick={() => handleToggleSave(post._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookmarkedPosts;
