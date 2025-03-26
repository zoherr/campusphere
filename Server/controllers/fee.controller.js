import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Fees from "../models/fees.model.js";
import createError from "../utils/createError.js";
import Parent from "../models/parent.model.js";


import Stripe from "stripe";

export const intent = async (req, res, next) => {
    try {
        const stripe = new Stripe("sk_test_51PDPgFSI9RTm3dVEiIwWb7AMgdvgMqcxzwmL20PnxGBdWazOZWrIp2LD25jPU2mROmLtuyLoQMlOFemn55LVrRYf00xRiHbIF6");

        const userId = req.user;
        const userData = await Parent.findById(userId.id).select("-password");


        const student = await Student.findById(userData.student);
        const classData = await Class.findById(student.class)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: classData.feesAmount * 100,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const feeRecord = new Fees({ student: student._id, class: classData._id, Amount: classData.feesAmount, payment_intent: paymentIntent.id });
        await feeRecord.save();

        classData.fees.push(feeRecord._id);
        await classData.save();

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        next(error)
    }

};


export const getFeeStatusForClass = async (req, res, next) => {
    try {
        const { classId } = req.params;

        // Check if class exists
        const classData = await Class.findById(classId).populate("students", "name email");

        if (!classData) {
            return next(createError(404, "Class not found"));
        }

        // Get paid students
        const paidStudents = await Fees.find({ class: classId }).populate("student", "name email");
        const paidStudentIds = paidStudents.map((fee) => fee.student._id.toString());

        // Get unpaid students
        const unpaidStudents = classData.students.filter(
            (student) => !paidStudentIds.includes(student._id.toString())
        );

        res.status(200).json({
            success: true,
            paidStudents: paidStudents.map((fee) => fee.student),
            unpaidStudents,
        });
    } catch (error) {
        next(error);
    }
};
export const getFeeStatus = async (req, res, next) => {
    try {


        const feeRecords = await Fees.find().populate("class");

        const feeHistory = feeRecords.map(record => ({
            amountPaid: record.Amount,
            paymentDate: record.createdAt,
            name: record.class.name,

        }));

        res.status(200).json({
            success: true,
            data: feeHistory
        });
    } catch (error) {
        next(error);
    }
};

export const getPerticulerFeeStatus = async (req, res, next) => {
    try {
        const userId = req.user;
        const userData = await Parent.findById(userId.id).select("-password");

        const feeRecord = await Fees.findOne({ student: userData.student });

        const student = await Student.findById(userData.student);
        const classData = await Class.findById(student.class)

        res.status(200).json({
            success: true,
            feeStatus: feeRecord ? true : false,
            amount: classData.feesAmount
        });

    } catch (error) {
        next(error);
    }
};

export const studentHistory = async (req, res, next) => {
    try {
        const userId = req.user;

        // Fetch parent data
        const parent = await Parent.findById(userId.id).select("-password");
        if (!parent || !parent.student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const feeRecords = await Fees.find({ student: parent.student }).populate("class");

        const feeHistory = feeRecords.map(record => ({
            amountPaid: record.Amount,
            paymentDate: record.createdAt,
            name: record.class.name,

        }));

        res.status(200).json({
            success: true,
            data: feeHistory
        });

    } catch (error) {
        next(error);
    }
};

