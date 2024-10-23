import React from "react";
import { Link } from "react-router-dom";

const UserPosts = ({ posts, title }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="max-h-96 overflow-y-auto space-y-4 p-2 border rounded-lg shadow">
        {posts.map((post) => (
          <Link to={`/blogpost/${encodeURIComponent(post.title)}`}>
            <div key={post.id} className="p-2 border-2 border-gray-200 mb-2">
              <h3 className="text-lg font-bold">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
