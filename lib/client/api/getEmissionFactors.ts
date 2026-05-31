import type { EmissionFactors } from "@/lib/client/types/emissionFactors";
import { ApiError } from "@/lib/client/errors/ApiError";

export async function getEmissionFactors(): Promise<EmissionFactors> {
    const res = await fetch("/api/emission-factors", { cache: "no-store" });

    if (!res.ok) {
        throw new ApiError({
            status: res.status,
            message: res.statusText,
        });
    }

    return res.json();
}
