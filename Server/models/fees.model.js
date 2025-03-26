import mongoose, { Schema, Types, model } from "mongoose";

const feesSchema = new Schema({
    paymentInfo: Object,
    Amount: Number,
    student: {
        type: Types.ObjectId, ref: "Student"
    },
    class: {
        type: Types.ObjectId, ref: "Class"
    },
    payment_intent:String
}, { timestamps: true })
const Fees = model("Fees", feesSchema);
export default Fees;