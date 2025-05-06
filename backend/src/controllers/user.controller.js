import { User } from "../models/user.model.js";
import sendMail from "../utils/nodeMailer.js";
import generateOTP from "../utils/GenerateOtp.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "../utils/GenerateAccessAndRefreshToken.js";
dotenv.config();


const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (!confirmPassword || !email || !fullName || !password) {
            // throw new ApiError(400, 'userName, email, fullName, and password are required')
            return res.status(400).json({
                message: 'Email, fullName, and password are required',
                success: false
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                message: 'User already exist',
                success: false
            })
        }

        const otp = generateOTP();

        await sendMail(`${email}`, 'Sign Up verification OTP', 'Sign Up verification OTP', `<div>${otp}</div>`);
        const verificationToken = jwt.sign({ email, otp, fullName, password }, process.env.TOKEN_SECRET);
        // console.log('verifycation token is', verificationToken);

        res.cookie('verifyOtp', verificationToken, {
            httpOnly: true,
            secure: true,
            maxAge: 5 * 60 * 1000,
            path: '/' // cookie will be received to all frontend route
        });
        // console.log('cookie is ', req.cookies);
        res.status(200).json({
            success: true,
            data: 'Otp sent Successfully',
            message: 'Otp sent Successfully'
        });
    } catch (error) {
        console.log('error in register route', error, error.message)
        res.status(500).json({
            message: error.message,
            success: false
        });
    }

}



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Incorrect password',
                success: false
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        console.log('Access token:', accessToken);
        console.log('Refresh token:', refreshToken);

        // Set cookies for authentication tokens
        res
            .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 60 * 1000 })
            .cookie('accessToken', accessToken, { httpOnly: true, secure: true });

        res.status(200).json({
            message: 'Login successful',
            success: true,
            data: user._id,
        });
    } catch (error) {
        console.log('Error in login route:', error.message);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


const logoutUser = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax'
    });

    res.status(200).json({
        message: 'Logged out successfully',
        success: true
    });
};


export { userLogin, registerUser, logoutUser }