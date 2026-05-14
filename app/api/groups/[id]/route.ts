import { z } from "@/lib/server/openapi"
import { deleteGroup } from "@/lib/server/services/groups/deleteGroup";
import { updateGroup } from "@/lib/server/services/groups/updateGroup";
import { NextResponse } from "next/server";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { ApiError } from "@/lib/server/errors/ApiError";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";
import { getGroup } from "@/lib/server/services/groups/getGroup";
import { deleteGroupSchema, getGroupSchema, updateGroupSchema } from "@/lib/server/schema/GroupsSchema";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await context.params).id);
        const parsed = getGroupSchema.safeParse({ id });
        if (!parsed.success) {
            throw new ValidationError({
                errors: z.treeifyError(parsed.error),
            })
        }

        const result = await getGroup(parsed.data);

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

    const result = await deleteGroup(parsed.data)

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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await context.params).id);
    const { name, parentId } = await request.json();

    const parsed = updateGroupSchema.safeParse({ id, name, parentId });
    if (!parsed.success) {
      throw new ValidationError({
        errors: z.treeifyError(parsed.error),
      })
    }

    const result = await updateGroup(parsed.data);

    return result;
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

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

