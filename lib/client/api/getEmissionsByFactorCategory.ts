import type { FactorCategoryEmissions } from "@/lib/client/types/dashboard";
import { ApiError } from "@/lib/client/errors/ApiError";

export async function getEmissionsByFactorCategory(): Promise<FactorCategoryEmissions> {
    const res = await fetch("/api/dashboard/category", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new ApiError({
            status: res.status,
            message: res.statusText,
        });
    }

    return res.json();
}
