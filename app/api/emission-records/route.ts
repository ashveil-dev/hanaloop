import { z } from "zod";
import { ValidationError } from "@server/errors/ValidationError";
import { createEmissionRecord } from "@/lib/server/services/emission-record/createEmissionRecord";
import { NextResponse } from "next/server";
import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";

const createEmissionRecordSchema = z.object({
    groupId: z.number(),
    scopeType: z.enum(["SCOPE1", "SCOPE2", "SCOPE3"]),
    amount: z.number().transform(v => v.toString()),
    unit: z.string().default("tCO2e"),
    recordedAt: z.string().optional()
        .default(
            new Date().toISOString().split("T")[0]
        )
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = createEmissionRecordSchema.safeParse(body);

        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            })
        }

        const result = await createEmissionRecord(parsed.data)

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
        else if (e instanceof DrizzleQueryError) {
            if (e.cause instanceof DatabaseError) {
                // Error Code 23503 === "Foreign Key Violation"
                // Group Id가 존재하지 않을 경우
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