import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPosts } from "../redux/blogSlice.js";

const HomePosts = () => {
  const data = useSelector(getAllPosts);
  return (
    <>
      <div className="flex flex-col space-y-24 mt-20 w-[95%] mx-auto">
        <div className="flex items-center justify-center sm:flex-row flex-col sm:mx-10 mx-2 sm:space-x-10">
          <div className="border-none sm:w-1/3 w-full self-stretch bg-[#f4f6ad]">
            <p className="sticky top-20 border-none px-2 py-4  text-xl">
              Read it all
              <h1 className="lg:text-6xl text-4xl font-bold">
                Health & Wellness
              </h1>
            </p>
          </div>
          <div className="sm:w-2/3 w-full grid lg:grid-cols-2 grid-cols-1 grid-rows-2 gap-4 border-none">
            {data
              .filter((post) => post.tags.includes("Health & Wellness"))
              .slice(-4)
              .map((post, index) => {
                const formattedDate = new Date(post.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <Link
                    to={`/blogpost/${encodeURIComponent(post.title)}`}
                    key={index}
                    className="block"
                  >
                    <div className="bg-white shadow-lg overflow-hidden h-full">
                      <div className="h-96">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-xl mb-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-700 mb-2 line-clamp-2">
                          {post.description}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {formattedDate}
                        </p>
                        <div className="flex space-x-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Link
                              to={`/tags/${tag}`}
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="flex items-center justify-center sm:flex-row flex-col sm:mx-10 mx-2 sm:space-x-10">
          <div className="border-none sm:w-1/3 w-full self-stretch bg-[#e1937f]">
            <p className="sticky top-20 border-none px-2 py-4 text-xl">
              Read it all
              <h1 className="lg:text-6xl text-4xl font-bold">Technology</h1>
            </p>
          </div>
          <div className="sm:w-2/3 w-full grid lg:grid-cols-2 grid-cols-1 grid-rows-2 gap-4 border-none">
            {data
              .filter((post) => post.tags.includes("Technology"))
              .slice(-4)
              .map((post, index) => {
                const formattedDate = new Date(post.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <Link
                    to={`/blogpost/${encodeURIComponent(post.title)}`}
                    key={index}
                    className="block"
                  >
                    <div className="bg-white shadow-lg overflow-hidden h-full">
                      <div className="h-96">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-xl mb-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-700 mb-2 line-clamp-2">
                          {post.description}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {formattedDate}
                        </p>
                        <div className="flex space-x-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Link
                              to={`/tags/${tag}`}
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="flex items-center justify-center sm:flex-row flex-col sm:mx-10 mx-2 sm:space-x-10">
          <div className="border-none sm:w-1/3 w-full self-stretch bg-[#dceefd]">
            <p className="sticky top-20 border-none px-2 py-4 text-xl">
              Read it all
              <h1 className="lg:text-6xl text-4xl font-bold">Travel</h1>
            </p>
          </div>
          <div className="sm:w-2/3 w-full grid lg:grid-cols-2 grid-cols-1 grid-rows-2 gap-4 border-none">
            {data
              .filter((post) => post.tags.includes("Travel"))
              .slice(-4)
              .map((post, index) => {
                const formattedDate = new Date(post.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <Link
                    to={`/blogpost/${encodeURIComponent(post.title)}`}
                    key={index}
                    className="block"
                  >
                    <div className="bg-white shadow-lg overflow-hidden h-full">
                      <div className="h-96">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-xl mb-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-700 mb-2 line-clamp-2">
                          {post.description}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          {formattedDate}
                        </p>
                        <div className="flex space-x-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Link
                              to={`/tags/${tag}`}
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-gray-600"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePosts;
