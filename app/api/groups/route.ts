import { z } from "@/lib/server/openapi"
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";
import { NextResponse } from "next/server";
import { createGroup } from "@/lib/server/services/groups/createGroup";
import { getGroups } from "@/lib/server/services/groups/getGroups";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { createGroupSchema } from "@/lib/server/schema/GroupsSchema";

export async function GET() {
  try {
    const groups = await getGroups();

    return NextResponse.json(groups)
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createGroupSchema.safeParse(body);

    if (!parsed.success) {
      throw new ValidationError({
        errors: z.treeifyError(parsed.error),
      })
    }

    const result = await createGroup(parsed.data)

    return result;
  } catch (e) {
    // 입력값이 올바르지 않은 경우
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
        // 선택한 부모 객체가 존재하지 않을 때
        if (e.cause.code === "23503") {
          return NextResponse.json({
            message: "The selected parent group could not be found."
          }, {
            status: 400
          })
        }
      }
    }
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  )
}