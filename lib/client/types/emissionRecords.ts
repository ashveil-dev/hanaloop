import { StringifyOptions } from "querystring";

export type EmissionRecord = {
    "id": number,
    "groupId": number,
    "scopeType": "SCOPE1" | "SCOPE2" | "SCOPE3",
    "amount": string,
    "unit": string,
    "recordedAt": string,
    "createdAt": Date
}

export type EmissionRecords = EmissionRecord[];