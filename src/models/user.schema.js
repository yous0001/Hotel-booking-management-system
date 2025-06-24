import { PhoneNumber } from "@clerk/express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    PhoneNumber:{
        type:String,
        required: true
    },
    Address:{
        city: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        streetName:{
            type: String,
            trim: true
        }
    },
    resetpasswordtoken:String,
    resetpasswordExpiresin: Date
})

export default mongoose.models.User || mongoose.model("User", userSchema)
