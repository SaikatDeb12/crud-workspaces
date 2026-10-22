import bcrypt from "bcryptjs";
import type { Response, Request } from "express";
import { CreateUserSchema } from "../schemas/userSchema.js";
import { createUser, findUserByUsername } from "../models/userModel.js";

export async function registerUser(request: Request, response: Response) {
    try {
        const body = request.body;
        const { success, error, data } = CreateUserSchema.safeParse(body);

        if (!success) {
            return response.status(400).json({
                message: error.issues[0]?.message,
            });
        }

        const username = data.username;
        const isUserExists = await findUserByUsername(username);
        if (isUserExists) {
            return response.status(400).json({
                message: "username already exists",
            });
        }

        const password = data.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await createUser(username, hashedPassword);
        console.log(newUser);

        return response.status(200).json({
            message: "user created successfully",
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            message: "Internal server error",
        });
    }
}
