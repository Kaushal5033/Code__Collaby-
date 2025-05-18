import React from "react";
import { Link } from "react-router-dom";
import "../styles/utilities.css";

const Footer = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Sign Up",
      path: "/signup",
    },
  ];
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="space-y-4 text-center md:text-left">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Code
                <span className="text-blue-400">Collaby</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0">
              Empowering developers to collaborate and create amazing projects
              together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="footer-link">
                <span>codecollabyy@gmail.com</span>
              </li>
              <li className="footer-link">
                <span>+91 8744968272 , +91 8595433405</span>
              </li>
              <li className="footer-link">
                <span>Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Code Collaby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
