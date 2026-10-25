import type { Request, Response } from "express";
import { CreateTaskSchema } from "../schemas/taskSchema.js";
import { createNewTask } from "../queries/taskQueries.js";

export async function createTask(request: Request, response: Response) {
    try {
        const userId = request.userId;
        if (!userId) {
            return response.status(401).json({
                message: "invalid token",
            });
        }

        const workspaceIdHeader = request.headers.workspaceid;
        if (!workspaceIdHeader) {
            return response.status(400).json({
                message: "workspaceId not provided",
            });
        }
        const workspaceIdString = Array.isArray(workspaceIdHeader)
            ? workspaceIdHeader[0]
            : workspaceIdHeader;

        const workspaceId = Number(workspaceIdString);
        console.log("workspace: ", workspaceId);

        const body = request.body;
        const { success, data, error } = CreateTaskSchema.safeParse(body);
        if (!success) {
            return response.status(400).json({
                message: "invalid input",
                error: error.issues[0]?.message,
            });
        }

        const { title, description } = data;
        console.log("received: ", data);

        const newTask = await createNewTask(
            userId,
            workspaceId,
            title,
            description,
        );
        if (!newTask) {
            return response.status(404).json({
                message: "task not created, workspace not found",
            });
        }
        return response.status(201).json({
            message: "task created successfully",
            task: newTask,
        });
    } catch (error) {
        console.log("create task error : ", error);
        return response.status(500).json({
            message: "failed to create task",
        });
    }
}
