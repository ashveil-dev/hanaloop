import type { EmissionRecord } from "@/lib/client/types/emissionRecords";

type createEmissionRecord = {
    groupId: number,
    scopeType: "SCOPE1" | "SCOPE2" | "SCOPE3",
    amount: number,
    unit: string,
    recordedAt: string
}

export async function createEmissionRecord({
    groupId,
    scopeType,
    amount,
    unit,
    recordedAt
}: createEmissionRecord): Promise<EmissionRecord> {
    const res = await fetch("/api/emission-records", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            groupId,
            scopeType,
            amount,
            unit,
            recordedAt
        }),
    });

    return res.json();
}