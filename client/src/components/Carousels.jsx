import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPosts } from "../redux/blogSlice.js";

const Carousels = () => {
  const data = useSelector(getAllPosts);

  const getRandomBlogs = (num) => {
    if (!data || data.length === 0) return [];
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const slides = getRandomBlogs(4);

  return (
    <div className="flex w-[95%] mx-auto my-4 space-x-4">
      <div className="h-96 overflow-hidden border-none md:w-2/3 w-full relative group flex items-center justify-center">
        <Carousel className="flex items-center justify-center overflow-hidden w-full rounded-3xl">
          {slides.map((blog, index) => (
            <Carousel.Item
              className="w-full h-[80vh] rounded-3xl bg-center bg-cover duration-500"
              style={{ backgroundImage: `url(${blog.image})` }}
              key={index}
            >
              <Link to={`/blogpost/${encodeURIComponent(blog.title)}`}>
                <Carousel.Caption className="space-y-3 absolute top-1/3 z-40">
                  <h3 className="font-bold sm:text-5xl text-3xl">
                    {blog.title}
                  </h3>
                  <p className="text-lg sm:line-clamp-3 line-clamp-2">
                    {blog.description}
                  </p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="border-none w-1/3 md:flex hidden items-end justify-center flex-col space-y-3 italic px-2">
        <h1 className="border-none text-5xl font-bold">...InsightInk</h1>
        <p className="font-medium">
          Transforming Thoughts into Meaningful Narratives.
        </p>
      </div>
    </div>
  );
};

export default Carousels;
