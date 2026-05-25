import { db } from "@/lib/server/db";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { eq } from "drizzle-orm";
import { ApiError } from "@/lib/server/errors/ApiError";

export async function deleteEmissionFactor(id: number) {
    const result = await db
        .delete(EmissionFactorsTable)
        .where(eq(EmissionFactorsTable.id, id))
        .returning();

    if (result.length === 0) {
        throw new ApiError({
            status: 400,
            message: "The selected emission factor does not exist.",
        });
    }

    return result[0];
}
