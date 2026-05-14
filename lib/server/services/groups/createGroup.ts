import { db } from "@/lib/server/db"
import { GroupsTable } from "@/lib/server/db/schema/groups";

type createGroupParameterType = {
    name: string,
    parentId: number | null
}

export async function createGroup({
    name,
    parentId
}: createGroupParameterType) {
    const result = await db
        .insert(GroupsTable)
        .values({ name, parentId })
        .returning();

    return result;
}