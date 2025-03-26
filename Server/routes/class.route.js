import express from "express";
import {
    createClass,
    addStudentToClass,
    getStudentsInClass,
    getClass,
} from "../controllers/class.controller.js";
import { verifyToken } from "../middlwares/jwt.js";

const classRouter = express.Router();

classRouter.post("/create", createClass);
classRouter.post("/add-student", addStudentToClass);
classRouter.get("/:classId/students", getStudentsInClass);

classRouter.get("/getClass", getClass);

export default classRouter;
