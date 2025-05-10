import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Collaborate = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/collaborate_2");
  };

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white">
      <Navbar />

      <main className="flex-grow container mx-auto  min-h-svh">
        <div className="max-w-2xl mt-44 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Choose coding adventure
            </h1>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-12 border border-white/10">
            <div className="space-y-8">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-xl font-semibold text-slate-400 mb-3"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-6 py-4 text-lg rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="roomId"
                  className="block text-xl font-semibold text-slate-400 mb-3"
                >
                  Room ID (for joining)
                </label>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-6 py-4 text-lg rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-500"
                  placeholder="Enter room ID to join"
                />
              </div>

              <div className="space-y-6 pt-8">
                <button
                  onClick={handleNavigation}
                  className="w-full bg-blue-500 text-white py-4 px-6 text-lg rounded-xl hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 font-medium"
                >
                  Create New Room
                </button>

                <button
                  onClick={handleNavigation}
                  className="w-full bg-green-500 text-white py-4 px-6 text-lg rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-800 font-medium"
                >
                  Join Room
                </button>

                <button
                  onClick={handleNavigation}
                  className="w-full bg-blue-100 text-black py-4 px-6 text-lg rounded-xl hover:bg-blue-200 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-800 font-medium"
                >
                  Start Solo Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collaborate;
