import mongoose, { Schema, Types, model } from "mongoose";

const lectureSchema = new Schema({
    name: String,
    desc: String,
    subject: String,
    teacher: {
        type: Types.ObjectId,
        ref: "Teacher"
    },
    studentsAttendance: [{
        type: Types.ObjectId,
        ref: "Student"
    }],
    time: {
        type: Date,
        default: Date.now
    },
    class: {
        type: Types.ObjectId,
        ref: "Class"
    },
    qrCode: String
}, { timestamps: true });

const Lecture = model("Lecture", lectureSchema);
export default Lecture;
