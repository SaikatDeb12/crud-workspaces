import { pool } from "../db.js";

export async function createNewTask(
    userId: number,
    workspaceId: number,
    title: string,
    description: string,
) {
    // first taking the property we need to insert
    const newTask = await pool.query(
        `insert into tasks (title, description, workspace_id)
        select $1, $2, $3
        where exists(
            select 1
            from workspaces 
            where id = $3 and user_id = $4 and archived_at is null and exists(
                select 1
                from users
                where id = $4 and archived_at is null
            )
        )
        returning * `,
        [title, description, workspaceId, userId],
    );

    return newTask.rows[0] ?? null;
}
