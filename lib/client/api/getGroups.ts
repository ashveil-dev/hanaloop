import type { Groups } from "@/lib/client/types/groups";

const baseUrl =
  typeof window === "undefined"
    ? process.env.SERVER_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

export async function getGroups(): Promise<Groups> {
    const res = await fetch(baseUrl+"/api/groups", {
        cache: "no-store"
    });

    return res.json();
}