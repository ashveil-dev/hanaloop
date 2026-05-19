import type { EmissionRecord } from "@/lib/client/types/emissionRecords";
import { ApiError } from "@/lib/client/errors/ApiError"

type deleteEmissionRecord = {
    id: number
}

export async function deleteEmissionRecord({
    id
}: deleteEmissionRecord): Promise<EmissionRecord> {
    const res = await fetch(`/api/emission-records/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new ApiError({
            status: res.status,
            message: res.statusText,
        })
    }

    return res.json();
}