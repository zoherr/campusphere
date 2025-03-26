import mongoose, { Schema, Types, model } from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    parent: { type: Types.ObjectId, ref: "Parent" },
    class: { type: Types.ObjectId, ref: "Class", required: false },
    phone: Number,
    address: String,
    img: String,
    qrCode: String,
    bloodType: String,
    sex: String,
    birthday: Date
}, { timestamps: true });

const Student = model("Student", studentSchema);
export default Student;