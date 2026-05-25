import { z } from "@/lib/server/openapi";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { NextResponse } from "next/server";
import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";
import { getEmissionFactors } from "@/lib/server/services/emission-factor/getEmissionFactors";
import { createEmissionFactor } from "@/lib/server/services/emission-factor/createEmissionFactor";
import { createEmissionFactorSchema } from "@/lib/server/schema/EmissionFactorsSchema";

export async function GET() {
    try {
        const result = await getEmissionFactors();
        return NextResponse.json(result);
    } catch {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = createEmissionFactorSchema.safeParse(body);

        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            });
        }

        const result = await createEmissionFactor(parsed.data);
        return NextResponse.json(result);
    } catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json(
                { message: e.message, errors: e.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
