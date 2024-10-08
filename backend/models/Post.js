import mongoose from 'mongoose';





const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        
    },
    postImage: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: "https://www.trschools.com/templates/imgs/default_placeholder.pmg"
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 2000,
    },
    category: {
        type: String,
        required: true,
        enum: ['Mastercard','VISA','Apple Pay','EFT','Pending'],
        default: "Pending",
    },
    createdAT: {
      type: Date,
      default: Date.now,
      imutable: true,
    }
});
const Post = mongoose.model('Post', postSchema);


export default Post;
