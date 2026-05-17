import type { Groups } from "@/lib/client/types/groups";

export async function getGroups(): Promise<Groups> {
    const res = await fetch("/api/groups", {
        cache: "no-store"
    });

    return res.json();
}