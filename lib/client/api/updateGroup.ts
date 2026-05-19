import type { Groups } from "@/lib/client/types/groups";
import { ApiError } from "@/lib/client/errors/ApiError"

type updateGroupType = {
    id: number,
    name?: string,
    parentId?: number | undefined
}

export async function updateGroup({ id, name, parentId }: updateGroupType): Promise<Groups> {
    const res = await fetch(`/api/groups/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            parentId: parentId
        }),
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