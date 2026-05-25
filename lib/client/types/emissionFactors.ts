export type EmissionFactor = {
    id: number;
    name: string;
    category: string;
    factor: string;
    inputUnit: string;
    outputUnit: string;
    description: string | null;
    createdAt: Date;
};

export type EmissionFactors = EmissionFactor[];
