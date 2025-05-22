import React, { useState } from "react";
import HomeBg from "../Assets/bg.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loader from "../Assets/load2.svg";
import "../styles/utilities.css";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = loginFormData;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.data);
        toast.success(response.data.message || "Login successful!", {
          id: "login-success",
          duration: 3000,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        toast.error(
          err.response.data.message || "Login failed. Please try again.",
          {
            id: "login-failed",
            duration: 3000,
          }
        );
      } else {
        toast.error("An error occurred. Please try again later.", {
          id: "login-error",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="login-div">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
            Login
          </h1>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginFormData.email}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginFormData.password}
                onChange={handleChange}
                className="login-input"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <img
                  src={loader}
                  alt="Loading..."
                  className="w-6 h-6 mx-auto animate-spin"
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
          <Link
            to="/forgot-password"
            className="login-link"
          >
            Forget Password?
          </Link>

          <div className="text-white/80 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="login-link"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
