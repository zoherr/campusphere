import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) return res.status(400).json({ success: false, message: "Token Not Found" })
  if (!token) console.log("Token Not Found")

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"))
    req.user = payload;
    next()
  });
};
