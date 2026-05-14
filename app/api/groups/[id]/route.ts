import { z } from "zod";
import { deleteGroup } from "@/lib/server/services/groups/deleteGroup";
import { updateGroup } from "@/lib/server/services/groups/updateGroup";
import { NextResponse } from "next/server";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { ApiError } from "@server/errors/ApiError";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";
import { getGroup } from "@/lib/server/services/groups/getGroup";

const getGroupSchema = z.object({
    id: z.number()
})

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

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     summary: 그룹 삭제하기
 *     consumes:
 *       application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: 삭제할 그룹의 id
 *         schema:
 *           type: integer
 *           required: true
 */

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

/**
 * @swagger
 * /api/groups/{id}:
 *   patch:
 *     summary: 그룹 수정하기
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 그룹의 id
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Samsung Electronics
 *               parentId:
 *                 type: integer
 *                 nullable: true
 *                 example: 4
 */
const updateGroupSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  parentId: z.number().optional(),
})
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

