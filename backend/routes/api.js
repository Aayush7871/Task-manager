import express from "express";
import Register from "../controllers/RegisterController.js";
import { RegisterSchema } from "../validationSchemas/RegisterSchema.js";
import Login from "../controllers/LoginController.js";
import { LoginSchema } from "../validationSchemas/LoginSchema.js";
import { createTask } from "../controllers/TaskController.js";
import { check } from "express-validator";
import { GetTasks } from "../controllers/TaskList.js";
import { MarkTask } from "../controllers/MarkTaskController.js";
import { RemoveTask } from "../controllers/RemoveTaskComtroller.js";

const router = express.Router();
export const Protectedapi = express.Router();


router.post("/register", RegisterSchema, Register);
router.post("/login", LoginSchema, Login);


Protectedapi.post('/createTask', [check("desc", "Task desc is required").exists()], createTask);

Protectedapi.post('/marktask', [check("task_id", "Task id is required").exists()], MarkTask);

Protectedapi.post('/deletetask', [check("task_id", "Task id is required").exists()], RemoveTask);

Protectedapi.get('/tasklist', GetTasks);



export default router;   