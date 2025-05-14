import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { IoAddCircleOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { HiDocumentDuplicate } from "react-icons/hi";

const About = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827]">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
                Real-time{" "}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  Code Collaboration
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                Code together in real-time with your team, no matter where you are.
              </p>
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">What We Offer</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  CodeCollaby provides a seamless real-time coding environment where multiple developers 
                  can work together simultaneously. Share your code, see changes in real-time, and 
                  collaborate effectively with your team.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">Real-time</h3>
                  <p className="text-gray-300">Instant Updates</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">Multi-user</h3>
                  <p className="text-gray-300">Team Coding</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">4+</h3>
                  <p className="text-gray-300">Languages</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">Live</h3>
                  <p className="text-gray-300">Code Execution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <IoAddCircleOutline className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Code Sync</h3>
              <p className="text-gray-300">See code changes instantly as your team members type, with no delay.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <BsChatDots className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiple Languages</h3>
              <p className="text-gray-300">Support for JavaScript, Python, Java, and C++ with syntax highlighting.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <HiDocumentDuplicate className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Code Execution</h3>
              <p className="text-gray-300">Run your code in real-time and see the output instantly.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Start Coding Together</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Create a room, invite your team, and start coding together in real-time.
            </p>
            <Link
              to="/collaborate"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Create Room
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
