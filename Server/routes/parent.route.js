import express from "express";
import {
    getStudent
} from "../controllers/student.controller.js";
import { getParent } from "../controllers/parent.controller.js";


const parentRouter = express.Router();

parentRouter.get("/", getParent);

export default parentRouter;
