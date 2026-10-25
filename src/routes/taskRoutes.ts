import { Router } from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { createTask } from "../controllers/taskController.js";

export const taskRouter = Router();
taskRouter.use(authMiddleware);
taskRouter.post("/", createTask);
