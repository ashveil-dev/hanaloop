import { NextResponse } from "next/server";
import { getMonthlyEmissions } from "@/lib/server/services/dashboard/monthly/getMonthlyEmissions";
import { ApiError } from "@/lib/server/errors/ApiError";

export async function GET() {
    try {
        const result = await getMonthlyEmissions();
        return NextResponse.json(result);
    } catch (e) {
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
