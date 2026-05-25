import type { MonthlyEmissions } from "@/lib/client/types/dashboard";
import { ApiError } from "@/lib/client/errors/ApiError";

export async function getMonthlyEmissions(): Promise<MonthlyEmissions> {
    const res = await fetch("/api/dashboard/monthly", {
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
