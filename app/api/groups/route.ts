import { getGroups } from "@/lib/server/services/groups/getGroups";

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
  return Response.json(
    await getGroups()
  );
}

export async function POST() {
  return Response.json(
    await getGroups()
  );
}