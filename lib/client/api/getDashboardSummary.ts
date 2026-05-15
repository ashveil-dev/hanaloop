import type { DashboardSummary } from "@/lib/client/types/dashboard";

export async function getDashboardSummary() : Promise<DashboardSummary> {
    const res = await fetch("http://localhost:3000/api/dashboard/summary", {
        cache: "no-store"
    });

    return res.json();
}