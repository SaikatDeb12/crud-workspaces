import type { Request, Response } from "express";
import {
    createNewWorkspace,
    deleteWorkspace,
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
                message: "unauthorized access",
            });
        }
        const workspaces = await fetchAllWorkspaces(userId);
        return response.status(200).json({
            workspaces: workspaces,
            total: workspaces.length,
        });
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
        if (!newWorkspace) {
            return response.status(404).json({
                message: "workspace not created, user not found",
            });
        }

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

interface WorkspaceParams {
    workspaceId: string;
}

export async function deleteWorkspaceWithId(
    request: Request<WorkspaceParams>,
    response: Response,
) {
    try {
        const { workspaceId } = request.params;
        const userId = request.userId;
        if (!userId) {
            return response.status(401).json({
                message: "unauthorized",
            });
        }
        const isWorkspaceDelete = await deleteWorkspace(workspaceId, userId);
        if (!isWorkspaceDelete) {
            return response.status(404).json({
                message: `workspace with id : ${workspaceId} not found`,
            });
        }

        return response.status(200).json({
            message: `workspace with id : ${workspaceId} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "failed to delete workspace",
        });
    }
}
