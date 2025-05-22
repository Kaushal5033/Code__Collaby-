// models/projectModel.js
import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    code: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: 'javascript'  // or 'plaintext', 'python', etc.
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
