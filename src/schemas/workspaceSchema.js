import * as z from "zod";

const WorkspaceSchema = z.object({
    id: z.number().int(),
    name: z.string().min(3).max(15),
    user_id: z.number().int().nullable(),
});

module.exports = { WorkspaceSchema };
