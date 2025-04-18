import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import { JSONStructure } from "../utils/helper.js";

const Login = async (req, res) => {
  try {
    const errors = await validationResult(req);
    console.log("validateResult:" , errors);

    if (!errors.isEmpty()) {
      // return res.status(400).json({ message: "Validation Error", errors: errors.array() });
      res.json(JSONStructure(StatusCode.validation_error, "Validation error", errors.mapped()));
      return
    }

    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json(JSONStructure(StatusCode.unprocessable_entity, "Username or password is incorrect"))
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.json(JSONStructure(StatusCode.unprocessable_entity, "Username or password is incorrect"))
    }

    const token = jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);

    res.json(JSONStructure(StatusCode.success, "Login Successful", { userId: user._id, token: token }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default Login;
