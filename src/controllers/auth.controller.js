import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import sendmailservice from './../services/sendMail.js';

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
        message:`<a href="http://localhost:3000/verify/${verificationToken}">Verify your email</a>`
    })
    if(!isEmailSent){
        return res.status(500).json({message:"Email not sent"})
    }
    await user.save()
    res.status(201).json({message:"User created successfully"})

}