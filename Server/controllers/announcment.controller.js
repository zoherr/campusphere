import Announcment from "../models/announcment.model.js";
import createError from "../utils/createError.js";

export const create = async (req, res, next) => {
    try {
        const { title, desc } = req.body;
        if (!title || !desc) {
            return next(createError(400,
                "Data not Found!!"
            ))
        }
        const newAnnounce = new Announcment({
            ...req.body
        })
        await newAnnounce.save()
        res.status(200).json({
            success: true,
            message: "Announcment create successfully!"
        })
    } catch (error) {
        next(error)
    }
}

export const getAnnounce = async (req, res, next) => {
    try {
        const announcment = await Announcment.find();
        if (!announcment) {
            return next(createError(400,
                "Data not Found!!"
            ));
        };
        res.status(200).json({
            success: true,
            data: announcment
        });
    } catch (error) {
        next(error);
    }
}