import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeBg from "../Assets/bg.svg";

const Verifyotp = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    console.log("OTP:", otp);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="relative z-10 mx-auto max-w-md w-full p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
          Verify OTP
        </h1>
        <p className="text-white/80">
          Please enter the 6-digit code sent to your email
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            className="w-full px-4 py-3 text-center text-2xl bg-white/80 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter OTP"
            required
          />

          <button
            type="submit"
            className="w-full px-5 py-3 bg-blue-600/80 text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
          >
            Verify
          </button>
        </form>

        <div className="text-white/80 text-base">
          Didn't receive the code?{" "}
          <button className="text-white font-semibold underline hover:text-blue-300 transition">
            Resend
          </button>
        </div>

        <div className="text-white/80 text-base">
          <Link
            to="/login"
            className="text-white font-semibold underline hover:text-blue-300 transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verifyotp; 