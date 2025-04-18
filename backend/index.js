import express from "express";
import router, { Protectedapi } from "./routes/api.js";
import mongoose from "mongoose";
import { DB_URL } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
});

// CORS configuration
app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'auth', 'Authorization']
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api', router);
app.use('/api', AuthMiddleware, Protectedapi);

// Add a test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port number ${PORT}`);
});

//for vercel
export default app;