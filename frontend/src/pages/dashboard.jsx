import React from "react";
import { Link } from "react-router-dom";
import HomeBg from "../Assets/bg.svg";

const Dashboard = () => {
  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="max-w-7xl mx-auto mt-40 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            Dashboard
          </h1>
          <Link
            to="/"
            className="px-6 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="col-span-1">
            <div className="bg-white/10 backdrop-blur-xl ring-1 ring-white/30 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  U
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">User Name</h2>
                  <p className="text-white/80">user@example.com</p>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full px-4 py-2 bg-blue-600/80 text-white rounded-xl hover:bg-blue-700/90 transition duration-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="col-span-2">
            <div className="bg-white/10 backdrop-blur-xl ring-1 ring-white/30 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Recent Projects</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((project) => (
                  <div
                    key={project}
                    className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Project {project}
                        </h3>
                        <p className="text-white/60">Last updated 2 days ago</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600/80 text-white rounded-xl hover:bg-blue-700/90 transition duration-300">
                        Open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-3">
            <div className="bg-white/10 backdrop-blur-xl ring-1 ring-white/30 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition duration-300">
                  <h3 className="text-lg font-semibold text-white">New Project</h3>
                  <p className="text-white/60">Start a new collaboration</p>
                </button>
                <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition duration-300">
                  <h3 className="text-lg font-semibold text-white">Invite Team</h3>
                  <p className="text-white/60">Add new members</p>
                </button>
                <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition duration-300">
                  <h3 className="text-lg font-semibold text-white">Settings</h3>
                  <p className="text-white/60">Configure your workspace</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
