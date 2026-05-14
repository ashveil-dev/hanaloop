import { db } from "@server/db"
import { GroupsTable } from "@server/db/schema/groups"
import { eq } from "drizzle-orm";
import { ApiError } from "@server/errors/ApiError";

type deleteGroupParameterType = {
    id: number
}

export async function deleteGroup({ id }: deleteGroupParameterType) {
    const result = await db
        .delete(GroupsTable)
        .where(eq(GroupsTable.id, id))
        .returning();

    if(result.length === 0) {
        throw new ApiError({
            status : 400,
            message : "The selected group does not exist."
        })
    }

    return result[0]
}