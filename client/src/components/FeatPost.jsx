import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext.jsx";

const FeatPost = () => {
  const { data } = useContext(DataContext);
  const blogPosts = data;
  const [isLiked, setIsLiked] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const handleToggleMark = () => {
    setIsMarked((prev) => !prev);
  };
  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="container px-4 mx-auto my-20 border-none">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-5xl font-bold text-gray-900">Featured Blogs</h2>
        <p className="text-gray-600">
          Discover our top picks for insightful and engaging reads.
        </p>
      </div>
      <div className="flex items-start justify-center flex-wrap gap-4">
        {blogPosts.slice(-3).map((post, index) => {
          const formattedDate = new Date(post.date.$date).toLocaleDateString(
            "en-US",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          );

          return (
            <div className="flex-1 min-w-[250px]">
              <Link
                to={`/blogpost/${encodeURIComponent(post.title)}`}
                key={index}
                className="h-[410px] block transition-transform transform hover:scale-105 border-none"
              >
                <div className="bg-white shadow-lg overflow-hidden h-full">
                  <div className="h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="sm:p-4 p-1 border-none flex flex-col items-start justify-between space-y-4">
                    <h4 className="font-semibold text-xl w-full">
                      {post.title}
                    </h4>
                    <p className="text-gray-700 line-clamp-2 w-full">
                      {post.description}
                    </p>
                    <p className="text-sm text-gray-500 w-full">
                      {formattedDate}
                    </p>
                    <div className="flex flex-wrap w-full">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Link
                          to={`/tags/${tag}`}
                          key={index}
                          className="bg-gray-100 px-3 py-1 sm:m-2 m-1 rounded-full text-gray-600 hover:bg-gray-200 transition"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatPost;
