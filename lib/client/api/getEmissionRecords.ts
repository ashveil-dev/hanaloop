

import type { EmissionRecords } from "@/lib/client/types/emissionRecords";

export async function getEmissionRecords(): Promise<EmissionRecords> {
    const res = await fetch("/api/emission-records", {
        cache: "no-store"
    });

    return res.json();
}