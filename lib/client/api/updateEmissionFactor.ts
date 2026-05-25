import type { EmissionFactor } from "@/lib/client/types/emissionFactors";
import { ApiError } from "@/lib/client/errors/ApiError";

type Params = {
    id: number;
    name?: string;
    category?: string;
    factor?: number;
    inputUnit?: string;
    outputUnit?: string;
    description?: string;
};

export async function updateEmissionFactor(params: Params): Promise<EmissionFactor> {
    const res = await fetch(`/api/emission-factors/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        throw new ApiError({
            status: res.status,
            message: res.statusText,
        });
    }

    return res.json();
}
