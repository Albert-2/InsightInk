import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-[83vh] bg-gray-100 flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-4xl font-bold text-center mb-6">Who we are..?</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">InsightInk.inc!</span>{" "}
          Here, we celebrate the art of storytelling and the magic of ideas.
          Every word is a brushstroke, and every post is a masterpiece waiting
          to be uncovered.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          At InsightInk, our mission is to cultivate a thriving community where
          creativity knows no bounds. We’re here to inspire, inform, and
          entertain—fueling conversations that matter and sparking new ideas.
        </p>
        <h2 className="text-2xl font-semibold mt-4 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>
            A kaleidoscope of content spanning lifestyle, technology, travel,
            and beyond—each post a new adventure.
          </li>
          <li>
            An engaged community where your thoughts and ideas can shine. Join
            the dialogue!
          </li>
          <li>
            An intuitive user experience, designed for seamless navigation and
            effortless bookmarking.
          </li>
        </ul>
        {user ? (
          <>
            <h2 className="text-2xl font-semibold mt-4 mb-2">
              Welcome Back, Visionary!
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              We’re thrilled to have you back in our creative haven! Dive into
              fresh content, share your insights, and let’s keep the inspiration
              flowing.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mt-4 mb-2">
              Ready to Join the Adventure?
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Whether you’re a seasoned writer or just starting, your voice
              deserves to be heard. Sign up today and become part of our vibrant
              community!
            </p>
          </>
        )}
        <p className="text-lg text-gray-700 mb-4">
          Thank you for being a part of our journey. Together, let’s create a
          sanctuary where every idea can flourish. Happy reading, writing, and
          exploring!
        </p>
      </div>
    </div>
  );
};

export default About;
