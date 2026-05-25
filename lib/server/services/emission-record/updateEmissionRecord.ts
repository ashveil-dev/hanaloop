import { db } from "@/lib/server/db";
import { eq } from "drizzle-orm";
import { ApiError } from "@/lib/server/errors/ApiError";
import { EmissionRecordsTable } from "../../db/schema/emissionRecords";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { mapEmissionRecord } from "@/lib/server/services/emission-record/mapEmissionRecord";

type updateEmissionRecordParameterType = {
    id: number;
    groupId?: number;
    emissionFactorId?: number;
    scopeType?: "SCOPE1" | "SCOPE2" | "SCOPE3";
    amount?: string;
    unit?: string;
    recordedAt?: string;
};

export async function updateEmissionRecord({
    id,
    groupId,
    emissionFactorId,
    scopeType,
    amount,
    unit,
    recordedAt,
}: updateEmissionRecordParameterType) {
    const result = await db
        .update(EmissionRecordsTable)
        .set({ groupId, emissionFactorId, scopeType, amount, unit, recordedAt })
        .where(eq(EmissionRecordsTable.id, id))
        .returning();

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected record does not exist.",
        });
    }

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

    return mapEmissionRecord(rows[0]);
}
