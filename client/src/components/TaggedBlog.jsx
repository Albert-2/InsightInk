import React, { useContext, useEffect } from "react";
import Blog from "./Blog";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllPosts } from "../redux/blogSlice.js";

const TaggedBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const data = useSelector(getAllPosts);
  const blogs = data.filter((blog) => blog.tags.includes(params.tag));
  useEffect(() => {
    if (blogs.length === 0) {
      navigate("/error404");
    }
  }, [blogs, navigate]);
  const userBlogs = useSelector((state) => state.user.userBlogs) || [];
  return (
    <div className="container mx-auto p-6 rounded-lg min-h-[83vh]">
      {blogs.length > 0 && (
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
          {blogs.map((blog, index) => {
            const isSaved = userBlogs.includes(blog._id);
            return <Blog blog={blog} key={index} isSaved={isSaved} />;
          })}
        </div>
      )}
    </div>
  );
};

export default TaggedBlog;
