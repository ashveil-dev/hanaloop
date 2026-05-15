import type { Groups } from "@/lib/client/types/groups";

type createGroupType = {
    name : string,
    parentId : number | null
}

export async function createGroupApi({ name, parentId } : createGroupType): Promise<Groups> {
    const res = await fetch("http://localhost:3000/api/groups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, 
            parentId : parentId ? parentId.toString() : null
        }),
        cache: "no-store"
    });

    return res.json();
}