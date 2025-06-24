import chalk from "chalk";
import mongoose from "mongoose";

export const db_connection= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.log(error);
    }
}