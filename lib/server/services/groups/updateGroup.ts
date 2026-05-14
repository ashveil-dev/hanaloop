import { db } from "@server/db"
import { GroupsTable } from "@server/db/schema/groups"
import { eq } from "drizzle-orm";

type updateGroupParameterType = {
    id: number,
    name?: string,
    parentId?: number
}

export async function updateGroup({ id, name, parentId }: updateGroupParameterType) {
    try {
        const result = await db.update(GroupsTable).set({
            name,
            parentId
        }).where(eq(GroupsTable.id, id))
        .returning();


        return Response.json(result[0]);
    } catch (e) {
        return Response.json(
        {
            message : "group update failed"
        }, {
            status : 500
        })
    }
}