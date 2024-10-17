import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import LogIn from "./components/LogIn.jsx";
import BlogPost from "./components/BlogPost.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Error from "./components/Error.jsx";
import NewBlog from "./components/NewBlog.jsx";
import TaggedBlog from "./components/TaggedBlog.jsx";
import Footer from "./components/Footer.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  return (
    <>
      <div className="bg-[#f5f5f5] selection:bg-green-500 selection:text-white">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/login" element={<LogIn />} />
                  <Route path="/newPost" element={<NewBlog />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/blogPost/:title" element={<BlogPost />} />
                  <Route path="/tags/:tag" element={<TaggedBlog />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </main>
              <Footer />
            </Router>
          </PersistGate>
        </Provider>
      </div>
    </>
  );
}

export default App;
