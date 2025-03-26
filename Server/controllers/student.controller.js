import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const getStudent = async (req, res, next) => {
    try {
        const user = req?.user;
        console.log(user);
        
        let students;

        if (user?.role === "teacher") {
            const teacher = await Teacher.findById(user.id).populate("class");
            const teacherClassIds = teacher?.class.map(cls => cls._id);
            console.log(teacherClassIds);

            students = await Student.find({ class: { $in: teacherClassIds } }).populate("class");
            console.log(students);

        } else {
            students = await Student.find().populate("class");
        }

        res.status(200).json({ data: students });
    } catch (error) {
        next(error);
    }
};
