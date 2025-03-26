import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Fees from "../models/fees.model.js";
import createError from "../utils/createError.js";
import Parent from "../models/parent.model.js";

export const createClass = async (req, res, next) => {
    try {
        const { name, supervisor, capacity, feesAmount } = req.body;

        const teacherExists = await Teacher.findOne({ rollNumber: supervisor });
        if (!teacherExists) {
            return next(createError(404, "Teacher not found"));
        }

        const newClass = new Class({ name, supervisor, capacity, feesAmount });
        teacherExists.class = newClass._id;
        await teacherExists.save()
        await newClass.save();

        res.status(201).json({ success: true, message: "Class created successfully", data: newClass });
    } catch (error) {
        next(error);
    }
};

export const getClass = async (req, res, next) => {
    try {
        const newClass = await Class.find().populate({
            path: "students",
            select: "name email rollNumber"
        }).populate({
            path: "supervisor",
            select: "name email rollNumber"
        });
        res.status(201).json({ success: true, message: "Class created successfully", data: newClass });
    } catch (error) {
        next(error);
    }
};

export const addStudentToClass = async (req, res, next) => {
    try {
        const { classId, studentId } = req.body;


        const studentExists = await Student.findOne({ rollNumber: studentId });
        if (!studentExists) {
            return next(createError(404, "Student not found"));
        }
        console.log(studentExists);

        const classData = await Class.findById(classId);
        console.log(classData);

        if (!classData) {
            return next(createError(404, "Class not found"));
        }

        if (classData.students.length >= classData.capacity) {
            return next(createError(400, "Class is full"));
        }
        studentExists.class = classData._id
        await studentExists.save()
        classData.students.push(studentExists._id);
        await classData.save();

        res.status(200).json({ success: true, message: "Student added to class", data: classData });
    } catch (error) {
        next(error);
    }
};

export const getStudentsInClass = async (req, res, next) => {
    try {
        const { classId } = req.params;

        // Get class with students
        const classData = await Class.findById(classId).populate("students", "name email");

        if (!classData) {
            return next(createError(404, "Class not found"));
        }

        res.status(200).json({ success: true, data: classData.students });
    } catch (error) {
        next(error);
    }
};



