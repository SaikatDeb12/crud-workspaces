import type { Request, Response } from "express";
import {
    createNewWorkspace,
    fetchAllWorkspaces,
} from "../queries/workspaceQueries.js";
import { CreateWorkspaceSchema } from "../schemas/workspaceSchema.js";

export async function displayAllWorkspaces(
    request: Request,
    response: Response,
) {
    try {
        const userId = request.userId;
        if (!userId) {
            return response.status(401).json({
                message: "unauthorised access",
            });
        }
        const workspaces = await fetchAllWorkspaces(userId);
        if (workspaces.length == 0) {
            return response.status(200).json({
                workspaces: workspaces,
                total: workspaces.length,
            });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "failed to fetch workspaces",
        });
    }
}

export async function createWorkspace(request: Request, response: Response) {
    try {
        const body = request.body;
        const { success, error, data } = CreateWorkspaceSchema.safeParse(body);
        if (!success) {
            return response.status(400).json({
                message: "invalid input",
                error: error.issues[0]?.message,
            });
        }

        const { name } = data;
        const userId = request.userId;
        if (!userId) {
            return response.status(401).json({
                message: "unauthorised access",
            });
        }

        const newWorkspace = await createNewWorkspace(name, userId);
        return response.status(201).json({
            message: "workspace created successfully",
            workspace: newWorkspace,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "failed to create workspace",
        });
    }
}
