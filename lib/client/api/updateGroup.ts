import type { Groups } from "@/lib/client/types/groups";

type updateGroupType = {
    id: number,
    name? : string,
    parentId? : string | null
}

export async function updateGroup({ id, name, parentId } : updateGroupType): Promise<Groups> {
    const res = await fetch(`/api/groups${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, 
            parentId : parentId ? parentId.toString() : undefined
        }),
        cache: "no-store"
    });

    return res.json();
}