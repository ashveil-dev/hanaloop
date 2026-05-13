import { deleteGroup } from "@/lib/server/services/groups/deleteGroup";
import { updateGroup } from "@/lib/server/services/groups/updateGroup";

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
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const result = await deleteGroup({ id });

    return result;
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
export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const { name, parentId } = await request.json();
    const result = await updateGroup({ id, name, parentId });

    return result;
}