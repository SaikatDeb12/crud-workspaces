import { pool } from "../db.js";

export async function fetchAllWorkspaces(userId: number) {
    const workspacesList = await pool.query(
        `SELECT id, name FROM workspaces WHERE user_id=$1 and archived_at is null order by id`,
        [userId],
    );
    return workspacesList.rows;
}

export async function createNewWorkspace(
    workspaceName: string,
    userId: number,
) {
    const newWorkspace = await pool.query(
        `
        insert into workspaces (name, user_id) 
        select $1, id from users
        where id=$2 and archived_at is null
        returning id, name, user_id
        `,
        [workspaceName, userId],
    );
    // "INSERT INTO workspaces (user_id, name) VALUES ($2, $1) RETURNING (id)",
    //     [workspaceName, userId],
    // );
    return newWorkspace.rows[0];
}

export async function deleteWorkspace(
    workspaceId: string,
    userId: number,
): Promise<boolean> {
    const client = await pool.connect();
    try {
        client.query("BEGIN");

        const result = await client.query(
            `
            update workspaces set archived_at = NOW()
            where id=$1 and user_id=$2 and archived_at is null
            returning id
            `,
            [workspaceId, userId],
        );

        if (result.rowCount == 0) {
            await client.query("ROLLBACK");
            return false;
        }

        await client.query(
            `
            update tasks set archived_at = NOW()
            where workspace_Id = $1 and user_Id = $2 and archived_at is null
            `,
            [workspaceId, userId],
        );

        await client.query("COMMIT");
        return true;
    } catch (error) {
        client.query("ROLLBACK");
        return false;
    } finally {
        client.release();
    }
}
