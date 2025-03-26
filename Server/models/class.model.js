import mongoose, { Schema, Types, model } from "mongoose";

const classSchema = new Schema({
    name: String,
    supervisor: {
        type: Types.ObjectId, ref: "Teacher"
    },
    capacity: Number,
    students: [{
        type: Types.ObjectId, ref: "Student"
    }],
    fees: [{
        type: Types.ObjectId, ref: "Fees"
    }],
    lecture: [{
        type: Types.ObjectId, ref: "Lecture"
    }],
    feesAmount: Number
}, { timestamps: true })

const Class = model("Class", classSchema);
export default Class;