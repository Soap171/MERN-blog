import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized - Token not found"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return next(errorHandler(401, "Unauthorized - Token not valid"));
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    return next(errorHandler(401, "Token not valid"));
  }
};
