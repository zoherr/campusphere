import Class from "../models/class.model.js";
import Lecture from "../models/lecture.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import uploadToCloudinary from "../helper/uploadToCloudinary.js";
import qr from "qrcode";

export const createLec = async (req, res, next) => {
    try {
        const user = req?.user;
        const { classId } = req.body;

        const isclass = await Class.findById(classId);
        if (!isclass) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        const newLec = new Lecture({ ...req.body, teacher: user.id, class: classId });

        isclass.lecture.push(newLec._id); // Assuming `lectures` is the correct field name in the Class model
        await isclass.save();


        const qrCodeData = await qr.toDataURL(newLec._id.toString());
        const { url } = await uploadToCloudinary(qrCodeData);
        newLec.qrCode = url;
        await newLec.save();
        res.status(200).json({
            success: true,
            message: "Lecture added successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const getLec = async (req, res, next) => {
    try {
        const user = req?.user;
        console.log(getLec);

        console.log(user);

        let lectures;

        if (user?.role === "teacher") {
            lectures = await Lecture.find({ teacher: user.id }).populate("teacher");
        } else if (user?.role === "student") {
            let student = await Student.findById(user.id);
            if (!student) {
                return res.status(404).json({ success: false, message: "Student not found" });
            }
            lectures = await Lecture.find({ class: student.class }).populate("teacher");
        } else {
            lectures = await Lecture.find().populate("teacher");
        }

        res.status(200).json({ data: lectures });
    } catch (error) {
        next(error);
    }
};

export const studentsAttendance = async (req, res, next) => {
    try {
        const user = req?.user;

        const { lectureId } = req.body;

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ success: false, message: "Lecture not found" });
        }
        let student = await Student.findById(user.id);

        if (!lecture.studentsAttendance.includes(student._id)) {
            lecture.studentsAttendance.push(student._id);
            await lecture.save();
        }

        res.status(200).json({ success: true, message: "Attendance marked successfully", student });
    } catch (error) {
        next(error);
    }
};
