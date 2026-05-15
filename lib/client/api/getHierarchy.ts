import type { Hierarchy } from "@/lib/client/types/dashboard";

type Parameter = {
    id? : number
}

const baseUrl =
  typeof window === "undefined"
    ? process.env.SERVER_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

export async function getHierarchy({ id } : Parameter): Promise<Hierarchy> {
    const res = await fetch(baseUrl+`/api/dashboard/hierarchy/${id}`, {
        cache: "no-store"
    });

    return res.json();
}