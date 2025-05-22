import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";

const MyProjects = ({ projects, openEditModal, handleDeleteProject }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-6">My Projects</h2>

      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="bg-gray-800/60 p-4 rounded-lg flex justify-between items-start hover:bg-gray-700 transition group"
            >
              {/* Project Click Area */}
              <div
                className="flex-1 cursor-pointer"
                onClick={() => navigate(`/projects/${project._id}`)}
              >
                <h3 className="text-blue-400 text-lg font-semibold group-hover:underline">
                  {project.title}
                </h3>
                <p className="text-gray-300 mt-1">{project.description}</p>
              </div>

              {/* Edit/Delete Buttons */}
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => openEditModal(project)}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  <FaPen size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  <FaTrash size={14} />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">You have no projects yet.</p>
      )}
    </div>
  );
};

export default MyProjects;
