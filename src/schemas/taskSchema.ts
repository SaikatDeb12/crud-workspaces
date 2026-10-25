import * as z from "zod";

export const TaskSchema = z.object({
    id: z.number().int(),
    title: z.string().min(5).max(30),
    description: z.string().min(5).max(100),
    completed: z.boolean(),
    workspace_id: z.number().int().positive().nullable(),
    created_at: z.date(),
    archived_at: z.date().nullable(),
});

export const CreateTaskSchema = z.object({
    title: z.string().min(5).max(30),
    description: z.string().min(5).max(100),
});
