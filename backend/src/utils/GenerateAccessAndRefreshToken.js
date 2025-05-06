import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ApiError from './ApiError.js';
dotenv.config();
const generateAccessToken = (id) => {
    try {
        const accessToken = jwt.sign({
            _id: id
        }, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        })
        return accessToken;
    } catch (error) {
        // console.log(error?.messages)
        throw new ApiError(500, "error in generating accessToken");
    }
}
const generateRefreshToken = (id) => {
    try {
        const refreshToken = jwt.sign({
            _id: id
        }, process.env.TOKEN_SECRET, {
            expiresIn: '5d'
        })
        return refreshToken;
    } catch (error) {
        // console.log(error?.messages)
        throw new ApiError(500, "error in generating refreshToken")
    }
}

export { generateAccessToken, generateRefreshToken };