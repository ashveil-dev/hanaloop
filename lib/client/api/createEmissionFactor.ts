import type { EmissionFactor } from "@/lib/client/types/emissionFactors";
import { ApiError } from "@/lib/client/errors/ApiError";

type Params = {
    name: string;
    category: string;
    factor: number;
    inputUnit: string;
    outputUnit?: string;
    description?: string;
};

export async function createEmissionFactor(params: Params): Promise<EmissionFactor> {
    const res = await fetch("/api/emission-factors", {
        method: "POST",
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
