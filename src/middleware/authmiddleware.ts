import { config } from "../configs.js";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function authMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;
    const token = authHeader?.trim().split(" ")[1];
    if (!token) {
        response.status(401).json({
            message: "Authorization token missing",
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret, {
            algorithms: ["HS256"],
        });
        console.log(decoded);
        if (typeof decoded === "string" || typeof decoded.userId != "number") {
            response.status(401).json({
                message: "invalid token",
            });
            return;
        }

        request.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({
            message: "unauthorized access",
        });
        return;
    }
}
