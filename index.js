import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { db_connection } from "./src/config/db_connection.js";

dotenv.config();


const app=express()
const port = process.env.PORT || 3000;
app.use(express.json())







db_connection()
app.listen(port, () => {
        console.log(chalk.bgGreen(`Server is running on port ${port}`));
    });
