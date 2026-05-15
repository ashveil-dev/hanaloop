import type { Groups } from "@/lib/client/types/groups";

type updateGroupType = {
    name? : string,
    parentId? : number | null
}

const baseUrl =
  typeof window === "undefined"
    ? process.env.SERVER_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL;


export async function updateGroupApi({ name, parentId } : updateGroupType): Promise<Groups> {
    const res = await fetch("/api/groups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, 
            parentId : parentId ? parentId.toString() : parentId
        }),
        cache: "no-store"
    });

    return res.json();
}