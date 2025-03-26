import mongoose, { Schema, Types, model } from "mongoose";

const announcmentSchema = new Schema({
    title: String,
    desc: String
}, { timestamps: true })

const Announcment = model("Announcment", announcmentSchema);
export default Announcment;