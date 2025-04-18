import jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET } from '../utils/constants.js';

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
*/

const AuthMiddleware = (req, res, next) => { // Add 'next' as a parameter
    if (req.headers["auth"] === undefined) {
        return res.status(401).json({ message: "Authentication error  Access Denied" }); // Change status code to 401 for unauthorized access
    }

    const token = req.headers['auth'];

    try {
        const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
        console.log(decoded);

        // Store the user ID in the request for later use
        req.userId = decoded.userId;

        return next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid Token", error: err.message }); // Change status code to 401 for unauthorized access
    }
};

export default AuthMiddleware;
