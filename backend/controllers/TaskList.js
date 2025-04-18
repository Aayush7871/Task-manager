import User from "../models/User.js";
import { JSONStructure } from '../utils/helper.js';
import { StatusCode } from '../utils/constants.js';

export const GetTasks = async (req, res) => {
    try {
        const list = await User.findById(req.userId).select("-password").populate("tasks").exec();


        return res.json(JSONStructure(StatusCode.success, "All task list",list));

    } catch (error) {
        return res.json(JSONStructure(StatusCode.unprocessable_entity, "Error ",list));
    }
};