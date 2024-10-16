import React from "react";
import { Link } from "react-router-dom";

const Blog = (props) => {
  const formattedDate = new Date(props.blog.date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <Link
      to={`/blogpost/${encodeURIComponent(props.blog.title)}`}
      className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105  border-black max-h-fit"
    >
      <div className="flex flex-col md:flex-row  border-black h-full">
        <div className="md:w-1/3 md:h-full h-2/5  border-green-600">
          <img
            src={props.blog.image}
            alt={props.blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 md:p-4 p-2 flex flex-col space-y-2 md:h-full  border-green-600">
          <h4 className="font-bold sm:text-2xl text-base  border-red-800">
            {props.blog.title}
          </h4>
          <div className="flex items-start justify-start flex-wrap">
            {props.blog.tags.map((item, itemIndex) => (
              <Link
                to={`/tags/${item}`}
                key={itemIndex}
                className="flex-grow-1 overflow-hidden"
              >
                <div className="flex items-center bg-white rounded-lg">
                  <div className="w-full bg-center bg-cover p-2 duration-500 z-10">
                    <h1>#{item}</h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-500  border-red-800">
            <span className="mr-3">
              {Math.floor(Math.random() * 10 + 5)} min read
            </span>
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
