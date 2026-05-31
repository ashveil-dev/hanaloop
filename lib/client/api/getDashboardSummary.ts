import type { DashboardSummary } from "@/lib/client/types/dashboard";
import { ApiError } from "@/lib/client/errors/ApiError"

export async function getDashboardSummary(): Promise<DashboardSummary> {
    const res = await fetch("/api/dashboard/summary", {
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