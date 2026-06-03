import { db } from "@/lib/server/db";
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { eq, sql } from "drizzle-orm";

export async function getEmissionsByFactorCategory() {
    const rows = await db
        .select({
            category: EmissionFactorsTable.category,
            emission: sql<number>`
                COALESCE(SUM(${EmissionRecordsTable.amount} * ${EmissionFactorsTable.factor}), 0)
            `.mapWith(Number),
        })
        .from(EmissionRecordsTable)
        .innerJoin(
            EmissionFactorsTable,
            eq(EmissionRecordsTable.emissionFactorId, EmissionFactorsTable.id)
        )
        .groupBy(EmissionFactorsTable.category)
        .orderBy(
            sql`COALESCE(SUM(${EmissionRecordsTable.amount} * ${EmissionFactorsTable.factor}), 0) DESC`
        );

    return {
        unit: "kgCO2e",
        categories: rows
            .filter((row) => row.emission > 0)
            .map((row) => ({
                category: row.category,
                emission: row.emission,
            })),
    };
}
