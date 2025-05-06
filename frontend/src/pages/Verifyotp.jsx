import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeBg from "../Assets/bg.svg";

const Verifyotp = () => {
  const [otpValue, setOtpValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [timer, setTimer] = useState(120); // Start timer at 2 minutes (120 seconds)
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Function to format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

  // Handle timer for resend button
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpValue(value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpValue) {
      setErrorMessage("Please enter the OTP.");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/verify-otp",
        {
          otp: otpValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsVerifying(false);
      setResMessage(res.data.message);
      setErrorMessage(null);
      setVerificationComplete(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setIsVerifying(false);
      setResMessage(null);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Something went wrong");
      } else {
        setErrorMessage("Network error or server not reachable");
      }
    }
  };

  const handleResend = () => {
    setTimer(120);
    setCanResend(false);
    setOtpValue("");
    setErrorMessage("");
    setResMessage("");
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

        <form className="space-y-6" onSubmit={handleVerifyOtp}>
          <input
            type="text"
            maxLength={6}
            value={otpValue}
            onChange={handleChange}
            className="w-full px-4 py-3 text-center text-2xl bg-white/80 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter OTP"
            required
          />

          <button
            type="submit"
            className="w-full px-5 py-3 bg-blue-600/80 text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
          >
            {isVerifying ? (
              <>
                {/* <FaSpinner className="animate-spin" /> */}
                <span>Verifying...</span>
              </>
            ) : verificationComplete ? (
              <>
                {/* <FaCheck /> */}
                <span>Verified!</span>
              </>
            ) : (
              <span>Verify</span>
            )}
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4 transition-opacity duration-15">
            {errorMessage}
          </p>
        )}
        {resMessage && (
          <p className="text-green-500 text-center mt-4 transition-opacity duration-15">
            {resMessage}
          </p>
        )}
        <div className="text-white/80 text-base">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-white font-semibold underline hover:text-blue-300 transition"
            >
              Resend OTP
            </button>
          ) : (
            <p>
              didn't receive the OTP?
              <br />
              Resend OTP in {formatTime(timer)}
            </p>
          )}
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
