import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
  const token = req.cookies.acessToken;
  if (!token) {
    return req.status(401).json({ message: "No token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (
      parseInt(user?.resetpasswordExpiresin?.getTime() / 1000) >= decoded.iat
    ) {
      return next(new Error("expired Token", { cause: 401 }));
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
