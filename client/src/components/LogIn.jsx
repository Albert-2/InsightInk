import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

  const [credential, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State to hold error messages
  const [resetEmail, setResetEmail] = useState(""); // State to hold email for password reset
  const [isResetting, setIsResetting] = useState(false); // State to toggle password reset form
  const [resetMessage, setResetMessage] = useState(""); // State to hold reset feedback message

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credential,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear any previous error when changing input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credential.userName || !credential.password) {
      setError("Both fields are required."); // Set error message if fields are empty
      return;
    }

    try {
      const response = await fetch(`${API_DOMAIN}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const json = await response.json();

      if (json.result === "Successfull") {
        localStorage.setItem("token", json.authToken);
        dispatch(
          setUser({
            userName: json.userName,
            userID: json.userID,
            userBlogs: json.userBlogs,
            token: json.authToken,
            bio: json.bio,
            profilePicture: json.profilePicture,
          })
        );
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials."); // Set error message on failure
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again."); // Set error message on catch
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      setResetMessage("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch(`${API_DOMAIN}/reset/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });
      const json = await response.json();

      if (json.result === "Successfull") {
        setResetMessage("Password reset link sent to your email!");
        setResetEmail("");
      } else {
        setResetMessage("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setResetMessage("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="h-[85vh] flex items-center">
      <div className="bg-white sm:w-96 w-[80%] mx-auto rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Log in</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet?
              <Link
                to="/signin"
                className="text-blue-600 decoration-2 hover:underline font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}{" "}
          {/* Display error message */}
          {/* Password Reset Section */}
          {isResetting ? (
            <div>
              <h2 className="text-center text-lg font-bold">Reset Password</h2>
              {resetMessage && (
                <p className="text-green-500 text-sm text-center mt-2">
                  {resetMessage}
                </p>
              )}
              <form onSubmit={handleResetPassword} className="mt-4">
                <div>
                  <label
                    htmlFor="resetEmail"
                    className="block text-sm mb-2 dark:text-white font-bold"
                  >
                    Enter your email:
                  </label>
                  <input
                    type="email"
                    id="resetEmail"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Send Reset Link
                </button>
              </form>
              <p
                onClick={() => setIsResetting(false)}
                className="text-blue-600 cursor-pointer mt-3 text-sm text-center"
              >
                Back to Log in
              </p>
            </div>
          ) : (
            <div className="mt-5">
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800"
              >
                <svg
                  className="w-4 h-auto"
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="none"
                >
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Log in with Google
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="text"
                      className="block text-sm mb-2 dark:text-white font-bold"
                    >
                      Username or Email:
                    </label>
                    <input
                      type="text"
                      id="text"
                      name="userName"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={credential.userName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="hs-toggle-password"
                        className="block text-sm mb-2 dark:text-white font-bold"
                      >
                        Password
                      </label>
                      <a
                        onClick={() => setIsResetting(true)} // Open reset form on click
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium cursor-pointer"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        id="hs-toggle-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={credential.password}
                        onChange={handleChange}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-3 flex items-center"
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="w-5 h-5 text-gray-400 dark:text-gray-600"
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
