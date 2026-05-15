import type { DashboardSummary } from "@/lib/client/types/dashboard";

const baseUrl =
  typeof window === "undefined"
    ? process.env.SERVER_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

export async function getDashboardSummary() : Promise<DashboardSummary> {
    const res = await fetch(baseUrl+"/api/dashboard/summary", {
        cache: "no-store"
    });

    return res.json();
}