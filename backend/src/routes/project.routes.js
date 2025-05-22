// routes/projectRoutes.js
import express from 'express'
import { createProject, getMyProjects , deleteProject, updateProject } from '../controllers/project.controller.js'  // assume these functions are defined in the controller
import  verifyJwt  from '../middlewares/auth.middleware.js'  // assume JWT-based auth middleware

const router = express.Router()

router.post('/create-project', verifyJwt, createProject);
router.get('/my-projects', verifyJwt, getMyProjects);

router.put('/update/:id', verifyJwt, updateProject);
router.delete('/delete/:id', verifyJwt, deleteProject);


export default router;
