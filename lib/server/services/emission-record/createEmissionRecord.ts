import { db } from "@server/db"
import { EmissionRecordsTable } from "@server/db/schema/emissionRecords";

type createEmissionRecordParameterType = {
    groupId: number,
    scopeType: "SCOPE1" | "SCOPE2" | "SCOPE3",
    amount: string,
    unit: string,
    recordedAt: string,
}

export async function createEmissionRecord({
    groupId,
    scopeType,
    amount,
    unit,
    recordedAt
}: createEmissionRecordParameterType) {
    const result = await db
        .insert(EmissionRecordsTable)
        .values({
            groupId,
            scopeType,
            amount,
            unit,
            recordedAt
        })
        .returning();

    return result;
}