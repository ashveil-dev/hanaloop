import { db } from "@server/db"
import { GroupsTable } from "@server/db/schema/groups"
import { eq } from "drizzle-orm";

type deleteGroupParameterType = {
    id: string
}

export async function deleteGroup({ id }: deleteGroupParameterType) {
    try {
        const result = await db.delete(GroupsTable).where(eq(GroupsTable.id, parseInt(id))).returning();

        return Response.json(result[0]);
    } catch (e) {
        return Response.json(
        {
            message : "group delete failed"
        }, {
            status : 500
        })
    }
}