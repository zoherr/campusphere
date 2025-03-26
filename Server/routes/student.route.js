import express from "express";
import {
    getStudent
} from "../controllers/student.controller.js";
import { verifyToken } from "../middlwares/jwt.js";

const studentRouter = express.Router();

studentRouter.get("/",verifyToken, getStudent);

export default studentRouter;
