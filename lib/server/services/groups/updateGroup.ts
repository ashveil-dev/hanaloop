import { db } from "@/lib/server/db"
import { GroupsTable } from "@/lib/server/db/schema/groups"
import { eq } from "drizzle-orm";
import { ApiError } from "@/lib/server/errors/ApiError";

type updateGroupParameterType = {
    id: number,
    name?: string,
    parentId?: number
}

export async function updateGroup({ id, name, parentId }: updateGroupParameterType) {
    const result = await db.update(GroupsTable)
        .set({ name, parentId })
        .where(eq(GroupsTable.id, id))
        .returning();

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected group does not exist."
        })
    }


    return result[0];
}