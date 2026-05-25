import { db } from "@/lib/server/db";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { eq } from "drizzle-orm";
import { mapEmissionRecord } from "@/lib/server/services/emission-record/mapEmissionRecord";

type createEmissionRecordParameterType = {
    groupId: number;
    emissionFactorId: number;
    scopeType: "SCOPE1" | "SCOPE2" | "SCOPE3";
    amount: string;
    unit?: string;
    recordedAt: string;
};

export async function createEmissionRecord({
    groupId,
    emissionFactorId,
    scopeType,
    amount,
    unit,
    recordedAt,
}: createEmissionRecordParameterType) {
    const [factor] = await db
        .select({ inputUnit: EmissionFactorsTable.inputUnit })
        .from(EmissionFactorsTable)
        .where(eq(EmissionFactorsTable.id, emissionFactorId));

    const [inserted] = await db
        .insert(EmissionRecordsTable)
        .values({
            groupId,
            emissionFactorId,
            scopeType,
            amount,
            unit: unit ?? factor?.inputUnit ?? "kWh",
            recordedAt,
        })
        .returning();

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
        .where(eq(EmissionRecordsTable.id, inserted.id));

    return mapEmissionRecord(rows[0]);
}
