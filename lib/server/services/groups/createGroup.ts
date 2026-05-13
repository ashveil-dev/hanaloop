import { db } from "@server/db"
import { GroupsSchema } from "../../db/schema/groups";

type createGroupParameterType = {
    name: string,
    parentId?: string,
}

export async function createGroup({
    name,
    parentId
}: createGroupParameterType) {
    const group: typeof GroupsSchema.$inferInsert = {
        name : name,
        parentId : parentId === undefined ? null : parseInt(parentId)
    };

    try {
        const result = await db.insert(GroupsSchema).values(group).returning();
        return Response.json(result[0])
    } catch(e) {
        return Response.json(
        {
            message : "group create failed"
        }, {
            status : 500
        })
    }

}