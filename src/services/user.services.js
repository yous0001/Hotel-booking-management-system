import jwt from "jsonwebtoken";

export const createVerificationToken = (user) => {
    const verificationToken=jwt.sign({id:user._id},process.env.JWT_VERIFICATION_SECRET_KEY,{expiresIn:"1d"})
    return verificationToken
};

export const createAccessToken = (user) => {
    const accessToken=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
    return accessToken
};
