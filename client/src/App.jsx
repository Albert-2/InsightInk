import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import SignIn from "./components/SignIn.jsx";
import LogIn from "./components/LogIn.jsx";
import BlogPost from "./components/BlogPost.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Error from "./components/Error.jsx";
import NewBlog from "./components/NewBlog.jsx";
import TaggedBlog from "./components/TaggedBlog.jsx";
import Footer from "./components/Footer.jsx";
import UserProfile from "./components/UserProfile.jsx";
import { useDispatch } from "react-redux";
import { fetchBlogData } from "./redux/blogSlice.js";
import About from "./components/About.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogData());
  }, [dispatch]);

  return (
    <>
      <div className="bg-[#f5f5f5] selection:bg-green-500 selection:text-white min-h-screen">
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/newPost" element={<NewBlog />} />
              <Route path="/profile/:userName" element={<UserProfile />} />
              <Route path="/blogPost/:title" element={<BlogPost />} />
              <Route path="/tags/:tag" element={<TaggedBlog />} />
              <Route path="*" element={<Error />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
