import { z } from "@/lib/server/openapi";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { NextResponse } from "next/server";
import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";
import { ApiError } from "@/lib/server/errors/ApiError";
import { updateEmissionFactor } from "@/lib/server/services/emission-factor/updateEmissionFactor";
import { deleteEmissionFactor } from "@/lib/server/services/emission-factor/deleteEmissionFactor";
import {
    updateEmissionFactorSchema,
    deleteEmissionFactorSchema,
} from "@/lib/server/schema/EmissionFactorsSchema";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
    try {
        const { id: idParam } = await context.params;
        const id = Number(idParam);
        const body = await request.json();
        const parsed = updateEmissionFactorSchema.safeParse({ ...body, id });

        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            });
        }

        const result = await updateEmissionFactor(parsed.data);
        return NextResponse.json(result);
    } catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json(
                { message: e.message, errors: e.errors },
                { status: 400 }
            );
        }
        if (e instanceof ApiError) {
            return NextResponse.json(
                { message: e.message },
                { status: e.status }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(_request: Request, context: RouteContext) {
    try {
        const { id: idParam } = await context.params;
        const parsed = deleteEmissionFactorSchema.safeParse({
            id: Number(idParam),
        });

        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            });
        }

        const result = await deleteEmissionFactor(parsed.data.id);
        return NextResponse.json(result);
    } catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json(
                { message: e.message, errors: e.errors },
                { status: 400 }
            );
        }
        if (e instanceof DrizzleQueryError && e.cause instanceof DatabaseError) {
            if (e.cause.code === "23503") {
                return NextResponse.json(
                    { message: "This emission factor is used by existing records." },
                    { status: 400 }
                );
            }
        }
        if (e instanceof ApiError) {
            return NextResponse.json(
                { message: e.message },
                { status: e.status }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
