import HomeBg from "../Assets/bg.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSuccess("Navigation to verify OTP page");
      console.log("Signup Success:", response.data);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/verifyotp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      console.error("Signup Error:", err);
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
          Sign Up
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-5 py-3 bg-blue-600/80 text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4 transition-opacity duration-15">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center mt-4 transition-opacity duration-15">
            {success}
          </p>
        )}

        <div className="text-white/80 text-base">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white font-semibold underline hover:text-blue-300 transition"
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}
