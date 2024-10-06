import express from "express";
//import authMiddleware from "../middleware/authMiddleware";
//import Post from "../models/Post.js";






const router = express.Router();



//get all posts
router.get('/',async (req,res) => {
    try {
       const post = await Post.find();
       res.json(posts); 
    } catch (err){
        res.status(500).json({message: 'Internal Server error',error: err.message})
    }
});

//create post 
router.post("/",async (req,res) =>{
    const  {title, postImage, content, category,createdAt} = req.body;

    //validate request body
    if (!title || !content){
        return res.status(400).json({ message: "Please fill in all fields"});
    }

    //Create new post
    const newPost = new Post({title, postImage, content, category});

    try {
        const savedPost = await newPost.save();
        res.status(201).json({ message: "Post uploaded",savedPost});

    } catch (err){
        console.error("Error saving post",err);
        res.status(500).json({ message: "Server error", error: err});
    }
});
//get post by id
router.get("/:id",async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        res.json(post);
    } catch(err) {
        console.error("Error getting post",err);
        res.status(500).json({ message: "Server error", erroro: err});
    }
});
//update post by id
router.get("/:id",async (req, res) => {
 const {title, postImage, content, category} = req.body;

 // validate request body
 if (!title && !content && !postImage && !category) {
    return res
    .status(400)
    .json({message: "Update failed please fill in one of the fields"});

 }

 const updateFields = {};
 if (title) updateFields.title = title;
 if (postImage) updateFields.postImage = postImage;
 if (content) updateFields.content = content;
 if (category) updateFields.category = category;

 try {
    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        updateFields,
        {new: true}
    );
    if (!updatePost) {
        return res.status(404).json({ message: "Post not Found"});
    }
    res.json({ message: "Post Updated", updatedPost});
 } catch (err) {
    console.error("Error updating post", err);
    res.status(500).json({ message: "Server error",error: err});
 }
});
//delete post by id
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post){
            return res.status(404).json({ message: "Post not found"});

        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted"});
    } catch (err) {
        console.error("Error Deleting post", err);
        res.status(500).json({ message: "Server error",error: err});
    }
    
    
});

export default router;