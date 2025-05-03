import React, { useState } from "react";
import HomeBg from "../Assets/bg.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // chele yha bhi krde kaam ftafat
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="relative z-10 mx-auto max-w-md w-full p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-8">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2">
          Login 
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/80 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 bg-blue-600/80 text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-white/80 text-base">
          Don't have an account?{' '}
          <a href="/signup" className="text-white font-semibold underline hover:text-blue-300 transition">Sign up here</a>
        </div>
      </div>
    </div>
  );
}