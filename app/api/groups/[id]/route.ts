import { deleteGroup } from "@/lib/server/services/groups/deleteGroup";

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