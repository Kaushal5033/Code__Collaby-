import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeBg from "../Assets/bg.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import {
  fetchUserData,
  isAuthenticated as checkAuth,
} from "../utils/userUtils";
import "../styles/utilities.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      if (checkAuth()) {
        setIsAuthenticated(true);
        const userData = await fetchUserData(localStorage.getItem("userId"));
        if (userData.message) {
          toast.error(userData.message, {
            id: "error",
            duration: 2000,
          });
          setIsAuthenticated(false);
          localStorage.removeItem("userId");
          navigate("/login");
          return;
        }
        setUserName(userData?.fullName);
      }
    };
    checkAuthentication();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="relative z-10 w-full mx-auto max-w-4xl p-4 sm:p-6 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-6 sm:space-y-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {isAuthenticated ? (
              <>
                Welcome back, <span className="home-title">{userName}!</span>
              </>
            ) : (
              <>
                Welcome to{" "}
                <span className="home-title">
                  Code<span className="text-blue-400">Collaby</span>
                </span>
              </>
            )}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 drop-shadow">
            {isAuthenticated
              ? "Ready to start coding with your team?"
              : "Start collaborating with your team in real-time. Share ideas, work together, and achieve more."}
          </p>
          <div className="space-y-4 sm:space-y-6">
            {isAuthenticated ? (
              <Link to="/collaborate" className="home-title-span">
                Start Coding Now
              </Link>
            ) : (
              <>
                <Link to="/login" className="home-title-span">
                  Start Collaboration
                </Link>
                <div className="text-white/80 text-sm sm:text-base">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-white font-semibold underline hover:text-blue-300 transition"
                  >
                    Sign up here
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
