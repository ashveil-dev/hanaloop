import { db } from "@server/db"
import { GroupsTable } from "@server/db/schema/groups";

export async function getGroups() {
    const result = await db.select().from(GroupsTable);

    return result;
}