import type { Groups } from "@/lib/client/types/groups";
import { ApiError } from "@/lib/client/errors/ApiError"

export async function getGroups(): Promise<Groups> {
    const res = await fetch("/api/groups", {
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