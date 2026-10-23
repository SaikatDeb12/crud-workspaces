import { pool } from "../db.js";

export async function findUserByUsername(username: string) {
    const result = await pool.query(
        "SELECT username, id, password FROM users WHERE username = $1",
        [username],
    );
    return result.rows[0] || null;
}

export async function createUser(username: string, password: string) {
    const result = await pool.query(
        "insert into users(username, password) values ($1, $2) returning id, username, created_at",
        [username, password],
    );
    return result.rows[0];
}
