import HomeBg from "../Assets/bg.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"
import toast from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      toast.error("Please fill in all fields.",{
        id: 'signup-error',
        duration: 3000,
      });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.",{
        id: 'signup-password-error',
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Navigation to verify OTP page",{
        id: 'signup-success',
        duration: 3000,
      });
      // console.log("Signup Success:", response.data);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/verifyotp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!",{
        id: 'signup-error',
        duration: 3000,
      });
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar/>
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="relative z-10 mx-auto w-full max-w-md p-4 sm:p-6 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
            Sign Up
          </h1>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 text-gray-800 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
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
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 text-gray-800 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
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
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 text-gray-800 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
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
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 text-gray-800 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600/80 text-white text-base sm:text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-white/80 text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold underline hover:text-blue-300 transition"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
