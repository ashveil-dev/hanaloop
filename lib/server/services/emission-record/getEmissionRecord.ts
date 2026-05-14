import { db } from "@/lib/server/db"
import { eq } from "drizzle-orm";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { ApiError } from "@/lib/server/errors/ApiError";

type getEmissionRecordParameterType = {
    id: number
}

export async function getEmissionRecord({
    id
}: getEmissionRecordParameterType) {
    const result = await db
        .select()
        .from(EmissionRecordsTable)
        .where(eq(EmissionRecordsTable.id, id))

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected emission record does not exist."
        })
    }

    return result;
}