import { pool } from "../db.js";

export async function fetchAllWorkspaces(userId: number) {
    const workspacesList = await pool.query(
        "select id, name from workspace where user_id=$1 order by id",
        [userId],
    );
    return workspacesList.rows;
}
