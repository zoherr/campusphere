import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlwares/jwt.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", verifyToken, getMe);
authRouter.post("/logout", verifyToken, logout);

export default authRouter;