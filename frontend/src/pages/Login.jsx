import React, { useState,useEffect } from "react";
import HomeBg from "../Assets/bg.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const [isVisible, setIsVisible] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { email, password } = loginFormData;

    // Simple validation
    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        localStorage.setItem('userId', response.data.data);
        setSuccess(response.data.message || "Login successful!");
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="relative z-10 mx-auto max-w-md w-full p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
          Login 
        </h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginFormData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
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
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 bg-blue-600/80 text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>
        {error && <div className="text-red-500 text-center mb-4 transition-opacity duration-10">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4 transition-opacity duration-10">{success}</div>}

        <div className="text-white/80 text-base">
          Don't have an account?{' '}
          <a href="/signup" className="text-white font-semibold underline hover:text-blue-300 transition">Sign up here</a>
        </div>
      </div>
    </div>
  );
}