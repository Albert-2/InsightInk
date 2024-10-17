import React from "react";

const UserPosts = ({ posts, title }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="max-h-96 overflow-y-auto space-y-4 p-2 border rounded-lg shadow">
        {posts.map((post) => (
          <div key={post.id} className="p-4 rounded-lg shadow bg-white">
            <h3 className="text-lg font-bold">{post.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
