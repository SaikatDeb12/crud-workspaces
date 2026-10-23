import { pool } from "../db.js";

export async function fetchAllWorkspaces(userId: number) {
    const workspacesList = await pool.query(
        "select id, name from workspace where user_id=$1 order by id",
        [userId],
    );
    return workspacesList.rows;
}

export async function createNewWorkspace(
    workspaceName: string,
    userId: number,
) {
    const workspace = await pool.query(
        "insert into workspaces (user_id, name) values ($2, $1) returning (id)",
        [workspaceName, userId],
    );
    return workspace.rows[0];
}
