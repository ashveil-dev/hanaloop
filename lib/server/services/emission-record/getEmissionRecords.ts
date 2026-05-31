import { db } from "@/lib/server/db";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { eq } from "drizzle-orm";
import { mapEmissionRecord } from "@/lib/server/services/emission-record/mapEmissionRecord";

export async function getEmissionRecords() {
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
        );

    return rows.map(mapEmissionRecord);
}
