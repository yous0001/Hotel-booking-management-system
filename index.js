import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import { db_connection } from "./src/config/db_connection.js";
import authRoutes from "./src/routes/auth.routes.js";
import { globalResponse } from "./src/middlewares/general-response.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to our hotel API.");
});


// API routes
app.use("/auth", authRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: "❌ Route not found",
    statusCode: 404,
  });
});

app.use(globalResponse);

db_connection();

app.listen(port, () => {
  console.log(chalk.bgGreen(`Server is running on port ${port}`));
});
