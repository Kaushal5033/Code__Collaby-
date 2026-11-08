
import mongoose from "mongoose";
import { Project } from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, code, language } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message: "Project title is required",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description || "",
      code: code || "",
      language: language || "javascript",
      owner: req.user._id,
      files: [
        {
          name: "index.js",
          path: "index.js",
          content: code || "",
          language: language || "javascript",
          type: "file",
        },
      ],
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating project",
      error: error.message,
    });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user._id,
    }).sort({ updatedAt: -1 });

    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching project",
      error: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const { title, description, code, language, files } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;

    if (code !== undefined) {
      project.code = code;

      // Keep the original main file synchronized.
      const mainFile = project.files.find(
        (file) => file.path === "index.js"
      );

      if (mainFile) {
        mainFile.content = code;
      }
    }

    if (language !== undefined) project.language = language;

    if (files !== undefined) {
      if (!Array.isArray(files)) {
        return res.status(400).json({
          message: "Files must be an array",
        });
      }

      if (files.length > 500) {
        return res.status(400).json({
          message: "Maximum 500 files allowed",
        });
      }

      const paths = new Set();

      for (const file of files) {
        if (
          typeof file.path !== "string" ||
          typeof file.name !== "string" ||
          typeof file.content !== "string" ||
          file.path.startsWith("/") ||
          file.path.includes("..") ||
          paths.has(file.path)
        ) {
          return res.status(400).json({
            message: "Invalid or duplicate file path",
          });
        }

        paths.add(file.path);
      }

      project.files = files;
    }

    const updatedProject = await project.save();

    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const deleted = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting project",
      error: error.message,
    });
  }
};
