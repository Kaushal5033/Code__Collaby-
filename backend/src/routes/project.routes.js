
import express from "express";

import {
  createProject,
  getMyProjects,
  getProjectById,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";

import verifyJwt from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJwt);

router.post("/create-project", createProject);
router.get("/my-projects", getMyProjects);
router.get("/:id", getProjectById);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

export default router;
