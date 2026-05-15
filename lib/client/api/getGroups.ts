import type { Groups } from "@/lib/client/types/groups";

export async function getGroups(): Promise<Groups> {
    const res = await fetch("http://localhost:3000/api/groups", {
        cache: "no-store"
    });

    return res.json();
}