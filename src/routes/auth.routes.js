import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"
import { validationMiddleware } from './../middlewares/validation.middleware.js';
import * as userValidator from "../validators/user.validator.js"


const router = Router();

router.post("/register", validationMiddleware(userValidator.registerSchema), authController.register)
router.get("/verify/:token", authController.verifyEmail)
router.post("/forgetpassword", authController.forgetPassword)
router.post("/resetpassword/:token", authController.resetPassword)

export default router