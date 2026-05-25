import { ApiError } from "@/lib/client/errors/ApiError";

export async function deleteEmissionFactor(id: number): Promise<void> {
    const res = await fetch(`/api/emission-factors/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new ApiError({
            status: res.status,
            message: res.statusText,
        });
    }
}
