export type EmissionType = {
    "amount": number,
    "carbonTax": number,
    "riskLevel": string
}

export type DashboardSummary =
    {
        "name": string,
        "unit": string,
        "scope1": EmissionType,
        "scope2": EmissionType,
        "scope3": EmissionType,
        "total": EmissionType
    }