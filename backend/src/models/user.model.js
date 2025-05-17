import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bio:{
        type: String,
        default: "Hey there! I'm using CodeCollaby."
    },
    refreshToken: {
        type: String
    }


}, { timestamps: true })

// Add a virtual field for confirmPassword (not stored in DB)
userModel.virtual("confirmPassword").set(function (value) {
    this._confirmPassword = value; // Store it in a temporary variable
});


userModel.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Ensure password is only hashed if modified

    try {
        this.password = await bcrypt.hash(this.password, 10); // Await bcrypt hashing
        next(); // Call next after hashing
    } catch (error) {
        console.log(error);
        next(error); // Pass error to the next middleware (if any)
    }
});


export const User = mongoose.model("User", userModel)