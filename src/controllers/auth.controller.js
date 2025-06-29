import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import sendmailservice from './../services/sendMail.js';
import { generateVerificationEmail } from './../utils/emailTemplates.js';
import { createVerificationToken, generateResetToken } from "../services/user.services.js";
import jwt from 'jsonwebtoken';
import AppError from "../utils/AppError.js";
import crypto from "crypto"

export const register = async (req, res, next) => {
    const { name, email, password } = req.body

    const isEmailExists = await User.findOne({ email })
    if (isEmailExists) {
        return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    const verificationToken = createVerificationToken(user)
    const isEmailSent = await sendmailservice({
        to: user.email,
        subject: "Verify your email",
        message: generateVerificationEmail({
            name,
            email,
            verificationLink: `${process.env.CLIENT_URL}/auth/verify/${verificationToken}`
        })
    })
    if (!isEmailSent) {
        return res.status(500).json({ message: "Email not sent" })
    }
    await user.save()
    res.status(201).json({ message: "User created successfully" })

}

export const verifyEmail = async (req, res, next) => {
    const { token } = req.params
    console.log(req.params);

    if (!token) {
        return res.status(400).json({ message: "Token is required" })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET_KEY)

    if (!decodedToken || !decodedToken.id) {
        return res.status(400).json({ message: "Invalid token" })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    if (user.isEmailVerified) {
        return res.status(400).json({ message: "Email already verified" })
    }

    user.isEmailVerified = true
    await user.save()
    res.status(200).json({ message: "Email verified successfully" })
}

export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new AppError("user is not register with this email", "NOT_EXIST_USER", 400));

    const resettoken = generateResetToken(user)
    user.resetpasswordExpiresin = Date.now() + 15 * 60 * 60 * 1000;
    user.resetpasswordtoken = resettoken;
    const resetPasswordURL = `${process.env.CLIENT_URL}/auth/forgetpassword/${resettoken}`;

    const isEmailSent = await sendmailservice({
        to: email,
        subject: "Reset Password Verification",
        message: generateVerificationEmail({
            email,
            name: user.name,
            verificationLink: resetPasswordURL
        })
    });
    if (!isEmailSent) return next(new AppError("failed sending email", "EMAIL_FAILED", 500));

    return res.json({ message: "Reset link sent to email" }).status(200);
};

export const resetPassword = async (req, res, next) => {
    const { newPassword } = req.body;
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.id)
    if (!user) next(new AppError("token expired", "TOKEN_EXPIRED", "404"));

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword;
    user.resetpasswordtoken = null;
    user.resetpasswordExpiresin = null;

    await user.save();
    return res.json({ message: "password updated succesfully" });
}