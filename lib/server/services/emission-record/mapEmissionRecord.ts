import { calculateEmission } from "@/lib/shared/calculateEmission";

type RawRecord = {
    id: number;
    groupId: number;
    emissionFactorId: number;
    scopeType: string;
    amount: string;
    unit: string;
    recordedAt: string;
    createdAt: Date;
    factorName: string | null;
    factorCategory: string | null;
    factor: string | null;
    inputUnit: string | null;
    outputUnit: string | null;
};

export function mapEmissionRecord(row: RawRecord) {
    const factorValue = row.factor ?? "0";
    const calculatedEmission = calculateEmission(row.amount, factorValue);

    return {
        id: row.id,
        groupId: row.groupId,
        emissionFactorId: row.emissionFactorId,
        scopeType: row.scopeType as "SCOPE1" | "SCOPE2" | "SCOPE3",
        amount: row.amount,
        unit: row.unit,
        recordedAt: row.recordedAt,
        createdAt: row.createdAt,
        emissionFactor: {
            id: row.emissionFactorId,
            name: row.factorName ?? "",
            category: row.factorCategory ?? "",
            factor: factorValue,
            inputUnit: row.inputUnit ?? "",
            outputUnit: row.outputUnit ?? "kgCO2e",
        },
        calculatedEmission,
    };
}
