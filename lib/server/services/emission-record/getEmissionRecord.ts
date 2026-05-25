import { db } from "@/lib/server/db";
import { eq } from "drizzle-orm";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { ApiError } from "@/lib/server/errors/ApiError";
import { mapEmissionRecord } from "@/lib/server/services/emission-record/mapEmissionRecord";

type getEmissionRecordParameterType = {
    id: number;
};

export async function getEmissionRecord({ id }: getEmissionRecordParameterType) {
    const rows = await db
        .select({
            id: EmissionRecordsTable.id,
            groupId: EmissionRecordsTable.groupId,
            emissionFactorId: EmissionRecordsTable.emissionFactorId,
            scopeType: EmissionRecordsTable.scopeType,
            amount: EmissionRecordsTable.amount,
            unit: EmissionRecordsTable.unit,
            recordedAt: EmissionRecordsTable.recordedAt,
            createdAt: EmissionRecordsTable.createdAt,
            factorName: EmissionFactorsTable.name,
            factorCategory: EmissionFactorsTable.category,
            factor: EmissionFactorsTable.factor,
            inputUnit: EmissionFactorsTable.inputUnit,
            outputUnit: EmissionFactorsTable.outputUnit,
        })
        .from(EmissionRecordsTable)
        .innerJoin(
            EmissionFactorsTable,
            eq(EmissionRecordsTable.emissionFactorId, EmissionFactorsTable.id)
        )
        .where(eq(EmissionRecordsTable.id, id));

    if (rows.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected emission record does not exist.",
        });
    }

    return mapEmissionRecord(rows[0]);
}
