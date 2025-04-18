import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.MONGODB_URI;
export const JWT_TOKEN_SECRET = process.env.JWT_SECRET;
export const StatusCode = {
    success: 200,
    validation_error: 201,
    unprocessable_entity: 202
}

export const PORT = process.env.PORT || 8000;