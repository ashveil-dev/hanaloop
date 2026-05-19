import type { Hierarchy } from "@/lib/client/types/dashboard";
import { ApiError } from "@/lib/client/errors/ApiError"

type Parameter = {
    id?: number
}

export async function getHierarchy({ id }: Parameter): Promise<Hierarchy> {
    const res = await fetch(`/api/dashboard/hierarchy/${id}`, {
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