import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

export const authRouter = Router();
authRouter.post("/signup", registerUser);
authRouter.post("/signin", loginUser);
