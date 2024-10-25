import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { deletePostData } from "../redux/blogSlice.js";
import { useDispatch } from "react-redux";

const UserPosts = ({ posts, title }) => {
  const dispatch = useDispatch();

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePostData(postId));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="max-h-96 overflow-y-auto space-y-4 p-2 border rounded-lg">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 p-6 font-bold">
            Let your ideas flow! Start writing...!
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
                onClick={() => handleDeletePost(post._id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPosts;
