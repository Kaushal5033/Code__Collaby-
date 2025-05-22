import express from 'express';
import editProfile from '../controllers/changeProfile.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/:userId', verifyToken, editProfile);
export default router;