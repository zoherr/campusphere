import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Admin from "../models/admin.model.js";
import Parent from "../models/parent.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createError from "../utils/createError.js";
import qr from "qrcode";
import uploadToCloudinary from "../helper/uploadToCloudinary.js";
import fs from "fs";
import { log } from "console";

export const register = async (req, res, next) => {
    try {
        const { role, password, student } = req.body;
        if (!role) {
            return next(createError(400, "Role not found!"));
        }

        let newUser;
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt);

        switch (role) {
            case "admin":
                newUser = new Admin({ ...req.body, password: hashedPassword });
                break;

            case "student":
                newUser = new Student({ ...req.body, password: hashedPassword });
                const qrCodeData = await qr.toDataURL(newUser._id.toString());
                const { url } = await uploadToCloudinary(qrCodeData);
                newUser.qrCode = url;
                break;

            case "teacher":
                newUser = new Teacher({ ...req.body, password: hashedPassword });
                break;

            case "parent":
                newUser = new Parent({ ...req.body, password: hashedPassword });
                const userData = await Student.findOne({ rollNumber: student });
                userData.parent = newUser._id;
                userData.save();
                newUser.student = userData._id;
                break;

            default:
                return next(createError(400, "Invalid role!"));
        }

        await newUser.save();

        // const token = jwt.sign({ id: newUser._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return next(createError(400, "All fields are required!"));
        }

        let userModel;
        switch (role) {
            case "admin": userModel = Admin; break;
            case "student": userModel = Student; break;
            case "teacher": userModel = Teacher; break;
            case "parent": userModel = Parent; break;
            default: return next(createError(400, "Invalid role!"));
        }

        const user = await userModel.findOne({ email });
        if (!user) return next(createError(404, "User not found!"));

        console.log(user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(createError(401, "Invalid credentials!"));

        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token, // Including token in response
        });

    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res) => {
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");
};


export const getMe = async (req, res, next) => {
    try {
        const userId = req.user;

        if (!userId) {
            return next(createError(404, "Token not found!"));
        }

        let userModel;
        switch (req.user.role) {
            case "admin":
                userModel = Admin;
                break;
            case "student":
                userModel = Student;
                break;
            case "teacher":
                userModel = Teacher;
                break;
            case "parent":
                userModel = Parent;
                break;
            default:
                return next(createError(400, "Invalid role!"));
        }

        const userData = await userModel.findById(userId.id).select("-password");
        console.log(userData);

        if (!userData) {
            return next(createError(404, "User not found!"));
        }

        const userWithRole = {
            ...userData.toObject(),  // Convert Mongoose document to plain object
            role: req.user.role
        };

        return res.status(200).json({
            success: true,
            data: userWithRole // Send modified user data including the role
        });
    } catch (error) {
        next(error);
    }
};