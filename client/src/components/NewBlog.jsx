import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Select } from "./Select";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useSelector } from "react-redux";

const NewBlog = () => {
  const userID = useSelector((state) => state.user.userID);
  const navigate = useNavigate();
  const [value1, setValue1] = useState([]);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    author: userID,
    tags: [],
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
      author: userID,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value1.length === 0) value1.push("General");

    const updatedBlog = {
      ...blog,
      author: userID,
      tags: value1,
    };

    try {
      const response = await fetch(`${process.env.API_DOMAIN}/post/blogpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });
      const json = await response.json();
      localStorage.setItem("blogID", json.postId);
      if (json.result != "Post Successfull") {
        throw new Error("Failed to submit blog");
      }
      // Clear the blog state and value1
      setBlog({
        title: "",
        description: "",
        content: "",
        image: "",
        author: userID,
        tags: [],
      });
      setValue1([]);
      console.log("Blog submitted successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "align",
    "size",
  ];

  const options = [
    "WebDev",
    "DevOps",
    "AWS",
    "Cloud",
    "MERN",
    "DSA",
    "ReactJs",
    "MongoDB",
    "Database",
    "SQL",
    "Php",
    "Azure",
    "System Design",
    "Technology",
    "Software Development",
    "Computer Networks",
    "TOC",
    "Data Logic",
    "Operating System",
    "Cybersecurity",
    "Machine Learning",
    "A.I.",
    "Generative A.I.",
    "OpenAI",
    "VsCode",
    "Extension",
    "Programming",
    "Algorithm",
    "Data Structure",
    "Travel",
    "Health & Wellness",
  ];

  return (
    <>
      <Form
        className="lg:container w-[95%] m-auto font-semibold md:h-screen "
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold my-4">New Blog Here....!!🔥✌️</h1>

        <div className="flex items-stretch justify-center md:flex-row flex-col w-full h-[90%] gap-4">
          <div className="flex items-start justify-start p-2 flex-col md:w-1/3 w-full">
            <Form.Group
              className="mb-3 w-full"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={blog.title}
                name="title"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 w-full"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Blogs Short Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                style={{ resize: "none" }}
                value={blog.description}
                onChange={handleChange}
                name="description"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 w-full"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Thumbnail Image URL</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                style={{ resize: "none" }}
                value={blog.image}
                onChange={handleChange}
                name="image"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 w-full"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Tags</Form.Label>
              <Select
                options={options}
                value={value1}
                onChange={(o) => setValue1(o)}
              />
            </Form.Group>
            <button
              type="submit"
              className="py-2 px-4 my-3 inline-flex justify-center items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-green-800 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Post
            </button>
          </div>
          <div className="p-2 md:w-2/3 w-full flex flex-col border-none">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="write your content ...."
              className="h-5/6"
              value={blog.content}
              onChange={(content) =>
                setBlog((prevBlog) => ({
                  ...prevBlog,
                  content,
                }))
              }
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewBlog;
