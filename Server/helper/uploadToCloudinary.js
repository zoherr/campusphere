import cloudinary from "../utils/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
    try {
        const res = await cloudinary.uploader.upload(filePath)
        return {
            url: res.secure_url,
            public_id: res.public_id
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export default uploadToCloudinary;
