import { config } from "../configs.js";
import bcrypt from "bcryptjs";
import type { Response, Request } from "express";
import { AuthUserSchema } from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../queries/userQueries.js";

export async function registerUser(request: Request, response: Response) {
    try {
        const body = request.body;
        const { success, error, data } = AuthUserSchema.safeParse(body);

        if (!success) {
            return response.status(400).json({
                message: error.issues[0]?.message,
            });
        }

        const { username, password } = data;
        const isUserExists = await findUserByUsername(username);
        if (isUserExists) {
            return response.status(409).json({
                message: "username already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, hashedPassword);

        return response.status(201).json({
            message: "user created successfully",
            user: newUser,
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            message: "internal server error",
        });
    }
}

export async function loginUser(request: Request, response: Response) {
    try {
        const body = request.body;
        const { success, error, data } = AuthUserSchema.safeParse(body);

        if (!success) {
            return response.status(400).json({
                message: error.issues[0]?.message,
            });
        }

        const { username, password } = data;
        const user = await findUserByUsername(username);
        if (!user) {
            return response.status(400).json({
                message: "user doesn't exists",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return response.status(401).json({
                message: "unauthorized user",
            });
        }
        // console.log("isvalid : ", isValidPassword);

        const payload = {
            userId: user.id,
        };
        const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: "1d",
            algorithm: "HS256",
        });

        return response.status(200).json({
            message: "user signedin successfully",
            token: token,
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({
            message: "internal server error",
        });
    }
}
