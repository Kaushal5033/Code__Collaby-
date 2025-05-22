import React from "react";
import { Link } from "react-router-dom";

const MyProjects = ({ projects, openEditModal, handleDeleteProject }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
      <h2 className="px-6 py-3 bg-green-600 text-white rounded-lg w-36">
        My Projects
      </h2>
      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="bg-gray-800/50 p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <Link
                  to={`/projects/${project._id}`}
                  className="text-blue-400 hover:underline text-lg font-semibold"
                >
                  {project.title}
                </Link>
                <p className="text-gray-400">{project.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => openEditModal(project)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
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
