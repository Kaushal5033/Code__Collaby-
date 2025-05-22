import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import HomeBg from "../Assets/bg.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loader from "../Assets/load2.svg";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Verifyotp = () => {
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

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
    setLoading(true);
    if (!otpValue) {
      toast.error("Please enter the OTP.", {
        id: "otp-error",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/verify-otp`,
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

      toast.success(res.data.message, {
        id: "otp-success",
        duration: 3000,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong", {
          id: "otp-error",
          duration: 3000,
        });
      } else {
        toast.error("Network error or server not reachable", {
          id: "otp-network-error",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(120);
    setCanResend(false);
    setOtpValue("");
  };
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="relative z-10 mx-auto w-full max-w-md p-4 sm:p-6 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
            Verify OTP
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Please enter the 6-digit code sent to your email
          </p>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              maxLength={6}
              value={otpValue}
              onChange={handleChange}
              className="w-full px-4 py-2.5 sm:py-3 text-center text-xl sm:text-2xl bg-white/80 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter OTP"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-blue-600/80 text-white text-base sm:text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <img
                  src={loader}
                  alt="Loading..."
                  className="w-6 h-6 mx-auto animate-spin"
                />
              ) : (
                "Verify"
              )}
            </button>
          </form>

          <div className="text-white/80 text-sm sm:text-base">
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

          <div className="text-white/80 text-sm sm:text-base">
            <Link
              to="/login"
              className="text-white font-semibold underline hover:text-blue-300 transition"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Verifyotp;
