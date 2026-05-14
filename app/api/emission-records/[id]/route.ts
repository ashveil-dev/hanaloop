import { z } from "zod";
import { ApiError } from "@/lib/server/errors/ApiError";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { deleteEmissionRecord } from "@/lib/server/services/emission-record/deleteEmissionRecord";
import { NextResponse } from "next/server";
import { updateEmissionRecord } from "@/lib/server/services/emission-record/updateEmissionRecord";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";
import { getEmissionRecord } from "@/lib/server/services/emission-record/getEmissionRecord";

const getEmissionRecordSchema = z.object({
    id: z.number()
})

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await context.params).id);
        const parsed = getEmissionRecordSchema.safeParse({ id });
        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            })
        }

        const result = await getEmissionRecord(parsed.data);

        return NextResponse.json(result)
    } catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json({
                message: e.message,
                errros: e.errors
            }, {
                status: 400
            })
        }
        else if (e instanceof ApiError) {
            return NextResponse.json({
                message: e.message,
            }, {
                status: e.status
            })
        }
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

const deleteEmissionRecordSchema = z.object({
    id: z.number()
})

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await context.params).id);
        const parsed = deleteEmissionRecordSchema.safeParse({ id });

        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            })
        }

        const result = await deleteEmissionRecord(parsed.data)

        return NextResponse.json(result)
    } catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json({
                message: e.message,
                errros: e.errors
            }, {
                status: 400
            })
        }
        else if (e instanceof ApiError) {
            return NextResponse.json({
                message: e.message,
            }, {
                status: e.status
            })
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}

const updateEmissionRecordSchema = z.object({
    id: z.number(),
    groupId: z.number().optional(),
    scopeType: z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]).optional(),
    amount: z.number().transform(v => v.toString()).optional(),
    unit: z.string().optional(),
    recordedAt: z.string()
        .default(
            new Date().toISOString().split("T")[0]
        ).optional()
})
export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await context.params).id);
        const { groupId, scopeType, amount, unit, recordedAt } = await request.json();

        const parsed = updateEmissionRecordSchema.safeParse({ id, groupId, scopeType, amount, unit, recordedAt });
        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            })
        }

        const result = await updateEmissionRecord(parsed.data);

        return NextResponse.json(result)
    } catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json({
                message: e.message,
                errros: e.errors
            }, {
                status: 400
            })
        }

        else if (e instanceof ApiError) {
            return NextResponse.json({
                message: e.message,
            }, {
                status: e.status
            })
        }

        else if (e instanceof DrizzleQueryError) {
            if (e.cause instanceof DatabaseError) {
                // Error Code 23503 === "Foreign Key Violation"
                // 선택한 Group Id가 존재하지 않을 경우
                if (e.cause.code === "23503") {
                    return NextResponse.json({
                        message: "The selected group could not be found."
                    }, {
                        status: 400
                    })
                }
            }
        }

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        )
    }
}
