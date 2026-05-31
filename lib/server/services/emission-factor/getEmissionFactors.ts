import { db } from "@/lib/server/db";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";

export async function getEmissionFactors() {
    return db.select().from(EmissionFactorsTable);
}
