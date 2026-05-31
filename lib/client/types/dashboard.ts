export type SummaryEmissionType = {
    "amount": number,
    "carbonTax": number,
    "riskLevel": string
}

export type DashboardSummary = {
        "name": string,
        "unit": string,
        "scope1": SummaryEmissionType,
        "scope2": SummaryEmissionType,
        "scope3": SummaryEmissionType,
        "total": SummaryEmissionType
}

export type Emission = {
        scope1: number,
        scope2: number,
        scope3: number,
        total: number,
    }


export type MonthlyEmission = {
    month: string;
    label: string;
    scope1: number;
    scope2: number;
    scope3: number;
    total: number;
};

export type MonthlyEmissions = {
    unit: string;
    months: MonthlyEmission[];
};

export type Hierarchy = {
    id: number,
    name: string,
    parent_id: number | null,
    unit: string,
    directEmission: Emission,
    childrenEmission : Emission,
    totalEmission : Emission,
    children : Hierarchy[]
}
