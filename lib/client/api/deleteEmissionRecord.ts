import type { EmissionRecord } from "@/lib/client/types/emissionRecords";

type deleteEmissionRecord = {
    id: number
}

export async function deleteEmissionRecord({
    id
}: deleteEmissionRecord): Promise<EmissionRecord> {
    const res = await fetch(`/api/emission-records/${id}`, {
        method: "DELETE",
    });

    return res.json();
}