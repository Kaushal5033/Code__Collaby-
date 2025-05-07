import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeBg from "../Assets/bg.svg";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loader from "../components/Loader"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/users/dashboard/${userId}`, {
          withCredentials: true
        });
        
        setUser(response.data.data);
        setLoading(false);
      } catch {
        setLoading(false);
        localStorage.removeItem('userId');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const logOutHandler = async () => {
    try {
      await axios.get('http://localhost:3000/api/users/logout', {
        withCredentials: true
      });
      localStorage.removeItem('userId');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      navigate('/login');
    }
  }
  
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <div className="flex flex-col mt-28 sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Welcome back, {user?.fullName}</h1>
              <p className="text-gray-400 mt-1">Here's what's happening with your projects</p>
            </div>
            <button
              onClick={logOutHandler}
              className="px-4 py-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Log out
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-gray-400 text-sm">Active Projects</h3>
              <p className="text-2xl font-bold text-white mt-2">3</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-gray-400 text-sm">Team Members</h3>
              <p className="text-2xl font-bold text-white mt-2">5</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-gray-400 text-sm">Completed Tasks</h3>
              <p className="text-2xl font-bold text-white mt-2">12</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h3 className="text-gray-400 text-sm">Pending Tasks</h3>
              <p className="text-2xl font-bold text-white mt-2">4</p>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
              <button className="px-4 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                New Project
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((project) => (
                <div
                  key={project}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-white font-medium">Project {project}</h3>
                      <p className="text-gray-400 text-sm mt-1">Last updated 2 days ago</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                        Open
                      </button>
                      <button className="px-3 py-1.5 bg-gray-600/90 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/collaborate" className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200 text-left">
              <h3 className="text-white font-medium">Create New Project</h3>
              <p className="text-gray-400 text-sm mt-1">Start a new collaboration</p>
            </a>
            <a href="/collaborate" className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200 text-left">
              <h3 className="text-white font-medium">Invite Team Members</h3>
              <p className="text-gray-400 text-sm mt-1">Add new collaborators</p>
            </a>
            <a href="/collaborate" className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors duration-200 text-left">
              <h3 className="text-white font-medium">View Analytics</h3>
              <p className="text-gray-400 text-sm mt-1">Check project statistics</p>
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
