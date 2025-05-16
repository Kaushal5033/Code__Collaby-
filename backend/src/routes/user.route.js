import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import verifyOtp from '../controllers/verifyOtp.controller.js';
import { userLogin } from '../controllers/user.controller.js';
import verifyJwt from '../middlewares/auth.middleware.js';
import { getUserDashboard } from '../controllers/dashboardController.js';
import { logoutUser } from '../controllers/user.controller.js';

const router = Router();
router.post("/signup", registerUser)
router.post("/verify-otp", verifyOtp)
router.post("/login", userLogin)
// Protected route with JWT authentication
router.get('/dashboard/:userId', verifyJwt, getUserDashboard);
router.get('/logout', logoutUser);

export default router;

