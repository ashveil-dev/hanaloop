import { z } from "@/lib/server/openapi"
import { NextResponse } from "next/server"
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { getHierarchySchema } from "@/lib/server/schema/DashboardSchema";
import { getHierarchy } from "@/lib/server/services/dashboard/hierarchy/getHierarchy";
import { ApiError } from "@/lib/server/errors/ApiError";

export async function GET(
    request: Request,
    context: {
        params: Promise<{ id: string }>
    }) {
    try {
        const id = parseInt((await context.params).id);
        const parsed = getHierarchySchema.safeParse({ id });

        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            })
        }

        const result = await getHierarchy(parsed.data);

        return NextResponse.json(result)
    } catch (e) {
        if (e instanceof ApiError) {
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