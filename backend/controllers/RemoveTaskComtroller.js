import { validationResult } from "express-validator";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { JSONStructure } from "../utils/helper.js";
import { StatusCode } from "../utils/constants.js";

export const RemoveTask = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.json(JSONStructure(StatusCode.validation_error, "task id is required ...."));
    }

    try {
        const result = await Task.findOneAndDelete({
            userId: req.userId,
            _id: req.body.task_id
        });

        if (result) {
            const user = await User.findOneAndUpdate({
                _id: req.userId,
            },
                { $pull: { tasks: req.body.task_id } }
            );
            return res.json(JSONStructure(StatusCode.success, "task deleted ", null));


        }

    } catch (err) {
        return res.json(JSONStructure(StatusCode.unprocessable_entity, "Could not delete ", null));
    }
};