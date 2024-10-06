import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSavedPosts } from "../redux/userSlice";

const BlogPost = () => {
  const navigate = useNavigate();
  const { title } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const { data } = useContext(DataContext);
  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleToggleLike = async () => {
    const newIsLiked = !isLiked;
    const endpoint = isLiked ? "dislikePost" : "likePost";
    const method = isLiked ? "DELETE" : "POST";
    try {
      const response = await fetch(
        `${process.env.API_DOMAIN}/like/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.userID,
            postID: blogPost._id,
          }),
        }
      );

      if (response.ok) {
        console.log(`blog ${isLiked ? "disliked" : "liked"} successfully `);
        setIsLiked(newIsLiked);
      } else {
        const errorText = await response.text();
        console.error(errorText);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleToggleSave = async () => {
    const newIsMarked = !isMarked;
    const endpoint = isMarked ? "unsavePost" : "savePost";
    const method = isMarked ? "DELETE" : "POST";
    try {
      const response = await fetch(
        `${process.env.API_DOMAIN}/save/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: user.userID,
            postID: blogPost._id,
          }),
        }
      );

      if (response.ok) {
        const updatedSavedPosts = isMarked
          ? user.userBlogs.filter((postId) => postId !== blogPost._id)
          : [...user.userBlogs, blogPost._id];
        console.log(`blog ${isMarked ? "unsaved" : "saved"} successfully `);
        dispatch(updateSavedPosts(updatedSavedPosts));
        setIsMarked(newIsMarked);
      } else {
        const errorText = await response.text();
        console.error(errorText);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredPost = data.find((post) => post.title === title);
      if (filteredPost) {
        setBlogPost(filteredPost);
        setIsLiked(filteredPost.likedBy.includes(user.userID));
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [data, title, navigate]);

  useEffect(() => {
    if (blogPost && user && user.userBlogs) {
      const isBlogMarked = user.userBlogs.includes(blogPost._id);
      setIsMarked(isBlogMarked);
    }
  }, [blogPost, user]);

  useEffect(() => {
    if (blogPost && contentRef.current) {
      const sanitizedContent = DOMPurify.sanitize(blogPost.content);
      contentRef.current.innerHTML = sanitizedContent;
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizedContent, "text/html");
      const headings = Array.from(doc.querySelectorAll("h1, h2, h3"));
      const tocItems = headings.map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return {
          id,
          level: parseInt(heading.tagName.replace("H", ""), 10),
          text: heading.textContent,
        };
      });
      setToc(tocItems);
    }
  }, [blogPost]);

  useEffect(() => {
    if (blogPost) {
      const tags = blogPost.tags || [];
      const related = data.filter(
        (post) =>
          post.tags.some((tag) => tags.includes(tag)) &&
          post.title !== blogPost.title
      );
      setRelatedPosts(related);
    }
  }, [blogPost, data]);

  const scrollToHeading = (id) => {
    const headingElement = document.getElementById(id);
    if (headingElement) {
      headingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex items-start justify-center container ">
        <div className="flex flex-col  items-center justify-center gap-2 w-fit m-2">
          <div onClick={handleToggleLike} className="hover:cursor-pointer">
            {isLiked ? (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
                  fill="red"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            )}
          </div>
          <div onClick={handleToggleSave} className="hover:cursor-pointer">
            {isMarked ? (
              <span className="crayons-reaction__icon crayons-reaction__icon--borderless crayons-reaction__icon--active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  className="crayons-icon"
                >
                  <path
                    d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1z"
                    fill="blue"
                  />
                </svg>
              </span>
            ) : (
              <span className="crayons-reaction__icon crayons-reaction__icon--borderless crayons-reaction__icon--inactive">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-hidden="true"
                  className="crayons-icon"
                >
                  <path
                    d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"
                    fill="blue"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-4 ">
          {blogPost ? (
            <>
              <div
                className=" h-80 overflow-hidden flex items-center justify-center"
                style={{
                  backgroundImage: `url(${blogPost.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="sm:text-4xl text-xl text-white font-bold text-center px-2">
                  {blogPost.title}
                </h2>
              </div>
              <div className=" flex items-start justify-center relative">
                <div className=" w-1/4 sticky top-16 sm:block hidden p-2">
                  <h6>Table Of Content</h6>
                  <ul className="list-decimal list-inside space-y-2 py-3">
                    {toc.map((item) => (
                      <li
                        key={item.id}
                        className={`ml-${item.level - 1} font-bold`}
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={() => scrollToHeading(item.id)}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:w-3/4 w-full  flex items-center justify-center flex-col">
                  <div className=" w-full h-2/3 px-2 text-justify">
                    <p ref={contentRef}></p>
                  </div>
                </div>
              </div>
              {relatedPosts.length > 0 && (
                <div className="mt-10 p-3 ">
                  <h3 className="text-2xl font-bold">Related Blogs</h3>
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost._id}
                        to={`/blogpost/${relatedPost.title}`}
                      >
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold text-lg">
                            {relatedPost.title}
                          </h4>
                          <p className="text-gray-600">
                            {relatedPost.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
