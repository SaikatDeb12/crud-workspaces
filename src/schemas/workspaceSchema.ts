import * as z from "zod";

export const WorkspaceSchema = z.object({
    id: z.number().int(),
    name: z.string().min(3).max(15),
    user_id: z.number().int().nullable(),
    archived_at: z.date().nullable(),
});

export const CreateWorkspaceSchema = z.object({
    name: z.string().min(3).max(15),
});
