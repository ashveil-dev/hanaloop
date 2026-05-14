import { db } from "@/lib/server/db"
import { eq } from "drizzle-orm";
import { ApiError } from "@/lib/server/errors/ApiError";
import { GroupsTable } from "@/lib/server/db/schema/groups";

type getGroupParameterType = {
    id: number
}

export async function getGroup({
    id
}: getGroupParameterType) {
    const result = await db
        .select()
        .from(GroupsTable)
        .where(eq(GroupsTable.id, id))

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected group does not exist."
        })
    }

    return result;
}