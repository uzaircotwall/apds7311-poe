import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:[/^[a-zA-Z0-9_]+$/,"Only alphanumeric characters and underscores"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match:[/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,'Invalid email address']
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model("User",userSchema);