import z from "zod";
import { NextResponse } from "next/server";
import { createGroup } from "@/lib/server/services/groups/createGroup";
import { getGroups } from "@/lib/server/services/groups/getGroups";
import { ValidationError } from "@/lib/server/errors/ValidationError";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { DatabaseError } from "pg";
import { ApiError } from "@server/errors/ApiError";


/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: 그룹 목록 조회
 *     responses:
 *       200:
 *          description: 성공
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 2
 *                   name:
 *                     type: string
 *                     example: groupName
 *                   parent_id:
 *                     type: integer
 *                     example : 1
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */
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


/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: 그룹 추가하기
 *     consumes:
 *       application/json
 *     parameters:
 *       - in: body
 *         description: 추가할 그룹의 정보
 *         schema:
 *           type: object
 *           required:
 *             name
 *           properties:
 *             name:
 *               type: string
 *             parentId:
 *               type: string
 *               nullable: true
 */

/*
{
    "message": "입력값이 올바르지 않습니다.",
    "errors": {
        "formErrors": [],
        "fieldErrors": {
            "name": [
                "Invalid input: expected string, received undefined"
            ]
        }
    }
}
*/

const createGroupSchema = z.object({
  name: z.string(),
  parentId: z.string().nullable().default(null).transform(v => v ? parseInt(v) : null)
})

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