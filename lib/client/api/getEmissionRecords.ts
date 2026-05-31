import type { EmissionRecords } from "@/lib/client/types/emissionRecords";
import { ApiError } from "@/lib/client/errors/ApiError"

export async function getEmissionRecords(): Promise<EmissionRecords> {
    const res = await fetch("/api/emission-records", {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new ApiError({
            status: res.status,
            message: res.statusText,
        })
    }

    return res.json();
}