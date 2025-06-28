import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import sendmailservice from './../services/sendMail.js';
import { generateVerificationEmail } from './../utils/emailTemplates.js';
import { createVerificationToken } from "../services/user.services.js";
import jwt  from 'jsonwebtoken';

export const register=async(req,res,next)=>{
    const {name,email,password}=req.body

    const isEmailExists=await User.findOne({email})
    if(isEmailExists){
        return res.status(400).json({message:"Email already exists"})
    }
    
    const hashedPassword=await bcrypt.hash(password,10)
    const user=new User({name,email,password:hashedPassword})
    const verificationToken=createVerificationToken(user)
    const isEmailSent=await sendmailservice({
        to:user.email,
        subject:"Verify your email",
        message:generateVerificationEmail({
            name,
            email,
            verificationLink:`${process.env.CLIENT_URL}/auth/verify/${verificationToken}`
        })
    })
    if(!isEmailSent){
        return res.status(500).json({message:"Email not sent"})
    }
    await user.save()
    res.status(201).json({message:"User created successfully"})

}

export const verifyEmail=async(req,res,next)=>{
    const {token}=req.params

    if(!token){
        return res.status(400).json({message:"Token is required"})
    }

    const decodedToken=jwt.verify(token,process.env.JWT_VERIFICATION_SECRET_KEY)
    
    if(!decodedToken||!decodedToken.id){
        return res.status(400).json({message:"Invalid token"})
    }

    const user=await User.findById(decodedToken.id)
    if(!user){
        return res.status(400).json({message:"user not found"})
    }
    if(user.isEmailVerified){
        return res.status(400).json({message:"Email already verified"})
    }

    user.isEmailVerified=true
    await user.save()
    res.status(200).json({message:"Email verified successfully"})
}