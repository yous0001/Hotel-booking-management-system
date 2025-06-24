import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();


const app=express()
const port = process.env.PORT || 3000;
app.use(express.json())









app.listen(port, () => {
        console.log(chalk.bgGreen(`Server is running on port ${port}`));
    });
