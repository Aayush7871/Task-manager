import { check } from 'express-validator';


export const RegisterSchema = [
    check('name').trim().isAlpha().withMessage("Name should be Alphabets only"),
    check('username', 'username should be alphanumeric charecter only of min 6 character').exists().isAlphanumeric().withMessage("user is required").trim().isLength({ min: 6, max: 32 }),

    check("password", 'password of min 6 character required').exists().withMessage("Password is required").isLength({ min: 6, max: 100 }).trim(),

    check('email', 'email is required').exists().isEmail(),
]