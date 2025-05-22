
import { User } from "../models/user.model.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()
const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        console.log('Incoming OTP is ', otp);

        const token = req.cookies?.verifyOtp || req.header("Authorization")?.replace("Bearer ", "");
        console.log('Cookies are ', req.cookies);
        console.log('Token is ', token);

        if (!token) {
            return res.status(401).json({
                message: 'OTP Token missing or unauthorized access',
                success: false
            });
        }

        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('Decoded token is ', decodeToken);
        console.log('Decoded token OTP is ', decodeToken.otp);

        if (decodeToken.otp != otp) {
            return res.status(401).json({
                message: 'Incorrect OTP',
                success: false
            });
        }

        const existingUser = await User.findOne({ email: decodeToken.email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email. Please login instead.',
                success: false
            });
        }

        await User.create({
            email: decodeToken.email,
            fullName: decodeToken.fullName,
            password: decodeToken.password
        });

        res.status(200).json({
            message: 'Email verified successfully. Signed Up.',
            success: true,
            data: 'Email verified successfully. Signed Up.'
        });
        res.clearCookie('verifyOtp', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        } );
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message,
            message: error.message
        });
    }
};

export default verifyOtp;