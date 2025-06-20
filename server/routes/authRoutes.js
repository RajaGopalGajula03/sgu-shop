require("dotenv").config();
const express = require("express");
const UsersData = require("../models/Users")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();


// sign up api

router.post("/signup",async(req,res)=>{
    try{
        const isUserExist = await UsersData.findOne({email:req.body.email});
        if(!isUserExist)
        {
                const hashedPassword = await bcrypt.hash(req.body.password,10);
                // adding new user
                const newUser = new UsersData({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    email:req.body.email,
                    password:hashedPassword,
                });
                await newUser.save();
                return res.status(201).json({message:"User Added Successfully"});          
        } 
        else
        {
            return res.status(400).json({message:"This email is already registared please Login"})
        }
    }catch(e){
        console.log("/signup",e);
        res.status(500).json({message:"Internal Server Error"})
    }
})


// login api

router.post("/login",async(req,res)=>{
    try{
        const isUserExist = await UsersData.findOne({email:req.body.email});
        if(isUserExist)
        {
            // password checking
            const isPasswordMatch = await bcrypt.compare(req.body.password,isUserExist.password);
            if(isPasswordMatch)
            {
                // generating token
                const payload = {
                    userId: isUserExist._id
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
                return res.status(200).json({message:"Login Successful",token:token})
            }
            else
            { 
                return res.status(401).json({message:"Password Incorrect please enter valid password"});
            }
        }
        else
        {
            return res.status(400).json({message:"User Not Found with this email id"});
        }
    }catch(e){
        console.log("/login",e);
        res.status(500).json({message:"Internal Server Error"})
    }
})


module.exports = router;