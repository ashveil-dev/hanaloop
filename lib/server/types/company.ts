import { Emission } from "./emission";

export type Company = {
    id: string,
    name: string,
    country: string,
    emissions: Emission[],
}