import type { Groups } from "@/lib/client/types/groups";

type createGroupType = {
    name : string,
    parentId? : string | null
}

export async function createGroup({ name, parentId } : createGroupType): Promise<Groups> {
    const res = await fetch("/api/groups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, 
            parentId : parentId,
        }),
        cache: "no-store"
    });

    return res.json();
}