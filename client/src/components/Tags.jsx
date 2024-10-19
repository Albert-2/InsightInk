import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTaggedBlog } from "../redux/blogSlice.js";

const Tags = () => {
  const tags = useSelector(getTaggedBlog);
  return (
    <div className="py-4 container flex items-start justify-start flex-col gap-4">
      <div className="w-full text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl ">
          Categories
        </h2>
        <p className="text-lg text-gray-600">
          Discover our diverse range of topics and find what inspires you!
        </p>
      </div>
      <h1 className="sm:text-4xl text-2xl font-bold"></h1>
      <div className="flex items-start justify-start flex-wrap gap-6 border-none">
        {tags.map((item, itemIndex) => (
          <Link
            to={`/tags/${item.tag}`}
            key={itemIndex}
            className="flex-grow-1 relative overflow-hidden group"
          >
            <div className="flex items-center sm:min-w-[250px] min-w-32 w-full gap-4 bg-white rounded-lg relative">
              <div className="w-full bg-center bg-cover p-2 duration-500 z-10 h-16 ">
                <h1 className="text-lg font-bold">#{item.tag}</h1>
                <p className="text-sm">{item.count} blogs</p>
              </div>
              <div className="absolute inset-0 bg-[#a3f09c] rounded-lg transform scale-0 transition-all duration-500 group-hover:scale-100 z-0"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
