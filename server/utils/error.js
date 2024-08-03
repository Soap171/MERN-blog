export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(404).json({ message: "Token not found" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.decode(token);
    req.userId = decoded.userId;

    const isVerified = verified
      ? next()
      : res.status(401).json({ message: "Unauthorized Access" });
  } catch (error) {
    return next(errorHandler(error));
  }
};
