import { db } from "@/lib/server/db";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";
import { eq } from "drizzle-orm";
import { ApiError } from "@/lib/server/errors/ApiError";

type UpdateEmissionFactorParams = {
    id: number;
    name?: string;
    category?: string;
    factor?: number;
    inputUnit?: string;
    outputUnit?: string;
    description?: string;
};

export async function updateEmissionFactor(params: UpdateEmissionFactorParams) {
    const { id, factor, ...rest } = params;

    const result = await db
        .update(EmissionFactorsTable)
        .set({
            ...rest,
            ...(factor !== undefined ? { factor: factor.toString() } : {}),
        })
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
