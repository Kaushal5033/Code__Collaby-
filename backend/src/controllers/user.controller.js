import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from "../models/user.model.js";
import sendMail from "../utils/nodeMailer.js";
import generateOTP from "../utils/GenerateOtp.js";
import { generateAccessToken, generateRefreshToken } from "../utils/GenerateAccessAndRefreshToken.js";

dotenv.config();

// Register a new user - Step 1: Send OTP via Email
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match', success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    const otp = generateOTP();
    await sendMail(email, 'Sign Up Verification OTP', 'Sign Up Verification OTP', `<div>${otp}</div>`);

    // Avoid storing password in cookie payload (insecure); hash instead if necessary
    const tokenPayload = { email, fullName, password, otp };
    const verificationToken = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, { expiresIn: '5m' });

    res.cookie('verifyOtp', verificationToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 1000, // 5 minutes
      path: '/'
    });

    return res.status(200).json({ message: 'OTP sent successfully', success: true });
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Login User
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required', success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password', success: false });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
      }) // 1 day
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 5 * 60 * 60 * 1000,
        path: '/'
      });

    return res.status(200).json({ message: 'Login successful', success: true, data: user._id });
  } catch (error) {
    console.error('Error in userLogin:', error.message);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res
    .clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Lax' })
    .clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Lax' });

  return res.status(200).json({ message: 'Logged out successfully', success: true });
};

export { userLogin, registerUser, logoutUser };