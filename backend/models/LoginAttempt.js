import mongoose from 'mongoose';

const logInAttemptSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        imutable: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/,"Only alphanumeric characters and underscores"]
    },
    ipAddress: {
        type: String,
        required: true,
        imutable: true,
    },
    sucessfulLogIn: {
        type: Boolean,
        required: true,
        imutable: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

export default mongoose.model("LogInAttempt",logInAttemptSchema)