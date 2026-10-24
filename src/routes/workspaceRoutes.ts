import { Router } from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import {
    createWorkspace,
    deleteWorkspaceWithId,
    displayAllWorkspaces,
} from "../controllers/workspaceController.js";

export const workspaceRouter = Router();
workspaceRouter.use(authMiddleware);
workspaceRouter.get("/workspaces", displayAllWorkspaces);
workspaceRouter.post("/workspace", createWorkspace);
workspaceRouter.delete("/workspace/:workspaceId", deleteWorkspaceWithId);
