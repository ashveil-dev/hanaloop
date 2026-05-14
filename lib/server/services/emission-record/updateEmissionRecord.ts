import { db } from "@server/db"
import { eq } from "drizzle-orm";
import { ApiError } from "@server/errors/ApiError";
import { EmissionRecordsTable } from "../../db/schema/emissionRecords";

type updateEmissionRecordParameterType = {
    id: number,
    groupId?: number,
    scopeType?: "SCOPE1" | "SCOPE2" | "SCOPE3",
    amount?: string,
    unit?: string,
    recordedAt?: string
}

export async function updateEmissionRecord({ id, groupId, scopeType, amount, unit, recordedAt }: updateEmissionRecordParameterType) {
    const result = await db.update(EmissionRecordsTable)
        .set({ id, groupId, scopeType, amount, unit, recordedAt })
        .where(eq(EmissionRecordsTable.id, id))
        .returning();

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected record does not exist."
        })
    }


    return result[0];
}