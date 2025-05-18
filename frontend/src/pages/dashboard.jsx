import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `api/users/dashboard/${userId}`,
          {
            withCredentials: true,
          }
        );

        setUser(response.data.data);
        setLoading(false);
      } catch(err) {
        if(err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
        setLoading(false);
        localStorage.removeItem("userId");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);


  const handleShowProjects = () => {
    toast("Coming Soon!", {
      icon: '🚀',
      id: 'coming-soon',
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Profile Section */}
          <div className="mt-28 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="flex-1 overflow-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {user?.fullName}
                </h1>
                <p className="text-gray-400 mt-2 break-words">
                  {user?.bio || "No bio added yet. Add your bio to let others know about you!"}
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => navigate("/edit-profile")}
                    className="px-4 py-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <button
                  onClick={handleShowProjects}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Show Your Projects
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/collaborate"
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200 text-left"
            >
              <h3 className="text-white text-xl font-medium">Create New Project</h3>
              <p className="text-gray-400 text-sm mt-2">
                Start a new collaboration
              </p>
            </a>
            <a
              href="/collaborate"
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors duration-200 text-left"
            >
              <h3 className="text-white text-xl font-medium">Invite Team Members</h3>
              <p className="text-gray-400 text-sm mt-2">
                Add new collaborators
              </p>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
