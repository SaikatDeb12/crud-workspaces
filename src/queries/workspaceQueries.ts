import { pool } from "../db.js";

export async function fetchAllWorkspaces(userId: number) {
    const workspacesList = await pool.query(
        "SELECT id, name FROM workspaces WHERE user_id=$1 order by id",
        [userId],
    );
    return workspacesList.rows;
}

export async function createNewWorkspace(
    workspaceName: string,
    userId: number,
) {
    const newWorkspace = await pool.query(
        "INSERT INTO workspaces (user_id, name) VALUES ($2, $1) RETURNING (id)",
        [workspaceName, userId],
    );
    return newWorkspace.rows[0];
}

export async function deleteWorkspace(workspaceId: string, userId: number) {
    const result = await pool.query(
        "DELETE FROM workspaces WHERE id=$1 AND user_id=$2",
        [workspaceId, userId],
    );
    return result.rowCount;
}
