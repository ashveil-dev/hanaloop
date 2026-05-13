import { db } from "@server/db"

type createGroupParameterType = {
    name: string,
    parent_id: string | null
}

export async function createGroup({
    name,
    parent_id
}: createGroupParameterType) {
    const result = await db.query(
        `
            insert into groups(name, parent_id)
            values ($1, $2)
        `, [name, parent_id]
    )

    console.log(result.rowCount);

    return true;
}