import express from 'express';
import editProfile from '../controllers/changeProfile.controller.js';

const router = express.Router();
router.post('/:userId', editProfile);
export default router;