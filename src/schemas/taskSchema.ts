import * as z from "zod";

const TaskSchema = z.object({
    id: z.number().int(),
    title: z.string().min(5).max(30),
    desription: z.string().min(5).max(100),
    completed: z.boolean(),
    workspace_id: z.number().int().nullable(),
});

module.exports = { TaskSchema };
