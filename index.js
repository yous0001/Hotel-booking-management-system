import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { db_connection } from "./src/config/db_connection.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();


const app=express()
const port = process.env.PORT || 3000;
app.use(express.json())//enable us to get json data from the body

app.use("/auth", authRoutes)





db_connection()
app.listen(port, () => {
        console.log(chalk.bgGreen(`Server is running on port ${port}`));
    });
