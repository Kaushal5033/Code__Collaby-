import React, { useState, useCallback, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../styles/utilities.css";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Lazy load Navbar & Footer to reduce initial bundle size
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));

export default function Login() {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Use useCallback to avoid recreating function on every render
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        { ...loginFormData },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.data);
        toast.success(response.data.message || "Login successful!", {
          id: "login-success",
          duration: 2000,
        });

        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(msg, { id: "login-error", duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Suspense fallback={<div className="h-16 bg-black/20"></div>}>
        <Navbar />
      </Suspense>

      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/bg.svg')" }} // Load from /public
      >
        <div className="login-div">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
            Login
          </h1>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginFormData.email}
              onChange={handleChange}
              className="login-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginFormData.password}
              onChange={handleChange}
              className="login-input"
              required
            />

            <button type="submit" disabled={loading} className="login-button">
              {loading ? (
                <img
                  src="/load2.svg" // Move loader to /public instead of bundling it
                  alt="Loading..."
                  className="w-6 h-6 mx-auto animate-spin"
                />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <Link to="/forgot-password" className="login-link">
            Forgot Password?
          </Link>

          <div className="text-white/80 text-sm sm:text-base">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="login-link">
              Sign up here
            </Link>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="h-16 bg-black/20"></div>}>
        <Footer />
      </Suspense>
    </>
  );
}
