import { db } from "@/lib/server/db";
import { EmissionFactorsTable } from "@/lib/server/db/schema/emissionFactors";

type CreateEmissionFactorParams = {
    name: string;
    category: string;
    factor: number;
    inputUnit: string;
    outputUnit: string;
    description?: string;
};

export async function createEmissionFactor(params: CreateEmissionFactorParams) {
    const result = await db
        .insert(EmissionFactorsTable)
        .values({
            name: params.name,
            category: params.category,
            factor: params.factor.toString(),
            inputUnit: params.inputUnit,
            outputUnit: params.outputUnit,
            description: params.description,
        })
        .returning();

    return result[0];
}
