import type { EmissionRecord } from "@/lib/client/types/emissionRecords";
import { ApiError } from "@/lib/client/errors/ApiError";

type editEmissionRecord = {
    id: number;
    groupId: number;
    emissionFactorId: number;
    scopeType: "SCOPE1" | "SCOPE2" | "SCOPE3";
    amount: number;
    unit?: string;
    recordedAt: string;
};

export async function editEmissionRecord({
    id,
    groupId,
    emissionFactorId,
    scopeType,
    amount,
    unit,
    recordedAt,
}: editEmissionRecord): Promise<EmissionRecord> {
    const res = await fetch(`/api/emission-records/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            groupId,
            emissionFactorId,
            scopeType,
            amount,
            unit,
            recordedAt,
        }),
    });

    if(!res.ok) {
        throw new ApiError({
            status : res.status,
            message : await res.json(),
        })
    }

    return res.json();
}