import Parent from "../models/parent.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const getParent = async (req, res, next) => {
    try {
        const students = await Parent.find().populate("student");
        res.status(200).json({ data: students });
    } catch (error) {
        next(error);
    }
};
