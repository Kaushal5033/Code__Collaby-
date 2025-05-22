import { User } from '../models/user.model.js';

const getUserDashboard = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false
            });
        }

        if (req.user._id.toString() !== userId) {
            return res.status(403).json({
                message: 'Unauthorized: You cannot access another user\'s dashboard',
                success: false
            });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'User data retrieved successfully',
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export { getUserDashboard };