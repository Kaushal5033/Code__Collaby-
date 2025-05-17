
import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt'

const updatePassword = async (req, res) => {
    const { userId } = req.params;
    const {currentPassword, newPassword , confirmPassword } = req.body;

    try {
        // Validate the input data
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Old password and new password are required' });
        }
        if( newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the old password is correct
        const isMatch = bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        // Update the password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
export default updatePassword;