import type { Hierarchy } from "@/lib/client/types/dashboard";

type Parameter = {
    id? : number
}

export async function getHierarchy({ id } : Parameter): Promise<Hierarchy> {
    const res = await fetch(`/api/dashboard/hierarchy/${id}`, {
        cache: "no-store"
    });

    return res.json();
}