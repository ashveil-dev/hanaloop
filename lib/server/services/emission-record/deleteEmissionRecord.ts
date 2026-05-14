import { db } from "@server/db"
import { eq } from "drizzle-orm";
import { EmissionRecordsTable } from "@server/db/schema/emissionRecords";
import { ApiError } from "@server/errors/ApiError";

type deleteEmissionRecordParameterType = {
    id: number
}

export async function deleteEmissionRecord({
    id
}: deleteEmissionRecordParameterType) {
    const result = await db
        .delete(EmissionRecordsTable)
        .where(eq(EmissionRecordsTable.id, id))
        .returning();

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected group does not exist."
        })
    }
    
    return result[0];
}