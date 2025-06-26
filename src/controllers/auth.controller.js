import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const register=async(req,res,next)=>{
    const {name,email,password}=req.body

    const isEmailExists=await User.findOne({email})
    if(isEmailExists){
        return res.status(400).json({message:"Email already exists"})
    }
    
    const hashedPassword=await bcrypt.hash(password,10)
    const user=new User({name,email,password:hashedPassword})
    const verificationToken=createVerificationToken(user)
    
    await user.save()
    res.status(201).json({message:"User created successfully"})

}