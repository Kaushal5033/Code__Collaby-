import React from "react";
import { Link } from "react-router-dom";
import HomeBg from "../Assets/bg.svg";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Home = () => {
  return (
   <>
   <Navbar/>
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="relative z-10 w-full mx-auto max-w-4xl p-4 sm:p-6 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-6 sm:space-y-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to{" "}
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Code
            <span className="text-blue-400">Collaby</span>
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 drop-shadow">
          Start collaborating with your team in real-time. Share ideas, work
          together,
          <br className="hidden sm:block" /> and achieve more.
        </p>
        <div className="space-y-4 sm:space-y-6">
          <Link
            to="/login"
            className="inline-block w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-blue-600/80 text-white text-base sm:text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
          >
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
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
