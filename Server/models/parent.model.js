import mongoose, { Schema, Types, model } from "mongoose";

const parentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    student: { type: Types.ObjectId, ref: "Student" },
}, { timestamps: true });

const Parent = model("Parent", parentSchema);
export default Parent;