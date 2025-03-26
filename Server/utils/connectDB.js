import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO).then(() => {
            console.log("DB Connected sucessfully!!");
        })
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;