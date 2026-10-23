import type { Request, Response } from "express";
import { fetchAllWorkspaces } from "../queries/workspaceQueries.js";

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
