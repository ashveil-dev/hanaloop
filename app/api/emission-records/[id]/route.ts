import { z } from "zod";
import { ApiError } from "@/lib/server/errors/ApiError";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { deleteEmissionRecord } from "@/lib/server/services/emission-record/deleteEmissionRecord";
import { NextResponse } from "next/server";

const deleteGroupSchema = z.object({
    id: z.number()
})

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await context.params).id);
        const parsed = deleteGroupSchema.safeParse({ id });

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