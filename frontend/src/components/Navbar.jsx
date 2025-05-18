import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import {  getUserId ,logout } from "../utils/userUtils";
import toast from "react-hot-toast";
import loader from "../Assets/load2.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = getUserId();
  const login_profile = () => {
    if (userId) {
      navigate("/edit-profile");
    } else {
      navigate("/login");
    }
  }
  const dashboard_about = () => {
    if (userId) {
      navigate("/dashboard");
    } else {
      navigate("/about");
    }
  }
  const signup_logout = async () => {
    if (userId) {
      setLoading(true);
      await logout();
      navigate("/login");
      toast.success("Logout successful!", {
        id: 'logout-success',
        duration: 3000,
      });
    } else {
      navigate("/signup");
    }
  };
  return (
    <nav className="bg-black backdrop-blur-sm shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Code
                <span className="text-blue-400">Collaby</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <button
                to="/about"
                className="nav-link"
                onClick = {dashboard_about}
              >
               {userId ? 'Dashboard' : 'About'}
              </button>
              <NavLink
                to="/collaborate"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                Collaborate
              </NavLink>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                <button
                  onClick={login_profile} 
                  className={
                    `nav-link`
                  }
                >
                  {userId ? "Your Profile" : "Login" }
                </button>
                <button
                  onClick={signup_logout}
                  className={
                    `${userId ? "bg-red-600" : "bg-blue-600"} text-white px-4 py-2 rounded-md text-sm font-medium ${userId ? "hover:bg-red-700" : "hover:bg-blue-700"} transition duration-300 transform hover:scale-105`
                  }
                  disabled={loading}
                >
                  {loading ? <img src={loader} alt="Loading..." className="w-6 h-6 mx-auto animate-spin" /> : userId ? "Logout" : "Sign Up"}
                </button>
              </div>
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link-mobile ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link-mobile ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/collaborate"
                className={({ isActive }) =>
                  `nav-link-mobile ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Collaborate
              </NavLink>
              <div className="pt-4 pb-3 border-t border-gray-700">
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `nav-link-mobile ${
                          isActive ? "text-blue-600" : ""
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        `block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition duration-300 mt-2 ${
                          isActive ? "bg-blue-700" : ""
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                  </>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
