import mongoose, { model } from "mongoose";

const adminSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
}, {
    timestamps: true
});

const Admin = model("Admin", adminSchema);
export default Admin;