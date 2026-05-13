import { db } from "@server/db"

export async function getGroups() {
    const result = await db.query(`SELECT * from groups`);

    return result.rows;
}