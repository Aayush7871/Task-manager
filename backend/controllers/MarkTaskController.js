import { validationResult } from "express-validator";
import Task from "../models/Task.js";


export const MarkTask = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            staus: 501,
            message: "task id is required ",
            errors
        })
    }

    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.body.task_id,
                userId: req.userId
            }, [
            {
                $set: {
                    isCompleted: {
                        $eq: [false, "$isCompleted"]
                    }
                }
            }
        ]
        );

        if (task) {
            return res.json({
                status: 200,
                message: "Task Completed successfully",
                task
            })
        } else {
            return res.json({
                status: 401,
                message: "could not upadate it ",
                null:""
            })
        }
    } catch (err) {
        return res.staus(501).json({
            message: "Something went wrong",
            err
        })
    }
};