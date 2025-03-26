import express from "express";
import {
    createLec,
    getLec,
    studentsAttendance

} from "../controllers/lecture.controller.js";
import { verifyToken } from "../middlwares/jwt.js";

const lectureRouter = express.Router();

lectureRouter.post("/create", verifyToken, createLec);
lectureRouter.post("/attendence", verifyToken, studentsAttendance);
lectureRouter.get("/getLec", verifyToken, getLec);


export default lectureRouter;
