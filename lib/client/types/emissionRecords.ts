import type { EmissionFactor } from "@/lib/client/types/emissionFactors";

export type EmissionRecord = {
    id: number;
    groupId: number;
    emissionFactorId: number;
    scopeType: "SCOPE1" | "SCOPE2" | "SCOPE3";
    amount: string;
    unit: string;
    recordedAt: string;
    createdAt: Date;
    emissionFactor: Pick<
        EmissionFactor,
        "id" | "name" | "category" | "factor" | "inputUnit" | "outputUnit"
    >;
    calculatedEmission: number;
};

export type EmissionRecords = EmissionRecord[];
