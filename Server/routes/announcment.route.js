import express from "express";
import { create, getAnnounce } from "../controllers/announcment.controller.js";
import { verifyToken } from "../middlwares/jwt.js";
const announcmentRouter = express.Router();

announcmentRouter.post("/create", create);
announcmentRouter.get("/getAnnounce", getAnnounce);

export default announcmentRouter;