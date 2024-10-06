import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bruteForce from '../middleware/bruteForceProtectionMiddleware.js';

import logInAttemptLogger from '../middleware/loginAttemotLogMiddleware.js';


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//Base Route
router.get("/",(req,res) => {
    res.send("HELLO AUTH");
});

//Register
router.post('/register',async(req,res)=>{
    try{
      const {username,email,password} = req. body;

      //check if the user already exists
      const existingUser = await User.findOne({$or: [{username},{email}]});
      if(existingUser){
        return res.status(400).json({ message: "Username or email already exists"})
      }

      //hash the password
      const hashedPassword = await bcrypt.hash(password,10);

      //create the new user
      const newuser = new User({username,email,password: hashedPassword});
      await newuser.save();

      return res.status(201).json({message:"User created succefully"})
    }catch (err) {
        res.status(500).json({message:'Internal Sever Error',error: err.message})
    }
})

//logi
router.post('/login', bruteForce.prevent,logInAttemptLogger ,async(req,res) => {
    try{
      const {username,password} = req.body;

      //find theuser by the username
      const user = await User.findOne({username});
      if(!user){
        res.status(404).json({message: "User not found"})
      }

      //check the password
      const isMatch = await bcrypt.compare(password,user.password);
      if(isMatch){
        return res.status(400).json({message: "Invalid Password"})
      }

      //create JWT Token
      const token = jwt.sign({ id: user._id},JWT_SECRET,{expiresIn: '1h'});
      res.json({token});
    }catch(err){
        res.status(500).json({message: 'Internal Server error',error: err.message})
    }
})

export default router