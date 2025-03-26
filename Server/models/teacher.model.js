import mongoose, { Schema, Types, model } from "mongoose";

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rollNumber: { type: String, required: true },
    class: [{ type: Types.ObjectId, ref: "Class" }],

}, { timestamps: true });

const Teacher = model("Teacher", teacherSchema);
export default Teacher;