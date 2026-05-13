import { db } from "@server/db"
import { GroupsSchema } from "@server/db/schema/groups";

export async function getGroups() {
    const result = await db.select().from(GroupsSchema);

    return result;
}