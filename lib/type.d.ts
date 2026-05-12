export type Emission = { 
    "yearMonth": string, // "2024-01" 
    "emissions": number, // 120 
}

export type Company = {
    id: string,
    name: string,
    country: string,
    emissions: EmissionType[],
}

export type Post = {
    id: string,
    title: string,
    resourceUid: string,
    dateTime: string, // "2024-01"
    content: string,
}

export type Country = {
    id: string,
    name: string, // "Korea"
    code: string, // "KR"
    emissions: EmissionType[],
    companies: CompanyType[],
}