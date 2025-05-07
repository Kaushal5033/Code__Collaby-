import React from "react";
import { Link } from "react-router-dom";
import HomeBg from "../Assets/bg.svg";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const About = () => {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827]">
        
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  CodeCollaby
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
                Empowering developers to collaborate, innovate, and build amazing projects together.
              </p>
            </div>
          </div>
        </div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  At CodeCollaby, we're on a mission to revolutionize how developers collaborate. 
                  We believe that the best code is written together, and we're building the tools 
                  to make that collaboration seamless and efficient.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">1000+</h3>
                  <p className="text-gray-300">Active Projects</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">500+</h3>
                  <p className="text-gray-300">Team Members</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">50+</h3>
                  <p className="text-gray-300">Countries</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">24/7</h3>
                  <p className="text-gray-300">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Collaboration</h3>
              <p className="text-gray-300">Code together in real-time with your team members, no matter where they are.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Messaging</h3>
              <p className="text-gray-300">Communicate seamlessly with built-in chat and video conferencing.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Project Management</h3>
              <p className="text-gray-300">Organize tasks, track progress, and manage your projects efficiently.</p>
            </div>
          </div>
        </div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Start Collaborating?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using CodeCollaby to build amazing projects together.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
