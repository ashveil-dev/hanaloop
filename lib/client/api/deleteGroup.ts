import type { Groups } from "@/lib/client/types/groups";
import { ApiError } from "@/lib/client/errors/ApiError"

type deleteGroupType = {
    id: number,
}

export async function deleteGroup({ id }: deleteGroupType): Promise<Groups> {
    const res = await fetch(`/api/groups/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
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