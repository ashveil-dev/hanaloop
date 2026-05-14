import { db } from "@server/db"
import { z } from "zod";
import { GroupsTable } from "@server/db/schema/groups";

type createGroupParameterType = {
    name : string,
    parentId : number | null
}

export async function createGroup({
    name,
    parentId
}: createGroupParameterType) {
    const group: typeof GroupsTable.$inferInsert = {
        name,
        parentId
    };

    try {
        const result = await db.insert(GroupsTable).values(group).returning();
        return Response.json(result[0])
    } catch(e) {
        return Response.json(
        {
            message : "그룹 생성을 실패하였습니다."
        }, {
            status : 500
        })
    }

}