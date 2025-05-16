import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiMenu, HiX } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Fetch user data
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `/api/users/dashboard/${userId}`,
            {
              withCredentials: true,
            }
          );
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("userId");
        }
      };
      fetchUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/users/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("userId");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-black backdrop-blur-sm shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Code
                <span className="text-blue-400">Collaby</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                About
              </Link>
              <Link
                to="/collaborate"
                className="text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Collaborate
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-100 hover:text-blue-600 transition duration-300"
                >
                  <span className="text-sm font-medium">{user.fullName}</span>
                  <IoIosArrowDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-red  ring-black ring-opacity-5">
                    <div className="py-1">
                      {/* <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link> */}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-white  bg-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                <Link
                  to="/login"
                  className="text-gray-100 hover:text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-100 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/collaborate"
                className="block text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Collaborate
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-700">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-base font-medium text-gray-100">
                      {user.fullName}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-red-600 hover:text-red-500 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300 mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
