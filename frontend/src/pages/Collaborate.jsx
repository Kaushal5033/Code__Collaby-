import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import "../styles/utilities.css";

const Collaborate = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      toast.error("Please login to use this feature");
      navigate("/login");
    }
  }, [navigate]);

  const handleGenerateRoom = () => {
    setRoomId(uuidv4());
    toast.success("Room ID generated successfully",{
      id: 'room-generated',
      duration: 3000,
    });
  };

  const handleJoinRoom = () => {
    if (!userName.trim() || !roomId.trim()) {
      toast.error("Please enter a room ID and your name",{
        id: 'room-error',
        duration: 3000,
      });
      return;
    }

    toast.success("Room Joined Successfully",{
      id: 'room-joining',
      duration: 3000,
    });
    navigate(`/collaborate_2/${roomId}`, {
      state: { userName },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-800 text-white">
      <Navbar />

      <div className="flex-1 flex items-center min-h-screen justify-center py-8 px-4">
        <div className="w-full max-w-2xl mt-12">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold mb-4">Choose coding adventure</h1>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-12 border border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleJoinRoom();
              }}
              className="space-y-8"
            >
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
                  className="collaborate-input-output"
                  placeholder="Enter your name"
                  required
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
                  className="collaborate-input-output"
                  placeholder="Enter room ID to join"
                  required
                />
              </div>

              <div className="space-y-6 pt-8">
                <button
                  type="button"
                  onClick={handleGenerateRoom}
                  className="w-full bg-blue-600 text-white p-4 text-lg rounded-xl hover:bg-blue-600 transform hover:scale-[1.02] transition-all duration-200 font-medium"
                >
                  Create New Room
                </button>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-4 text-lg rounded-xl hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02] font-medium"
                >
                  Join Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Collaborate;
