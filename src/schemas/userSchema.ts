import * as z from "zod";

export const UserSchema = z.object({
    id: z.number().int(),
    username: z.string().min(3).max(15),
    password: z.string().min(8).max(20),
});

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().min(8).max(20),
});

// module.exports = { UserSchema, CreateUserSchema };
