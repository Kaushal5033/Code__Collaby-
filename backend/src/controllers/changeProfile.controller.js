import {User} from '../models/user.model.js';


const editProfile = async (req, res) => {
    const userId = req.params.userId;
   if(!userId){
        return res.status(400).json({ message: 'User ID is required' });
    }

    const { name, email, bio } = req.body;
    try {
        // Validate the input data
        if (!name && !email && !bio) {
            return res.status(400).json({ message: 'Nothing changed' });
        }

        // Update the user profile in the database
        const updatedUser = await User.findByIdAndUpdate(userId, { fullName: name, email, bio }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}



export default editProfile;