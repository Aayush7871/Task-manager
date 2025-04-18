import { check } from "express-validator";


export const LoginSchema = [
    check('username', 'username should be alphanumeric charecter only').exists().isAlphanumeric().withMessage("user is required").trim().isLength({ min: 6, max: 32 }),
    check('password', 'password should be of min 6 character').exists().withMessage("Password is required").isLength({ min: 6, max: 32 })
]