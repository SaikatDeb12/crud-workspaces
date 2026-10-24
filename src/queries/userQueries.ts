import { pool } from "../db.js";

export async function findUserByUsername(username: string) {
    const result = await pool.query(
        "select username, id, password FROM users WHERE username = $1 and archived_at is null",
        [username],
    );
    return result.rows[0] || null;
}

export async function createUser(username: string, password: string) {
    const result = await pool.query(
        "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING id, username, created_at",
        [username, password],
    );
    return result.rows[0];
}
