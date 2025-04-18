import { validationResult } from "express-validator";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { JSONStructure } from '../utils/helper.js';
import { StatusCode } from "../utils/constants.js";

export const createTask = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json(JSONStructure(StatusCode.validation_error, "Task is Required", errors.mapped()));
    }

    try {
        const result = await Task.create({
            userId: req.userId,
            desc: req.body.desc,
        });
        console.log("data body: " , req.body);
        console.log("Result data :" ,result);

        if (result) {
            const user = await User.findOneAndUpdate(
                { _id: req.userId },
                {
                    $push: { tasks: result },
                },
                { new: true }
            );
            console.log(req.userId);
            

            return res.json(JSONStructure(StatusCode.success, "Task created Successfully", result));
        }
    } catch (err) {
        return res.json(JSONStructure(StatusCode.unprocessable_entity,"Something went wrong !",err))
    }
};
