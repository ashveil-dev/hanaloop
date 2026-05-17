import type { EmissionRecord } from "@/lib/client/types/emissionRecords";

type editEmissionRecord = {
    id: number,
    groupId: number,
    scopeType: "SCOPE1" | "SCOPE2" | "SCOPE3",
    amount: number,
    unit: string,
    recordedAt: string
}

export async function editEmissionRecord({
    id,
    groupId,
    scopeType,
    amount,
    unit,
    recordedAt
}: editEmissionRecord): Promise<EmissionRecord> {
    const res = await fetch(`/api/emission-records/${id}`, {
        method: "PATCH",
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