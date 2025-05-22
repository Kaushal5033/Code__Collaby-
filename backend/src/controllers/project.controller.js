// controllers/projectController.js
import { Project } from '../models/project.model.js';

export const createProject = async (req, res) => {
    try {
        const { title, description, code, language } = req.body;
        if(!title || !description){
            return res.status(400).json({ message: 'Title and description are required' });
        }
        const newProject = new Project({
            title,
            description,
            code,
            language,
            owner: req.user._id
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findOne({ _id: id, owner: req.user._id });

        if (!project) return res.status(404).json({ message: 'Project not found' });

        Object.assign(project, req.body);
        const updated = await project.save();
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!deleted) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};

export const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};
