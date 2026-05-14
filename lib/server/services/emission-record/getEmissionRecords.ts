import { db } from "@/lib/server/db"
import { EmissionRecordsTable } from "@/lib/server/db/schema/emissionRecords";

export async function getEmissionRecords() {
    const result = await db
        .select()
        .from(EmissionRecordsTable);

    return result;
}