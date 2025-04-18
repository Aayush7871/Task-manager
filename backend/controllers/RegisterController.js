import { validationResult } from "express-validator";
import { JSONStructure } from "../utils/helper.js";
import { StatusCode, JWT_TOKEN_SECRET } from "../utils/constants.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';


const Register = async (req, res) => {


    const errors = validationResult(req);
    if (errors.isEmpty()) {

        const { name, username, password, email } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // save to db

        const userExist = await User.findOne({
            $or: [{
                email: email
            }, {
                username: username
            }
            ]
        });

        if (userExist) {
            return res.json(JSONStructure(StatusCode.unprocessable_entity, "User or Email already exists"));
        }
        try {
            const result = await User.create({
                name: name,
                password: hashPassword,
                email: email,
                username: username
            });


            const token = jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);

            res.json(JSONStructure(StatusCode.success, "Registration successfull", { userId: result._id, token: token }));
            // return res.json({
            //     status:200,
            //     message: "Registered Successfully",
            //     userId: result._id,
            //     token: token,
            //     result
            // });
        } catch (err) {
            console.error(err); // Log the error
            return res.status(500).json({ message: "Internal Server Error" }); // Send an error response
        }



    }else{
        res.json(JSONStructure(StatusCode.validation_error, "Validation error", errors.mapped()));
    }
};


export default Register; 