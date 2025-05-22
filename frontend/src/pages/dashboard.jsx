import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import "../styles/utilities.css";
import MyProjects from "../components/MyProjects";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Create Project modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // Edit Project modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return navigate("/login");

        const userRes = await axios.get(
          `${BASE_URL}/api/users/dashboard/${userId}`,
          {
            withCredentials: true,
          }
        );
        setUser(userRes.data.data);

        const projectRes = await axios.get(
          `${BASE_URL}/api/projects/my-projects`,
          {
            withCredentials: true,
          }
        );
        setProjects(projectRes.data || []);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        localStorage.removeItem("userId");
        navigate("/login");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // CREATE project handler
  const handleCreateProject = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/projects/create-project`,
        { title: projectName, description: projectDescription },
        { withCredentials: true }
      );

      console.log("Create project response:", res.data);

      const newProject = res.data.project || res.data;

      if (!newProject || !newProject._id) {
        toast.error("Invalid project data received.");
        return;
      }

      toast.success("Project created!");
      // Show new project on top
      setProjects((prev) => [newProject, ...prev]);
      setProjectName("");
      setProjectDescription("");
      setShowProjectModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create project");
    }
  };

  // OPEN edit modal and populate fields
  const openEditModal = (project) => {
    setEditProjectId(project._id);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setShowEditModal(true);
  };

  // UPDATE project handler
  const handleUpdateProject = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/projects/update/${editProjectId}`,
        { title: editTitle, description: editDescription },
        { withCredentials: true }
      );

      console.log("Update project response:", res.data);

      const updatedProject = res.data.project || res.data;

      if (!updatedProject || !updatedProject._id) {
        toast.error("Invalid updated project data received.");
        return;
      }

      setProjects((prev) =>
        prev.map((p) => (p._id === editProjectId ? updatedProject : p))
      );
      toast.success("Project updated!");
      setShowEditModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update project");
    }
  };

  // DELETE project handler
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await axios.delete(`${BASE_URL}/api/projects/delete/${id}`, {
        withCredentials: true,
      });

      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete project");
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Profile Section */}
          <div className="mt-28 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {user?.fullName}
                </h1>
                <p className="text-gray-400 mt-2">{user?.bio}</p>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="mt-4 px-4 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create New Project
                </button>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <MyProjects
            projects={projects}
            openEditModal={openEditModal}
            handleDeleteProject={handleDeleteProject}
          />
        </div>
      </div>

      {/* Create Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Create New Project
            </h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <textarea
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={4}
              className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowProjectModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Edit Project
            </h2>
            <input
              type="text"
              placeholder="Project Name"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <textarea
              placeholder="Project Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={4}
              className="w-full mb-4 px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Project
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
