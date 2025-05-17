import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import  sendEmail  from "../utils/nodeMailer.js";
import dotenv from "dotenv";
dotenv.config();


const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '5m' });
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        await sendEmail(user.email, "Password Reset", 'click on the given link to reset your password',`<div><h1>Click the link below to reset your password</h1><a href="${resetUrl}">Reset Password</a></div> expires in 5 minutes`);
        res.status(200).json({
            message: "Password reset link sent to your email",
            success: true
        });
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}


const resetPassword = async (req, res) => {
    try{
        const { token } = req.params;
        const { password,confirmPassword } = req.body;
        if(!password || !confirmPassword){
            return res.status(400).json({
                message: "Password and confirm password are required",
                success: false
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                message: "Passwords do not match",
                success: false
            });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        user.password = password;
        await user.save();
        res.status(200).json({
            message: "Password reset successfully",
            success: true
        });
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}
export { forgotPassword, resetPassword };
