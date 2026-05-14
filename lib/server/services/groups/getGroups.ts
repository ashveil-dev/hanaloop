import { db } from "@/lib/server/db"
import { GroupsTable } from "@/lib/server/db/schema/groups";

export async function getGroups() {
    const result = await db
        .select()
        .from(GroupsTable);

    return result;
}