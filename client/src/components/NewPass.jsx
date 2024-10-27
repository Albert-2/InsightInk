import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const NewPass = () => {
  const navigate = useNavigate();
  const { token, id } = useParams();
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN; // Store API_DOMAIN for reuse
  const [credential, setCredentials] = useState({
    token,
    id,
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Consolidated effect to check for token and navigate
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({
      ...credential,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_DOMAIN}/reset/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });

      const json = await response.json();

      if (json.result === "Successfull") {
        navigate("/login");
      } else {
        setError("password change failed"); // User feedback
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again."); // User feedback
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="h-[85vh] flex items-center">
      <div className="bg-white border-2 border-gray-200 sm:w-96 w-[80%] mx-auto rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 inset-0 m-auto max-h-fit">
        <div className="p-4 sm:p-7">
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="hs-toggle-password"
                      className="block text-sm mb-2 dark:text-white font-bold"
                    >
                      New Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="hs-toggle-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      value={credential.password}
                      onChange={handleChange}
                      minLength={8}
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
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="password-error"
                  >
                    8+ characters with at least one symbol and one number
                    required
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
