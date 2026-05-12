import type { Company } from "./company"
import type { Emission } from "./emission"

export type Country = {
    id: string,
    name: string, // "Korea"
    code: string, // "KR"
    emissions: Emission[],
    companies: Company[],
}