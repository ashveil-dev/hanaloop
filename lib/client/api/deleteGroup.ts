import type { Groups } from "@/lib/client/types/groups";

type deleteGroupType = {
    id : number,
}

export async function deleteGroup({ id } : deleteGroupType): Promise<Groups> {
    const res = await fetch(`/api/groups/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    });

    return res.json();
}