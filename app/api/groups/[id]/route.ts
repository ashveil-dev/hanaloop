import { z } from "zod";
import { deleteGroup } from "@/lib/server/services/groups/deleteGroup";
import { updateGroup } from "@/lib/server/services/groups/updateGroup";
import { NextResponse } from "next/server";
import { ValidationError } from "@/lib/server/errors/ValidationError";

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
  id: z.string()
})

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const parsed = deleteGroupSchema.safeParse({ id });

    if (!parsed.success) {
      throw new ValidationError({
        errors: z.treeifyError(parsed.error),
      })
    }

    const result = await deleteGroup(parsed.data)

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
  id: z.string().transform(v => parseInt(v)),
  name: z.string().optional(),
  parentId: z.number().optional(),
})
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  )
}

